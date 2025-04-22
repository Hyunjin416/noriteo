import React, { useEffect, useState } from "react";
import "@/components_css/index/board/centerBar/NoticeList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NoticeList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/list") // 통일된 API
      .then((response) => {
        const allPosts = response.data;
        const noticePosts = allPosts
          .filter((post) => post.boardType === "notice") // '공지사항의 board_type = notice'로 필터링
          .slice(0, 6);
        setPosts(noticePosts);
      })
      .catch((error) => {
        console.error("공지사항 불러오기 실패:", error);
      });
  }, []);

  return (
    <div className="NoticeListContainer">
      <div className="NoticeListHeader">
        <h4 className="NoticeListTitle">공지사항</h4>
        <button
          className="NoticeListMoreBtn"
          onClick={() => navigate("/PostBoard?board_type=notice")}
        >
          전체보기
        </button>
      </div>

      <div className="NoticeListGrid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="NoticeListCard"
              key={post.board_id} // board 고유 ID 사용
              onClick={() => navigate(`/post/${post.board_id}`)}
            >
              <img
                src={post.board_pic_url || "https://via.placeholder.com/150"} // BOARD_PIC에서 board_pic_id, board_pic_url 가져오는 api필요
                alt={post.board_title}
              />
              <p>{post.board_title}</p>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", width: "100%" }}>
            공지사항이 없습니다.
          </p>
        )}
      </div>
    </div>
  );
}
