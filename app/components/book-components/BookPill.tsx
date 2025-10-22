"use client";
import { useAuth } from "../context/AuthContext";

type BookPillProps = {
  subscriptionRequired: boolean;
};

function BookPill({ subscriptionRequired }: BookPillProps) {
  const { user } = useAuth();
  if (!subscriptionRequired) return null;
  if (user) return null;

  return (
    <div className="book__pill book__pill--subscription-required">Premium</div>
  );
}

export default BookPill;
