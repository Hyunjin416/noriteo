// src/components/board/LeftSideSet.jsx
import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import BoardMenu from "./BoardMenu";
import CommentForm from "../../../comment/CommentForm";
import "@/components_css/index/board/LeftSideBar/LeftSideSet.css";

export default function LeftSideSet() {
  const [postTrigger, setPostTrigger] = useState(0);
  const [commentTrigger, setCommentTrigger] = useState(0);

  // ✅ 댓글 작성 성공 시
  const handleCommentRefresh = () => {
    setCommentTrigger((prev) => prev + 1);
  };

  // ✅ 글 작성 성공 신호(localStorage)
  useEffect(() => {
    const flag = localStorage.getItem("postSuccess");
    if (flag === "true") {
      setPostTrigger((prev) => prev + 1); // 글 수만 갱신
      localStorage.removeItem("postSuccess");
    }
  }, []);

  return (
    <div className="boardMainLeft">
      <UserInfo postTrigger={postTrigger} commentTrigger={commentTrigger} />
      <CommentForm onSubmitSuccess={handleCommentRefresh} />
      <BoardMenu />
    </div>
  );
}
