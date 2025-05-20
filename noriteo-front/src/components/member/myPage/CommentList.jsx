import "@/components_css/member/myPage/CommentList.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CommentList() {
    const [myComments, setMyComments] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8080/api/comments/my", { withCredentials: true })
        .then((res) => setMyComments(res.data))
        .catch((err) => console.error("댓글 로딩 실패:", err));
    }, []);

    return (
        <div>
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
        </div>
    );
}