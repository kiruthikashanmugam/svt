


import React, { useState, useEffect } from 'react';
import "../assets/css/style.css";
import "../assets/css/responsive.css";
import "../assets/css/plugins/animate.min.css";
import "../assets/css/plugins/bootstrap.min.css";
import "../assets/css/plugins/Chart.min.css";
import "../assets/css/plugins/font-awesome.min.css";
import "../assets/css/plugins/ion.rangeSlider.min.css";
import "../assets/css/plugins/magnific-popup.css";
import "../assets/css/plugins/slick-theme.css";
import "../assets/css/plugins/slick.css";
import $ from 'jquery'; // Import jQuery if not already included
import { Link } from 'react-router-dom';
import svt from "../assets/img/svt.png";
import Dropdown from 'react-bootstrap/Dropdown';
import svticon from "../assets/img/svticon.png";


import { useAuths } from "../auth page/AuthProviders";

import { useNavigate } from "react-router-dom";
import { BsPerson } from 'react-icons/bs';
import { Helmet } from 'react-helmet';





function Header() {
  
  // const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [login, setLogin] = useState(false)
  const navigate = useNavigate();
  const { signout } = useAuths();


  const handleLogout = () => {
    signout().then(() => {
      sessionStorage.clear();
      localStorage.removeItem("user_id");

      navigate("/");
      console.log("User logged out");
    }).catch(error => {
      console.log("Logout failed:", error);
    });
  };


  useEffect(() => {
    const userId = localStorage.getItem("user_id")
    if (userId) {
      setLogin(true)
    }
    const asideTriggerLeft = $(".aside-trigger-left");
    const sigmaAsideLeft = $(".sigma_aside-left");


    $(".aside-trigger-left").on('click', function () {
      $(".sigma_aside-left").toggleClass('open');
    });

    $(".sigma_aside .menu-item-has-children > a").on('click', function (e) {
      var submenu = $(this).next(".sub-menu");
      e.preventDefault();
      submenu.slideToggle(200);
    });

    // const googleTranslateElementInit = () => {
    //   new window.google.translate.TranslateElement(
    //     { pageLanguage: selectedLanguage },
    //     'google_translate_element'
    //   );
    // };

    // const script = document.createElement('script');
    // script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';


    // script.async = true;

    // document.body.appendChild(script);

    

    return () => {
      $(".aside-trigger-left").off('click');
      $(".sigma_aside .menu-item-has-children > a").off('click');
      // document.body.removeChild(script);
    };
  }, []);

  // window.googleTranslateElementInit = () => {
  //   new window.google.translate.TranslateElement(
  //     { pageLanguage: selectedLanguage },
  //     'google_translate_element'
  //   );
  // };

  // const handleLanguageChange = (lang) => {
  //   setSelectedLanguage(lang);
  // };

  return (
    <div>
     
      {/*  

  <div className="sigma_aside-overlay aside-trigger-right"></div>
  {/* <!-- partial -->

  <!-- partial:partia/__mobile-nav.html --> */}
      <aside className="sigma_aside sigma_aside-left" >

        <a className="navbar-brand" href="" > <img src={svt} alt="logo" width="20%" height="100px" /> </a>

        {/* <!-- Menu --> */}
        <ul>
          <li className="menu-item menu-item-has-children">
            <Link to="/">Home</Link>

          </li>

          <li className="menu-item menu-item-has-children">
            <a href="">About us</a>
            <ul className="sub-menu">
              <li className="menu-item"> <Link to="/mission">Mission</Link> </li>
              <li className="menu-item"> <Link to="/board">Boards</Link> </li>
              <li className="menu-item"> <Link to="/temple">Temple History</Link> </li>
              <li className="menu-item"> <Link to="/regularpuja">Regular Puja Timings</Link> </li>
              <li className="menu-item"> <Link to="/contact">Contact us</Link> </li>
            </ul>
          </li>


          <li className="menu-item menu-item-has-children">
            <a href="">Gurukulam</a>

          </li>
          <li className="menu-item menu-item-has-children">
            <a href="">Calendar</a>
            <ul className="sub-menu">
              <li className="menu-item"> <Link to="/calendar">Yearly Calendar</Link> </li>

            </ul>
          </li>
          <li className="menu-item menu-item-has-children">
            <a href="">Services</a>
            <ul className="sub-menu">
              <li className="menu-item"> <Link to="/pujalist">Puja List</Link> </li>

            </ul>
          </li>
          {login && (
            <li className="menu-item menu-item-has-children">
              <a href="">Membership</a>
              <ul className="sub-menu">
                <li className="menu-item"> <Link to="/user/dashboard/MembershipList">Membership List</Link> </li>

              </ul>
            </li>

          )}
          <li className="menu-item menu-item-has-children">
            <a href="">Media</a>
            <ul className="sub-menu">
              <li className="menu-item"> <a href="https://www.svtemplenc.info/">News</a> </li>
              <li className="menu-item"> <a href="https://svtemplenc.zenfolio.com/">Photos</a> </li>
              <li className="menu-item"> <a href="https://www.youtube.com/user/svtempleofnc/videos">Videos</a> </li>
            </ul>
          </li>
        </ul>




      </aside>
      <div className="sigma_aside-overlay aside-trigger-left"></div>
      {/* <!-- partial -->

  <!-- partial:partia/__header.html --> */}
      <header className="sigma_header header-2 can-sticky" >

        {/* <!-- Middle Header Start --> */}
        <div className="sigma_header-middle">
          <nav className="navbar" style={{ backgroundColor: '#F1C27B' }}>

            {/* <!-- Controls --> */}
            <div className="sigma_header-controls style-2" style={{ border: "none" }}>

              <ul className="sigma_header-controls-inner" style={{ height: '62px', width: '42px' }}>

                <img className="aside-toggler style-2 aside-trigger-right desktop-toggler" src={svticon} alt="client" />
                {/* <!-- Desktop Toggler --> */}
                {/* <li > */}

                {/* <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span> 
                </li>

                {/* <!-- Mobile Toggler --> */}
                {/* <li "> */}
                <img className="aside-toggler style-2 aside-trigger-left" src={svticon} alt="client" />
                {/* <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span>
                  <span></span> */}
                {/* // </li> */}

              </ul>

            </div>

            {/* <!-- Menu --> */}
            <ul className="navbar-nav" >
              <li className="menu-item menu-item-has-children">
                <Link to="/">Home</Link>

              </li>

              <li className="menu-item menu-item-has-children">
                <a href="#">About us</a>
                <ul className="sub-menu">
                  <li className="menu-item"> <Link to="/mission">Mission</Link> </li>
                  <li className="menu-item"> <Link to="/board">Boards</Link> </li>
                  <li className="menu-item">  <Link to="/temple">Temple History</Link></li>
                  <li className="menu-item"><Link to="/regularpuja">Regular Puja Timings</Link> </li>
                  <li className="menu-item"> <Link to="/contact">Contact us</Link> </li>
                </ul>
              </li>

              <li className="menu-item menu-item-has-children">
                <Link to="/gurukulam">Gurukulam</Link>

              </li>
              <li className="menu-item menu-item-has-children">
                <a href="">Calendar</a>
                <ul className="sub-menu">
                  <li className="menu-item"> <Link to="/calendar">Yearly Calendar</Link> </li>

                </ul>
              </li>
              <li className="menu-item menu-item-has-children">
                <a href="">Services</a>
                <ul className="sub-menu">
                  <li className="menu-item"> <Link to="/pujalist">Puja List</Link> </li>

                </ul>
              </li>
              {login && (
            <li className="menu-item menu-item-has-children">
              <a href="">Membership</a>
              <ul className="sub-menu">
                <li className="menu-item"> <Link to="/user/dashboard/MembershipList">Membership List</Link> </li>

              </ul>
            </li>

          )}
              <li className="menu-item menu-item-has-children">
                <a href="">Media</a>
                <ul className="sub-menu">
                  <li className="menu-item"> <a href="https://www.svtemplenc.info/">News</a> </li>
                  <li className="menu-item"> <a href="https://svtemplenc.zenfolio.com/">Photos</a> </li>
                  <li className="menu-item"> <a href="https://www.youtube.com/user/svtempleofnc/videos">Videos</a> </li>
                </ul>
              </li>
            </ul>


            {/* <!-- Logo End -->
 
        <!-- Button & Phone --> */}
            <div className="sigma_header-controls sigma_header-button">
          
            <div id="google_translate_element" style={{backgroundColor: "#f1c27b",float:"right" }}></div>
              {/* <span class="material-symbols-outlined" style={{fontSize:'30px',textAlign:'center'}}>person</span> */}

              <Link to="/category" className="sigma_btn-custom" > Donate Now </Link>
            </div>

            {/* <!-- Controls --> */}
            {login && (
              <div className="sigma_header-controls style-1">

                
                  <Dropdown >
                    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="white">
                      <span><BsPerson style={{ width: "70%", height: "47px" }} /></span>
                      {/* <img src={person} width="70%" height="30px"/> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="" style={{ background: "white", padding: "10px", borderLeft: "none", fontSize: "14px" }} active>
                        <Link to="/user/dashboard">
                          <span class="material-symbols-outlined">
                            dashboard
                          </span> <span style={{ fontSize: "14px", paddingLeft: "5px" }}>Dashboard</span>
                        </Link>

                      </Dropdown.Item>
                      <Dropdown.Item href="" style={{ background: "white", padding: "10px", borderLeft: "none", justifyContent: "left", fontSize: "14px", paddingLeft: "11px" }} active>
                        <Link onClick={handleLogout} >
                          <span class="material-symbols-outlined">
                            logout
                          </span><span style={{ fontSize: "14px", paddingLeft: "5px" }}>Logout</span>
                        </Link>

                      </Dropdown.Item>


                    </Dropdown.Menu>
                  </Dropdown>

               

              </div>
            )}

          </nav>
        </div>
        {/* <!-- Middle Header End --> */}

      </header>
      {/* <!-- partial --> */}

    </div>
  )
}

export default Header
