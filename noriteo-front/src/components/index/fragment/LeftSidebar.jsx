// src/components/board/LeftSidebar.jsx
import React from "react";
import UserInfo from "../board/UserInfo";
import BoardMenu from "../board/BoardMenu";
import "../../../components_css/index/fragment/LeftSidebar.css";

export default function LeftSidebar() {
    return (
        <div className="boardMainLeft">
            <UserInfo />
            <BoardMenu />
        </div>
    );
}
