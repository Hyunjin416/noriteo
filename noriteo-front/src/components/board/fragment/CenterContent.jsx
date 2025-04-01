// src/components/board/CenterContent.jsx
import React from "react";
import CardSlider from "../CardSlider";
import RealTimePopular from "../RealTimePopular";
import CrawlingContent from "../CrawlingContent";
import "./CenterContent.css";

export default function CenterContent() {
    return (
        <div className="boardMainCenter">
            <CardSlider />
            <div className="boardMainRow">
                <div className="boardMainRealTime">
                    <RealTimePopular />
                </div>
                <div className="boardMainCrawling">
                    <CrawlingContent />
                </div>
            </div>
        </div>
    );
}
