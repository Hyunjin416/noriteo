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




}


