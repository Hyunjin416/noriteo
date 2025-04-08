import React from "react";
import "../../components_css/index/BoardMain.css";
import NavigationBar from "../../components/index/board/NavigationBar";
import LeftSidebar from "../index/fragment/LeftSidebar";
import RightSidebar from "../index/fragment/RightSidebar";
import PostList from "./PostList";
import { useLocation } from "react-router-dom";

export default function PostBoardPage() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const boardType = queryParams.get("board_type"); // ✅ board_type 직접 사용
  const sort = queryParams.get("sort");

  return (
    <div className="boardMainContainer">
      <NavigationBar />
      <div className="boardMainBody">
        <LeftSidebar />
        <div className="post-board-content">
          <PostList boardType={boardType} sortType={sort} />
        </div>
        <RightSidebar />
      </div>
    </div>
  );
}
