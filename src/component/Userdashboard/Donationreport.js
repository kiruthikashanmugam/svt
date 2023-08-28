import React from 'react';
import Donationreport1 from './Donationreport/Donationreport1';

import { Helmet } from 'react-helmet';
import Temple4 from '../page/Templehistory/Temple4';

import Header from '../Layout/Header';
function Donationreport() {
  return (
    <div>
      <Helmet>
        <title>User | Report</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px",marginBottom:"65px"  }}><Donationreport1 /></div>
        <Temple4/>
      </div>
    </div>
  )
}

export default Donationreport