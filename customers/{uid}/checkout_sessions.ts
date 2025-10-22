import {
  collection,
  doc,
  addDoc,
  onSnapshot
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getClientDb } from "@/firebase"; // update path to your Firestore instance

const db = getClientDb();
const auth = getAuth();
const currentUser = auth.currentUser;

if (!currentUser || !db) {
  throw new Error("User must be logged in and Firestore must be initialized.");
}

// 🔗 Reference to: /customers/{uid}/checkout_sessions
const checkoutSessionsRef = collection(
  doc(collection(db, "customers"), currentUser.uid),
  "checkout_sessions"
);

// 📝 Add a checkout session document
const docRef = await addDoc(checkoutSessionsRef, {
  price: "price_1GqIC8HYgolSBA35zoTTN2Zl", // Replace with your real test price ID
  success_url: window.location.origin,
  cancel_url: window.location.origin,
});

// 👂 Listen for changes to that document
onSnapshot(docRef, (snap) => {
  const data = snap.data();
  if (!data) return;

  const { error, url } = data;

  if (error) {
    alert(`An error occurred: ${error.message}`);
  }

  if (url) {
    // Redirect to Stripe Checkout
    window.location.assign(url);
  }
});
