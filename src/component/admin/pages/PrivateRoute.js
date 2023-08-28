


import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuths } from "../../auth page/AuthProviders";
import { Navigate } from "react-router-dom";

function PrivateRoute({ children }) {
  const auth = useAuths();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the session ID exists in session storage
    const sessionID = sessionStorage.getItem("sessionID");

    // If session ID does not exist, redirect to the login page
    if (!sessionID) {
      navigate("/admin");
    }
  }, [navigate]);

  if (!auth.user) {
    // Redirect to the login page, passing the current location they were trying to access
    return <Navigate to="/admin" state={{ from: location }} />;
  }

  return children;
}

export default PrivateRoute;
