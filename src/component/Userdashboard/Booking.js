import React from 'react';
import Header from '../Layout/Header';
import Booking1 from './Booking/Booking1';
import Booking2 from './Booking/Booking2';
import { Helmet } from 'react-helmet';
import Temple4 from '../page/Templehistory/Temple4';



function Booking() {
  return (
    <div>
      <Helmet>
        <title>User | MyServices</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px"}}> <Booking1 /></div>
        <div style={{ marginTop: "65px", marginBottom:"65px" }}> <Booking2 /></div>
        <Temple4/>
      </div>
    </div>
  )
}

export default Booking