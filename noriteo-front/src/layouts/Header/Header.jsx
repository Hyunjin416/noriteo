// import { useNavigate } from "react-router-dom"; // 사용할 때 '//' 주석 지우기
import "./Header.css";

export default function Header() {
  // const navigate = useNavigate(); // navigate 사용할 때 각 코드에서 '//'만 지워주면 오류 해결

  const handleLogoClick = () => {
    alert("홈페이지(HomePage.jsx)로 이동합니다.");
    // navigate("/"); // 실제 라우팅 시 사용
  };

  const handleLoginClick = () => {
    alert("Login.jsx로 이동합니다.");
    // navigate("/member/login");
  };

  const handleSignUpClick = () => {
    alert("SignUp.jsx로 이동합니다.");
    // navigate("/member/signUp");
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img
          src="/noriteoLogo.ico"
          alt="noriteoLogo"
          width="50"
          height="35"
        />
        <img
          src="/noriteoSlide.ico"
          alt="noriteoSlide"
          width="40"
          height="30"
        />
      </div>

      <div className="navbar-buttons">
        <button className="login" onClick={handleLoginClick}>
          로그인
        </button>
        <button className="singup" onClick={handleSignUpClick}>
          회원가입
        </button>
      </div>
    </nav>
  );
}
