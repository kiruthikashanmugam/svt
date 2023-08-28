import * as React from 'react';
import Header from '../../Layout/Header';
import Footer from '../../Layout/Footer';
import { RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';



function MembershipList() {
  return (
    
 <div>
    <Helmet>
        <title>User | Membership</title>
      </Helmet>
      <div style={{backgroundColor:'antiquewhite'}}><Header/> </div>
      <div className="section" style={{ display: "flex", justifyContent: "center" }}>
      
      <div className="col-lg-10">
              <div className="sidebar">

                <div className="sidebar-widget event-info" style={{width:"80%"}}>
                  <h5 className="widget-title">Membership List</h5>
                  <div className="row">
                    <div className="col-lg-3">
                      <h4>2023</h4>
                    </div>
                    <div className="col-lg-7">
                    <a href="https://drive.google.com/file/d/1qk2F3Vj1Fiqk1X3KkYL2Hw6GhltIT-sy/view?usp=share_link" rel="noopener noreferrer" style={{paddingLeft:'30px'}} target="_blank">MembershipList as of &nbsp;24-Apr-2023</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3">
                      <h4>2021</h4>
                    </div>
                    <div className="col-lg-7">
                    <a href="https://drive.google.com/file/d/1RNIIlb0pptY0tXUV0BFVQ73BqmihWtQ6/view?usp=sharing" rel="noopener noreferrer" style={{paddingLeft:'30px'}} target="_blank">MembershipList as of &nbsp;30-Jun-2021</a>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3">
                      <h4>2020</h4>
                    </div>
                    <div className="col-lg-7">
                      <p>	<a href="https://drive.google.com/file/d/1vfwMckqfg_B6BIbSWEQsADlCgiEWYyBE/view?usp=sharing" rel="noopener noreferrer" style={{paddingLeft:'30px'}} target="_blank">MembershipList as of 30-Jun-2020</a></p>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-3">
                      <h4>2019</h4>
                    </div>
                    <div className="col-lg-7">
                    <a href="https://drive.google.com/file/d/11pgmULl7_LvmsT3M07-IxoAGSXXceLD6/view?usp=sharing" rel="noopener noreferrer" style={{paddingLeft:'30px'}} target="_blank">MemberList as of 30-Jun-2019</a>
                    </div>
                  </div>
                </div>

              </div>
            </div>
            </div>
    

    <Footer/>    
</div>  
    
        
)

}
export default MembershipList