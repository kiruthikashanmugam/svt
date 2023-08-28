import React from 'react';
import { Link } from 'react-router-dom';
import Donation5 from "../../assets/img/donation/5.jpg";
import Donation6 from "../../assets/img/donation/6.jpg";
import Donation7 from "../../assets/img/donation/7.jpg";

function Section5() {
  return (
    <div>
          {/* <!-- Donation Start --> */}
  <div className="section section-padding pt-0" style={{backgroundColor:"rgb(254 255 231)" }}>
    <div className="container">
      <div className="section-title text-center">
        <p className="subtitle">Make a Donation</p>
        <h4 className="title">Donate Us</h4>
      </div>

      <div className="row">
        <div className="col-lg-4 col-md-6">
          <div className="sigma_service style-2" style={{border:"2px solid rgb(215, 178, 178)"}}>
            <div className="sigma_service-thumb">
              <img src={Donation5} alt="img"/>
            </div>
            <div className="sigma_service-body">
              <h5>
                <a href="donation.html">Sponsor a Brick</a>
              </h5>
              <p>Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
             
              <Link to="/category" className="sigma_btn-custom"> Donate</Link>
            
  
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="sigma_service style-2" style={{border:"2px solid rgb(215, 178, 178)"}}>
            <div className="sigma_service-thumb">
              <img src={Donation6} alt="img"/>
            </div>
            <div className="sigma_service-body">
              <h5>
                <a href="donation.html">General Donations</a>
              </h5>
              <p>Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
             
              <Link to="/donation" className="sigma_btn-custom"> Donate</Link>
            </div>
          </div>
        </div>

        <div className="col-lg-4 col-md-6">
          <div className="sigma_service style-2" style={{border:"2px solid rgb(215, 178, 178)"}}>
            <div className="sigma_service-thumb">
              <img src={Donation7} alt="img"/>
            </div>
            <div className="sigma_service-body">
              <h5>
                <a href="donation.html">Sponsor Grand Event</a>
              </h5>
              <p>Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
             
              
              <Link to="/event" className="sigma_btn-custom" > Donate</Link>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
  {/* <!-- Donation End --> */}


    </div>
  )
}

export default Section5