import React from 'react';
import "../css/user.css";
import Container from 'react-bootstrap/Container';
import { Link } from 'react-router-dom';
import {BsPerson} from "react-icons/bs";
import{BsCalendarDate} from "react-icons/bs";
import {GiByzantinTemple } from "react-icons/gi";
import {FaDonate} from "react-icons/fa";
import {TbCalendarPin} from "react-icons/tb"



function User1() {



    return (
        <div>
            <div>
                <Container style={{ marginTop: "10px" }}>
                    <h4>Dashboard</h4>
                    <div class="post-detail-wrapper">
                        <div class="row">

                            <div class="col-lg-4 col-md-6">
                                <Link to="/user/dashboard/edituser" class="sigma_service style-1" style={{backgroundColor: "#7E4555"}}>
                                    <div class="sigma_service-thumb">
                                    <BsPerson style={{color: "rgb(253 251 251 / 88%)", width:"94%",height:"79px"}}/>
                                        
                                    </div>
                                    <div class="sigma_service-body">
                                        <h5 style={{color: "#f7f5f5",textAlign:"center"}}>User Profile</h5>
                                    </div>
                                </Link>
                            </div>

                           

                            <div class="col-lg-4 col-md-6">
                                <Link to="/user/dashboard/templecalendar" class="sigma_service style-1" style={{backgroundColor: "#7E4555"}}>
                                    <div class="sigma_service-thumb">
                                    <BsCalendarDate style={{color: "rgb(253 251 251 / 88%)", width:"94%",height:"79px"}}/>
                                    </div>
                                    <div class="sigma_service-body">
                                        <h5 style={{color: "#f7f5f5",textAlign:"center"}}>Temple Calendar</h5>
                                    </div>
                                </Link>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <Link   to="/user/dashboard/requestpuja" class="sigma_service style-1" style={{backgroundColor: "#7E4555"}}>
                                    <div class="sigma_service-thumb">
                                    <GiByzantinTemple  style={{color: "rgb(253 251 251 / 88%)", width:"94%",height:"79px"}}/>
                                       
                                    </div>
                                    <div class="sigma_service-body">
                                        <h5 style={{color: "#f7f5f5" ,textAlign:"center"}}>Request a Puja</h5>
                                    </div>
                                </Link>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <Link   to="/user/dashboard/bookingservices" class="sigma_service style-1" style={{backgroundColor: "#7E4555"}}>
                                    <div class="sigma_service-thumb">
                                    <TbCalendarPin style={{color: "rgb(253 251 251 / 88%)", width:"94%",height:"79px"}}/>
                                       
                                    </div>
                                    <div class="sigma_service-body">
                                        <h5 style={{color: "#f7f5f5" ,textAlign:"center"}}>My Bookings</h5>
                                    </div>
                                </Link>
                            </div>
                            <div class="col-lg-4 col-md-6">
                                <Link   to="/user/dashboard/donationreport" class="sigma_service style-1" style={{backgroundColor: "#7E4555"}}>
                                    <div class="sigma_service-thumb">
                                    <FaDonate style={{color: "rgb(253 251 251 / 88%)", width:"94%",height:"79px"}}/>
                                       
                                    </div>
                                    <div class="sigma_service-body">
                                        <h5 style={{color: "#f7f5f5" ,textAlign:"center"}}>Donation History</h5>
                                    </div>
                                </Link>
                            </div>
                          




                        </div>
                    </div>
                    

                </Container>

            </div>




        </div>
    )
}

export default User1


