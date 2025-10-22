import { useEffect, useState } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { getClientDb } from '@/firebase';

export default function SuccessPage() {
  const [plan, setPlan] = useState<string | null>(null);
  const db = getClientDb();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const checkPlan = async () => {
      if (!user || !db) return;

      const userRef = doc(db, 'users', user.uid);
      const snap = await getDoc(userRef);

      if (snap.exists()) {
        const data = snap.data();
        setPlan(data.plan || null);
      }
    };

    checkPlan();
  }, [user, db]);

  return (
    <div className="success-page">
      <h1>Subscription Successful ✅</h1>
      {plan ? <p>Your plan: <strong>{plan.replace('_', ' ')}</strong></p> : <p>Loading your plan...</p>}
    </div>
  );
}
