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

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("/api/member/me", { withCredentials: true })
      .then((res) => {
        setUserInfo(res.data);
      })
      .catch(() => {
        setUserInfo(null); // 로그인 안 된 상태
      });
  }, []);

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

  // 유저 정보가 있는 경우 렌더링
  const profileImageUrl = userInfo.sysUser || "/usericon.png";
  const userName = userInfo.userName || userInfo.usersName;
  const joinDate = new Date(userInfo.usersRegdate).toLocaleDateString();
  const postCount = 42; // TODO: 실제 데이터 연동
  const commentCount = 128; // TODO: 실제 데이터 연동

  return (
    <div className="userInfoContainer">
      <h4 className="userInfoTitle">사용자 정보</h4>

      <div className="userInfoTop">
        <img
          src={profileImageUrl}
          alt="프로필 이미지"
          className="userInfoProfile"
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
        onClick={() => navigate("/member/mypage")}
      >
        마이페이지
      </button>
    </div>
  );
}
