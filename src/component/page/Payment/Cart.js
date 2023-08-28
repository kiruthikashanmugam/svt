import React from 'react';
import Header from '../../Layout/Header';
import Temple4 from '../Templehistory/Temple4';
import Banner from "../../Layout/Banner"
import { connect } from 'react-redux';
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../Addtocart/Actions/cartActions';
import { Card } from 'reactstrap';
import { v4 as uuidv4 } from 'uuid';

import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Helmet } from 'react-helmet';


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
                if (response.data.trim() === 'Order created successfully') {
                    navigate('/payment');
                }
                if (response.data.trim() === 'Failed to update order') {
                    navigate('/payment');
                }
            })
            .catch((error) => {
                console.error(error);
            });
    };
    function TotalPrice(service_fees, quantity) {
        return Number(service_fees * quantity).toLocaleString('en-US');
    }

    return (
        <div>
            <Helmet>
                <title>Cart</title>
            </Helmet>
            <Header />
            <Banner />
            {/* <!--Cart Start --> */}
            <div className="section">
                <form>
                    <div className="container">
                        {ListCart.length === 0 ? (
                           <Card>  <div style={{textAlign:"center",padding:"20px"}}>No items in the cart</div></Card>
                          
                        ) : (
                            <>
                                <table className="sigma_responsive-table">
                                    <thead>
                                        <tr>
                                            <th className="remove-item"></th>
                                            <th>Product</th>
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Total</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ListCart.map((item, key) => (
                                            <tr key={key}>
                                                <input type="hidden" name="_id" value={item._id} style={styles.input} />
                                                <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />
                                                <input type="hidden" name="service_category" value={item.service_category} style={styles.input} />
                                                <td className="remove">
                                                    <span
                                                        className="material-symbols-outlined"
                                                        style={{ fontSize: '18px', cursor: 'pointer' }}
                                                        onClick={() => DeleteCart(key)}
                                                    >
                                                        delete
                                                    </span>
                                                </td>
                                                <td data-title="Product">
                                                    <div className="sigma_cart-product-wrapper">
                                                        <div className="sigma_cart-product-body">
                                                            <h6>
                                                                <a href="#">
                                                                    <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly />
                                                                </a>
                                                            </h6>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td data-title="Price">
                                                    <strong>
                                                        <input type="text" name="service_fees" value={item.service_fees} style={styles.input} readOnly />
                                                    </strong>
                                                </td>
                                                <td className="quantity" data-title="Quantity">
                                                    <div style={styles.cartItemInfo}>
                                                        <span
                                                            className="btn btn-primary"
                                                            style={{ margin: '4px', color: '#4a4840', background: '#dbd0d0', border: 'none', lineHeight: '10px', fontSize: '13px', borderRadius: '0' }}
                                                            onClick={() => DecreaseQuantity(key)}
                                                        >
                                                            -
                                                        </span>
                                                        <input
                                                            type="number"
                                                            name="quantity"
                                                            value={item.quantity}
                                                            style={{ ...styles.quantityInput, textAlign: 'center', fontSize: '12px', width: '44px' }}
                                                            contentEditable
                                                        />
                                                        <span
                                                            className="btn btn-primary"
                                                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px', color: '#4a4840', background: '#dbd0d0', border: 'none', lineHeight: '10px', fontSize: '13px', width: '30px', borderRadius: '0' }}
                                                            onClick={() => IncreaseQuantity(key)}
                                                        >
                                                            +
                                                        </span>
                                                    </div>
                                                </td>
                                                <td data-title="Total">
                                                    <strong>{TotalPrice(item.service_fees, item.quantity)} $</strong>
                                                </td>
                                            </tr>
                                        ))}
                                        {TotalCart !== 0 && (
                                            <tr className="total">
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <h6 className="mb-0">Grand Total</h6>
                                                </td>
                                                <td>
                                                    <strong>
                                                        <input
                                                            type="text"
                                                            name="carttotal[]"
                                                            value={Number(TotalCart).toLocaleString('en-US')}
                                                            style={{
                                                                border: 'none',
                                                                outline: 'none',
                                                                width: '20%',
                                                                fontWeight: '700',
                                                                color: '#db4242'
                                                            }}
                                                            readOnly
                                                        />
                                                    </strong>
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                                <div className="col-md-2" style={{ float: 'right' }}>
                                    <button type="submit" onClick={(e) => handleData(e, ListCart, TotalCart)} className="sigma_btn-custom primary d-block w-100">
                                        Checkout
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </form>

            </div>
            {/* <!-- Cart End --> */}



            <Temple4 />


        </div>
    )
}

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

    },
};

const mapStateToProps = (state) => {
    return {
        items: state._todoProduct,
    };
};
export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Cart);