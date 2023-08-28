import React from 'react';
import { RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';

function Booking1() {
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px 15px 5px 15px',
    backgroundColor: '#7E4555'
  };
  return (
    <div >
        <Link to="/user/dashboard" style={{}}>
        <div style={flexContainer}>
          <h5 style={{ flex: 1, color: 'white' }}> <RiDashboardFill /> Dashboard</h5>
          <h5 style={{ flex: 1, color: 'white', textAlign: 'center', }}>MyServices</h5>
          <h5 style={{ flex: 1, color: 'white' }}></h5>
        </div>
      </Link>

    </div>
  )
}

export default Booking1