import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "@/components_css/member/myPage//CancelAccount.css";

export default function CancelAccount() {
  const navigate = useNavigate();
  const [agree, setAgree] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleCancelAccount = () => {
    if (!agree) {
      setErrorMsg("탈퇴에 동의해야 진행할 수 있습니다.");
      return;
    }

    if (password === "") {
      setErrorMsg("비밀번호를 입력해주세요.");
      return;
    }

    const confirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (confirmed) {
      // 실제 백엔드 요청은 생략
      // axios.post('/api/member/withdraw', { password }, { withCredentials: true })

      alert("회원 탈퇴가 완료되었습니다.");
      navigate("/login"); // 로그인 또는 메인 페이지로 이동
    } else {
      navigate("/mypage");
    }
  };

  return (
    <div className="cancel-container">
      <h2>회원 탈퇴</h2>
      <div className="checkbox-wrapper">
        <label>
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)}
          />
          탈퇴에 동의합니다.
        </label>
      </div>

      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {errorMsg && <p className="error-msg">{errorMsg}</p>}

      <button className="cancel-btn" onClick={handleCancelAccount}>
        탈퇴하기
      </button>
    </div>
  );
}