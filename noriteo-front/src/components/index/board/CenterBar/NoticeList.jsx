import React, { useEffect, useState } from "react";
import "@/components_css/index/board/centerBar/NoticeList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NoticeList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board") // ✅ 백엔드 api
      .then((response) => {
        const allPosts = response.data;
        const NoticeListPosts = allPosts
          .filter((post) => post.board_type === "공지사항") // ✅ board_type으로 필터링
          .slice(0, 6);
        setPosts(NoticeListPosts);
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
          onClick={() => navigate("/PostBoard?board_type=공지사항")} // ✅ 통일된 파라미터
        >
          전체보기
        </button>
      </div>

      <div className="NoticeListGrid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="NoticeListCard"
              key={post.board_id} // ✅ 고유 ID 사용
              onClick={() => navigate(`/post/${post.board_id}`)}
            >
              <img
                src={post.board_pic_url || "https://via.placeholder.com/150"} // ✅ 실제 DB 컬럼명 사용 또는 기본 이미지
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
