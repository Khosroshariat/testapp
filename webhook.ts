import type { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { buffer } from 'micro';
import { getAdminDb } from '@/firebase/admin'; // Your admin Firestore init

// Stripe secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-09-30.clover',
});

// Disable the default body parser (required for Stripe to verify the signature)
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed');
  }

  const buf = await buffer(req);
  const sig = req.headers['stripe-signature'] as string;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
  } catch (err: any) {
    console.error('Webhook error:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session;

      const userId = session.metadata?.userId;
      const plan = session.metadata?.plan;

      if (!userId || !plan) {
        console.warn("Missing metadata in session");
        break;
      }

      // ✅ Set the user's plan in Firestore (server-side)
      const db = getAdminDb();
      await db.collection('users').doc(userId).set({ plan }, { merge: true });

      break;
    }

    case 'invoice.payment_failed':
      // Handle failed payment
      break;

    case 'customer.subscription.deleted':
      // Handle cancelation
      break;

    // Add more events as needed
    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  res.status(200).end();
}
