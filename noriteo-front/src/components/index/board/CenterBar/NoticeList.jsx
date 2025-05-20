import React, { useEffect, useState } from "react";
import "@/components_css/index/board/centerBar/NoticeList.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function NoticeList() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/board/list")
      .then((response) => {
        console.log("전체 게시글 데이터:", response.data); // 확인용
        const noticePosts = response.data
          .filter((post) => post.boardType === "notice")
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
          onClick={() => navigate(`/boardPage?board_type=notice`)}
        >
          전체보기
        </button>
      </div>

      <div className="NoticeListGrid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div
              className="NoticeListCard"
              key={post.boardId}
              onClick={() => navigate(`/board/detail/${post.boardId}`)}
            >
              {/* 이미지가 있을 경우만 보여줌 */}
              {post.boardPicUrl && (
                <img
                  src={post.boardPicUrl}
                  alt={post.boardTitle}
                  className="NoticeListImage"
                />
              )}

              {/* 제목 */}
              <p className="NoticeListTitleText">
                {post.boardTitle?.length > 40
                  ? post.boardTitle.slice(0, 40) + "..."
                  : post.boardTitle}
              </p>

              {/* 게시글 정보 (작성자, 날짜, 조회수) */}
              <div className="NoticeListInfo">
                <span className="NoticeListUser">작성자: {post.userId}</span>
                <span className="NoticeListDate">
                  {new Date(post.boardRegdate).toLocaleDateString("ko-KR")}
                </span>
                <span className="NoticeListViews">
                  조회수: {post.boardViews}
                </span>
              </div>
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
