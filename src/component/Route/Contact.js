import React from 'react';
import Header from '../Layout/Header';
import Temple4 from '../page/Templehistory/Temple4';
import Banner from '../Layout/Banner';
import Contact1 from '../page/Contactus/Contact1';
import { Helmet } from 'react-helmet';

function Contact() {
  return (
    <div>
      <Helmet>
        <title>ContactUs</title>
      </Helmet>
      <Header />
      <Banner />
      <Contact1 />

      <Temple4 />


    </div>
  )
}

export default Contact