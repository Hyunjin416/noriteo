import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate(); //navigate 함수 초기화

  const handleLogoClick = () => {
    navigate("/"); // 홈페이지로 이동
  };

  const handleLoginClick = () => {
    navigate("/member"); // 로그인 페이지로 이동
  };

  const handleSignUpClick = () => {
    navigate("/member/signUp"); // 회원가입 페이지로 이동 
  };

  return (
    <nav className="navbar">  {/* 로고 이미지 */}
      <div className="navbar-logo" onClick={handleLogoClick}>
        <img
          src="/noriteoLogo.ico"
          alt="noriteoLogo"
          width="150"
          height="75"
        />
        <img
          src="/noriteoSlide.ico"
          alt="noriteoSlide"
          width="90"
          height="45"
        />
      </div>

      <div className="navbar-buttons"> {/* 로그인, 회원가입 버튼 */}
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
