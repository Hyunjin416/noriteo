import React, { useEffect, useState } from "react";
import axios from "axios";
import "@/components_css/index/board/RightSideBar/PopularList.css";
import { useNavigate } from "react-router-dom";

export default function PopularList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchPopularList = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8080/api/board"); // 백엔드 API 호출
  //       const sortedByRecommend = response.data
  //         .sort((a, b) => (b.board_recommend || 0) - (a.board_recommend || 0)) // 추천 수 기준 정렬
  //         .slice(0, 10); // 상위 10개만
  //       setPosts(sortedByRecommend);
  //     } catch (err) {
  //       console.error("인기글 불러오기 실패:", err);
  //     }
  //   };

  //   fetchPopularList();
  // }, []);
  useEffect(() => {
    const fetchPopularList = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/board/popular"
        );
        setPosts(response.data);
      } catch (err) {
        console.error("인기글 불러오기 실패:", err);
      }
    };

    fetchPopularList();
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/board/detail/${postId}`); // 개별 글 상세보기 (boarddetail)
  };

  const handleViewAll = () => {
    navigate("/boardPage?sort=recommend"); // 좋아요수 기준 전체보기 이동
  };

  return (
    <div className="popularContainer">
      <div className="popularHeader">
        <h4 className="popularTitle">인기글</h4>
        <button className="popularButtonTopRight" onClick={handleViewAll}>
          전체보기
        </button>
      </div>

      <ul className="popularList">
        {/* {posts.map((post) => (
          <li
            key={post.board_id}
            className="popularItem"
            onClick={() => handlePostClick(post.board_id)}
          > */}

        {/* <span className="popularItemTitle" title={post.board_title}>
              {post.board_title.length > 30
                ? post.board_title.slice(0, 30) + "..."
                : post.board_title}
            </span> */}
        {posts.map((post) => (
          <li
            key={post.boardId || post.board_id}
            className="popularItem"
            onClick={() => handlePostClick(post.boardId || post.board_id)}
          >
            <span
              className="popularItemTitle"
              title={post.boardTitle || post.board_title}
            >
              {(post.boardTitle || post.board_title)?.length > 30
                ? (post.boardTitle || post.board_title).slice(0, 30) + "..."
                : post.boardTitle || post.board_title}
            </span>
            <span className="popularItemLikes">
              좋아요: {post.boardRecommend || post.board_recommend || 0}
            </span>
          </li>
        ))}

        {/* <span className="popularItemLikes">
              추천수: {post.board_recommend || 0}
            </span>
          </li>
        ))} */}
      </ul>
    </div>
  );
}
