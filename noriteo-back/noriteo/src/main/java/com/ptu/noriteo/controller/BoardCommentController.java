package com.ptu.noriteo.controller;

import com.ptu.noriteo.model.BoardComment;
import com.ptu.noriteo.service.BoardCommentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Controller
@RequestMapping("/api/comment")
@RequiredArgsConstructor
public class BoardCommentController {

    private final BoardCommentService commentService;

    @PostMapping("/add")
    public void addComment(@RequestBody BoardComment comment) {
        commentService.addComment(comment);
    }

    @GetMapping("/list/{boardId}")
    public List<BoardComment> listComments(@PathVariable Long boardId) {
        return commentService.getCommentsByBoardId(boardId);
    }

    @DeleteMapping("/delete/{commentId}")
    public void deleteComment(@PathVariable Long commentId) {
        commentService.deleteComment(commentId);
    }

    @PutMapping("/update")
    public void updateComment(@RequestBody BoardComment comment) {
        commentService.updateComment(comment);
    }
}
