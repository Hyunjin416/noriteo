package com.ptu.noriteo.controller;

import com.ptu.noriteo.model.MetricDto;
import com.ptu.noriteo.mapper.UsersMapper;
import com.ptu.noriteo.mapper.BoardMapper;
import com.ptu.noriteo.mapper.BoardCommentMapper;
import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.model.Board;
import com.ptu.noriteo.model.BoardComment;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminController {
    private final UsersMapper usersMapper;
    private final BoardMapper boardMapper;
    private final BoardCommentMapper commentMapper;

    /** 대시보드 통계 */
    @GetMapping("/metrics")
    public MetricDto getMetrics() {
        return new MetricDto(
                usersMapper.countUsers(),
                boardMapper.countBoards(),
                commentMapper.countComments()
        );
    }

    /** 회원 목록 조회 */
    @GetMapping("/users")
    public List<Users> listUsers() {
        return usersMapper.selectAll();
    }

    /** 회원 삭제 */
    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable("id") Long id) {
        usersMapper.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /** 게시글 목록 조회 */
    @GetMapping("/boards")
    public List<Board> listBoards() {
        return boardMapper.selectAll();
    }

    /** 게시글 삭제 */
    @DeleteMapping("/boards/{id}")
    public ResponseEntity<Void> deleteBoard(@PathVariable("id") Long id) {
        boardMapper.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    /** 댓글 목록 조회 */
    @GetMapping("/comments")
    public List<BoardComment> listComments() {
        return commentMapper.selectAll();
    }

    /** 댓글 삭제 */
    @DeleteMapping("/comments/{id}")
    public ResponseEntity<Void> deleteComment(@PathVariable("id") Long id) {
        commentMapper.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}

