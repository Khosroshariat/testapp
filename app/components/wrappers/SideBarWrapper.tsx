"use client";

import { usePathname } from "next/navigation";
import SideBar from "../all-pages/SideBar";

export default function SideBarWrapper() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") {
    return null;
  }

  return <SideBar />;
}
