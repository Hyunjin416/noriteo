import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../components_css/PostBoard/PostList.css";
import { useNavigate } from "react-router-dom";

const PostList = ({ filterBoardId, sortType }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get("http://localhost:8080/api/board")
      .then((response) => {
        let fetchedPosts = response.data;

        // board_id 필터링
        if (filterBoardId) {
          fetchedPosts = fetchedPosts.filter(
            (post) => post.board_id === filterBoardId
          );
        }

        // 정렬: 조회수순
        if (sortType === "views") {
          fetchedPosts = fetchedPosts.sort(
            (a, b) => b.board_views - a.board_views
          );
        }

        setPosts(fetchedPosts);
        setLoading(false);
      })
      .catch((err) => {
        console.error("게시글 불러오기 실패:", err);
        setError("게시글을 불러오는 데 실패했습니다.");
        setLoading(false);
      });
  }, [filterBoardId, sortType]);

  // 게시판 ID → 말머리 텍스트
  const getCategoryLabel = (boardId) => {
    switch (boardId) {
      case 1:
        return "[공지사항]";
      case 2:
        return "[자유]";
      case 3:
        return "[취미]";
      case 4:
        return "[놀거리]";
      case 5:
        return "[맛집]";
      case 6:
        return "[거래]";
      default:
        return "[기타]";
    }
  };

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="board-table-container">
      <table className="board-table">
        <thead>
          <tr>
            <th>말머리</th>
            <th>제목</th>
            <th>유저명</th>
            <th>작성시간</th>
            <th>조회수</th>
          </tr>
        </thead>
        <tbody>
          {posts.length > 0 ? (
            posts.map((post) => (
              <tr
                key={post.board_id}
                onClick={() => navigate(`/post/${post.board_id}`)}
              >
                <td>{getCategoryLabel(post.board_id)}</td>
                <td className="truncate-title" title={post.board_title}>
                  {post.board_title.length > 40
                    ? post.board_title.slice(0, 40) + "..."
                    : post.board_title}
                </td>
                <td>{post.user_id}</td>
                <td>
                  {post.board_regdate
                    ? new Date(post.board_regdate).toLocaleDateString()
                    : "날짜 없음"}
                </td>
                <td>{post.board_views ?? 0}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">게시글이 없습니다.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
