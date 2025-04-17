import React from "react";

const NaverLogin = () => {
  const NAVER_CLIENT_ID = import.meta.env.VITE_NAVER_CLIENT_ID; // 발급받은 클라이언트 아이디
  const REDIRECT_URI = import.meta.env.VITE_NAVER_REDIRECT_URI; // Callback URL
  const STATE = "false";
  const NAVER_AUTH_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${NAVER_CLIENT_ID}&state=${STATE}&redirect_uri=${REDIRECT_URI}`;

  // https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=rxJ6x6W6LHCrD32VWFF0&state=false&redirect_uri=http://localhost:5173/naver-callback

  const handleLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  return (
    <button onClick={handleLogin} className="naver-login-btn">
      네이버 로그인
    </button>
  );
};

export default NaverLogin;
