"use client";
import { getAuth, signOut } from "firebase/auth";

async function Logout() {
  const auth = getAuth();
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error("Error signing out:", error);
  }
}

export default Logout;
