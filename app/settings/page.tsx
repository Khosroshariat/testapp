"use client";
import { useEffect, useState } from "react";
import Login from "../components/Login";
import { useAuth } from "../components/context/AuthContext";
import Link from "next/link";
import { getDoc, doc } from "firebase/firestore";
import { getClientDb } from "@/firebase";

function Settings() {
  const { user } = useAuth();
  const [plan, setPlan] = useState<string | null>(null);
  const db = getClientDb();

  useEffect(() => {
    const fetchUserPlan = async () => {
      if (!user||!db) return;

      const userRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(userRef);

      if (docSnap.exists()) {
        setPlan(docSnap.data().plan);
      }
    };

    fetchUserPlan();
  }, [user]);
  return (
    <>
      <div className="container">
        <div className="row">
          {user ? (
            <>
              <div className="section__title page__title">Settings</div>
              <div className="setting__content">
                <div className="settings__sub--title">
                  Your Subscription plan
                </div>

                <div className="settings__text">
                  {plan ? plan.replace("_", " ") : "Loading..."}
                </div>

                <Link href={"/choose-plan"}>
                  <button className="btn settings__login--btn">
                    Change Plan
                  </button>
                </Link>
              </div>

              <div className="setting__content">
                <div className="settings__sub--title">Email</div>
                <div className="settings__text">{user.email}</div>
              </div>
            </>
          ) : (
            <Login />
          )}
        </div>
      </div>
    </>
  );
}

export default Settings;
