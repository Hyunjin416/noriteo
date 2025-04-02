// import { useState, useRef } from "react";
import { useState, useRef } from "react";
import axios from "axios";
import KakaoLogin from "./KakaoLogin";
import GoogleLogin from "./GoogleLogin";
import NaverLogin from "./NaverLogin";
import "../../../components_css/member/sign/Login.css";

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
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        alert("로그인 성공!");
      }
    } catch (error) {
      console.error(
        "로그인 실패:",
        error.response ? error.response.data : error.message
      );
      alert("로그인 실패! 잘못된 이메일 또는 비밀번호입니다.");
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <div>
        <input
          type="email"
          id="email"
          placeholder="이메일을 입력하세요"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          ref={emailInputRef}
          required
        />
        <input
          type="password"
          id="password"
          placeholder="비밀번호를 입력하세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          ref={passwordInputRef}
          required
        />
        <button onClick={handleLogin}>로그인</button>
      </div>
      <div className="social-login">
        <KakaoLogin />
        <GoogleLogin />
        <NaverLogin />
      </div>
    </div>
  );
}
