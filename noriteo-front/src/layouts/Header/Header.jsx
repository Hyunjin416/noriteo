// import { useNavigate } from "react-router-dom";
// import "./Header.css";

// export default function Header() {
//   const navigate = useNavigate(); //navigate 함수 초기화

//   const handleLogoClick = () => {
//     navigate("/"); // 홈페이지로 이동
//   };

//   const handleLoginClick = () => {
//     navigate("/member"); // 로그인 페이지로 이동
//   };

//   const handleSignUpClick = () => {
//     navigate("/member/signUp"); // 회원가입 페이지로 이동
//   };

//   return (
//     <nav className="navbar">  {/* 로고 이미지 */}
//       <div className="navbar-logo" onClick={handleLogoClick}>
//         <img
//           src="/noriteoLogo.ico"
//           alt="noriteoLogo"
//           width="150"
//           height="75"
//         />
//         <img
//           src="/noriteoSlide.ico"
//           alt="noriteoSlide"
//           width="90"
//           height="45"
//         />
//       </div>

//       <div className="navbar-buttons"> {/* 로그인, 회원가입 버튼 */}
//         <button className="login" onClick={handleLoginClick}>
//           로그인
//         </button>
//         <button className="singup" onClick={handleSignUpClick}>
//           회원가입
//         </button>
//       </div>
//     </nav>
//   );
// }

import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";
import axios from "@/auth/AxiosConfig"; // 사용자 정보 가져올 때 사용하는 axios

export default function Header() {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(null);

  // 유저 정보 불러오기
  useEffect(() => {
    axios
      .get("/api/member/me", {
        withCredentials: true,
      })
      .then((res) => {
        setUserInfo(res.data); // 로그인된 유저
      })
      .catch(() => {
        setUserInfo(null); // 로그인 안 된 상태
      });
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleLoginClick = () => {
    navigate("/member");
  };

  const handleSignUpClick = () => {
    navigate("/member/signUp");
  };

  const handleLogoutClick = async () => {
    try {
      await axios.post("/api/member/logout", null, {
        withCredentials: true,
      });
      alert("로그아웃 되었습니다.");
      setUserInfo(null);
      navigate("/");
    } catch (err) {
      console.error("로그아웃 실패:", err);
      alert("로그아웃 실패");
    }
  };

  const handleMypageClick = () => {
    navigate("/member/mypage");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img src="/noriteoLogo.ico" alt="noriteoLogo" width="150" height="75" />
        <img
          src="/noriteoSlide.ico"
          alt="noriteoSlide"
          width="90"
          height="45"
        />
      </div>

      <div className="navbar-buttons">
        {userInfo ? (
          <>
            <button className="mypage" onClick={handleMypageClick}>
              마이페이지
            </button>
            <button className="logout" onClick={handleLogoutClick}>
              로그아웃
            </button>
          </>
        ) : (
          <>
            <button className="login" onClick={handleLoginClick}>
              로그인
            </button>
            <button className="signup" onClick={handleSignUpClick}>
              회원가입
            </button>
          </>
        )}
      </div>
    </nav>
  );
}
