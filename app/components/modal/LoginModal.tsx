"use client";
import Image from "next/image";
import { useAuthModal } from "../context/AuthModalContext";
import Link from "next/link";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { getClientAuth } from "@/firebase";
import { useRouter } from "next/navigation";

interface LoginModalProps {
  closeLogin: ()=> void;
  openRegister: ()=> void;
}

function LoginModal({ closeLogin, openRegister }: LoginModalProps) {
  const { closeAuthModal } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e:  React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const auth = getClientAuth();
    if (!auth) {
      setError('Firebase Auth or DB not initialized')
      return 
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User logged in:", userCredential.user.uid);
      closeAuthModal(); // close modal
      router.push("/for-you");
    } catch (err: any) {
      setError(err.message);
    }
  };
  return (
    <>
      <div className="auth__content">
        <div className="auth__title">Log in to Summarist</div>
        <Link href={"/for-you"}>
          <button className="btn guest__btn--wrapper" onClick={closeAuthModal}>
            <figure className="google__icon--mask guest__icon--mask">
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 448 512"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm89.6 32h-16.7c-22.2 10.2-46.9 16-72.9 16s-50.6-5.8-72.9-16h-16.7C60.2 288 0 348.2 0 422.4V464c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48v-41.6c0-74.2-60.2-134.4-134.4-134.4z"></path>
              </svg>
            </figure>
            <div>Login as a Guest</div>
          </button>
        </Link>

        <div className="auth__separator">
          <span className="auth__separator--text">or</span>
        </div>
        <button className="btn google__btn--wrapper">
          <figure className="google__icon--mask">
            <Image src="/google.png" alt="" width={500} height={300} />
          </figure>
          <div>Login with Google</div>
        </button>
        <div className="auth__separator">
          <span className="auth__separator--text">or</span>
        </div>
        <form className="auth__main--form" onSubmit={handleLogin}>
          <input
            className="auth__main--input"
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="auth__main--input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="btn" type="submit">
            <span>Login</span>
          </button>

          {error && <p>{error}</p>}
        </form>
        <div className="auth__forgot--password">Forgot your password?</div>
        <button className="auth__switch--btn" onClick={openRegister}>
          Don't have an account?
        </button>
        <div className="auth__close--btn" onClick={closeLogin}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            height="28"
            width="28"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
      </div>
    </>
  );
}
export default LoginModal;
