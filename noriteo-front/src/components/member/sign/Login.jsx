// export default function Login() {
//   return (
//     <>
//       <h1>noriteo 로그인 페이지</h1>
//     </>
//   );
// }

import { useState } from "react";
import axios from "axios"; // axios 직접 import

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("/api/member/login", {
        email,
        password,
      }); // 직접 요청
      localStorage.setItem("token", response.data.token); // 토큰 저장
      alert("로그인 성공!");
    } catch (error) {
      console.error("로그인 실패:", error);
      alert("로그인 실패!");
    }
  };

  return (
    <div>
      <h1>noriteo 로그인 페이지</h1>
      <input
        type="email"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>로그인</button>
    </div>
  );
}
