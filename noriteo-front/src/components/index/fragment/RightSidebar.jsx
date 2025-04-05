// src/components/board/RightSidebar.jsx
import React from "react";
import PopularPosts from "../board/PopularPosts";
import Ad from "../board/Ad";
import "../../../components_css/index/fragment/RightSidebar.css";

export default function RightSidebar() {
    return (
        <div className="boardMainRight">
            <PopularPosts />
            <Ad text="광고1" />
            <Ad text="광고2" />
        </div>
    );
}
