import Header from "../Header/Header.jsx";
import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer.jsx";

export default function Container() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer /> 
    </>
  );
}
