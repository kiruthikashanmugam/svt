import React from 'react';
import Header from '../Layout/Header';
import Temple4 from '../page/Templehistory/Temple4';
import Banner from '../Layout/Banner';
import Pujalist1 from '../page/Pujalist/Pujalist1';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';

function PujaList() {
  return (
    <div>
      <Helmet>
        <title>PujaList</title>
      </Helmet>
      <Header />
      <Cartcount />
      <Banner />
      <Pujalist1 />
      <Temple4 />

    </div>
  )
}

export default PujaList