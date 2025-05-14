package com.ptu.noriteo.controller;

import com.ptu.noriteo.jwt.JwtAuthentication;
import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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

    @PostMapping(value = "/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createBoard(@RequestPart("board") Board board,
//                            @RequestPart("pics") List<MultipartFile> pics
                            @RequestPart(name = "pics", required = false) List<MultipartFile> pics)
            {

        boardService.createBoard(board, pics);
    }

    @PutMapping(value = "/update/{boardId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateBoard(@PathVariable("boardId") Long id,
                            @RequestPart("board") Board board,
                            @RequestPart("pics") List<MultipartFile> pics) {
        board.setBoardId(id);
        boardService.updateBoardWithPics(board, pics); // 서비스단에서 사진까지 처리
    }

 @DeleteMapping("/delete/{boardId}")
    public void deleteBoard(@PathVariable("boardId") Long boardId) {
        boardService.deleteBoard(boardId);
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


