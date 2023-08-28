

// import React, { useState, useEffect } from 'react';
// import Form from 'react-bootstrap/Form';
// import { v4 as uuidv4 } from 'uuid';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { connect } from "react-redux";
// import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../Addtocart/Actions/cartActions';
// import { Helmet } from 'react-helmet';
// import loader from '../../../Loader.gif';

// function Payment1({ items }) {
//   const [user, setUser] = useState({});
//   const [error, setError] = useState({});
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate()

//   // pay
//   const [tableDatas, setTableDatas] = useState([]);
//   const [carttotal, setTotalCart] = useState(0);

//   const handleChange = (e) => {
//     setUser((prevUser) => ({
//       ...prevUser,
//       [e.target.name]: e.target.value
//     }));
//   };


//   let ListCart = [];
//   let TotalCart = 0;




//   Object.keys(items.Carts).forEach(function (item) {
//     TotalCart += items.Carts[item].quantity * items.Carts[item].service_fees;
//     ListCart.push(items.Carts[item]);
//   });





//   const userRegistration = (e, order_id) => {
//     e.preventDefault();
//     const cartId = localStorage.getItem('cartId') || uuidv4();




//     if (validateForm()) {
//       const userData = {
//         firstname: user.firstname,
//         lastname: user.lastname,
//         mobileno: user.mobileno,
//         address: user.address,
//         country: user.country,
//         nakshatra: user.nakshatra,
//         gothra: user.gothra,
//         state: user.state,
//         city: user.city,
//         useremail: user.useremail,
//         zipcode: user.zipcode,
//         cartId: cartId,
//         order_id: localStorage.getItem("order_id")

//       };


//       fetchData(userData);
//     }
//   };

//   useEffect(() => {

//     fetchDatas()

  
//   // setTimeout(() => {
//   //     setLoading(false);
//   //   }, 3000);
//   }, []);
//   //form
//   const fetchData = (userData, order_id) => {

//     console.log(order_id);
//     axios.post('https://svt.know3.com/api/add_buyerinfo', userData, {
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       params: {
//         order_id
//       }
//     })
//       .then(response => {
//         console.log(response.data);
//         if (response.data.trim() === "userdata already exists" || "data inserted successfully") {
//           navigate("/payment")
//         }

//       })
//       .catch((error) => {
//         console.error(error);
//       }).finally(()=>{
//         setLoading(false)
//       })
//   };


//   //   //viewcart api
//   const fetchDatas = () => {
//     const cartId = localStorage.getItem('cartId') || uuidv4();

//     axios
//       .get(`https://svt.know3.com/api/view_cartdet/${cartId}`, {})
//       .then((response) => {
//         setTableDatas(response.data);
//         const order_id = response.data[0]?.order_id;
//         localStorage.setItem('order_id', order_id);


//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };




//   const calculateTotalCart = (cartItems) => {
//     let total = 0;

//     cartItems.forEach((item) => {
//       item.products.forEach((product) => {
//         const itemTotal = parseInt(product.service_qty) * parseFloat(product.service_fees);
//         total += itemTotal;
//       });
//     });

//     setTotalCart(total);
//   };

//   useEffect(() => {
//     calculateTotalCart(tableDatas); // Calculate the total when cart items change
//   }, [tableDatas]);

 
//   //payment
//   const paynow = () => {
//     if (validateForm()) {
//       axios
//         .post(`https://svt.know3.com/api/checkout/${localStorage.getItem("order_id")}`)
//         .then((response) => {
//           try {
//             console.log(response); // Log the response object

//             const redirectUrl = response.data.url;

//             if (redirectUrl) {
//               window.location.href = redirectUrl; // Redirect the user to the provided URL
//             } else {
//               console.error("Redirect URL not found in the response.");
//             }
//           } catch (error) {
//             console.error("Error logging response: ", error);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching data: ", error);
//           setError(error);
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     }
//   };

