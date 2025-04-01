// src/components/board/RightSidebar.jsx
import React from "react";
import PopularPosts from "../PopularPosts";
import Ad from "../Ad";
import "./RightSidebar.css";

export default function RightSidebar() {
    return (
        <div className="boardMainRight">
            <PopularPosts />
            <Ad text="광고1" />
            <Ad text="광고2" />
        </div>
    );
}
