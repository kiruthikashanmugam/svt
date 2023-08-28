
import React from 'react';
import { connect } from 'react-redux';
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../Actions/cartActions';

import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {  Container } from 'reactstrap';

function Add({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {

  const navigate = useNavigate();

  let ListCart = [];
  let TotalCart = 0;

  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].service_fees;
    ListCart.push(items.Carts[item]);
  });

  const handleData = (e, ListCart, carttotal) => {
    e.preventDefault();
    const cartId = localStorage.getItem('cartId') || uuidv4();
    const user_id = localStorage.getItem('user_id');

    const formDatas = [];

    ListCart.forEach((item) => {
      const formData = new FormData();
      formData.append('_id', item._id);
      formData.append('service_category', item.service_category);
      formData.append('service_subcategory', item.service_subcategory);

      formData.append('service_name', item.service_name);
      formData.append('service_fees', item.service_fees);
      formData.append('quantity', item.quantity);

      formDatas.push(formData);
    });

    checkout(formDatas, cartId, user_id, carttotal);

  };

  const checkout = (formDatas, cartId, user_id, carttotal) => {
    const payload = formDatas.map((formData) => {
      const plainObject = {};
      for (const [key, value] of formData.entries()) {
        plainObject[key] = value;
      }
      return plainObject;
    });


    axios
      .post('https://svt.know3.com/api/add_order', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          carttotal,
          cartId,
          user_id
        }
      })
      .then((response) => {
        if (response.data.trim() === 'Order created successfully') {
          navigate('/cart');
        }
        if (response.data.trim() === 'Failed to update order') {
          navigate('/cart');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (

    <div >

      <Container>
        <div className="row">

          <form>
            <div class="post-detail-wrapper" style={{ padding: "15px", backgroundColor: "#f7f0f4", border: "none" }}>
              <h5 style={{ textAlign: 'center', fontSize: '18px' }}>ORDER SUMMARY</h5>
              {ListCart.length > 0 ? (
                ListCart.map((item, key) => (
                  <div className="sigma_cart-product-body" key={key}>
                    <input type="hidden" name="_id" value={item._id} style={styles.input} />
                    <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />


                    <input type="hidden" name="service_category" value={item.service_category} style={styles.input} />
                    <div>
                      
                      <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly />
                      <br></br>
                    </div>
                    <div style={styles.cartItemInfo}>
                    <span className="btn btn-primary" style={{ margin: '4px', color: '#4a4840', background: '#dbd0d0', border: 'none', lineHeight: '10px', fontSize: '13px', borderRadius: '0' }} onClick={() => DecreaseQuantity(key)}>
                        -
                      </span>
                      <input
                        type="number"
                        name="quantity"
                        value={item.quantity}
                        style={{ ...styles.quantityInput, textAlign: 'center', fontSize: '12px', width: '44px' }}
                        contentEditable
                      />
                      <span className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px', color: '#4a4840', background: '#dbd0d0', border:"none", lineHeight: '10px', fontSize: '13px', width: '30px', borderRadius: '0' }} onClick={() => IncreaseQuantity(key)}>
                        +
                      </span>
                      <span style={{ marginLeft: '7px', fontSize: '13px' }}>$</span>
                      <input type="text" name="service_fees" value={item.service_fees} style={{ ...styles.input, marginLeft: '1px' }} readOnly />
                      <span class="material-symbols-outlined" style={{ fontSize: '18px', cursor: "default" }} onClick={() => DeleteCart(key)}>
                        delete
                      </span>
                    </div>
                    <hr style={{margin:"13px"}}/>
                  </div>
                ))
              ) : (
                <span style={{ textAlign: 'center', marginTop: '3px' }}>No items in the cart</span>
              )}
              
              <div style={styles.totalCart}>

                <span>
                  {TotalCart !== 0 && (
                    <div style={styles.totalCart}>
                      <span>
                        Total Cart Value:{' '}
                        <input
                          type="text"
                          name="carttotal[]"
                          value={Number(TotalCart).toLocaleString('en-US')}
                          style={{ border: 'none', outline: 'none', width: '20%', backgroundColor: "#f7f0f4",color: "#db4242",
                          fontWeight: "700" }}
                          readOnly
                        />
                      </span>
                    </div>
                  )}

                </span>

              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '40px' }}>

              <a class="sigma_btn-custom secondary" onClick={(e) => handleData(e, ListCart, TotalCart)} style={{ marginLeft: "240px" }}>Checkout</a>


            </div>
          </form>
        </div>

      </Container>



    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    items: state._todoProduct,
  };
};

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  cartItemInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    marginRight: '10px',
    backgroundColor: "#f7f0f4",
    color: "#db4242",
    fontFamily: "Poppins",
    lineHeight: "1.2",
    fontWeight: "700",
  },
  quantityInput: {
    width: '15%',
  },
  multiplier: {
    marginRight: '10px',
    marginLeft: '10px',
  },
  totalCart: {
    textAlign: 'right',
    marginTop: '10px',
    backgroundColor: "#f7f0f4"
  },
};

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Add);



