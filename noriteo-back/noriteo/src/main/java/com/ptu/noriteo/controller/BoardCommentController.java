    package com.ptu.noriteo.controller;

    import com.ptu.noriteo.jwt.JwtAuthentication;
    import com.ptu.noriteo.mapper.BoardCommentMapper;
    import com.ptu.noriteo.model.BoardComment;
    import com.ptu.noriteo.service.BoardCommentService;
    import lombok.RequiredArgsConstructor;
    import org.springframework.http.HttpStatus;
    import org.springframework.http.ResponseEntity;
    import org.springframework.security.core.annotation.AuthenticationPrincipal;
    import org.springframework.stereotype.Controller;
    import org.springframework.transaction.annotation.Transactional;
    import org.springframework.web.bind.annotation.*;

    import java.util.List;

    @RestController
    @Controller
    @RequestMapping("/api/comments")
    @RequiredArgsConstructor
    public class BoardCommentController {

        private final BoardCommentService boardCommentService;
        private final BoardCommentMapper boardCommentMapper;

        // 게시글 ID에 해당하는 댓글 리스트 조회
//        @GetMapping("/{boardId}")
//        public ResponseEntity<List<BoardComment>> listComments(@PathVariable Long boardId) {
//            return ResponseEntity.ok(boardCommentService.getCommentsByBoardId(boardId));
//        }

        // 댓글 작성 (로그인 사용자만)
//        @PostMapping("")
//        public ResponseEntity<?> addComment(@RequestBody BoardComment comment,
//                                            @AuthenticationPrincipal JwtAuthentication auth) {
//            comment.setUserId(auth.getUserId());
//            boolean success = boardCommentService.addComment(comment);
//            return success ? ResponseEntity.ok().build() : ResponseEntity.badRequest().build();
//        }
        @Transactional
        @PostMapping("")
        public ResponseEntity<Boolean> addComment(@RequestBody BoardComment comment) {
            if (comment.getParentId() == null) {
                // 기본 댓글인 경우
                comment.setStep(0);
                comment.setDepth(0);
                comment.setRef(null); // insert 후 자신의 ID로 업데이트
            } else {
                // 대댓글인 경우
                BoardComment parent = boardCommentMapper.selectCommentById(comment.getParentId());
                if (parent == null) return ResponseEntity.badRequest().body(false);

                comment.setRef(parent.getRef()); // 최상위 댓글의 ref 사용
                comment.setStep(parent.getStep() + 1); // step 증가
                comment.setDepth(parent.getDepth() + 1); // depth 증가
            }

            boolean inserted = boardCommentMapper.insertComment(comment) > 0;
            if (!inserted) return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(false);

            // 기본 댓글이면 ref = 자신의 ID로 업데이트
            if (comment.getParentId() == null) {
                comment.setRef(Math.toIntExact(comment.getBoardCommentId()));
                boardCommentMapper.updateCommentRef(comment);
            }

            return ResponseEntity.ok(true);
        }



        // 댓글 수정 (작성자 본인만)
        @PutMapping("/{commentId}")
        public ResponseEntity<?> updateComment(@PathVariable Long commentId,
                                               @RequestBody String newContent,
                                               @AuthenticationPrincipal JwtAuthentication auth) {
            boolean success = boardCommentService.updateComment(commentId, auth.getUserId(), newContent);
            return success ? ResponseEntity.ok().build() : ResponseEntity.status(403).build();
        }

        // 삭제 (작성자 본인만)
        @DeleteMapping("/{commentId}")
        public ResponseEntity<?> deleteComment(@PathVariable Long commentId,
                                               @AuthenticationPrincipal JwtAuthentication auth) {
            boolean success = boardCommentService.deleteComment(commentId, auth.getUserId());
            return success ? ResponseEntity.ok().build() : ResponseEntity.status(403).build();
        }

        @GetMapping("/my")
        public ResponseEntity<List<BoardComment>> getMyComments(@AuthenticationPrincipal JwtAuthentication auth) {
            return ResponseEntity.ok(boardCommentService.getMyComments(auth.getUserId()));
        }

        // 대댓글 작성 (ref/step/depth 포함 필요 시 확장)
        @PostMapping("/{commentId}/reply")
        public ResponseEntity<?> replyToComment(@PathVariable Long commentId,
                                                @RequestBody BoardComment reply,
                                                @AuthenticationPrincipal JwtAuthentication auth) {
            BoardComment parent = boardCommentService.getCommentById(commentId);
            reply.setUserId(auth.getUserId());
            reply.setBoardId(parent.getBoardId());

            boardCommentService.addReplyComment(parent, reply);
            return ResponseEntity.ok().build();
        }

        @PostMapping("/reply/{parentId}")
        public ResponseEntity<?> addReply(@PathVariable Long parentId, @RequestBody BoardComment comment) {
            boolean result = boardCommentService.addReply(parentId, comment);
            return result ? ResponseEntity.ok(true) : ResponseEntity.status(500).body(false);
        }

        @GetMapping("/{boardId}")
        public List<BoardComment> listComments(@PathVariable Long boardId) {
            return boardCommentService.getCommentsByBoardId(boardId);
        }


    }

