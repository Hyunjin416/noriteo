package com.ptu.noriteo.controller;

import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.service.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/board")
public class BoardController {

    private final BoardService boardService;

    @GetMapping("/list")
    public List<Board> listBoards() {
        return boardService.getBoardList();
    }

    @GetMapping("/detail/{id}")
    public Board detailBoard(@PathVariable("id") Long boardId) {
        return boardService.getBoardDetail(boardId);
    }

    @PostMapping(value = "/write", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void createBoard(@RequestPart("board") Board board,
                            @RequestPart("pics") List<MultipartFile> pics) {
        boardService.createBoard(board, pics);
    }

    @PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public void updateBoard(@PathVariable("id") Long id,
                            @RequestPart("board") Board board,
                            @RequestPart("pics") List<MultipartFile> pics) {
        board.setBoardId(id);
        boardService.updateBoardWithPics(board, pics); // 서비스단에서 사진까지 처리
    }



    @DeleteMapping("/delete/{id}")
    public void deleteBoard(@PathVariable("id") Long boardId) {
        boardService.deleteBoard(boardId);
    }


}
