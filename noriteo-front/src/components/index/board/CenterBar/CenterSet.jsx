// src/components/board/CenterSet.jsx
import React from "react";
import ImageSlider from "./ImageSlider";
import RecentList from "./RecentList";
import NoticeList from "./NoticeList";
import "@/components_css/index/board/centerBar/CenterSet.css";

export default function CenterSet() {
  return (
    <div className="boardMainCenter">
      <ImageSlider />
      <div className="boardMainRow">
        <div className="boardMainRealTime">
          <RecentList />
        </div>
        <div className="boardMainNotice">
          <NoticeList />
        </div>
      </div>
    </div>
  );
}
