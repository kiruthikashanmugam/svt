import React from 'react';
import User1 from './User/User1';
import Header from '../Layout/Header';
import { Helmet } from 'react-helmet';


function Userdashboard() {
  return (
    <div>
      <Helmet>
        <title>User | Dashboard</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px" }}><User1 /></div>
      </div>
    </div>
  )
}

export default Userdashboard