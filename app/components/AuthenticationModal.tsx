"use client";

import { useAuthModal } from "./context/AuthModalContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import LoginModal from "./modal/LoginModal";
import RegisterModal from "./modal/RegisterModal";


function AuthenticationModal() {
  const { isAuthOpen, closeAuthModal } = useAuthModal();
  const [activeModal, setActiveModal] = useState<'login' | 'register' | null>(null);
  useEffect(() => {
    if (isAuthOpen) {
      setActiveModal("login"); // default to login when modal opens
    }
  }, [isAuthOpen]);

  const openLogin = () => setActiveModal("login");
  const openRegister = () => setActiveModal("register");
  const closeModal = () => {
    setActiveModal(null);
    closeAuthModal();
  };

  if (!isAuthOpen) return null;
  return (
    <>
      <div className="auth__wrapper">
        <div className="auth">
          {activeModal === "login" && (
            <LoginModal closeLogin={closeModal} openRegister={openRegister} />
          )}
          {activeModal === "register" && (
            <RegisterModal closeRegister={closeModal} openLogin={openLogin} />
          )}
        </div>
      </div>
    </>
  );
}

export default AuthenticationModal;
