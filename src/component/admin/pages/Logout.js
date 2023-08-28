import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

function Nav() {
  const { authed, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav>
      
      {authed && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}