// import "@/components_css/member/myPage/BoardList.css";

// const BoardList = () => {};

// export default BoardList;

// axios.get("http://localhost:8080/api/board/my", {withCredentials: true})

// axios.get("http://localhost:8080/api/comments/my", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my/saved", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my/liked", { withCredentials: true })

// axios.get("http://localhost:8080/api/board/my", {withCredentials: true})

// axios.get("http://localhost:8080/api/board/my/comments", { withCredentials: true })

// axios.get("http://localhost:8080/api/comments/my", { withCredentials: true })

//       .then(res => setMyComments(res.data))
//       .catch(err => console.error("댓글 로딩 실패:", err));

//     // 내가 저장한 글

//     axios.get("http://localhost:8080/api/board/my/saved", { withCredentials: true })

//       .then(res => setSavedBoards(res.data))
//       .catch(err => console.error("저장한 글 로딩 실패:", err));

//     // 내가 좋아요한 글

//     axios.get("http://localhost:8080/api/board/my/liked", { withCredentials: true })

//       .then(res => setLikedBoards(res.data))
//       .catch(err => console.error("좋아요 글 로딩 실패:", err));
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MyPageActivity() {
  const [myComments, setMyComments] = useState([]);
  const [savedBoards, setSavedBoards] = useState([]);
  const [likedBoards, setLikedBoards] = useState([]);

  useEffect(() => {
    // 내가 쓴 댓글
    axios
      .get("http://localhost:8080/api/comments/my", {
        withCredentials: true,
      })
      .then((res) => setMyComments(res.data))
      .catch((err) => console.error("댓글 로딩 실패:", err));

    // 내가 저장한 글
    axios
      .get("http://localhost:8080/api/board/my/saved", {
        withCredentials: true,
      })
      .then((res) => setSavedBoards(res.data))
      .catch((err) => console.error("저장한 글 로딩 실패:", err));

    // 내가 좋아요한 글
    axios
      .get("http://localhost:8080/api/board/my/liked", {
        withCredentials: true,
      })
      .then((res) => setLikedBoards(res.data))
      .catch((err) => console.error("좋아요 글 로딩 실패:", err));
  }, []);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>📝 내가 쓴 댓글</h2>
      <ul>
        {myComments.length > 0 ? (
          myComments.map((comment) => (
            <li key={comment.boardCommentId}>{comment.boardCommentContent}</li>
          ))
        ) : (
          <li>작성한 댓글이 없습니다.</li>
        )}
      </ul>

      <h2>📌 저장한 게시글</h2>
      <ul>
        {savedBoards.length > 0 ? (
          savedBoards.map((post) => (
            <li key={post.boardId}>{post.boardTitle}</li>
          ))
        ) : (
          <li>저장한 게시글이 없습니다.</li>
        )}
      </ul>

      <h2>❤️ 좋아요한 게시글</h2>
      <ul>
        {likedBoards.length > 0 ? (
          likedBoards.map((post) => (
            <li key={post.boardId}>{post.boardTitle}</li>
          ))
        ) : (
          <li>좋아요한 게시글이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