//   if (loading) {
//     return (
//       <div>
//         <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '280px' }}>
//           <img src={loader} alt='Loading Please Wait...'></img>
//         </div>
//       </div>
//     );
//   }

//   const validateForm = () => {
//     let error = {};
//     let formIsValid = true;


//     if (!user.firstname) {
//       formIsValid = false;
//       error["firstname"] = "Please enter the first name";
//     }
//     if (typeof user["firstname"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!user["firstname"].match(regex)) {
//         formIsValid = false
//         error["firstname"] = "First name contains only text characters "
//       }
//     }


//     if (!user.lastname) {
//       formIsValid = false;
//       error["lastname"] = "Please enter the last name";
//     }
//     if (typeof user["lastname"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!user["lastname"].match(regex)) {
//         formIsValid = false
//         error["lastname"] = "Last name contains only text characters "
//       }
//     }
//     if (typeof user["gothra"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!user["gothra"].match(regex)) {
//         formIsValid = false
//         error["gothra"] = "Gothra contains only text characters "
//       }
//     }
//     if (typeof user["city"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!user["city"].match(regex)) {
//         formIsValid = false
//         error["city"] = "city contains only text characters "
//       }
//     }

//     if (typeof user["mobileno"] !== "undefined") {

//       if (!user["mobileno"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
//         formIsValid = false
//         error["mobileno"] = "Mobile Number should be 10 digits"
//       }
//     }
//     if (!user.useremail) {
//       formIsValid = false;
//       error["useremail"] = "Please enter the email";
//     }
//     if (typeof user["useremail"] !== "undefined") {
//       var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
//       if (!user["useremail"].match(pattern)) {
//         formIsValid = false
//         error["useremail"] = " Email contains character (A-Z or a-z), numbers (0-9) and special characters “.”, “@”, “_”. Work Email should contain at least minimum 5 characters."
//       }
//     }


//     if (typeof user["zipcode"] !== "undefined") {
//       var patterns = new RegExp(/^[0-9]+$/);
//       if (!user["zipcode"].match(patterns)) {
//         formIsValid = false
//         error["zipcode"] = "Zipcode contain only number"
//       }
//     }


//     setError(error);
//     return formIsValid;
//   };

//   function TotalPrice(service_fees, quantity) {
//     return Number(service_fees * quantity).toLocaleString('en-US');
//   }

//   return (
//     <div>
//       <Helmet>
//         <title>BillingDetails</title>
//       </Helmet>
//       {/* <!-- Checkout Start --> */}
//       <div className="section">
//         <div className="container">

//           <form method="post" onSubmit={userRegistration}>
//             <div className="row">
//               <div className="col-xl-7">


//                 <h4>Billing Details</h4>
//                 <div className="row">
//                   <div className="form-group col-xl-6">
//                     <label>First Name <span className="required"> * </span> </label>
//                     <input type="text" className="form-control" name="firstname" onChange={handleChange} />
//                     {error && error["firstname"] && (
//                       <div className="error">{error["firstname"]}</div>
//                     )}
//                   </div>

//                   <div className="form-group col-xl-6">
//                     <label>Last Name <span className="required">*</span></label>
//                     <input type="text" className="form-control" name="lastname" onChange={handleChange} />
//                     {error && error["lastname"] && (
//                       <div className="error">{error["lastname"]}</div>
//                     )}
//                   </div>

//                   <div className="form-group col-xl-6">
//                     <label>Mobile Number </label>
//                     <input type="tel" className="form-control" name="mobileno" onChange={handleChange} />
//                     {error && error["mobileno"] && (
//                       <div className="error">{error["mobileno"]}</div>
//                     )}
//                   </div>

