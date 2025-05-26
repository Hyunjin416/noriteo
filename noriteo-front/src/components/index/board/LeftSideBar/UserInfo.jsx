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

  // 1) 사용자 정보 + 초기 카운트
  useEffect(() => {
    axios
      .get("/api/member/me", { withCredentials: true })
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
        axios.get("http://localhost:8080/api/board/my", {
          withCredentials: true,
        }),
        axios.get("http://localhost:8080/api/comments/my", {
          withCredentials: true,
        }),
      ]);
      const posts = postRes.data.filter((p) => p.userId === userId);
      const comments = commentRes.data.filter((c) => c.userId === userId);
      setPostCount(posts.length);
      setCommentCount(comments.length);
    } catch (err) {
      console.error("초기 글/댓글 수 불러오기 실패:", err);
    }
  };

  // 2) 게시글/댓글 수별 갱신
  // 게시글 수만 갱신
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

  // 댓글 수만 갱신
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

  // 3) 프로필 사진 가져오기
  useEffect(() => {
    if (userInfo) {
      const testImg = new Image();
      testImg.src = encodeURI(userInfo.sysUser);
      testImg.onload = () => console.log("✅ 이미지 로드 성공 (테스트)");
      testImg.onerror = () =>
        console.error("❌ 이미지 로드 실패 (테스트)", testImg.src);
    }
  }, [userInfo]);

  // 4) 미로그인
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

  // 4) 관리자 여부 체크
  const isAdmin = userInfo.roleId === 1;

  // const rawProfileImageUrl = userInfo.sysUser?.startsWith("/upload/")
  //   ? userInfo.sysUser
  //   : "/uploads/" + userInfo.sysUser;
  // const defaultProfileImage = "/usericon.png"; // 기본 이미지
  // const profileImageUrl = userInfo.sysUser
  //   ? encodeURI(userInfo.sysUser)
  //   : defaultProfileImage;
  const profileImageUrl = userInfo.sysUser
    ? `http://localhost:8080${encodeURI(userInfo.sysUser)}`
    : "/usericon.png";

  const userName = userInfo.userName || userInfo.usersName;
  const joinDate = new Date(userInfo.userRegDate).toLocaleDateString("ko-KR");

  console.log("🧾 sysUser:", userInfo.sysUser);
  console.log("🧾 최종 이미지 경로:", encodeURI(userInfo.sysUser));

  return (
    <div className="userInfoContainer">
      <h4 className="userInfoTitle">사용자 정보</h4>
      <div className="userInfoTop">
        {/* <img
          src={profileImageUrl}
          alt="프로필 이미지"
          className="userInfoProfile"
          onError={(e) => {
            e.target.src = defaultProfileImage;
          }}
        /> */}
        <img
          src={profileImageUrl}
          alt="프로필 이미지"
          className="userInfoProfile"
          onError={(e) => {
            console.error("❌ 이미지 로드 실패:", profileImageUrl);
            e.target.src = "/usericon.png";
          }}
        />

        <div className="userInfoDetails">
          <p className="userInfoRow">
            <strong>{userName}</strong>
          </p>
          <p className="userInfoRow">
            <strong>{joinDate}</strong>
          </p>
        </div>
      </div>
      <div className="userInfoStats">
        <p className="userInfoRow">작성 글: {postCount}개</p>
        <p className="userInfoRow">작성 댓글: {commentCount}개</p>
      </div>
      <button
          className="userInfoButton"
          onClick={() => navigate(isAdmin ? "/admin" : "/member/mypage")}
        >
          {isAdmin ? "관리자 페이지" : "마이페이지"}
        </button>
    </div>
  );
}
