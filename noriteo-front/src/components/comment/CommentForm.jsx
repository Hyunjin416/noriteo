// src/components/comment/CommentForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentForm({
  boardId,
  currentUser = null, // 로그인 여부 판단용
  onSuccess,
  onCancel,
  editTarget = null,
  parentId = null,
  onSubmitSuccess,
}) {
  const [content, setContent] = useState("");

  // 수정 모드일 경우 기존 내용 불러오기
  useEffect(() => {
    if (editTarget) setContent(editTarget.boardCommentContent);
  }, [editTarget]);

  // 댓글 등록 또는 수정
  const handleSubmit = async () => {
    if (!content.trim()) return alert("내용을 입력하세요.");

    try {
      // 댓글 수정
      if (editTarget) {
        await axios.put(
          `/api/comments/${editTarget.boardCommentId}`,
          { newContent: content },
          { withCredentials: true }
        );

      // 대댓글 작성
      } else if (parentId) {
        await axios.post("/api/comments", {
          boardId,
          boardCommentContent: content,
          parentId
        });

      // 일반 댓글 작성
      } else {
        await axios.post("/api/comments", {
          boardId,
          boardCommentContent: content
        });
      }

      setContent("");
      onSuccess?.();
      onCancel?.();
      onSubmitSuccess?.(); // 댓글 작성했다고 userinfo에 신호
    } catch (err) {
      console.error("댓글 저장 실패", err);
      alert("댓글 저장 실패");
    }
  };

  // 로그인하지 않았으면 입력 폼을 보여주지 않음
  if (!currentUser) return null;

  return (
    <div className="comment-form">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="댓글을 입력하세요"
      />
      <div className="comment-buttons">
        <button onClick={handleSubmit}>{editTarget ? "수정" : "등록"}</button>
        {editTarget && <button onClick={onCancel}>취소</button>}
      </div>
    </div>
  );
}
