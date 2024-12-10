// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    const storedSignInStatus = localStorage.getItem("isSignedIn");
    if (storedSignInStatus === "true") {
      setIsSignedIn(true);
    }
  }, []);

  const signIn = () => {
    setIsSignedIn(true);
    localStorage.setItem("isSignedIn", "true");
  };

  const signOut = (req, res) => {
    setIsSignedIn(false);
    localStorage.removeItem("isSignedIn");
    // Add any additional sign-out logic here (e.g., removing cookies)
    res.cookie('jwt', '', { maxAge: 1 });
    res.status(200).send('Logout Successful');
  };

  return (
    <AuthContext.Provider value={{ isSignedIn, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};