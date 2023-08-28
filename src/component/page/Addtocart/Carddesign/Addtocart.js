



import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../Actions/cartActions';

import Container from 'react-bootstrap/esm/Container';

import axios from 'axios';
import React from 'react';

import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import Header from "../../../Layout/Header";
import Section1 from "../../Home/Section1";
import Temple4 from "../../Templehistory/Temple4";



function Cart({ items, IncreaseQuantity, DecreaseQuantity, DeleteCart }) {

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
        if (response.data.trim() === 'Order updated successfully') {
          navigate('/cart');
        }
        if (response.data.trim()=== 'Failed to update order') {
          navigate('/cart');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <div>
      <Header />
      <Section1 />
      <Container>
{/*         
    <!--Cart Start --> */}
  <div class="section">
    <div class="container">

      {/* <!-- Cart Table Start --> */}
      <table class="sigma_responsive-table">
        <thead>
          <tr>
            <th class="remove-item"></th>
            <th>Product</th>
            <th>Price</th>
            <th>Qunantity</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
        {ListCart.length > 0 ? (
                ListCart.map((item, key) => (
                  <div key={key}>
          <tr>
          <span class="material-symbols-outlined" style={{ fontSize: '18px',cursor:"default"  }} onClick={() => DeleteCart(key)}>
                      delete
                    </span>
            {/* <td class="remove">
              <button type="button" class="close-btn close-danger remove-from-cart">
                <span></span>
                <span></span>
              </button>
            </td> */}
            <input type="hidden" name="_id" value={item._id} style={styles.input} />
                    <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />

            <td data-title="Product">
              <div class="sigma_cart-product-wrapper">
                <img src="assets/img/products/1.jpg" alt="prod1"/>
                <div class="sigma_cart-product-body">
                  <h6> <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly /> </h6>
                 
                </div>
              </div>
            </td>
            <td data-title="Price"> <strong>12.99$</strong> </td>
            
            <td class="quantity" data-title="Quantity">
            <span className="btn btn-primary" style={{ margin: '4px', color: 'blue', background: 'white', border: '1px solid black', lineHeight: '10px', fontSize: '13px' , borderRadius: '0' }} onClick={() => DecreaseQuantity(key)}>
                      -
                    </span>
                      <input
                      type="number"
                      name="quantity"
                      value={item.quantity}
                      style={{ ...styles.quantityInput, textAlign: 'center' , fontSize: '13px', width:'65px' }}
                      contentEditable
                    />
                      <span className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center',margin: '4px',color:'blue' , background:'white' , border: '1px solid black' , lineHeight: '10px' , fontSize: '13px' , width: '30px' , borderRadius: '0' }} onClick={() => IncreaseQuantity(key)}>
                      +
                    </span>
              {/* <input type="number" class="qty form-control" value="1"/> */}
            </td>
            <td data-title="Total"> <strong>12.99$</strong> </td>
          </tr>
         
           
          
          </div>
          ))
              ) : (
                <span style={{ textAlign: 'center', marginTop: '3px' }}>No items in the cart</span>
              )}
              

        </tbody>
      </table>
      {/* <!-- Cart Table End --> */}
     
      <div class="col-md-2" style={{float: "right"}}>
      <button type="submit" class="sigma_btn-custom primary d-block w-100">Checkout</button>
    </div>

    </div>
  </div>
  {/* <!-- Cart End --> */}




      </Container>
      <Temple4/>
    </div>
  );
}

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px'
  },
  cartItemInfo: {
    display: 'flex',
    alignItems: 'center'
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    marginRight: '10px'
  },
  quantityInput: {
    width: '30%',
    alignItems: 'center'
  },
  multiplier: {
    marginRight: '10px',
    marginLeft: '10px'
  },
  totalCart: {
    textAlign: 'right',
    marginTop: '10px'
  }
};
const mapStateToProps = state => {

  return {
    items: state._todoProduct
  }
}

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Cart)



