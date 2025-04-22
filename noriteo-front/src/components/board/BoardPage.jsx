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

import React from "react";
import "@/components_css/index/HomePage.css";
import NevigationMenu from "../index/board/NevigationBar/NevigationMenu.jsx";
import LeftSideSet from "../index/board/LeftSideBar/LeftSideSet.jsx";
import RightSideSet from "../index/board/RightSideBar/RightSideSet.jsx";
import BoardList from "./BoardList";
import { useLocation } from "react-router-dom";

export default function BoardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boardType = queryParams.get("board_type");
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