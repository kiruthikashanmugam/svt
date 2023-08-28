import React from 'react';
import Payment1 from "../page/Payment/Payment1"
import Header from '../Layout/Header';
import Temple4 from '../page/Templehistory/Temple4';
import Banner from '../Layout/Banner';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';



function Payment() {
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Header />
      <Cartcount />
      <Banner />
      <Payment1 />
      <Temple4 />
    </div>
  )
}

export default Payment