//                   <div className="form-group col-xl-6">
//                     <label >Email Id <span className="required">*</span></label>
//                     <input type="email" className="form-control" name="useremail" onChange={handleChange} />
//                     {error && error["useremail"] && (
//                       <div className="error">{error["useremail"]}</div>
//                     )}
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label >Nakshatra</label>
//                     <Form.Select id="country" name="nakshatra" style={{ height: "45px" }} onChange={handleChange} >
//                       <option>Not Known</option>
//                       <option>Chitira [Tula]</option>
//                       <option value="India">Chitira[kanya]</option>
//                       <option value="Canada">Hastha [kanya]</option>
//                     </Form.Select>

//                   </div>

//                   <div className="form-group col-xl-6">
//                     <label >Gothra</label>
//                     <input type="text" className="form-control" name="gothra" onChange={handleChange} />
//                     {error && error["gothra"] && (
//                       <div className="error">{error["gothra"]}</div>
//                     )}
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label>Address</label>
//                     <input type="text" className="form-control" name="address" onChange={handleChange} />
//                     {error && error["address"] && (
//                       <div className="error">{error["address"]}</div>
//                     )}
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label>City</label>
//                     <input type="text" className="form-control" name="city" onChange={handleChange} />
//                     {error && error["city"] && (
//                       <div className="error">{error["city"]}</div>
//                     )}
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label >Country</label>
//                     <Form.Select id="country" name="country" onChange={handleChange} >
//                       <option></option>
//                       <option>United states of America</option>
//                       <option value="India">India</option>
//                       <option value="Canada">Canada</option>
//                       <option value="Saudi Arabia">Saudi Arabia</option>
//                     </Form.Select>
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label >State</label>
//                     <Form.Select id="state" name="state" style={{ height: "45px" }} onChange={handleChange} >
//                       <option></option>
//                       <option value="Alabama">Alabama</option>
//                       <option value="Alaska">Alaska</option>
//                       <option value="Arizona">Arizona</option>
//                       <option value="California">California</option>
//                     </Form.Select>
//                   </div>
//                   <div className="form-group col-xl-6">
//                     <label>Zipcode</label>
//                     <input type="text" className="form-control" name="zipcode" onChange={handleChange} />
//                     {error && error["zipcode"] && (
//                       <div className="error">{error["zipcode"]}</div>
//                     )}
//                   </div>

//                 </div>
//                 {/* <!-- Buyer Info End --> */}

//               </div>
//               <div className="col-xl-5 checkout-billing">
//                 <div class="post-detail-wrapper" style={{ padding: "15px", border: "none" }}>
//                   <h4>ORDER SUMMARY</h4>
//                   {/* <!-- Order Details Start --> */}
//                   <table className="sigma_responsive-table">
//                     <thead>
//                       <tr>
//                         <th>Product</th>
//                         <th>Qunantity</th>
//                         <th>Total</th>
//                       </tr>
//                     </thead>
//                     <tbody>

//                       {ListCart.length > 0 ? (
//                         ListCart.map((item, key) => (


//                           <tr key={key}>
//                             <input type="hidden" name="_id" value={item._id} style={styles.input} />
//                             <input type="hidden" name="service_category" value={item.service_category} style={styles.input} />

//                             <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />
//                             <td data-title="Product">
//                               <div className="sigma_cart-product-wrapper">
//                                 <div className="sigma_cart-product-body">
//                                   <h6>{item.service_name}</h6>
//                                   {/* <h6>  <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly /> </h6> */}

//                                 </div>
//                               </div>
//                             </td>
//                             <td data-title="Quantity">
//                               {item.quantity}
//                             </td>
//                             <td data-title="Total"> <strong>  <input type="text" name="service_fees" value={TotalPrice(item.service_fees, item.quantity)} $ style={{ ...styles.input, marginLeft: '1px' }} readOnly /></strong> </td>
//                           </tr>





//                         ))
//                       ) : (
//                         <span style={{ textAlign: 'center', marginTop: '3px' }}>No items in the cart</span>
//                       )}
//                       {TotalCart !== 0 && (
//                         <tr className="total">
//                           <td></td>
//                           <td> <h6 className="mb-0">Grand Total</h6></td>

