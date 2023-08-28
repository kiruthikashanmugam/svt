import React from 'react';
import Temple1 from '../page/Templehistory/Temple1';
import Banner from '../Layout/Banner';
import Header from '../Layout/Header';
import Temple3 from '../page/Templehistory/Temple3';
import Temple4 from '../page/Templehistory/Temple4';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';

function Temple() {
  return (
    <div>
      <Helmet>
        <title>Temple History</title>
      </Helmet>
      <Header />
      <Cartcount />
      <Banner />
      <Temple1 />

      <Temple3 />
      <Temple4 />
    </div>
  )
}

export default Temple