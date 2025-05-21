// import { useState, useRef } from "react";
import { useState, useRef, useEffect } from "react";
import axios from "axios";
import KakaoLogin from "./KakaoLogin";
// import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import "@/components_css/member/sign/Login.css";
import Cookies from "js-cookie";

export default function Login() {
  const [userEmail, setUserEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailInputRef = useRef(null);
  const passwordInputRef = useRef(null);

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/member/login",
        {
          userEmail,
          password,
        },
        {
          withCredentials: true, // 쿠키 전송 허용
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // ① 백엔드가 JSON 본문에 보낸 accessToken
      const token = response.data.accessToken;
      if (token) {
        localStorage.setItem("token", token);
      }

      if (response.status === 200) {
        alert("로그인 성공!");
        // 리다이렉트는 프론트엔드에서 처리
        window.location.href = "http://localhost:5173/";
      }
    } catch (error) {
      console.error(
        "로그인 실패:",
        error.response ? error.response.data : error.message
      );
      alert("로그인 실패! 잘못된 이메일 또는 비밀번호입니다.");
    }
  };

  useEffect(() => {
    if (Cookies.get("undefinedAccessToken")) {
      Cookies.remove("undefinedAccessToken");
    }
  }, []);

  return (
    <div className="login-div">
      <div className="login-icon">
        <img src="../../../../public/noriteoLogo2.ico" width="300px" />
      </div>
      <div className="login-container">
        <h2>로그인</h2>
        <div>
          <input
            type="email"
            id="email-input"
            placeholder="이메일을 입력하세요"
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
            ref={emailInputRef}
            required
          />
          <input
            type="password"
            id="password-input"
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInputRef}
            required
          />
          <button className="normal-login-btn" onClick={handleLogin}>
            로그인
          </button>
        </div>

        <div className="find-email-pw-sign-div">
          <div className="find-email-pw-inner">
            <span className="find-email">이메일 찾기</span>
            <span className="divider">|</span>
            <span className="find-pw">비밀번호 찾기</span>
            <span className="divider">|</span>
            <span className="sign-up">회원가입</span>
          </div>
        </div>

        <div className="social-login-div">
          <div className="kakao-login-btn">
            <KakaoLogin />
          </div>
          {/* <div className="google-login-btn">
            <GoogleLogin />
          </div> */}
          <div className="naver-login-btn">
            <NaverLogin />
          </div>
        </div>
      </div>
    </div>
  );
}
