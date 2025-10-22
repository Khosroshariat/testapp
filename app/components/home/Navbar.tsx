"use client";

import Link from "next/link";
import Logo from "next/image";
import AuthenticationModal from "../AuthenticationModal";
import { useAuthModal } from "../context/AuthModalContext";

function Navbar() {
  const { openAuthModal } = useAuthModal();

  return (
    <>
      <nav className="nav">
        <div className="nav__wrapper">
          <figure className="nav__img--mask">
            <Logo
              className="nav__img"
              src="/logo.png"
              alt=""
              width={500}
              height={300}
            />
          </figure>
          <ul className="nav__list--wrapper">
            <li
              className="nav__list nav__list--login"
              onClick={() => {
                openAuthModal();
              }}
            >
              Login
            </li>
            <li className="nav__list nav__list--mobile">About</li>
            <li className="nav__list nav__list--mobile">Contact</li>
            <li className="nav__list nav__list--mobile">Help</li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
