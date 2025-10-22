"use client";
import { createContext, useContext, useState, ReactNode } from "react";

// 1. Define the shape of your context
interface AuthModalContextType {
  isAuthOpen: boolean;
  openAuthModal: () => void;
  closeAuthModal: () => void;
}

// 2. Create context with correct type (or undefined for initial null value)
const AuthModalContext = createContext<AuthModalContextType | undefined>(undefined);

// 3. Define props type for provider
interface AuthModalProviderProps {
  children: ReactNode;
}

// 4. Create the provider
export const AuthModalProvider = ({ children }: AuthModalProviderProps) => {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  const openAuthModal = () => setIsAuthOpen(true);
  const closeAuthModal = () => setIsAuthOpen(false);
  
  return (
    <AuthModalContext.Provider
      value={{ isAuthOpen, openAuthModal, closeAuthModal }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context)
    throw new Error("useAuthModal must be used within AuthModalProvider");
  return context;
};
