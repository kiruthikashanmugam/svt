import React from 'react';
import Header from '../Layout/Header';
import Banner from '../Layout/Banner';
import Temple4 from '../page/Templehistory/Temple4';
import Regularpooja1 from '../page/Regularpooja/Regularpooja1';
import Cartcount from '../page/Cart/Cartcount';

function Regularpuja() {
  return (
    <div>
        <Header/>
        <Cartcount/>
        <Banner/>
        <Regularpooja1/>
        <Temple4/>
    </div>
  )
}

export default Regularpuja