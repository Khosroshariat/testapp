"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getClientAuth, getClientDb } from "@/firebase";

// 1. Define the shape of your context
interface UserData {
  email: string;
  plan: "premium" | "premium_plus";
  createdAt: string;
}

interface AuthContextType {
  user: User | null;
  userData: UserData | null;
  logout: () => void;
  loading: boolean;
}
// 2. Create the context with the correct type (or undefined initially)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Define the props for the provider
interface AuthProviderProps {
  children: ReactNode;
}

// 4. Create the AuthProvider
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null); // replace `any` with specific type if possible
  const [loading, setLoading] = useState(true);

  const auth = getClientAuth();
  const db = getClientDb();

  useEffect(() => {
    if (!auth || !db) return;

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        const docRef = doc(db, "users", firebaseUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        }
      } else {
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth, db]);

  const logout = () => {
    if (auth) signOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, userData, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

// 5. Custom hook to use the context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
