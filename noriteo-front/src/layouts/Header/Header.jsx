export default function Header() {
  return (
    <>
      {/* <div class="headerDiv">
         <h1 class="headerH1">Header입니다</h1> 
        <table>
          <tr>
            <td>로고</td>
          </tr>
        </table>
      </div> */}

      <nav class="navbar bg-body-tertiary">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img
              src="../../../public/noriteoLogo.ico"
              alt="noriteoLogo"
              width="50"
              height="35"
              class="d-inline-block align-text-top"
            />
            <img
              src="../../../public/noriteoSlide.ico"
              alt="noriteoSlide"
              width="40"
              height="30"
              class="d-inline-block align-text-top"
            />
            <button>로그인</button>
            <button>회원가입</button>
          </a>
        </div>
      </nav>
    </>
  );
}