//                           <td><strong> <input
//                             type="text"
//                             name="carttotal[]"
//                             value={Number(TotalCart).toLocaleString('en-US')}
//                             style={{
//                               border: 'none', outline: 'none', width: '100%', fontWeight: "700",
//                               color: "#db4242"
//                             }}
//                             readOnly
//                           /></strong></td>

//                         </tr>
//                       )}





//                     </tbody>
//                   </table>


//                   <p className="small">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className="btn-link" href="#">privacy policy.</a> </p>


//                   <input type="hidden" name="url" value="url" />
//                   <button type="submit" className="sigma_btn-custom primary d-block w-100" onClick={paynow}>Checkout</button>




//                   {/* <!-- Order Details End --> */}

//                 </div>
//               </div>
//             </div>
//           </form>

//         </div>
//       </div>
//       {/* <!-- Checkout End --> */}

//     </div>
//   )
// }

// const styles = {
//   cartItem: {
//     display: 'flex',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: '10px'
//   },
//   cartItemInfo: {
//     display: 'flex',
//     alignItems: 'center'
//   },
//   input: {
//     border: 'none',
//     outline: 'none',
//     width: '100%',
//     marginRight: '10px'
//   },
//   quantityInput: {
//     width: '30%',
//     alignItems: 'center'
//   },
//   multiplier: {
//     marginRight: '10px',
//     marginLeft: '10px'
//   },
//   totalCart: {
//     textAlign: 'right',
//     marginTop: '10px'
//   }
// };
// const mapStateToProps = state => {

//   return {
//     items: state._todoProduct
//   }
// }

// export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Payment1)

import React, { useState, useEffect } from 'react';
import Form from 'react-bootstrap/Form';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { connect } from "react-redux";
import { IncreaseQuantity, DecreaseQuantity, DeleteCart } from '../Addtocart/Actions/cartActions';
import { Helmet } from 'react-helmet';
import loader from '../../../Loader.gif';
import { Country, State } from 'country-state-city';
import Select from 'react-select';


