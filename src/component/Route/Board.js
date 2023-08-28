import React from 'react';
import Header from '../Layout/Header';
import Banner from '../Layout/Banner';
import Temple4 from '../page/Templehistory/Temple4';
import Board1 from '../page/Board/Board1';
import Cartcount from '../page/Cart/Cartcount';


function Board() {
  return (
    <div>
        <Header/>
        <Cartcount/>
       <Banner/>
        <Board1/>
       
        <Temple4/>
    </div>
  )
}

export default Board