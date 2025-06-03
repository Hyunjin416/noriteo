package com.ptu.noriteo.service;

import com.ptu.noriteo.config.FileUploadService;
import com.ptu.noriteo.mapper.BoardMapper;
import com.ptu.noriteo.mapper.BoardPicMapper;
import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.BoardPic;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
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

    /**
     * 작성자 본인만 삭제 가능하게 처리
     */
    @Transactional
    public void deleteBoard(Long boardId, Long userId) {
        // 게시글 상세 가져오기
        Board board = boardMapper.selectBoardById(boardId);
        if (board == null) {
            throw new IllegalArgumentException("삭제할 게시글을 찾을 수 없습니다. id=" + boardId);
        }
        // 작성자 검증
        if (!board.getUserId().equals(userId)) {
            throw new AccessDeniedException("삭제 권한이 없습니다.");
        }
        // 삭제
        boardMapper.deleteBoard(boardId);
    }

    // 기존 deleteBoard(Long boardId) 메서드는 필요없다면 제거하세요.

    @Transactional
    public Long createBoard(Board board, List<MultipartFile> pics) {
        boardMapper.insertBoard(board);
        Long boardId = board.getBoardId();

        if (pics != null) {
            int order = 1;
            for (MultipartFile f : pics) {
                if (!f.isEmpty()) {
                    // boardType 기반 하위 폴더 지정
                    String folder = board.getBoardType();
                    String url = fileUploadService.upload("board", f, folder);
                    BoardPic pic = new BoardPic(boardId, url, (long) order++);
                    boardPicMapper.insertPic(pic);
                }
            }
        }
        return boardId;
    }

    @Transactional
    public Long updateBoardWithPics(Board board, List<MultipartFile> pics) {
        boardMapper.updateBoard(board);
        Long boardId = board.getBoardId();
        boardPicMapper.deleteByBoardId(boardId);

        if (pics != null && !pics.isEmpty()) {
            int order = 1;
            for (MultipartFile file : pics) {
                if (!file.isEmpty()) {
                    String folder = board.getBoardType();
                    String url = fileUploadService.upload("board", file, folder);
                    BoardPic pic = new BoardPic(boardId, url, (long) order++);
                    boardPicMapper.insertPic(pic);
                }
            }
        }
        return boardId;
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
            boardMapper.deleteBoardLike(userId, boardId);
        } else {
            boardMapper.insertBoardLike(userId, boardId);
        }
        return boardMapper.countBoardLikes(boardId);
    }

    public void toggleBoardSave(Long userId, Long boardId) {
        if (isBoardSaved(userId, boardId)) {
            boardMapper.deleteBoardSave(userId, boardId);
        } else {
            boardMapper.insertBoardSave(userId, boardId);
        }
    }

    public boolean isBoardSaved(Long userId, Long boardId) {
        return boardMapper.isBoardSaved(userId, boardId) > 0;
    }

    public boolean isBoardLiked(Long userId, Long boardId) {
        return boardMapper.isBoardLiked(userId, boardId) > 0;
    }

    /*
    public Board getBoardDetail(Long boardId) {
        Board board = boardMapper.selectBoardById(boardId);
        int likeCount = boardMapper.countLikes(boardId);
        board.setLikes(likeCount);
        return board;
    }
    */

    @Transactional
    public Board getBoardDetail(Long boardId) {
        // 1) 조회수 증가
        boardMapper.incrementViews(boardId);

        // 2) 게시글 정보 + 좋아요 개수 조회
        // Board board = boardMapper.selectBoardById(boardId);
        Board board = boardMapper.selectBoardDetail(boardId);
        int likeCount = boardMapper.countLikes(boardId);
        board.setLikes(likeCount);
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
