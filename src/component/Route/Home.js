import React,{useState,useEffect} from 'react';
import Section1 from "../page/Home/Section1";
import Section2 from '../page/Home/Section2';
import Section3 from '../page/Home/Section3';
import Section4 from '../page/Home/Section4';
import Section5 from '../page/Home/Section5';
import Section6 from '../page/Home/Section6';
import Section7 from '../page/Home/Section7';
import Footer from '../Layout/Footer';
import Header from '../Layout/Header';
import Cartcount from '../page/Cart/Cartcount';
import { Helmet } from 'react-helmet';


function Home() {

  return (
    <div>
      
      <Helmet>
        <title>Home</title>
      </Helmet>
      
      <Header />
      <Cartcount />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Section7 />
      <Footer />
    </div>
  )
}

export default Home