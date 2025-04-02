import React from "react";

const KakaoLogin = () => {
  const rest_api_key = import.meta.env.VITE_KAKAO_API_KEY; // REST API KEY
  const redirect_uri = import.meta.env.VITE_KAKAO_REDIRECT_URI; // redirect URI

  const KakaoURL = `https://kauth.kakao.com/oauth/authorize?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KakaoURL;
  };

  return (
    <button onClick={handleLogin} className="kakao-login-btn">
      카카오 로그인
    </button>
  );
};

export default KakaoLogin;
