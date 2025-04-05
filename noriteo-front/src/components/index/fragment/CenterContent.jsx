// src/components/board/CenterContent.jsx
import React from "react";
import CardSlider from "../board/CardSlider";
import RealTimeNew from "../board/RealTimeNew"
import Notice from "../board/Notice";
import "../../../components_css/index/fragment/CenterContent.css";

export default function CenterContent() {
    return (
        <div className="boardMainCenter">
            <CardSlider />
            <div className="boardMainRow">
                <div className="boardMainRealTime">
                    <RealTimeNew />
                </div>
                <div className="boardMainNotice">
                    <Notice />
                </div>
            </div>
        </div>
    );
}
