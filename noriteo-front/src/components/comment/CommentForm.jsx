// components/comment/CommentForm.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CommentForm({
  boardId,
  onSuccess,
  editTarget = null,
  onCancel,
  currentUser,
  parentId = null,
}) {
  const [content, setContent] = useState("");

  useEffect(() => {
    // if (editTarget) setContent(editTarget.content);
    if (editTarget) setContent(editTarget.boardCommentContent);
  }, [editTarget]);

  const handleSubmit = async () => {
    if (!content.trim()) return alert("댓글 내용을 입력하세요.");

    try {
      if (editTarget) {
        await axios.put(
          `http://localhost:8080/api/comments/${editTarget.commentId}`,
          // { content }
          { newContent: content }
        ); /* 예시 api */
        alert("댓글이 수정되었습니다.");
        if (onCancel) onCancel();
      } else {
        await axios.post("http://localhost:8080/api/comments", {
          // /* 예시 api */ boardId,
          boardId: boardId,
          userId: currentUser?.userId,
          // content,
          boardCommentContent: content,
          // parentId,
          parentId: parentId || null,
        });

        console.log("🧪 POST DATA", {
          boardId,
          userId: currentUser?.userId,
          boardCommentContent: content,
          parentId,
        });

        alert("댓글이 등록되었습니다.");
      }
      setContent("");
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("댓글 저장 실패:", err);
      alert("댓글 저장 실패");
    }
  };

  return (
    <div className="comment-form">
      <div className="comment-form-row">
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
    </div>
  );
}
