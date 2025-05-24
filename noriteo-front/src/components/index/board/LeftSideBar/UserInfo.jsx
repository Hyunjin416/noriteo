// src/components/board/UserInfo.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/components_css/index/board/LeftSideBar/UserInfo.css";
import axios from "@/auth/AxiosConfig";

export default function UserInfo({ postTrigger, commentTrigger }) {
  const [userInfo, setUserInfo] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

// ✅ 유저 정보는 처음에 한 번 가져옴 + 초기 글/댓글 수까지
useEffect(() => {
  axios.get("/api/member/me", { withCredentials: true })
    .then((res) => {
      const data = res.data;
      console.log("✅ userInfo:", data);
      setUserInfo(data);
      fetchInitialCounts(data.userId); // ✅ 처음 로딩 시 글/댓글 수도 가져옴
    })
    .catch(() => setUserInfo(null));
}, []);

const fetchInitialCounts = async (userId) => {
  try {
    const [postRes, commentRes] = await Promise.all([
      axios.get("http://localhost:8080/api/board/my", { withCredentials: true }),
      axios.get("http://localhost:8080/api/comments/my", { withCredentials: true }),
    ]);
    const posts = postRes.data.filter((p) => p.userId === userId);
    const comments = commentRes.data.filter((c) => c.userId === userId);
    setPostCount(posts.length);
    setCommentCount(comments.length);
  } catch (err) {
    console.error("초기 글/댓글 수 불러오기 실패:", err);
  }
};

  // ✅ 게시글 수만 따로 갱신
  useEffect(() => {
    if (!userInfo) return;
    axios
      .get("http://localhost:8080/api/board/my", { withCredentials: true })
      .then((res) => {
        const posts = res.data.filter((p) => p.userId === userInfo.userId);
        setPostCount(posts.length);
      })
      .catch((err) => console.error("게시글 수 로딩 실패:", err));
  }, [postTrigger]);

  // ✅ 댓글 수만 따로 갱신
  useEffect(() => {
    if (!userInfo) return;
    axios
      .get("http://localhost:8080/api/comments/my", { withCredentials: true })
      .then((res) => {
        const comments = res.data.filter((c) => c.userId === userInfo.userId);
        setCommentCount(comments.length);
      })
      .catch((err) => console.error("댓글 수 로딩 실패:", err));
  }, [commentTrigger]);

  if (!userInfo) {
    return (
      <div className="userInfoContainer">
        <h4 className="userInfoTitle">사용자 정보</h4>
        <p className="userInfoRow">로그인이 필요합니다.</p>
        <button className="userInfoButton" onClick={() => navigate("/member")}>
          로그인하러 가기
        </button>
      </div>
    );
  }

  const profileImageUrl = userInfo.sysUser?.startsWith("/uploads/")
    ? userInfo.sysUser
    : "/uploads/" + userInfo.sysUser;
  const userName = userInfo.userName || userInfo.usersName;
  const joinDate = new Date(userInfo.usersRegdate).toLocaleDateString();

  return (
    <div className="userInfoContainer">
      <h4 className="userInfoTitle">사용자 정보</h4>
      <div className="userInfoTop">
        <img src={profileImageUrl} alt="프로필 이미지" className="userInfoProfile" />
        <div className="userInfoDetails">
          <p className="userInfoRow"><strong>{userName}</strong></p>
          <p className="userInfoRow"><strong>{joinDate}</strong></p>
        </div>
      </div>
      <div className="userInfoStats">
        <p className="userInfoRow">작성 글: {postCount}개</p>
        <p className="userInfoRow">작성 댓글: {commentCount}개</p>
      </div>
      <button className="userInfoButton" onClick={() => navigate("/member/mypage")}>
        마이페이지
      </button>
    </div>
  );
}
