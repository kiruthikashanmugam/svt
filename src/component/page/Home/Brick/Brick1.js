import React, { useEffect } from 'react';
import Header from '../../../Layout/Header';
import Banner from '../../../Layout/Banner';
import Temple4 from '../../Templehistory/Temple4';
import Cartcount from '../../Cart/Cartcount';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { actFetchProductsRequest, AddCart } from "../../Addtocart/Actions/cartActions";
import { connect, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import Add from '../../Addtocart/Carddesign/Add';
import { Helmet } from 'react-helmet';
import { Card } from 'reactstrap';


function Brick1() {
  const { service_category, subcategory } = useParams();

  const [pooja, setPoojas] = useState([]);
  const [carttotal, setTotalCart] = useState(0);
  const [modifiedFees, setModifiedFees] = useState({});
  const dispatch = useDispatch();
  const { _products } = useSelector((state) => state._todoProduct);







  useEffect(() => {

    axios.get(`https://svt.know3.com/api/pujacat/${encodeURIComponent(service_category)},${encodeURIComponent(subcategory)}`)
      .then((response) => {
        const poojasData = response.data;
        setPoojas(poojasData);
        console.log(poojasData);
        calculateTotalCart(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
    dispatch(actFetchProductsRequest());
  }, [service_category, subcategory, dispatch]);




  const handleServiceFeesChange = (e, _id) => {
    const { value } = e.target;
    if (value >= 0) {
      setModifiedFees((prevModifiedFees) => ({
        ...prevModifiedFees,
        [_id]: value,
      }));
    } else {
      alert("Fees cannot be negative");
    }
  };


  const addToCart = (pooja, cartId) => {
    let newCartId = cartId || localStorage.getItem('cartId');

    if (!newCartId) {
      newCartId = uuidv4();
      localStorage.setItem('cartId', newCartId);
    }

    const selectedServiceFees = modifiedFees[pooja._id] || pooja.service_fees;

    if (selectedServiceFees > 0) {
      const updatedData = { ...pooja, service_fees: selectedServiceFees };
      dispatch(AddCart(updatedData, newCartId)); // Pass the newCartId along with the service data
    } else {
      alert("Fees should be greater than 0");
    }
  };



  const calculateTotalCart = (cartItems) => {
    let total = 0;

    cartItems.forEach((item) => {
      const itemTotal = parseInt(item.service_qty) * parseFloat(item.service_fees);

      total += itemTotal;
    });
    setTotalCart(total);
  };





  if (_products.length > 0) {
    return (
      <div>
        <Helmet>
          <title>Services</title>
        </Helmet>
        <Header />
        <Cartcount />
        <Banner />
        <div class="section section-padding">
          <div class="container">
            <div class="row">
              <div class="col-lg-8 col-md-7">
                <div class="post-detail-wrapper" style={{ padding: "15px", backgroundColor: " #f6f6f6", border: " none" }}>
                  <h5>Services</h5>
                  <table class="sigma_responsive-table">
                    <thead>
                      {pooja.length===0 ?(
                             <div style={{textAlign:"center",padding:"20px"}}>No items in the cart</div>
                      ):(
                        <tr>
                        <th>Product</th>
                        <th>Fees</th>
                        <th>Add to cart</th>
                      </tr>
                     
                      )}
                     
                    </thead>
                    <tbody>
                    
                      {pooja.map((tdata, index) => {
                        const _id = index + 1;
                        return (
                          <tr key={tdata._id}>
                            <input type="hidden" name={tdata.service_category} />
                            <td data-title="Product">
                              <div class="sigma_cart-product-wrapper">
                                <div class="sigma_cart-product-body">
                                  <h6> {tdata.service_name}</h6>
                                </div>
                              </div>
                            </td>
                            <td data-title="Price">
                              

                                {tdata.service_fees !== null ? (
                                  <input
                                    type="number"
                                    name="service_fees"
                                    id="serviceFeesInput"
                                    min={0}
                                    value={tdata.service_fees}
                                    placeholder="0.00"
                                    className="form-control"
                                    style={{ border: "1px solid #efefef" }}
                                    readOnly
                                  />
                                ) : (
                                  <input
                                    type="number"
                                    name="service_fees"
                                    id="serviceFeesInput"
                                    min={0}
                                    value={modifiedFees[tdata._id] || ""}
                                    placeholder="0.00"
                                    className="form-control"
                                    onChange={(e) => handleServiceFeesChange(e, tdata._id)}
                                    style={{ border: "none" }}
                                  />
                                )}

                           
                            </td>
                            <td data-title="Total"><button class="btn" style={{ backgroundColor: "#FFE569" }} onClick={() => addToCart(tdata, localStorage.getItem('cartId'))}>Add to cart</button></td>
                          </tr>
                        );

                      })}

                    </tbody>
                  </table>
                </div>
              </div>
              <div class="col-md-4 checkout-billing">
                <Add />


              </div>
            </div>
          </div>
        </div>








        <Temple4 />




      </div>
    )
  }
}



export default connect(null, { actFetchProductsRequest, AddCart })(Brick1);


