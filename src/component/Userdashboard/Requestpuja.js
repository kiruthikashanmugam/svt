import React from 'react';
import Requestpuja1 from './Requestpuja/Requestpuja1';
import Header from '../Layout/Header';
import { Helmet } from 'react-helmet';
import Temple4 from '../page/Templehistory/Temple4';

function Requestpuja() {
  return (
    <div>
      <Helmet>
        <title>User | RequestPuja</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px",marginBottom:"65px"  }}> <Requestpuja1 /></div>
        <Temple4/>
      </div>
    </div>
  )
}

export default Requestpuja