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
                pic.setBoardPicOrder((long) order++);
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

                BoardPic pic = new BoardPic(board.getBoardId(), url, (long) order++);
                boardPicMapper.insertPic(pic);
            }
        }
    }

    public List<Board> getBoardList() {
        return boardMapper.selectBoardList();
    }

    public List<Board> getBoardListByType(String boardType) {
        return boardMapper.selectBoardListByType(boardType);
    }

    public int likeBoard(Long userId, Long boardId) {
        int liked = boardMapper.isBoardLiked(userId, boardId);

        if (liked > 0) {
            // 이미 좋아요 했으면 취소 (delete)
            boardMapper.deleteBoardLike(userId, boardId);
        } else {
            // 안 했으면 좋아요 추가
            boardMapper.insertBoardLike(userId, boardId);
        }

        return boardMapper.countBoardLikes(boardId); // 최종 좋아요 수 반환
    }



//    public void saveBoard(Long userId, Long boardId) {
//        if (!boardMapper.isBoardSaved(userId, boardId)) {
//            boardMapper.insertBoardSave(userId, boardId);
//        }
//    }
public void toggleBoardSave(Long userId, Long boardId) {
    if (isBoardSaved(userId, boardId)) {
        boardMapper.deleteBoardSave(userId, boardId);
    } else {
        boardMapper.insertBoardSave(userId, boardId);
    }

}

    // 저장 여부 확인 메서드
    public boolean isBoardSaved(Long userId, Long boardId) {
        return boardMapper.isBoardSaved(userId, boardId) > 0;
    }




    public boolean isBoardLiked(Long userId, Long boardId) {
        return boardMapper.isBoardLiked(userId, boardId) > 0;
    }

    public Board getBoardDetail(Long boardId) {
        Board board = boardMapper.selectBoardById(boardId);
        int likeCount = boardMapper.countLikes(boardId);
        board.setLikes(likeCount); // Board 클래스에 setLikes(int) 있어야 함
        return board;
    }


    public List<Board> getPopularBoards() {
        return boardMapper.selectPopularBoards();
    }

    public List<Board> getBoardsByUserId(Long userId) {
        return boardMapper.selectBoardsByUserId(userId);
    }


    public List<Board> getMySavedBoards(Long userId) {
        return boardMapper.selectMySavedBoards(userId);
    }

    public List<Board> getMyLikedBoards(Long userId) {
        return boardMapper.selectMyLikedBoards(userId);
    }


}
