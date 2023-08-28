import React, { useEffect } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import Payment from "../../assets/img/Payment.avif"
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
function Success() {
  const navigate = useNavigate()
  useEffect(() => {
    // Delete cartId from local storage
    localStorage.removeItem('cartId');
    localStorage.removeItem('order_id');
    localStorage.removeItem('cartItems');
    localStorage.removeItem('numberCart');
  }, []);
  const handleRefresh = () => {
    navigate("/");

    window.location.reload();
  };
  return (
    <div>
      <Helmet>
        <title>Payment Details</title>
      </Helmet>
      <div style={{ paddingTop:"100px", textAlign: "center" }}>
        <div>
          <img src={Payment} width="50%" alt="payment" /><br /><br />
          <div>
            <h5>Your Payment is Successfull</h5><br />
            <Button onClick={handleRefresh}>Back to Home</Button>

          </div>



        </div>

      </div>







    </div>
  )
}

export default Success