import React from 'react';
import Sm1 from "../assets/img/blog/sm/1.jpg";
import Sm2 from "../assets/img/blog/sm/2.jpg";
import Sm3 from "../assets/img/blog/sm/3.jpg";
import { Link } from 'react-router-dom';



function Footer() {

  return (
    <div>
         {/* <!-- Audio Box End -->

<!-- partial:partia/__footer.html --> */}
<footer className="sigma_footer footer-2">

  {/* <!-- Middle Footer --> */}
  <div className="sigma_footer-middle">
    <div className="container">
      <div className="row">
        <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 footer-widget">
          <h5 className="widget-title">About Us</h5>
          <p className="mb-4">You need to be sure there isn’t anything embarrassing hidden in the middle of text. </p>
          <div className="d-flex align-items-center justify-content-md-start justify-content-center">
            <i className="far fa-phone custom-primary me-3"></i>
            <span>(919)468-0040</span>
          </div>
          <div className="d-flex align-items-center justify-content-md-start justify-content-center mt-2">
            <i className="far fa-envelope custom-primary me-3"></i>
            <span>publicrelations@svtemplenc.org</span>
          </div>
          <div className="d-flex align-items-center justify-content-md-start justify-content-center mt-2">
            <i className="far fa-map-marker custom-primary me-3"></i>
            <span>121, Balaji Place,Cary, NC 27513</span>
          </div>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 footer-widget">
          <h5 className="widget-title">Information</h5>
          <ul>
            <li>
              
            <Link to="/mission">Mission</Link> 
            </li>
            <li>
             
            <Link to="/board">Boards</Link>
            </li>
            <li>
             
            <Link to="/temple">Temple History</Link>
            </li>
            <li>
             
            <Link to="/regularpuja">Regular Puja Timings</Link> 
            </li>
            <li>
             
            <Link to="/contact">Contact us</Link>
            </li>
         
          </ul>
        </div>
        <div className="col-xl-2 col-lg-2 col-md-4 col-sm-12 footer-widget">
          <h5 className="widget-title">Others</h5>
          <ul>
         
            <li>
             
            <Link to="/pujalist">Puja List</Link>
            </li>
            <li>
             
              <a href="https://www.svtemplenc.info/">News</a>
            </li>
            <li>
             
              <a href="https://svtemplenc.zenfolio.com/">Photo</a>
            </li>
            <li>
              
              <a href="https://www.youtube.com/user/svtempleofnc/videos">Video</a>
            </li>
          </ul>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-3 col-sm-12 d-none d-lg-block footer-widget widget-recent-posts">
          <h5 className="widget-title">Recent Posts</h5>
          <article className="sigma_recent-post">
            <a ><img src={Sm1} alt="post"/></a>
            <div className="sigma_recent-post-body">
              <a > <i className="far fa-calendar"></i> May 20, 2022</a>
              <h6> <a >Temple companies are being so transparent with their work</a> </h6>
            </div>
          </article>
          <article className="sigma_recent-post">
            <a ><img src={Sm2} alt="post"/></a>
            <div className="sigma_recent-post-body">
              <a > <i className="far fa-calendar"></i> May 20, 2022</a>
              <h6> <a >Testimony love offering so blessed</a> </h6>
            </div>
          </article>
          <article className="sigma_recent-post">
            <a ><img src={Sm3} alt="post"/></a>
            <div className="sigma_recent-post-body">
              <a > <i className="far fa-calendar"></i> May 20, 2022</a>
              <h6> <a >As we've all discovered by now, the world can change</a> </h6>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

  {/* <!-- Footer Bottom --> */}
  <div className="sigma_footer-bottom">
    <div className="container-fluid">
      <div className="sigma_footer-copyright">
        <p> Copyright © Ndot <a  className="custom-primary">2023</a> </p>
      </div>
      {/* <div className="sigma_footer-logo">
        <img src={logo} alt="logo"/>
      </div> */}
      <ul className="sigma_sm square">
        <li>
          <a  rel="noreferrer" >
            <i className="fab fa-facebook-f"></i>
          </a>
        </li>
        <li>
          <a  rel="noreferrer" >
            <i className="fab fa-linkedin-in"></i>
          </a>
        </li>
        <li>
          <a rel="noreferrer" >
            <i className="fab fa-twitter"></i>
          </a>
        </li>
        <li>
          <a   rel="noreferrer" >
            <i className="fab fa-youtube"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>



</footer>
{/* <!-- partial --> */}
    </div>
  )
}

export default Footer