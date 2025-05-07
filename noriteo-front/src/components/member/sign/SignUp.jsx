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
import "@/components_css/member/sign/SignUp.css";

export default function SignUp() {
  const navigate = useNavigate();
  const userEmail = useRef();
  const password = useRef();
  const rePassword = useRef();
  const userName = useRef();
  const gender = useRef();
  const mobile = useRef();
  const phone = useRef();
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

    // 이름 검증 (2자 이상 8자 이하)
    if (userNameValue.length < 2 || userNameValue.length > 8) {
      alert("이름은 2자 이상 8자 이하로 입력해야 합니다.");
      return;
    }

    // 비밀번호 확인
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
      mobile: mobile.current.value,
      phone: phone.current.value,
      birth: birth.current.value,
      zipcode: zipcode.current.value,
      address1: address1.current.value,
      address2: address2.current.value || null,
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
    <div className="signup-div">
      <div className="signup-icon">
        <img src="../../../../public/noriteoLogo2.ico" width="300px" />
      </div>
      <div className="signup-container">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div className="emailDiv">
            <p className="emailP">이메일</p>
            <input
              className="emailInput"
              type="email"
              placeholder="gildong@email.com"
              ref={userEmail}
              required
            />
          </div>

          <div className="passwordDiv">
            <p className="passwordP">비밀번호</p>
            <input
              className="passwordInput"
              type="password"
              placeholder="영어, 숫자, 특수문자 중 2가지 이상 포함 7~20글자"
              ref={password}
              required
            />
          </div>

          <div className="repasswordDiv">
            <p className="repasswordP">비밀번호 확인</p>
            <input
              className="repasswordInput"
              type="password"
              placeholder="비밀번호 확인"
              ref={rePassword}
              required
            />
          </div>

          <div className="userNameDiv">
            <p className="userNameP">이름</p>
            <input
              className="userNameInput"
              type="text"
              placeholder="홍길동"
              ref={userName}
              required
            />
          </div>

          <div className="genderDiv">
            <p className="genderP">성별</p>
            <select
              className="genderSelect"
              ref={gender}
              required
              defaultValue=""
            >
              <option value="" disabled>
                성별 선택
              </option>
              <option value="남성">남성</option>
              <option value="여성">여성</option>
            </select>
          </div>

          <div className="birthDiv">
            <p className="birthP">생년월일</p>
            <input
              className="birthInput"
              type="date"
              placeholder="생년월일"
              ref={birth}
              required
            />
          </div>

          <div className="mobileDiv">
            <p className="mobileP">휴대전화</p>
            <input
              className="mobileInput"
              type="text"
              placeholder="01012345678"
              ref={mobile}
              maxLength={12}
              required
            />
          </div>

          <div className="phoneDiv">
            <p className="phoneP">전화번호</p>
            <input
              className="phoneInput"
              type="text"
              placeholder="021234567"
              ref={phone}
              maxLength={12}
            />
          </div>

          <div className="zipcodeDiv">
            <p className="zipcodeP">우편번호</p>
            <input
              className="zipcodeInput"
              type="text"
              placeholder="01234"
              ref={zipcode}
              readOnly
            />
            <button
              className="zipcodeBtn"
              type="button"
              onClick={() => setIsOpen(true)}
            >
              주소찾기
            </button>
          </div>

          <div className="address1Div">
            <p className="address1P">기본주소</p>
            <input
              className="address1Input"
              type="text"
              placeholder="서울시 서초구 서초대로 10길 20, 길동아파트"
              ref={address1}
              readOnly
            />
          </div>

          <div className="address2Div">
            <p className="address2P">상세 주소</p>
            <input type="text" placeholder="101동 101호" ref={address2} />
          </div>

          <div className="profileImageDiv">
            <p className="profileImageP">프로필 사진</p>
            <input type="file" ref={profileImage} accept="image/*" />
          </div>

          <div className="submitDiv">
            <button className="submitBtn" type="submit" onClick={handleSubmit}>
              회원가입
            </button>
          </div>
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
    </div>
  );
}