function Payment1({ items }) {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);

  // pay
  const [tableDatas, setTableDatas] = useState([]);
  const [carttotal, setTotalCart] = useState(0);

  const handleChange = (e) => {
    setUser((prevUser) => ({
      ...prevUser,
      [e.target.name]: e.target.value
    }));
  };


  let ListCart = [];
  let TotalCart = 0;




  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].service_fees;
    ListCart.push(items.Carts[item]);
  });





  const userRegistration = (e, order_id) => {
    e.preventDefault();
    const cartId = localStorage.getItem('cartId') || uuidv4();




    if (validateForm()) {
      const userData = {
        firstname: user.firstname,
        lastname: user.lastname,
        mobileno: user.mobileno,
        address: user.address,
        country: user.country,
        nakshatra: user.nakshatra,
        gothra: user.gothra,
        state: user.state,
        city: user.city,
        useremail: user.useremail,
        zipcode: user.zipcode,
        cartId: cartId,
        order_id: localStorage.getItem("order_id")

      };


      fetchData(userData);
    }
    e.target.reset()
  };

  useEffect(() => {

    fetchDatas()
  }, []);
  //form
  const fetchData = (userData, order_id) => {

    console.log(order_id);
    axios.post('https://svt.know3.com/api/add_buyerinfo', userData, {
      headers: {
        'Content-Type': 'application/json'
      },
      params: {
        order_id
      }
    })
      .then(response => {
        console.log(response.data);
        if (response.data.trim() === "userdata already exists" || "data inserted successfully") {
          navigate("/payment")
        }

      })

      .catch((error) => {
        console.error(error);
      }).finally(() => {
        setLoading(false)
      })
  };


  //   //viewcart api
  const fetchDatas = () => {
    const cartId = localStorage.getItem('cartId') || uuidv4();

    axios
      .get(`https://svt.know3.com/api/view_cartdet/${cartId}`, {})
      .then((response) => {
        setTableDatas(response.data);
        const order_id = response.data[0]?.order_id;
        localStorage.setItem('order_id', order_id);


      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };




  const calculateTotalCart = (cartItems) => {
    let total = 0;

    cartItems.forEach((item) => {
      item.products.forEach((product) => {
        const itemTotal = parseInt(product.service_qty) * parseFloat(product.service_fees);
        total += itemTotal;
      });
    });

    setTotalCart(total);
  };

  useEffect(() => {
    calculateTotalCart(tableDatas); // Calculate the total when cart items change
  }, [tableDatas]);


  //payment
  const paynow = () => {
    if (validateForm()) {
      axios
        .post(`https://svt.know3.com/api/checkout/${localStorage.getItem("order_id")}`)
        .then((response) => {
          try {
            console.log(response); // Log the response object

            const redirectUrl = response.data.url;

            if (redirectUrl) {
              window.location.href = redirectUrl; // Redirect the user to the provided URL
            } else {
              console.error("Redirect URL not found in the response.");
            }
          } catch (error) {
            console.error("Error logging response: ", error);
          }
        })
        .catch((error) => {
          console.error("Error fetching data: ", error);
          setError(error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };


  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setUser((prevUser) => ({
      ...prevUser,
      country: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setUser((prevUser) => ({
      ...prevUser,
      state: selectedOption ? selectedOption.label : '',
    }));
  };

  const countryOptions = Country.getAllCountries()
    .filter((country) => ['IN', 'SA', 'US', 'CA'].includes(country.isoCode))
    .map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));


  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
    : [];

  useEffect(() => {
    setLoading(false); // Set loading to false after the component mounts
  }, []);

  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '280px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    let error = {};
    let formIsValid = true;


    if (!user.firstname) {
      formIsValid = false;
      error["firstname"] = "Please enter the first name";
    }
    if (typeof user["firstname"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["firstname"].match(regex)) {
        formIsValid = false
        error["firstname"] = "First name contains only text characters "
      }
    }


    if (!user.lastname) {
      formIsValid = false;
      error["lastname"] = "Please enter the last name";
    }
    if (typeof user["lastname"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["lastname"].match(regex)) {
        formIsValid = false
        error["lastname"] = "Last name contains only text characters "
      }
    }
    if (typeof user["gothra"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["gothra"].match(regex)) {
        formIsValid = false
        error["gothra"] = "Gothra contains only text characters "
      }
    }
    if (typeof user["city"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["city"].match(regex)) {
        formIsValid = false
        error["city"] = "city contains only text characters "
      }
    }

    if (typeof user["mobileno"] !== "undefined") {

      if (!user["mobileno"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        formIsValid = false
        error["mobileno"] = "Mobile Number should be 10 digits"
      }
    }
    if (!user.useremail) {
      formIsValid = false;
      error["useremail"] = "Please enter the email";
    }
    if (typeof user["useremail"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!user["useremail"].match(pattern)) {
        formIsValid = false
        error["useremail"] = " Email contains character (A-Z or a-z), numbers (0-9) and special characters “.”, “@”, “_”. Work Email should contain at least minimum 5 characters."
      }
    }


    if (typeof user["zipcode"] !== "undefined") {
      var patterns = new RegExp(/^[0-9]+$/);
      if (!user["zipcode"].match(patterns)) {
        formIsValid = false
        error["zipcode"] = "Zipcode contain only number"
      }
    }


    setError(error);
    return formIsValid;
  };

  function TotalPrice(service_fees, quantity) {
    return Number(service_fees * quantity).toLocaleString('en-US');
  }

  return (
    <div>
      <Helmet>
        <title>BillingDetails</title>
      </Helmet>
      {/* <!-- Checkout Start --> */}
      <div className="section">
        <div className="container">

          <form method="post" onSubmit={userRegistration}>
            <div className="row">
              <div className="col-xl-7">


                <h4>Billing Details</h4>
                <div className="row">
                  <div className="form-group col-xl-6">
                    <label>First Name <span className="required"> * </span> </label>
                    <input type="text" className="form-control" name="firstname" onChange={handleChange} />
                    {error && error["firstname"] && (
                      <div className="error">{error["firstname"]}</div>
                    )}
                  </div>

                  <div className="form-group col-xl-6">
                    <label>Last Name <span className="required">*</span></label>
                    <input type="text" className="form-control" name="lastname" onChange={handleChange} />
                    {error && error["lastname"] && (
                      <div className="error">{error["lastname"]}</div>
                    )}
                  </div>

                  <div className="form-group col-xl-6">
                    <label >Mobile Number </label>
                    <input type="tel" className="form-control" name="mobileno" onChange={handleChange} />
                    {error && error["mobileno"] && (
                      <div className="error">{error["mobileno"]}</div>
                    )}
                  </div>

                  <div className="form-group col-xl-6">
                    <label >Email Id <span className="required">*</span></label>
                    <input type="email" className="form-control" name="useremail" onChange={handleChange} />
                    {error && error["useremail"] && (
                      <div className="error">{error["useremail"]}</div>
                    )}
                  </div>
                  <div className="form-group col-xl-6">
                    <label >Nakshatra</label>
                    <Form.Select id="country" name="nakshatra" style={{ height: "45px" }} onChange={handleChange} >
                    <option></option>
                                                                    <option value="Aarudhra [Midunam] (Tiruvaadirai)"> Aarudhra [Midunam] (Tiruvaadirai)  </option>
                                                                    <option value="Aaslesha [Katakam] (AAyilyam) ">Aaslesha [Katakam] (AAyilyam) </option>
                                                                    <option value=" Anurada [Vrichchikam] (Anusham)  "> Anurada [Vrichchikam] (Anusham)  </option>
                                                                    <option value=" Asvini [Mesham] (Asvathi)  "> Asvini [Mesham] (Asvathi)  </option>
                                                                    <option value=" Bharani [Mesham] "> Bharani [Mesham] </option>
                                                                    <option value=" Chitira [Kanya] "> Chitira [Kanya] </option>
                                                                    <option value=" Chitira [Rasi-Not-Known] "> Chitira [Rasi-Not-Known] </option>
                                                                    <option value=" Chitira [Tula] "> Chitira [Tula] </option>
                                                                    <option value=" Danishta  [Kumbam] (Avittam)"> Danishta  [Kumbam] (Avittam)  </option>
                                                                    <option value=" Danishta [Makara] (Avittam)  ">  Danishta [Makara] (Avittam)   </option>
                                                                    <option value=" Danishta [Rasi-Not-Known] (Avittam) ">   Danishta [Rasi-Not-Known] (Avittam)  </option>
                                                                    <option value=" Hastha [Kanya] ">   Hastha [Kanya]  </option>
                                                                    <option value=" Jyeshta [Viruchchikam] (Kettai)  ">  Jyeshta [Viruchchikam] (Kettai)    </option>
                                                                    <option value=" Krittikai [Mesham] (Kaarttikai) "> Krittikai [Mesham] (Kaarttikai)    </option>
                                                                    <option value=" Krittikai [Rasi-Not-Known] (Kaarttkai) ">  Krittikai [Rasi-Not-Known] (Kaarttkai)   </option>
                                                                    <option value=" Krittikai [Rishabham] (Kaarttkai)  ">  Krittikai [Rishabham] (Kaarttkai)    </option>
                                                                    <option value=" Makha [Simham] ">  Makha [Simham]   </option>
                                                                    <option value=" Mrigasheersham [Midunam] ">   Mrigasheersham [Midunam]  </option>
                                                                    <option value=" Mrigasheersham [Rasi-Not-Known] ">  Mrigasheersham [Rasi-Not-Known]   </option>
                                                                    <option value=" Mrigasheersham [Rishabham] ">  Mrigasheersham [Rishabham]   </option>
                                                                    <option value=" Mula  [Danur] ">  Mula  [Danur]   </option>
                                                                    <option value=" Poorvaashada [Danur] (Pooraadam)  ">  Poorvaashada [Danur] (Pooraadam)    </option>
                                                                    <option value=" Poorvabhathrapada [Meenam] (Poorattaathi)  ">   Poorvabhathrapada [Meenam] (Poorattaathi)   </option>
                                                                    <option value=" Poorvabhatrapada [Kumbam ] (Poorattathi)  ">  Poorvabhatrapada [Kumbam ] (Poorattathi)    </option>
                                                                    <option value="  Poorvabhatrapada [Rasi-Not-Known] (Poorattathi)  ">  Poorvabhatrapada [Rasi-Not-Known] (Poorattathi)   </option>
                                                                    <option value="  Poorvapalguni [Simham] (Pooram)   "> Poorvapalguni [Simham] (Pooram)     </option>
                                                                    <option value="  Punarvasu  [Katakam] (Punarpoosam)  "> Punarvasu  [Katakam] (Punarpoosam)    </option>
                                                                    <option value=" Punarvasu  [Midunam] (Punarpoosam)   ">  Punarvasu  [Midunam] (Punarpoosam)   </option>
                                                                    <option value="  Punarvasu [Rasi-Not-Known] (Punarpoosam)  ">  Punarvasu [Rasi-Not-Known] (Punarpoosam)   </option>
                                                                    <option value=" Pushya [Katakam] (Poosam)    "> Pushya [Katakam] (Poosam)     </option>
                                                                    <option value=" Revati [Meenam]   ">   Revati [Meenam]  </option>
                                                                    <option value="  Rohini [Rishabham]  "> Rohini [Rishabham]    </option>
                                                                    <option value=" Satabhisha  [Kumbam] (Sadayam)   ">  Satabhisha  [Kumbam] (Sadayam)   </option>
                                                                    <option value=" Sravanam  [Makara] (Thiruvonam)   ">  Sravanam  [Makara] (Thiruvonam)    </option>
                                                                    <option value=" Swathi [Tula]  "> Swathi [Tula]    </option>
                                                                    <option value=" Uthrabhatrapada [Meenam] (Uttirattaadi)   "> Uthrabhatrapada [Meenam] (Uttirattaadi)    </option>
                                                                    <option value=" Uttirapalguni [Kannyai] (Uttiram)   "> Uttirapalguni [Kannyai] (Uttiram)     </option>
                                                                    <option value=" Uttirapalguni [Rasi-Not-Known] (Uttiram)  ">  Uttirapalguni [Rasi-Not-Known] (Uttiram)   </option>
                                                                    <option value="  Uttirapalguni [Simham] (Uttiram)  "> Uttirapalguni [Simham] (Uttiram)     </option>
                                                                    <option value=" Uttirashada [Danur] (Uttiradam)  "> Uttirashada [Danur] (Uttiradam)    </option>
                                                                    <option value="  Uttirashada [Makara] (Uttiradam)">  Uttirashada [Makara] (Uttiradam)    </option>
                                                                    <option value=" Uttirashada [Rasi-Not-Known] (Uttiradam)">  Uttirashada [Rasi-Not-Known] (Uttiradam)   </option>
                                                                    <option value=" Visaka [Rasi-Not-Known]">  Visaka [Rasi-Not-Known]   </option>
                                                                    <option value=" Visaka [Tula]">  Visaka [Tula]   </option>
                                                                    <option value=" Visaka [Vruchchikam]  ">  Visaka [Vruchchikam]   </option>


                    </Form.Select>

                  </div>

                  <div className="form-group col-xl-6">
                    <label >Gothra</label>
                    <input type="text" className="form-control" name="gothra" onChange={handleChange} />
                    {error && error["gothra"] && (
                      <div className="error">{error["gothra"]}</div>
                    )}
                  </div>
                  <div className="form-group col-xl-6">
                    <label>Address</label>
                    <input type="text" className="form-control" name="address" onChange={handleChange} />
                    {error && error["address"] && (
                      <div className="error">{error["address"]}</div>
                    )}
                  </div>
                  <div className="form-group col-xl-6">
                    <label>City</label>
                    <input type="text" className="form-control" name="city" onChange={handleChange} />
                    {error && error["city"] && (
                      <div className="error">{error["city"]}</div>
                    )}
                  </div>
                  <div className="form-group col-xl-6">
                    <label >Country</label>
                    <Select
                        id="country"

                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        options={countryOptions}
                        isClearable
                        isSearchable={false}
                      />
                   
                  </div>
                  <div className="form-group col-xl-6">
                    <label >State</label>
                    <Select
                        id="state"
                        name="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        options={stateOptions}
                        isClearable
                        isDisabled={!selectedCountry}
                      />
                  </div>
                  <div className="form-group col-xl-6">
                    <label>Zipcode</label>
                    <input type="text" className="form-control" name="zipcode" onChange={handleChange} />
                    {error && error["zipcode"] && (
                      <div className="error">{error["zipcode"]}</div>
                    )}
                  </div>

                </div>
                {/* <!-- Buyer Info End --> */}

              </div>
              <div className="col-xl-5 checkout-billing">
                <div class="post-detail-wrapper" style={{ padding: "15px", border: "none" }}>
                  <h4>ORDER SUMMARY</h4>
                  {/* <!-- Order Details Start --> */}
                  <table className="sigma_responsive-table">
                    <thead>
                      <tr>
                        <th>Product</th>
                        <th>Qunantity</th>
                        <th>Total</th>
                      </tr>
                    </thead>
                    <tbody>

                      {ListCart.length > 0 ? (
                        ListCart.map((item, key) => (


                          <tr key={key}>
                            <input type="hidden" name="_id" value={item._id} style={styles.input} />
                            <input type="hidden" name="service_category" value={item.service_category} style={styles.input} />

                            <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />
                            <td data-title="Product">
                              <div className="sigma_cart-product-wrapper">
                                <div className="sigma_cart-product-body">
                                  <h6>{item.service_name}</h6>
                                  {/* <h6>  <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly /> </h6> */}

                                </div>
                              </div>
                            </td>
                            <td data-title="Quantity">
                              {item.quantity}
                            </td>
                            <td data-title="Total"> <strong>  <input type="text" name="service_fees" value={TotalPrice(item.service_fees, item.quantity)} $ style={{ ...styles.input, marginLeft: '1px' }} readOnly /></strong> </td>
                          </tr>





                        ))
                      ) : (
                        <span style={{ textAlign: 'center', marginTop: '3px' }}>No items in the cart</span>
                      )}
                      {TotalCart !== 0 && (
                        <tr className="total">
                          <td></td>
                          <td> <h6 className="mb-0">Grand Total</h6></td>

                          <td><strong> <input
                            type="text"
                            name="carttotal[]"
                            value={Number(TotalCart).toLocaleString('en-US')}
                            style={{
                              border: 'none', outline: 'none', width: '100%', fontWeight: "700",
                              color: "#db4242"
                            }}
                            readOnly
                          /></strong></td>

                        </tr>
                      )}





                    </tbody>
                  </table>


                  <p className="small">Your personal data will be used to process your order, support your experience throughout this website, and for other purposes described in our <a className="btn-link" href="#">privacy policy.</a> </p>


                  <input type="hidden" name="url" value="url" />
                  <button type="submit" className="sigma_btn-custom primary d-block w-100" onClick={paynow}>Checkout</button>




                  {/* <!-- Order Details End --> */}

                </div>
              </div>
            </div>
          </form>

        </div>
      </div>
      {/* <!-- Checkout End --> */}

    </div>
  )
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

export default connect(mapStateToProps, { IncreaseQuantity, DecreaseQuantity, DeleteCart })(Payment1);
