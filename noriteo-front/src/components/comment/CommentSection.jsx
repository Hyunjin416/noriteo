// components/comment/CommentSection.jsx
import React, { useState, useEffect } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";
import axios from "axios";
import "@/components_css/comment/CommentSection.css";

export default function CommentSection({ boardId }) {
    const [comments, setComments] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);

    const fetchComments = async () => {
        try {
            const res = await axios.get(`/api/comments/${boardId}`); /* 예시 api */
            setComments(res.data);
        } 
        catch (err) {
            console.error("댓글 조회 실패:", err);
            /* 데이터 가져오지 못 하는 error 상태일 때 목업 데이터 출력 */
            setComments([
                { commentId: 1, userId: "user123", content: "첫 번째 댓글입니다.", regDate: "2025-04-30", parentId: null },
                { commentId: 2, userId: "user456", content: "두 번째 댓글입니다.", regDate: "2025-04-30", parentId: null },
                { commentId: 3, userId: "user123", content: "답글입니다.", regDate: "2025-04-30", parentId: 1 }
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
                <CommentForm boardId={boardId} onSuccess={fetchComments} currentUser={currentUser} />
            ) : (
                <p className="comment-login-warning">댓글 작성은 로그인 후 가능합니다.</p>
            )}
            <CommentList comments={comments} onRefresh={fetchComments} currentUser={currentUser} />
        </div>
    );
}
