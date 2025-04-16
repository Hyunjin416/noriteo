// src/components/board/RightSideSet.jsx
import React from "react";
import PopularList from "./PopularList";
import Ad from "./Ad";
import "@/components_css/index/board/RightSideBar/RightSideSet.css";

export default function RightSideSet() {
  return (
    <div className="boardMainRight">
      <PopularList />
      <Ad text="광고1" />
      <Ad text="광고2" />
    </div>
  );
}
