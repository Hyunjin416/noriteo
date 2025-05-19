// src/components/comment/CommentSection.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import "@/components_css/comment/CommentSection.css";

/* --- axios 전역 설정: 쿠키 항상 포함 & 기본 URL --- */
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8080";

export default function CommentSection({ boardId }) {
  const [comments,    setComments]    = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  /* ---------------- 댓글 목록 ---------------- */
  const fetchComments = async () => {
    try {
      const { data } = await axios.get(`/api/comments/${boardId}`);
  
      const fixed = data.map(c => ({
        boardCommentId     : c.boardCommentId      ?? c.board_comment_id,
        boardId            : c.boardId            ?? c.board_id,
        userId             : c.userId             ?? c.user_id,
        boardCommentContent: c.boardCommentContent?? c.board_comment_content,
        boardCommentRegDate: c.boardCommentRegDate?? c.board_comment_regdate,
        parentId           : c.parentId           ?? c.parent_id ?? null,
        ref                : c.ref,
        step               : c.step,
        depth              : c.depth
      }))
      /* boardCommentId 없으면 해당 댓글은 버림 */
      .filter(c => c.boardCommentId != null);
  
      setComments(fixed);
    } catch (err) {
      console.error("댓글 조회 실패", err);
      setComments([]);
    }
  };

/* ---------------- 로그인 사용자 ---------------- */
const fetchCurrentUser = async () => {
  try {
    const { data } = await axios.get("/api/member/me");   // 쿠키 포함
    // data가 null 이거나 객체가 아닐 때 대비
    if (!data || typeof data !== "object") throw new Error("empty");

    const roleId  = data.roleId ?? data.role_id ?? 2;
    const userId  = data.userId  ?? data.user_id;

    // 필수값 없으면 비로그인 처리
    if (!userId) throw new Error("no userId");

    setCurrentUser({
      userId,
      role : roleId === 1 ? "admin" : "user"
    });
  } catch (err) {
    console.warn("로그인 사용자 없음 → guest 모드", err.message || err);
    setCurrentUser(null);
  }
};

  /* 최초 & boardId 변경 시 호출 */
  useEffect(() => {
    fetchCurrentUser();
    fetchComments();
  }, [boardId]);

  return (
    <div className="comment-section">
      <h3>댓글</h3>

      {currentUser ? (
        <CommentForm
          boardId={boardId}
          currentUser={currentUser}
          onSuccess={fetchComments}
        />
      ) : (
        <p className="comment-login-warning">댓글 작성은 로그인 후 가능합니다.</p>
      )}

      <CommentList
        comments={comments}
        currentUser={currentUser}
        onRefresh={fetchComments}
      />
    </div>
  );
}