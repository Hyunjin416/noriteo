// src/components/board/LeftSidebar.jsx
import React from "react";
import UserInfo from "../UserInfo";
import BoardMenu from "../BoardMenu";
import "./LeftSidebar.css";

export default function LeftSidebar() {
    return (
        <div className="boardMainLeft">
            <UserInfo />
            <BoardMenu />
        </div>
    );
}
