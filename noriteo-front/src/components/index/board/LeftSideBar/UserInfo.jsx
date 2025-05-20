// // User 정보를 보여주는 컴포넌트(프로필사진, 이름, 가입일 작성글, 작성 댓글, 작성 거래글)
// // src/components/board/UserInfo.jsx
// import React from "react";
// import "@/components_css/index/board/LeftSideBar/UserInfo.css";

// export default function UserInfo() {
//   // -----------------------------------------
//   // 추후 실제 데이터 연동 시 (예시):
//   //
//   // 1) API 호출:
//   //    const { data } = useFetch("/api/user/{userId}");
//   //    const profileImageUrl = data.profileImageUrl;
//   //    const userName = data.userName;
//   //    const joinDate = data.joinDate;
//   //    const postCount = data.postCount;
//   //    const commentCount = data.commentCount;
//   //    const tradeCount = data.tradeCount;
//   //
//   // 2) Redux / Context:
//   //    const userInfo = useSelector((state) => state.user.info);
//   //    const {
//   //      profileImageUrl,
//   //      userName,
//   //      joinDate,
//   //      postCount,
//   //      commentCount,
//   //      tradeCount
//   //    } = userInfo;
//   // -----------------------------------------

//   // 임시 하드코딩 데이터
//   const profileImageUrl = "/usericon.png"; // 임시 프로필 이미지
//   const userName = "사용자1";
//   const joinDate = "2025-01-01";
//   const postCount = 42;
//   const commentCount = 128;
//   const tradeCount = 5;

//   return (
//     <div className="userInfoContainer">
//       <h4 className="userInfoTitle">사용자 정보</h4>

//       {/* 프로필 이미지 / 유저명 / 가입일 */}
//       <div className="userInfoTop">
//         <img
//           src={profileImageUrl}
//           alt="프로필 이미지"
//           className="userInfoProfile"
//         />
//         <div className="userInfoDetails">
//           <p className="userInfoRow">
//             <strong>{userName}</strong>
//           </p>
//           <p className="userInfoRow">
//             <strong>{joinDate}</strong>
//           </p>
//         </div>
//       </div>

//       {/* 작성 글 / 댓글 / 거래글 */}
//       <div className="userInfoStats">
//         <p className="userInfoRow">작성 글: {postCount}개</p>
//         <p className="userInfoRow">작성 댓글: {commentCount}개</p>
//         {/* <p className="userInfoRow">작성 거래글: {tradeCount}개</p> */}
//       </div>

//       {/* 내 정보 보기 버튼 */}
//       <button
//         className="userInfoButton"
//         onClick={
//           () =>
//             alert("유저 페이지로 이동") /* 추후 navigate로 유저페이지에 연결 */
//         }
//       >
//         내 정보 보기
//       </button>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/components_css/index/board/LeftSideBar/UserInfo.css";
import axios from "@/auth/AxiosConfig";

export default function UserInfo({ refreshTrigger }) {
  const [userInfo, setUserInfo] = useState(null);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const navigate = useNavigate();

  const fetchCounts = async (userId) => {
    try {
      const [postRes, commentRes] = await Promise.all([
        axios.get("http://localhost:8080/api/board/my", { withCredentials: true }),
        axios.get("http://localhost:8080/api/comments/my", { withCredentials: true }),
      ]);

      console.log("📄 댓글 전체:", commentRes.data); // 🔍 댓글 목록 로그

      const posts = postRes.data.filter((p) => p.userId === userId);
      const comments = commentRes.data.filter((c) => c.userId === userId);
      console.log("🧮 필터링된 내 게시글 수:", posts.length);
      console.log("🧮 필터링된 내 댓글 수:", comments.length);
      setPostCount(posts.length);
      setCommentCount(comments.length);
    } catch (err) {
      console.error("카운트 로딩 실패:", err);
    }
    
  };

  // 처음 로딩 + refreshTrigger 변경 시 실행
  useEffect(() => {
    axios
      .get("/api/member/me", { withCredentials: true })
      .then((res) => {
        const data = res.data;
        console.log("✅ userInfo:", data);
        setUserInfo(data);
        fetchCounts(data.userId);
      })
      .catch(() => setUserInfo(null));
  }, [refreshTrigger]); // 🔥 변경 지점

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