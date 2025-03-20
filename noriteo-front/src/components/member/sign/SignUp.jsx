// export default function SignUp() {
//   return (
//     <>
//       <h1>noriteo 회원가입 페이지</h1>
//     </>
//   );
// }

import { useState } from "react";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    userName: "",
    phone: "",
    birth: "",
    zipcode: "",
    address1: "",
    address2: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    try {
      const response = await axios.post("/api/member/signup", {
        userEmail: formData.email,
        password: formData.password,
        userName: formData.userName,
        mobile1: formData.phone.substring(0, 3),
        mobile2: formData.phone.substring(3, 7),
        mobile3: formData.phone.substring(7),
        birth: formData.birth,
        zipcode: formData.zipcode,
        address1: formData.address1,
        address2: formData.address2,
      });

      alert("회원가입 성공!");
      console.log("회원가입 응답:", response.data);
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입 실패!");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="이메일"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="userName"
          placeholder="이름"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="휴대폰 번호 (- 없이)"
          onChange={handleChange}
          required
        />
        <input type="date" name="birth" onChange={handleChange} required />
        <input
          type="text"
          name="zipcode"
          placeholder="우편번호"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address1"
          placeholder="주소"
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="address2"
          placeholder="상세주소"
          onChange={handleChange}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
}
