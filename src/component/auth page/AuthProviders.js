import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  user: null,
  signin: () => {},
  signout: () => {},
});

export function AuthProviders({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const signin = (newUser, callback) => {
    setUser(newUser);
    sessionStorage.setItem("user", JSON.stringify(newUser));
    console.log("User signed in:", newUser);
    if (typeof callback === "function") {
      callback();
    }
  };

  const signout = (callback) => {
    return new Promise((resolve, reject) => {
      setUser(null);
      sessionStorage.clear();
      console.log("User signed out");
      if (typeof callback === "function") {
        try {
          callback();
          resolve();
        } catch (error) {
          reject(error);
        }
      } else {
        resolve();
      }
    });
  };
  

  const value = {
    user,
    signin,
    signout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuths() {
  return useContext(AuthContext);
}
