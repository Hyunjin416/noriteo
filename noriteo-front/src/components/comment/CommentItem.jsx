// src/components/comment/CommentItem.jsx
import React, { useState } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";

export default function CommentItem({ comment, currentUser, onRefresh, replies }) {
  const [isEditing,  setIsEditing]  = useState(false);
  const [isReplying, setIsReplying] = useState(false);

  const isAuthor = currentUser?.userId === comment.userId;
  const isAdmin  = currentUser?.role   === "admin";

  /* ---------------- 삭제 ---------------- */
  const handleDelete = async () => {
    if (!window.confirm("댓글을 삭제하시겠습니까?")) return;

    try {
      await axios.delete(`/api/comments/${comment.boardCommentId}`);
      onRefresh();
    } catch (e) {
      console.error("삭제 실패", e);
      alert("삭제 실패");
    }
  };

  /* ---------------- 렌더 ---------------- */
  return (
    <li className="comment-item" style={{ marginLeft: comment.depth * 16 }}>
      {isEditing ? (
        <CommentForm
          boardId={comment.boardId}
          editTarget={comment}
          currentUser={currentUser}
          onSuccess={onRefresh}
          onCancel={() => setIsEditing(false)}
        />
      ) : (
        <>
          {/* 상단 */}
          <div className="comment-top">
            <span className="comment-writer">{comment.userId}</span>
            <div  className="comment-content">{comment.boardCommentContent}</div>
            <span className="comment-time">
              {new Date(comment.boardCommentRegDate).toLocaleString()}
            </span>
          </div>

          {/* 버튼 */}
          <div className="comment-actions">
            {isAuthor && <button onClick={() => setIsEditing(true)}>수정</button>}
            {(isAuthor || isAdmin) && <button onClick={handleDelete}>삭제</button>}
            {currentUser && (
              <button onClick={() => setIsReplying(!isReplying)}>답글</button>
            )}
          </div>

          {/* 대댓글 폼 */}
          {isReplying && (
            <CommentForm
              boardId={comment.boardId}
              parentId={comment.boardCommentId}
              currentUser={currentUser}
              onSuccess={onRefresh}
              onCancel={() => setIsReplying(false)}
            />
          )}

          {/* 대댓글 리스트 */}
          {replies?.length > 0 && <ul className="comment-replies">{replies}</ul>}
        </>
      )}
    </li>
  );
}