// src/components/comment/CommentList.jsx
import React from "react";
import CommentItem from "./CommentItem";

export default function CommentList({ comments, currentUser, onRefresh }) {

  /* 재귀적으로 parent → child 목록 렌더 */
  const render = (parentId = null) =>
    comments
      .filter(c => (c.parentId ?? null) === (parentId ?? null))
      .map(c => (
        <CommentItem
          key={c.boardCommentId}                    // 안전한 ID
          comment={c}
          currentUser={currentUser}
          onRefresh={onRefresh}
          replies={render(c.boardCommentId)}        // 더 이상 undefined 아님
        />
      ));

  return <ul className="comment-list">{render()}</ul>;
}