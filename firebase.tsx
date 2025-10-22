"use client";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
};
if (!firebaseConfig.apiKey) {
  throw new Error(" Missing Firebase config.");
}
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// ✅ Export functions that only run on client

export const getClientAuth = () =>
  typeof window !== "undefined" ? getAuth(app) : null;

export const getClientDb = () => {
  if (typeof window === "undefined") return null;
  return getFirestore(app);
};
