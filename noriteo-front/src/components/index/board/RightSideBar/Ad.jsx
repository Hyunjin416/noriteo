// src/components/board/Ad.jsx
import React from "react";
import "@/components_css/index/board/RightSideBar/Ad.css";

// 단순 광고 자리 표시용 컴포넌트
export default function Ad({ text }) {
  return (
    <div className="adContainer">
      <p className="adText">{text}</p>
    </div>
  );
}
