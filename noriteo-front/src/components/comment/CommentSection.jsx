// components/comment/CommentSection.jsx
import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import axios from "axios";
import "@/components_css/comment/CommentSection.css";

export default function CommentSection({ boardId }) {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  /* 목업 댓글 나오게 하기 위해서 주석처리, 67~101 라인 지우고 해당 주석 코드 사용하면 됩니다.
    // 해당 댓글이 존재하는 게시글 아이디 가져오기
    const fetchComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${boardId}`);
            setComments(res.data);
        } catch (err) {
            console.error("댓글 조회 실패:", err);
            setComments([]);
        }
    };
    
    // 로그인 유저 정보 가져오기
    const fetchCurrentUser = async () => {
        try {
            const res = await axios.get("/api/member/me");
            // 서버가 {userId, userEmail, roles} 리턴한다고 가정
            const userInfo = res.data;
            setCurrentUser({
                userId: userInfo.userId,
                role: userInfo.roleId === 1 ? "admin" : "user"
            });
        } catch (err) {
            if (err.response) {
                console.log("서버 응답 오류:", err.response.status, err.response.data);
            } else if (err.request) {
                console.log("서버 응답 없음:", err.request);
            } else {
                console.log("기타 오류:", err.message);
            }
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
        fetchComments();
    }, [boardId]);

    return (
        <div className="comment-section">
            <h3>댓글</h3>

            {currentUser ? (
                <CommentForm boardId={boardId} onSuccess={fetchComments} currentUser={currentUser} />
            ) : (
                <p className="comment-login-warning">댓글 작성은 로그인 후 가능합니다.</p>
            )}

            <CommentList comments={comments} onRefresh={fetchComments} currentUser={currentUser} />
        </div>
    );
}
*/

  const fetchComments = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/comments/${boardId}`
      ); //예시 api
      setComments(res.data);
    } catch (err) {
      console.error("댓글 조회 실패:", err);
      // 데이터 가져오지 못 하는 error 상태일 때 목업 데이터 출력
      setComments([
        {
          commentId: 1,
          userId: "user123",
          content: "첫 번째 댓글입니다.",
          regDate: "2025-04-30",
          parentId: null,
        },
        {
          commentId: 2,
          userId: "user456",
          content: "두 번째 댓글입니다.",
          regDate: "2025-04-30",
          parentId: null,
        },
        {
          commentId: 3,
          userId: "user123",
          content: "답글입니다.",
          regDate: "2025-04-30",
          parentId: 1,
        },
      ]);
    }
  };

  useEffect(() => {
    const uid = localStorage.getItem("userId");
    const role = localStorage.getItem("role");
    if (uid) setCurrentUser({ userId: uid, role });
    fetchComments();
  }, [boardId]);

  return (
    <div className="comment-section">
      <h3>댓글</h3>
      {currentUser ? (
        <CommentForm
          boardId={boardId}
          onSuccess={fetchComments}
          currentUser={currentUser}
        />
      ) : (
        <p className="comment-login-warning">
          댓글 작성은 로그인 후 가능합니다.
        </p>
      )}
      <CommentList
        comments={comments}
        onRefresh={fetchComments}
        currentUser={currentUser}
      />
    </div>
  );
}
