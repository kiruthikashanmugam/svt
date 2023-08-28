import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import banner1 from "../../assets/img/banner/3.png";
import banner2 from "../../assets/img/lord.png";
import { Link } from 'react-router-dom';

import "../../assets/css/style.css";
import "../../assets/css/responsive.css";

function Section1() {
    return (
        <div>
            <div className="sigma_banner banner-3">
                <Carousel style={{background:"white"}}>
                    <div className="light-bg sigma_banner-slider-inner bg-cover bg-center bg-norepeat"
                        style={{ backgroundImage: `url(${banner1})` }}>
                        <div className="sigma_banner-text">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h1 className="title">Some Important Life Lessons From Gita</h1>
                                        <p className="blockquote mb-0 bg-transparent"> We are a Hindu that belives in Lord Rama and Vishnu Deva the
                                            followers and We are a Hindu that belives in Lord Rama and Vishnu Deva. This is where you should start
                                        </p>
                                        <div className="section-button d-flex align-items-center">
                                        <Link to="/sign-up" className="sigma_btn-custom">Join Today <i className="far fa-arrow-right"></i> </Link>
                                        <Link to="/pujalist" className="ms-3 sigma_btn-custom white">View Services <i
                                                className="far fa-arrow-right"></i> </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="light-bg sigma_banner-slider-inner bg-cover bg-center bg-norepeat"
                        style={{ backgroundImage: `url(${banner2})` }}>
                        <div className="sigma_banner-text">
                            <div className="container">
                                <div className="row align-items-center">
                                    <div className="col-lg-6">
                                        <h1 className="title">We are a Hindu that believe in Ram</h1>
                                        <p className="blockquote mb-0 bg-transparent"> We are a Hindu that belives in Lord Rama and Vishnu Deva the
                                            followers and We are a Hindu that belives in Lord Rama and Vishnu Deva. This is where you should start
                                        </p>
                                        <div className="section-button d-flex align-items-center">
                                            <Link to="/sign-up" className="sigma_btn-custom">Join Today <i className="far fa-arrow-right"></i> </Link>
                                            <Link to="/pujalist" className="ms-3 sigma_btn-custom white">View Services <i
                                                className="far fa-arrow-right"></i> </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </Carousel>
            </div>
        </div>
    );
}

export default Section1;


