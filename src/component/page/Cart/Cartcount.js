import React, { useState } from 'react';
import { Button, Modal } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';

function Cartcount({ numberCart }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  

  const navigateToCart = () => {
    if (numberCart === 0) {
      setShowModal(true);
    } else {
      navigate('/cart');
    }
  };
  
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="trx_demo_panels">
        <div className="trx_demo_tabs">
          <Button className='btnsidebar' variant="warning" onClick={navigateToCart}>
            <small className="text">Shopping cart</small>
            <span className="material-symbols-outlined">
              shopping_cart
            </span>
            <p style={{color:"white"}}>
              {numberCart}
            </p>
          </Button>
          <Link to="/sign-in">
            <Button className='btnsidebar' variant="warning">
              <small className="text">Signin/Signup</small>
              <span className="material-symbols-outlined">
                Person
              </span>
            </Button>
          </Link>
        </div>
      </div>

      <Modal  size="sm" show={showModal} onHide={closeModal}   centered>
  <Modal.Header closeButton>
    <Modal.Title style={{ textAlign: 'center' }}>No items in the cart</Modal.Title>
  </Modal.Header>
  <Modal.Footer>
    <Button variant="primary" onClick={closeModal}>
      Close
    </Button>
  </Modal.Footer>
</Modal>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    numberCart: state._todoProduct.numberCart
  }
}

export default connect(mapStateToProps, null)(Cartcount);
