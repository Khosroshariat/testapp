"use client";

import { usePathname } from "next/navigation";
import SearchBar from "../all-pages/SearchBar";

export default function SearchBarWrapper() {
  const pathname = usePathname();

  // Don't show on home page
  if (pathname === "/") {
    return null;
  }

  return <SearchBar />;
}
