package com.ptu.noriteo.controller;

import com.ptu.noriteo.jwt.JwtAuthentication;
import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.service.BoardService;
import lombok.RequiredArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.ptu.noriteo.config.CustomUser;

import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

//    @GetMapping("/list")
//    public List<Board> listBoards() {
//        return boardService.getBoardList();
//    }

    @GetMapping("/list")
    public List<Board> listBoards(@RequestParam(value = "board_type", required = false) String boardType) {
        if (boardType != null) {
            return boardService.getBoardListByType(boardType);
        }
        return boardService.getBoardList();
    }

    @GetMapping("/detail/{boardId}")
    public Board detailBoard(@PathVariable("boardId") Long boardId) {
        return boardService.getBoardDetail(boardId);
    }

    /*
    @PostMapping(value = "/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createBoard(@RequestPart("board") Board board,
//                            @RequestPart("pics") List<MultipartFile> pics
                            @RequestPart(name = "pics", required = false) List<MultipartFile> pics)

    {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth == null || !(auth.getPrincipal() instanceof CustomUser)) {
            throw new RuntimeException("로그인된 사용자만 글을 작성할 수 있습니다.");
        }
        CustomUser principal = (CustomUser) auth.getPrincipal();
        board.setUserId(principal.getUserId());
        Long userId = principal.getUserId();  // 이제 정상 호출 됩니다.

        boardService.createBoard(board, pics);
    }
    */

    @PostMapping(value = "/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> createBoard(@RequestPart("board") Board board,
                            @RequestPart(name = "pics", required = false) List<MultipartFile> pics) {

        Authentication auth = SecurityContextHolder.getContext().getAuthentication();

        /* 🔽 CustomUser → JwtAuthentication 로 교체  */
        if (auth == null || !(auth instanceof JwtAuthentication jwtAuth)) {
            throw new RuntimeException("로그인된 사용자만 글을 작성할 수 있습니다.");
        }
        board.setUserId(jwtAuth.getUserId());

        Long newId = boardService.createBoard(board, pics);   // ⬅ id 받기
        return ResponseEntity.ok(newId);
        /*
        boardService.createBoard(board, pics);
        return ResponseEntity.ok(board.getBoardId());
        */
    }

    /*
    @PutMapping(value = "/update/{boardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateBoard(@PathVariable("boardId") Long id,
                            @RequestPart("board") Board board,
                            @RequestPart("pics") List<MultipartFile> pics) {
        board.setBoardId(id);
        boardService.updateBoardWithPics(board, pics); // 서비스단에서 사진까지 처리
    }
    */

    @PutMapping(value = "/update/{boardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<Long> updateBoard(
            @PathVariable("boardId") Long boardId,
            @RequestPart("board") Board board,
            @RequestPart(name = "pics", required = false) List<MultipartFile> pics) {

        /* 1️⃣ 인증 정보 → JwtAuthentication 으로 캐스팅 */
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!(auth instanceof JwtAuthentication jwtAuth)) {
            throw new RuntimeException("로그인된 사용자만 글을 작성할 수 있습니다.");
        }

        board.setUserId(jwtAuth.getUserId());   // ← jwtAuth 사용
        board.setBoardId(boardId);

        Long id = boardService.updateBoardWithPics(board, pics);
        return ResponseEntity.ok(id);        // 수정된 id 반환

        /*
        board.setUserId(jwtAuth.getUserId());
        board.setBoardId(id);          // ← 빠뜨리지 말고 넣어 주세요.
        boardService.updateBoardWithPics(board, pics);
        */
    }

    @DeleteMapping("/delete/{boardId}")
    public ResponseEntity<Void> deleteBoard(
            @PathVariable("boardId") Long boardId,
            @AuthenticationPrincipal JwtAuthentication auth
    ) {
        // 인증 정보 없으면 401
        if (auth == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        // 로그인된 사용자 ID
        Long userId = auth.getUserId();

        // 서비스 단에서 작성자 검증 후 삭제
        boardService.deleteBoard(boardId, userId);

        // 삭제 성공 시 204 No Content
        return ResponseEntity.noContent().build();
    }


    @PostMapping("/{boardId}/save")
    public ResponseEntity<Board> saveBoard(@PathVariable Long boardId,
                                           @AuthenticationPrincipal JwtAuthentication auth) {
        if (auth == null) {
            return ResponseEntity.status(401).body(null);
        }

        Long userId = auth.getUserId();
        boardService.toggleBoardSave(userId, boardId);
        Board updatedBoard = boardService.getBoardDetail(boardId);
        return ResponseEntity.ok(updatedBoard);
    }

    @GetMapping("/{boardId}/saved")
    public ResponseEntity<Boolean> isSaved(@PathVariable Long boardId,
                                           @AuthenticationPrincipal JwtAuthentication auth) {
        if (auth == null) return ResponseEntity.ok(false);

        Long userId = auth.getUserId();
        boolean saved = boardService.isBoardSaved(userId, boardId);
        return ResponseEntity.ok(saved);
    }



    @GetMapping("/{boardId}/liked")
    public ResponseEntity<Boolean> isLiked(@PathVariable Long boardId,
                                           @AuthenticationPrincipal JwtAuthentication auth) {
        if (auth == null) return ResponseEntity.ok(false);

        Long userId = auth.getUserId();
        boolean liked = boardService.isBoardLiked(userId, boardId);
        return ResponseEntity.ok(liked);
    }

    @PostMapping("/{boardId}/like")
    public ResponseEntity<Board> likeBoard(@PathVariable Long boardId,
                                           @AuthenticationPrincipal JwtAuthentication auth) {
        if (auth == null) {
            return ResponseEntity.status(401).body(null);
        }

        Long userId = auth.getUserId();
        boardService.likeBoard(userId, boardId);

        // 👍 좋아요 반영된 최신 게시글 다시 가져오기
        Board updatedBoard = boardService.getBoardDetail(boardId);
        return ResponseEntity.ok(updatedBoard);
    }

    @GetMapping("/popular")
    public ResponseEntity<List<Board>> getPopularBoards() {
        List<Board> popularBoards = boardService.getPopularBoards();
        return ResponseEntity.ok(popularBoards);
    }

    //    @GetMapping("/user/{userId}")
//    public ResponseEntity<List<Board>> getBoardsByUser(@PathVariable Long userId) {
//        List<Board> boards = boardService.getBoardsByUserId(userId);
//        return ResponseEntity.ok(boards);
//    }
    @GetMapping("/my")
    public ResponseEntity<List<Board>> getMyBoards(@AuthenticationPrincipal JwtAuthentication auth) {
        Long userId = auth.getUserId(); // 🔑 로그인된 유저 ID 가져오기
        List<Board> boards = boardService.getBoardsByUserId(userId);
        return ResponseEntity.ok(boards);
    }

    @GetMapping("/my/saved")
    public ResponseEntity<List<Board>> getMySavedBoards(@AuthenticationPrincipal JwtAuthentication auth) {
        return ResponseEntity.ok(boardService.getMySavedBoards(auth.getUserId()));
    }

    @GetMapping("/my/liked")
    public ResponseEntity<List<Board>> getMyLikedBoards(@AuthenticationPrincipal JwtAuthentication auth) {
        return ResponseEntity.ok(boardService.getMyLikedBoards(auth.getUserId()));
    }

}
