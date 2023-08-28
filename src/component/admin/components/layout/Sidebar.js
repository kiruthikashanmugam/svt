
import { SidebarData } from "./SidebarData";
import SubMenu from "./SubMenu";
import logo1 from "../../assets/images/logo1.jpg";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useAuths } from "../../../auth page/AuthProviders";

const SidebarNav = styled.nav`
  background: #fffefe;
  width: 220px;
  height: 95%;
  display: block;
  justify-content: center;
  position: absolute;
  top: 0;
  transition: 350ms;
  z-index: 10;
  margin-left:-20px;
  margin-top:10px;  
  border-radius: 12px;
  overflow:auto;

  /* width */
::-webkit-scrollbar {
  width: 3px;
}

/* Track */
::-webkit-scrollbar-track {
  box-shadow: inset 0 0 5px grey; 
  border-radius: 10px;
}
 
/* Handle */
::-webkit-scrollbar-thumb {
  background: grey; 
  border-radius: 10px;
}
`;

const Sidebar = () => {
  const navigate = useNavigate();
  const { signout } = useAuths();

  const handleLogout = () => {
    signout(() => {
      sessionStorage.clear();
      navigate("/admin");
      console.log("User logged out");
    });
  };

  return (
    <>
      <SidebarNav style={{}}>
        <Link to="/dashboard">
          <img
            className="logo"
            src={logo1}
            alt="logo"
            width={30}
            height={30}
          />
        </Link>
        {SidebarData({ handleLogout }).map((item, index) => (
          <SubMenu item={item} key={index} />
        ))}
      </SidebarNav>
    </>
  );
};

export default Sidebar;