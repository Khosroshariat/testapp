"use client";

import { usePathname } from "next/navigation";
import React, { ReactNode } from "react"; //
import SearchBarWrapper from "./SearchBarWrapper";
import SideBarWrapper from "./SideBarWrapper";
import AuthenticationModal from "../AuthenticationModal";

interface AppWrapperProps {
  children: ReactNode;
}
export default function AppWrapper({ children }: AppWrapperProps) {
  const pathname = usePathname();

  const isHome = pathname === "/";
  const isPlan = pathname === "/choose-plan";

  if (isHome || isPlan) {
    return (
      <>
        {children}
        <AuthenticationModal />
      </>
    );
  }

  return (
    <div className="wrapper">
      <SearchBarWrapper />
      <SideBarWrapper />
      {children}
      <AuthenticationModal />
    </div>
  );
}
