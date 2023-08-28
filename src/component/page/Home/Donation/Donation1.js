
import React, { useState, useEffect } from 'react';
import Header from '../../../Layout/Header';
import Banner from '../../../Layout/Banner';
import Temple4 from '../../Templehistory/Temple4';
import Cartcount from '../../Cart/Cartcount';
import axios from 'axios';
import Add from '../../Addtocart/Carddesign/Add';

import { actFetchProductsRequest, AddCart } from '../../Addtocart/Actions/cartActions';
import { connect, useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { Helmet } from 'react-helmet';
import loader from '../../../../Loader.gif';




const Donation1 = () => {
    const [loading, setLoading] = useState(true);
    const [tableData, setTableData] = useState([]);


    const [carttotal, setTotalCart] = useState(0);


    const [modifiedFees, setModifiedFees] = useState({});


    const dispatch = useDispatch();
    const { _products } = useSelector((state) => state._todoProduct);

    useEffect(() => {
        getData();
        fetchDatas()

        setTimeout(() => {
            setLoading(false);
        }, 3000);
        dispatch(actFetchProductsRequest());
    }, [dispatch]);


    const getData = () => {
        axios
            .get(`https://svt.know3.com/api/donationcat/Donation`, {})
            .then((response) => {
                const data = response.data;
                setTableData(data);
            })
            .catch((error) => {
                console.error(error);
                // Handle error, display error message or take appropriate action
            });
    };




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




    const addToCart = (tdata, cartId) => {
        let newCartId = cartId || localStorage.getItem('cartId');

        if (!newCartId) {
            newCartId = uuidv4();
            localStorage.setItem('cartId', newCartId);
        }

        const selectedServiceFees = modifiedFees[tdata._id] || tdata.service_fees;

        if (selectedServiceFees > 0) {
            const updatedData = { ...tdata, service_fees: selectedServiceFees };
            dispatch(AddCart(updatedData, newCartId)); // Pass the newCartId along with the service data
        } else {
            alert("Fees should be greater than 0");
        }
    };


    useEffect(() => {
        setLoading(false)
    }, [])



    //viewcart api
    const fetchDatas = () => {
        const cartId = localStorage.getItem('cartId') || uuidv4();

        axios
            .get(`https://svt.know3.com/api/view_cart/${cartId}`, {})
            .then((response) => {

                calculateTotalCart(response.data);


            })
            .catch((error) => {
                console.error(error);
            });
    };




    const calculateTotalCart = (cartItems) => {
        let total = 0;

        cartItems.forEach((item) => {
            const itemTotal = parseInt(item.service_qty) * parseFloat(item.service_fees);

            total += itemTotal;
        });
        setTotalCart(total);
    };


    if (loading) {
        return (
            <div>
                <div style={{ width: '100%', backgroundColor: "white", textAlign: 'center', marginTop: '300px' }}>
                    <img src={loader} alt='Loading Please Wait...'></img>
                </div>
            </div>
        );
    }

    let temp = 0;

    if (_products.length > 0) {
        return (
            <>
                <Helmet>
                    <title>Services</title>
                </Helmet>
                <Header />
                <Banner />
                <Cartcount />
                <div class="section section-padding">
                    <div class="container">
                        <div class="row">
                            <div class="col-lg-8 col-md-7">
                                <div class="post-detail-wrapper" style={{ padding: "15px", backgroundColor: " #f6f6f6", border: " none" }}>
                                    <h5>Services</h5>
                                    <table class="sigma_responsive-table">
                                        <thead>
                                            <tr>
                                                <th>Service Name</th>
                                                <th>Service Fees</th>
                                                <th>Add to cart</th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {tableData.map((tdata, index) => {
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
            </>
        );
    }
}


export default connect(null, { actFetchProductsRequest, AddCart })(Donation1);