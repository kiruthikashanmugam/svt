import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
  
const SidebarLink = styled(Link)`
  display: flex;
  color: black;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  list-style: none;
  height: 60px;
  text-decoration: none;
  font-size: 16px;

  &:hover {
    background: #fbfbfb;
    cursor: pointer;
  }


`;
  
const SidebarLabel = styled.span`
  margin-left: 16px;
  position: relative;
    top: -4px;
`;
  
const DropdownLink = styled(Link)`
  background: #fbfbfb;
  height: 60px;
  padding-left: 3rem;
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  
  &:hover {
    cursor: pointer;
  }
`;
  
const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);
  
  const showSubnav = () => setSubnav(!subnav);
  
  // const handleClick = event => {
  //   // 👇️ toggle styles on click
  //   if (event.currentTarget.style.backgroundColor) {
  //     event.currentTarget.style.backgroundColor = null;
  //     event.currentTarget.style.color = null;
  //     event.currentTarget.style.width = null;
  //     event.currentTarget.style.borderRadius =null;
  //     event.currentTarget.style.height = null;
  //     event.currentTarget.style.boxShadow = null;
    
  //   } else {
  //     event.currentTarget.style.backgroundColor = 'white';
  //     event.currentTarget.style.color = 'black';
  //     event.currentTarget.style.width = '175px';
  //     event.currentTarget.style.height = '40px';
  //     event.currentTarget.style.boxShadow = '4px 5px 6px grey';
  //     event.currentTarget.style.borderRadius = '10px';
    
  //   }

  //   //  toggle class on click
  //   event.currentTarget.classList.toggle('my-class-1', 'my-class-2');
  // };
  return (
    <>
      <SidebarLink to={item.path} 
      onClick={item.subNav && showSubnav  }>
        <div>  
          {item.icon}
          <SidebarLabel>{item.title}</SidebarLabel>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </SidebarLink>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <DropdownLink to={item.path} key={index}>
              {item.icon}
              <SidebarLabel>{item.title}</SidebarLabel>
            </DropdownLink>
          );
        })}
    </>
  );
};
  
export default SubMenu;