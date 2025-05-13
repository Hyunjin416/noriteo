/*import React from "react";
import "@/components_css/index/HomePage.css";
import NevigationMenu from "../index/board/NevigationBar/NevigationMenu.jsx";
import LeftSideSet from "../index/board/LeftSideBar/LeftSideSet.jsx";
import RightSideSet from "../index/board/RightSideBar/RightSideSet.jsx";
import BoardList from "./BoardList";
import { useLocation } from "react-router-dom";

export default function BoardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boardType = queryParams.get("board_type"); // board_type 직접 사용
  const sort = queryParams.get("sort");

  return (
    <div className="boardMainContainer">
      <NevigationMenu />
      <div className="boardMainBody">
        <LeftSideSet />
        <div className="post-board-content">
          <BoardList boardType={boardType} sortType={sort} />
        </div>
        <RightSideSet />
      </div>
    </div>
  );
}
*/

import React, { useState } from "react";
import "@/components_css/index/HomePage.css";
import NevigationMenu from "../index/board/NevigationBar/NevigationMenu.jsx";
import LeftSideSet from "../index/board/LeftSideBar/LeftSideSet.jsx";
import RightSideSet from "../index/board/RightSideBar/RightSideSet.jsx";
import BoardList from "./BoardList";
import { useLocation, useNavigate } from "react-router-dom";

export default function BoardPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const boardType = queryParams.get("board_type");
  const sort = queryParams.get("sort");

  const [sortType, setSortType] = useState(sort || "latest"); // 기본값은 최신순

  // 정렬 버튼 클릭 함수
  const handleSortChange = (newSortType) => {
    setSortType(newSortType);

    const params = new URLSearchParams();
    if (boardType) params.set("board_type", boardType); // board_type 유지
    params.set("sort", newSortType); // 새 sort 값 설정

    navigate(`/boardPage?${params.toString()}`);
  };

  return (
    <div className="boardMainContainer">
      <NevigationMenu />
      <div className="boardMainBody">
        <LeftSideSet />
        <div className="post-board-content">

          {/* 정렬 버튼 */}
          <div className="sort-buttons">
            <button
              className={sortType === "views" ? "active" : ""}
              onClick={() => handleSortChange("views")}
            >
              조회순
            </button>
            <button
              className={sortType === "latest" ? "active" : ""}
              onClick={() => handleSortChange("latest")}
            >
              최신순
            </button>
            <button
              className={sortType === "recommend" ? "active" : ""}
              onClick={() => handleSortChange("recommend")}
            >
              추천순
            </button>
          </div>

          {/* ✅ 그대로 유지 */}
          <BoardList boardType={boardType} sortType={sortType} />

        </div>
        <RightSideSet />
      </div>
    </div>
  );
}
