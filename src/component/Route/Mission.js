import React from 'react';
import Header from '../Layout/Header';
import Temple4 from '../page/Templehistory/Temple4';
import Mission1 from "../page/Mission/Mission";
import Banner from '../Layout/Banner';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';



function Mission() {
  return (
    <div>
      <Helmet>
        <title>Mission</title>
      </Helmet>
      <Header />
      <Banner />
      <Cartcount />
      <Mission1 />
      <Temple4 />
    </div>
  )
}

export default Mission