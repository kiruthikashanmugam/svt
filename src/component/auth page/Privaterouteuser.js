
import  { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuths } from "./AuthProviders";

function Privaterouteuser({ children }) {
  const auth = useAuths();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.user) {
      // Store the current path in session storage
      sessionStorage.setItem("lastPath", location.pathname);
      // Redirect to the login page
      navigate("/sign-in", { state: { from: location } });
    }
  }, [auth.user, location.pathname, navigate]);

  const isAuthenticated = auth.user !== null;

  if (!isAuthenticated && location.pathname !== "/sign-in") {
    // Redirect to the login page if not authenticated
    navigate("/sign-in", { state: { from: location } });
    return null;
  }

  if (!isAuthenticated && location.pathname === "/sign-in") {
    // Render the login page if not authenticated
    return children;
  }

  if (isAuthenticated && location.pathname === "/sign-in") {
    const lastPath = sessionStorage.getItem("lastPath");
    // Redirect to the last stored path if authenticated and on the admin page
    navigate(lastPath || "/user/dashboard");
    return null;
  }

  return children;
}

export default Privaterouteuser;
