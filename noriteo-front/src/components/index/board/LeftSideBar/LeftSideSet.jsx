// src/components/board/LeftSideSet.jsx
import React from "react";
import UserInfo from "./UserInfo";
import BoardMenu from "./BoardMenu";
import "@/components_css/index/board/LeftSideBar/LeftSideSet.css";

export default function LeftSideSet() {
  return (
    <div className="boardMainLeft">
      <UserInfo />
      <BoardMenu />
    </div>
  );
}
