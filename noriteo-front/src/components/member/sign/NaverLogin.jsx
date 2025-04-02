import React from "react";

const NaverLogin = () => {
  const NaverURL = "";
  const handleLogin = () => {
    window.location.href = NaverURL;
  };
  return (
    <button onClick={handleLogin} className="naver-login-btn">
      네이버 로그인
    </button>
  );
};

export default NaverLogin;
