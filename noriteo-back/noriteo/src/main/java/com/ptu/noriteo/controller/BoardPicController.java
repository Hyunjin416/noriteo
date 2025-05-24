package com.ptu.noriteo.controller;

import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.BoardPic;
import com.ptu.noriteo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import com.ptu.noriteo.jwt.JwtAuthentication;

import java.util.List;

/**
 * 게시글 사진 관련 로직 전용 컨트롤러
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/board/pics")
public class BoardPicController {

    private final BoardService boardService;

    /**
     * 게시글 등록 - 사진 포함
     */
    @PostMapping(value = "/write", consumes = "multipart/form-data")
    public ResponseEntity<Long> writeBoardWithPics(
            @RequestPart("board") Board board,
            @RequestPart(name = "pics", required = false) List<MultipartFile> pics
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!(auth instanceof JwtAuthentication jwtAuth)) {
            return ResponseEntity.status(401).build();
        }

        board.setUserId(jwtAuth.getUserId());
        Long newId = boardService.createBoard(board, pics);
        return ResponseEntity.ok(newId);
    }

    /**
     * 게시글 수정 - 사진 포함
     */
    @PutMapping(value = "/update/{boardId}", consumes = "multipart/form-data")
    public ResponseEntity<Long> updateBoardWithPics(
            @PathVariable Long boardId,
            @RequestPart("board") Board board,
            @RequestPart(name = "pics", required = false) List<MultipartFile> pics
    ) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (!(auth instanceof JwtAuthentication jwtAuth)) {
            return ResponseEntity.status(401).build();
        }

        board.setUserId(jwtAuth.getUserId());
        board.setBoardId(boardId);
        Long updatedId = boardService.updateBoardWithPics(board, pics);
        return ResponseEntity.ok(updatedId);
    }

    // 향후 사진 삭제 개별 API 등을 추가하려면 여기서 처리 가능
}
