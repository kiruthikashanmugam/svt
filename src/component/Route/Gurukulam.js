import React from 'react';
import Header from '../Layout/Header';
import Banner from '../Layout/Banner';
import Temple4 from '../page/Templehistory/Temple4';
import Gurukulam1 from '../page/Gurukulam/Gurukulam1';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';


function Gurukulam() {
  return (
    <div>
      <Helmet>
        <title>Gurukulam</title>
      </Helmet>
      <Header />
      <Cartcount />
      <Banner />
      <Gurukulam1 />

      <Temple4 />
    </div>
  )
}

export default Gurukulam