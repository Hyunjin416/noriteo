import React, { useEffect, useState } from "react";
import "../../../components_css/index/board/Notice.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Notice() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board")
      .then((response) => {
        const allPosts = response.data;
        const noticePosts = allPosts
          .filter((post) => post.board_id === 1)
          .slice(0, 6); // 최신 6개만
        setPosts(noticePosts);
      })
      .catch((error) => {
        console.error("공지사항 불러오기 실패:", error);
      });
  }, []);

  return (
    <div className="NoticeContainer">
      <div className="noticeHeader">
        <h4 className="noticeTitle">공지사항</h4>
        <button
          className="noticeMoreBtn"
          onClick={() => navigate("/PostBoard?category=공지사항")}
        >
          전체보기
        </button>
      </div>

      <div className="noticeGrid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="noticeCard"
              key={post.id}
              onClick={() => navigate(`/post/${post.board_id}`)}
            >
              <img
                src={post.image_url || "https://via.placeholder.com/150"}
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
