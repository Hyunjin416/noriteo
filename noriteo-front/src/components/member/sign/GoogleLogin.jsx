import React from "react";

const GoogleLogin = () => {
  const GoogleURL = "";
  const handleLogin = () => {
    window.location.href = GoogleURL;
  };
  return (
    <button onClick={handleLogin} className="google-login-btn">
      구글 로그인
    </button>
  );
};

export default GoogleLogin;
