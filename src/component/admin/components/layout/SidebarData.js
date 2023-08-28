// import React from "react";
// import * as RiIcons from "react-icons/ri";


// export const SidebarData = ({ handleLogout }) => {
//   return [
//   {
//     title: "Dashboard",
//     path: "/dashboard",
//     icon: <span className="material-symbols-outlined">
//       dashboard
//     </span>,

//   },

//   {
//     title: "Static Pages",

//     icon: <span className="material-symbols-outlined">
//       text_snippet
//     </span>,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Banner",
//         path: "/banner",

//       },
//       {
//         title: "Addcms",
//         path: "/addcms",

//       },
//       {
//         title: "service",
//         path: "/servicepage",

//       },




//     ],
//   },

//   {
//     title: "Users Management",
//     path: "/management",
//     icon: <span className="material-symbols-outlined">
//       approval_delegation
//     </span>,
//   },
//   {
//     title: " Purchases",

//     icon: <span className="material-symbols-outlined">
//       text_snippet
//     </span>,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Poojas",
//         path: "/poojas",

//       },
//       {
//         title: "Donation",
//         path: "/donation",

//       },
//       {
//         title: "Category",
//         path: "/category",

//       },
//       {
//         title: "Fulfillment",
//         path: "/fulfillment",

//       },
//     ],
//   },
//   {
//     title: "Membership",
//     path: "/accounts",
//     icon: <span className="material-symbols-outlined">
//       group
//     </span>,

//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,

//   },
  
//   {
//     title: "Calendar",
//     path: "/admincalendar",
//     icon: <span className="material-symbols-outlined">
//       business_center
//     </span>,
//   },


//   {
//     title: "Profile",

//     icon: <span className="material-symbols-outlined">
//       text_snippet
//     </span>,
//     iconClosed: <RiIcons.RiArrowDownSFill />,
//     iconOpened: <RiIcons.RiArrowUpSFill />,
//     subNav: [
//       {
//         title: "Change Password",
//         path: "/changepassword",

//       },
//       {
//         title: "Logout",
//         path: "/admin",
//         element: (
//           <button onClick={handleLogout}>Logout</button>
//         ),
         

//       },

//     ],
//   },


// ];
// }


import React from "react";
import * as RiIcons from "react-icons/ri";
import { useAuths } from "../../../auth page/AuthProviders";

import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import '../../assets/styles/Header.css';


export const SidebarData = () => {
  const navigate = useNavigate();
  const { signout } = useAuths();

  const handleLogout = () => {
    signout().then(() => {
      sessionStorage.clear();
      navigate("/admin");
      console.log("User logged out");
    }).catch(error => {
      console.log("Logout failed:", error);
    });
  };

  const sidebarData = [
    {
      title: "Dashboard",
      path: "/admin/dashboard",
      icon: <span style={{color:'black'}} className="material-symbols-outlined">
        dashboard
      </span>,
  
    },
  
    {
      title: "Static Pages",
  
      icon: <span style={{color:'black'}} className="material-symbols-outlined">
        text_snippet
      </span>,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: "Banner",
          path: "/admin/banner",
  
        },
        {
          title: "Addcms",
          path: "/admin/addcms",
  
        },
        {
          title: "Service",
          path: "/admin/servicepage",
  
        },
  
  
  
  
      ],
    },
  
    {
      title: "Users Management",
      path: "/admin/management",
      icon: <span  style={{color:'black'}} className="material-symbols-outlined">
        approval_delegation
      </span>,
    },
    {
      title: "Upcoming Event",
      path: "/admin/upcomingevent",
      icon: <span  style={{color:'black'}} className="material-symbols-outlined">
        event_upcoming
      </span>,
    },
    {
      title: " Purchases",
  
      icon: <span  style={{color:'black'}} className="material-symbols-outlined">
        text_snippet
      </span>,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: "Pujas",
          path: "/admin/pujas",
  
        },
        {
          title: "Donation",
          path: "/admin/donation",
  
        },
        {
          title: "Category",
          path: "/admin/category",
  
        },
        {
          title: "Fulfillment",
          path: "/admin/fulfillment",
  
        },
      ],
    },
   
    
    {
      title: "Calendar",
      path: "/admin/calendar",
      icon: <span  style={{color:'black'}} className="material-symbols-outlined">
       calendar_month
      </span>,
    },
  
  
    {
      title: "Profile",
  
      icon: <span  style={{color:'black'}} className="material-symbols-outlined">
      person
      </span>,
      iconClosed: <RiIcons.RiArrowDownSFill />,
      iconOpened: <RiIcons.RiArrowUpSFill />,
      subNav: [
        {
          title: "Change Password",
          path: "/admin/changepassword",
  
        },
        {
          title:   <Button variant="primary" onClick={handleLogout}>Logout </Button>
        
         
  
        },
  
      ],
    },
  ];

  return sidebarData;
};
