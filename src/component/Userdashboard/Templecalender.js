import React from 'react';
import Templecalendar1 from '../Userdashboard/Templecalendar/Templecalendar1';
// import ReactBigCalendar from './Templecalendar/ReactBigCalendar';
import Header from '../Layout/Header';
import Calendar from '../Userdashboard/Templecalendar/Calender';
import { Helmet } from 'react-helmet';
import Temple4 from '../page/Templehistory/Temple4';

function Templecalender() {
  return (
    <div>
      <Helmet>
        <title>User | TempleCalendar</title>
      </Helmet>
      <div>
        <Header />
        <div style={{ marginTop: "65px" }}>  <Templecalendar1 /></div>
        <div style={{ marginTop: "65px", marginBottom:"65px"  }}> <Calendar /></div>
        <Temple4/>
      </div>
    </div>
  )
}

export default Templecalender;