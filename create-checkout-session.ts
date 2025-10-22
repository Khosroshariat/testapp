import type { NextApiRequest, NextApiResponse } from 'next';
import { getFirestore, collection, doc, addDoc } from 'firebase/firestore';
import { getApps, initializeApp } from 'firebase/app';
import { firebaseConfig } from '@/firebase'; // Adjust to your config location

if (!getApps().length) {
  initializeApp(firebaseConfig);
}
const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { userId, plan } = req.body;

  if (!userId || !plan) {
    return res.status(400).json({ error: 'Missing userId or plan' });
  }

  try {
    const checkoutSessionRef = await addDoc(
      collection(doc(collection(db, 'customers'), userId), 'checkout_sessions'),
      {
        price: plan === 'premium_plus'
          ? 'price_XXXXXXX_YEARLY' // Replace with your Stripe Price ID
          : 'price_XXXXXXX_MONTHLY',
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/cancel`,
        metadata: {
          plan,
          userId,
        },
      }
    );

    res.status(200).json({ id: checkoutSessionRef.id });
  } catch (err) {
    console.error('Error creating checkout session:', err);
    res.status(500).json({ error: 'Failed to create checkout session' });
  }
}
