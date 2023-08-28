

import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

export function AuthStatus() {
    const auth = useAuth();
    const navigate = useNavigate();
  
    if (!auth.user) {
      return <p>Please login </p>;
    }
  
    return (
      <p>
        Welcome {auth.user}!{" "}
        <button onClick={() => {auth.signout(() => navigate("/admin"));}}>Sign out</button>
      </p>
    );
  }
  
