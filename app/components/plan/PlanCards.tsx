"use client";
import { useEffect, useState } from "react";
import { getDoc, doc, setDoc } from "firebase/firestore";
import { getClientDb } from "@/firebase";
import { useAuth } from "../context/AuthContext";

function PlanCards() {
  const [planCardActive, setPlanCardActive] = useState<"yearly" | "monthly" | null>(null);
  const { user } = useAuth(); // Get the current user from context
  const db = getClientDb();

  

  // Fetch current plan
  useEffect(() => {
  if (!user || !db) return;

  const fetchUserPlan = async () => {
    const userRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(userRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as { plan: 'premium' | 'premium_plus' };
      const plan = data.plan;
      setPlanCardActive(plan === "premium_plus" ? "yearly" : "monthly");
    }
  };

  fetchUserPlan();
}, [user, db]);

  // Handle final plan selection button
 const handlePlanSelect = async () => {
  if (!user || !db) {
    alert("You must be logged in to select a plan.");
    return;
  }

  const selectedPlan = planCardActive === "yearly" ? "premium_plus" : "premium";

  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan: selectedPlan, userId: user.uid }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      alert("Could not initiate checkout session.");
    }
  } catch (error) {
    console.error("Error initiating checkout:", error);
    alert("Something went wrong. Please try again.");
  }
};

  return (
    <>
      <div className="section__title">Choose the plan that fits you</div>
      <div
        onClick={() => setPlanCardActive("yearly")}
        className={`plan__card ${
          planCardActive === "yearly" ? "plan__card--active" : ""
        }`}
      >
        <div className="plan__card--circle">
          <div
            className={`${
              planCardActive === "yearly" ? "plan__card--dot" : ""
            }`}
          ></div>
        </div>
        <div className="plan__card--content">
          <div className="plan__card--title">Premium Plus Yearly</div>
          <div className="plan__card--price">$59.99/year</div>
          <div className="plan__card--text">7-day free trial included</div>
        </div>
      </div>
      <div className="plan__card--separator">
        <div className="plan__separator">or</div>
      </div>
      <div
        onClick={() => setPlanCardActive("monthly")}
        className={`plan__card ${
          planCardActive === "monthly" ? "plan__card--active" : ""
        }`}
      >
        <div className="plan__card--circle">
          <div
            className={`${
              planCardActive === "monthly" ? "plan__card--dot" : ""
            }`}
          ></div>
        </div>
        <div className="plan__card--content">
          <div className="plan__card--title">Premium Monthly</div>
          <div className="plan__card--price">$5.99/month</div>
          <div className="plan__card--text">No trial included</div>
        </div>
      </div>
      <div className="plan__card--cta">
        <span className="btn--wrapper">
          <button className="btn" onClick={handlePlanSelect}>
            <span>
              {planCardActive === "yearly"
                ? "Start your free 7-day trial"
                : "Start your first month"}
            </span>
          </button>
        </span>
        <div className="plan__disclaimer">
          {planCardActive === "yearly"
            ? "Cancel your trial at any time before it ends, and you won't be charged."
            : "30-day money back guarantee, no questions asked."}
        </div>
      </div>
    </>
  );
}

export default PlanCards;
