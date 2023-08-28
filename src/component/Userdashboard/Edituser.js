import React from 'react';
import Edituser1 from './Edituser/Edituser1';
import Header from '../Layout/Header';
import { Helmet } from 'react-helmet';
import Temple4 from '../page/Templehistory/Temple4';


function Edituser() {

  return (
    <div>
      <Helmet>
        <title>User | Profile</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px", marginBottom:"65px"  }}>  <Edituser1 /> </div>
        <Temple4/>
      </div>
    </div>
  )
}
export default Edituser