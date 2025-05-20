// src/components/board/LeftSideSet.jsx
import React, { useState } from "react";
import UserInfo from "./UserInfo";
import BoardMenu from "./BoardMenu";
import CommentForm from "../../../comment/CommentForm";
import "@/components_css/index/board/LeftSideBar/LeftSideSet.css";

export default function LeftSideSet() {
   const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="boardMainLeft">
      <UserInfo refreshTrigger={refreshTrigger} />
      <CommentForm onSubmitSuccess={handleRefresh} />
      <BoardMenu />
    </div>
  );
}
