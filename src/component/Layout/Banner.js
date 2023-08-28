import React from 'react';
import banner1 from "../assets/img/banner/3.png";
import { Link } from 'react-router-dom';

function Banner() {
  return (
    <div>


      <div class="sigma_banner banner-3">

        <div class="sigma_banner-slider" >


          <div class="light-bg sigma_banner-slider-inner bg-cover bg-center bg-norepeat" style={{ backgroundImage: `url(${banner1})`, height: "430px" }}>
            <div class="sigma_banner-text">
              <div class="container">
                <div class="row align-items-center">
                  <div class="col-lg-6">
                    <h1 class="title">A visit to the temple is food for the soul.</h1>
                    <p class="blockquote mb-0 bg-transparent"> “The temple is a place of peace, a place of quiet reflection where we can draw closer to our Heavenly Father and feel His love.”</p>
                    <div class="section-button d-flex align-items-center">
                  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>



        </div>

      </div>
    </div>

  )
}

export default Banner