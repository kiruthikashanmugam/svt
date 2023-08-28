import React from 'react';
import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

import { Link } from 'react-router-dom';


function Section4() {
  return (
    <div>
      
{/*         
  <!-- holi Start --> */}
  <div className="section section-padding pattern-squares dark-bg-2">
    <div className="container">
      <div className="col-md-12">
      <div className="section-title text-start">
        <p className="subtitle">service</p>
        <h4 className="title text-white">How We Can Help</h4>
      </div>

      <div className="row">

        <div className="col-lg-4 col-md-6">
          <Link to="/temple" className="sigma_service style-1 primary-bg">
            <div className="sigma_service-thumb">
              <i className="text-white flaticon-temple"></i>
            </div>
            <div className="sigma_service-body">
              <h5 className="text-white">Temple History</h5>
              <p className="text-white">Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
            </div>
            <Link to="/temple">
            <span className="btn-link text-white">Learn More <i className="text-white far fa-arrow-right"></i> </span>
         

            </Link>
            </Link>
          
        </div>

        <div className="col-lg-4 col-md-6 mt-negative-sm">
          <Link to="/mission" className="sigma_service style-1 secondary-bg">
            <div className="sigma_service-thumb">
              <i className="custom-primary flaticon-hindu-1"></i>
            </div>
            <div className="sigma_service-body">
              <h5 className="text-white">Our Mission</h5>
              <p className="text-white">Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
            </div>
            <Link to="/mission">
            <span className="text-white btn-link">Learn More <i className="text-white far fa-arrow-right"></i> </span>
            </Link>
           
          </Link>
        </div>

        <div className="col-lg-4 col-md-6 mt-negative-sm">
          <Link to="/pujalist" className="sigma_service style-1 bg-white">
            <div className="sigma_service-thumb">
              <i className="flaticon-pooja"></i>
            </div>
            <div className="sigma_service-body">
              <h5>Pujas</h5>
              <p>Temple is place where hindu worship  consectetur adipisicing elit, sed do </p>
            </div>
            <Link to="/pujalist">
            <span className="btn-link">Learn More <i className="far fa-arrow-right"></i> </span>
            </Link>
           
       
          </Link>
        </div>

      </div>

     
    </div>
    </div>
  </div>
  {/* <!-- holi End --> */}


    </div>
  )
}

export default Section4