"use client";

import Image from "next/image";
import { useAuthModal } from "../context/AuthModalContext";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getClientAuth, getClientDb } from "@/firebase";
import { useState } from "react";

// ✅ 1. Define prop types
interface RegisterModalProps {
  openLogin: () => void;
  closeRegister: () => void;
}

function RegisterModal({ openLogin, closeRegister }: RegisterModalProps) {
  const { closeAuthModal } = useAuthModal();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // ✅ 2. Type the event
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const auth = getClientAuth();
    const db = getClientDb();

    if (!auth || !db) {
      setError("Firebase Auth or DB not initialized");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date().toISOString(),
        plan: "premium",
      });

      console.log("User registered:", user.uid);
      closeAuthModal();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="auth__content">
      <div className="auth__title">Sign up to Summarist</div>

      <button className="btn google__btn--wrapper">
        <figure className="google__icon--mask">
          {/* ✅ 3. Corrected usage of next/image */}
          <Image src="/google.png" alt="Google" width={500} height={300} />
        </figure>
        <div>Sign up with Google</div>
      </button>

      <div className="auth__separator">
        <span className="auth__separator--text">or</span>
      </div>

      <form className="auth__main--form" onSubmit={handleRegister}>
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
          <span>Sign up</span>
        </button>

        {error && <p>{error}</p>}
      </form>

      <button className="auth__switch--btn" onClick={openLogin}>
        Already have an account?
      </button>

      <div className="auth__close--btn" onClick={closeRegister}>
        <svg
          stroke="currentColor"
          fill="none"
          strokeWidth="0"
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </div>
  );
}

export default RegisterModal;
