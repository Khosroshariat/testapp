"use client";
import LoginImage from "next/image";
import { useAuthModal } from "./context/AuthModalContext";

function Login() {
  const { openAuthModal } = useAuthModal();
  return (
    <>
      <div className="settings__login--wrapper">
        <LoginImage
          alt="login"
          src="/login.png"
          width={1033}
          height={712}
          decoding="async"
          data-nimg="1"
          loading="lazy"
          style={{ color: "transparent" }}
        />
        <div className="settings__login--text">
          Log in to your account to see your library.
        </div>
        <button className="btn settings__login--btn" onClick={openAuthModal}>
          Login
        </button>
      </div>
    </>
  );
}
export default Login;
