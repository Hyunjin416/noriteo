// export default function SignUp() {
//   return (
//     <>
//       <h1>noriteo 회원가입 페이지</h1>
//     </>
//   );
// }

// import { useState, useRef } from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import DaumPostcode from "react-daum-postcode";
import "../../../components_css/member/sign/SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const userEmail = useRef();
  const password = useRef();
  const rePassword = useRef();
  const userName = useRef();
  const gender = useRef();
  const mobile1 = useRef();
  const mobile2 = useRef();
  const mobile3 = useRef();
  const phone1 = useRef();
  const phone2 = useRef();
  const phone3 = useRef();
  const birth = useRef();
  const zipcode = useRef();
  const address1 = useRef();
  const address2 = useRef();
  const profileImage = useRef();

  const [isOpen, setIsOpen] = useState(false);

  const handleComplete = (data) => {
    let fullAddress = data.address;
    let extraAddress = "";

    // 우편번호는 data.zonecode로 받아오기
    // api만든데서 zonecode라고 씀
    const zonecode = data.zonecode;

    if (data.addressType === "R") {
      if (data.bname !== "") {
        extraAddress += data.bname;
      }
      if (data.buildingName !== "") {
        extraAddress +=
          extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
      }
    }

    zipcode.current.value = zonecode;
    address1.current.value = `${fullAddress} ${extraAddress}`;
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const passwordValue = password.current.value;
    const userNameValue = userName.current.value;

    // ✅ 비밀번호 검증 (영어, 숫자, 특수문자 중 2가지 이상 포함 + 10~16자)
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)|(?=.*[A-Za-z])(?=.*[\W_])|(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]{7,20}$/;
    if (!passwordRegex.test(passwordValue)) {
      alert(
        "비밀번호는 영어, 숫자, 특수문자 중 2가지 이상 포함한 7~20자리여야 합니다."
      );
      return;
    }

    // ✅ 이름 검증 (2자 이상 8자 이하)
    if (userNameValue.length < 2 || userNameValue.length > 8) {
      alert("이름은 2자 이상 8자 이하로 입력해야 합니다.");
      return;
    }

    // ✅ 비밀번호 확인
    if (password.current.value !== rePassword.current.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 회원가입 요청
    const user = {
      userEmail: userEmail.current.value,
      provider: "normal",
      providerId: "none",
      password: passwordValue,
      userName: userNameValue,
      gender: gender.current.value,
      mobile1: mobile1.current.value,
      mobile2: mobile2.current.value,
      mobile3: mobile3.current.value,
      phone1: phone1.current?.value || null,
      phone2: phone2.current.value,
      phone3: phone3.current.value,
      birth: birth.current.value,
      zipcode: zipcode.current.value,
      address1: address1.current.value,
      address2: address1.current.value || null,
      roleId: 2,
    };

    console.log("회원가입 데이터:", user);

    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(user)], { type: "application/json" })
    );

    if (profileImage.current.files[0]) {
      formData.append("profileImage", profileImage.current.files[0]);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/member/signUp",
        formData,
        {
          // headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("회원가입 성공! response:", response);

      if (response.status === 200) {
        alert("회원가입이 완료되었습니다!");
        navigate("/member/login");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="이메일" ref={userEmail} required />
        <input type="password" placeholder="비밀번호" ref={password} required />
        <input
          type="password"
          placeholder="비밀번호 확인"
          ref={rePassword}
          required
        />
        <input type="text" placeholder="이름" ref={userName} required />
        <select ref={gender} required defaultValue="">
          <option value="" disabled>
            성별 선택
          </option>
          <option value="남성">남성</option>
          <option value="여성">여성</option>
        </select>
        <input type="date" placeholder="생년월일" ref={birth} required />

        <div className="multi-input">
          <input type="text" placeholder="010" ref={mobile1} maxLength={3} />
          <input type="text" placeholder="1234" ref={mobile2} maxLength={4} />
          <input type="text" placeholder="5678" ref={mobile3} maxLength={4} />
        </div>

        <div className="multi-input">
          <input type="text" placeholder="02" ref={phone1} maxLength={3} />
          <input type="text" placeholder="123" ref={phone2} maxLength={4} />
          <input type="text" placeholder="4567" ref={phone3} maxLength={4} />
        </div>

        <input type="text" placeholder="우편번호" ref={zipcode} readOnly />
        <button type="button" onClick={() => setIsOpen(true)}>
          주소 찾기
        </button>

        <input type="text" placeholder="기본주소" ref={address1} readOnly />
        <input type="text" placeholder="상세주소" ref={address2} />
        <input type="file" ref={profileImage} accept="image/*" />
        <button type="submit">회원가입</button>
      </form>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={() => setIsOpen(false)}>닫기</button>
            <DaumPostcode onComplete={handleComplete} />
          </div>
        </div>
      )}
    </div>
  );
}
