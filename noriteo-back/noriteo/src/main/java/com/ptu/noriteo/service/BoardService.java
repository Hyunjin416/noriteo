package com.ptu.noriteo.service;

import com.ptu.noriteo.config.FileUploadService;
import com.ptu.noriteo.mapper.BoardMapper;
import com.ptu.noriteo.mapper.BoardPicMapper;
import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.BoardPic;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RequiredArgsConstructor
@Service
public class BoardService {

    private final BoardMapper boardMapper;
    private final BoardPicMapper boardPicMapper;
    private final FileUploadService fileUploadService; // 파일 저장 유틸

    public List<Board> getBoardList() {
        return boardMapper.selectBoardList();
    }

    public Board getBoardDetail(Long boardId) {
        return boardMapper.selectBoardDetail(boardId);
    }

    public void updateBoard(Board board) {
        boardMapper.updateBoard(board);
    }

    public void deleteBoard(Long boardId) {
        boardMapper.deleteBoard(boardId);
    }

    // 게시글 + 사진 저장
    @Transactional
    public void createBoard(Board board, List<MultipartFile> pics) {
        boardMapper.insertBoard(board);
        Long boardId = board.getBoardId();

        int order = 1;
        for (MultipartFile file : pics) {
            if (!file.isEmpty()) {
                String url = fileUploadService.upload("board", file); // "board" 폴더에 저장

                BoardPic pic = new BoardPic();
                pic.setBoardId(boardId);
                pic.setBoardPicUrl(url);
                pic.setBoardPicOrder(order++);
                boardPicMapper.insertPic(pic);
            }
        }
    }

    @Transactional
    public void updateBoardWithPics(Board board, List<MultipartFile> pics) {
        boardMapper.updateBoard(board);
        boardPicMapper.deleteByBoardId(board.getBoardId());

        int order = 1;
        for (MultipartFile file : pics) {
            if (!file.isEmpty()) {
                String url = fileUploadService.upload("board", file); // 동일하게 "board"

                BoardPic pic = new BoardPic(board.getBoardId(), url, order++);
                boardPicMapper.insertPic(pic);
            }
        }
    }
}
