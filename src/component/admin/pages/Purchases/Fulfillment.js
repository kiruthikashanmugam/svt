import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Row, Col, Card, Container, Label, Table } from 'reactstrap';
import Button from 'react-bootstrap/Button';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import { Helmet } from 'react-helmet';
import loader from '../../../../Loader.gif';

function Fulfillment() {
    const [data, setData] = useState([]);
    const [user, setUser] = useState([]);
    const [onlineorder, setOnlineorder] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [key, setKey] = useState('home');
    // For Pooja Request tab
const [poojaRequestPage, setPoojaRequestPage] = useState(1);
const [poojaRequestRecordsPerPage] = useState(10);
const [poojaRequestFilter, setPoojaRequestFilter] = useState("");

// For Online Orders tab
const [onlineOrdersPage, setOnlineOrdersPage] = useState(1);
const [onlineOrdersRecordsPerPage] = useState(10);
const [onlineOrdersFilter, setOnlineOrdersFilter] = useState("");

// For Donation tab
const [donationPage, setDonationPage] = useState(1);
const [donationRecordsPerPage] = useState(10);
const [donationFilter, setDonationFilter] = useState("");


    useEffect(() => {
        searchdata();
    }, []);

    async function searchdata() {
        try {
            const response = await axios.get(`https://svt.know3.com/api/view_orders`);
            setData(response.data.Pooja_request);
            setUser(response.data.Donation_data.original)
            setOnlineorder(response.data.Pooja_order);

        } catch (error) {
            console.error("Error fetching data: ", error);
            setErrors(error);
        } finally {
            setLoading(false);
        }
    }

    // For Pooja Request tab
const indexOfLastPoojaRequest = poojaRequestPage * poojaRequestRecordsPerPage;
const indexOfFirstPoojaRequest = indexOfLastPoojaRequest - poojaRequestRecordsPerPage;
const currentPoojaRequest = data.slice(indexOfFirstPoojaRequest, indexOfLastPoojaRequest);
const poojaRequestTotalPages = Math.ceil(data.length / poojaRequestRecordsPerPage);

// For Online Orders tab
const indexOfLastOnlineOrders = onlineOrdersPage * onlineOrdersRecordsPerPage;
const indexOfFirstOnlineOrders = indexOfLastOnlineOrders - onlineOrdersRecordsPerPage;
const currentOnlineOrders = onlineorder.slice(indexOfFirstOnlineOrders, indexOfLastOnlineOrders);
const onlineOrdersTotalPages = Math.ceil(onlineorder.length / onlineOrdersRecordsPerPage);

// For Donation tab
const indexOfLastDonation = donationPage * donationRecordsPerPage;
const indexOfFirstDonation = indexOfLastDonation - donationRecordsPerPage;
const currentDonation = user.slice(indexOfFirstDonation, indexOfLastDonation);
const donationTotalPages = Math.ceil(user.length / donationRecordsPerPage);



// For Pooja Request tab
const renderPoojaRequestRows = () => {
    return currentPoojaRequest.map((poojaRequest, index) => (
      <tr key={poojaRequest._id} style={{ textAlign: "center" }}>
        <td>{index + 1}</td>
        <td>{poojaRequest.Firstname}</td>
        <td>{poojaRequest.MobileNumber}</td>
        <td>{poojaRequest.Email}</td>
        <td>{poojaRequest.Address}</td>
        <td>{poojaRequest.Service_Name}</td>
        <td>
          <Link to={`admin/fulfillmentview/${poojaRequest._id}`}>
            <Button variant="success">view</Button>
          </Link>
        </td>
      </tr>
    ));
  };
  
  // For Online Orders tab
  const renderOnlineOrdersRows = () => {
    return currentOnlineOrders.map((order, index) =>
      order.matched_products.map((product) => (
        <tr key={order.order_id} style={{ textAlign: "center" }}>
          <td>{index + 1}</td>
          <td style={{ lineHeight: "20px" }}>{product.product_name}</td>
          <td style={{ lineHeight: "20px" }}>{product.product_category}</td>
          <td>{product.product_fees}</td>
          <td>{product.product_qty}</td>
          <td>{order.cart_total}</td>
        </tr>
      ))
    );
  };
  
  // For Donation tab
  const renderDonationRows = () => {
    var id = 1;
    
    return currentDonation.map((donation,index ) =>
      donation.matched_products.map((product) => (
        <tr key={index} style={{ textAlign: "center" }}>
        <td>{index+1}</td>
          <td style={{ lineHeight: "20px" }}>{product.product_name}</td>
          <td style={{ lineHeight: "20px" }}>{product.product_category}</td>
          <td>{product.product_fees}</td>
          <td>{product.product_qty}</td>
          <td>{donation.cart_total}</td>
        </tr>
      ))
    );
  };
  
    if (loading) {
        return (
<div>
        <div style={{width:'100%',height:'100%',textAlign:'center',marginTop:'300px'}}>
          <img src={loader} alt='Loading Please Wait...'></img>
          </div>
      </div>
        );
    }

    if (errors) {
        return "Error!";
    }
    var id = 1
    return (
        <Container>
            <Helmet>
                <title>Admin | Fulfillment</title>
            </Helmet>
            <Col>
                <Container className="form" style={{width:"94%"}}>

                    <Label style={{ height: '50px', width:'100%' }}>
                        <h1 style={{ padding: '15px', width:'100%', textAlign: 'center', color:'black',  fontSize: '19px', fontWeight: 'bold' }}>Fulfillment</h1>
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
                    </Label>
                    <div className="modal show" style={{ display: 'block', position: 'initial' }}>
                        <Tabs
                            id="controlled-tab-example"
                            activeKey={key}
                            onSelect={(k) => setKey(k)}
                            style={{ outerWidth: "40px", marginTop: "10px", justifyContent: "center", textColor: "blue", indicatorColor: "red" }}>

                            <Tab eventKey="home" title="Pooja Request">
                                <Row>
                                    <Col sm='12'>
                                        <Card style={{ padding: '20px' }}>
                                            <Table striped sm="6" responsive className="table-inside-card">
                                                <thead>
                                                    <tr style={{ textAlign: "center" }}>
                                                        <th style={{ paddingBottom: '20px' }}>S.No</th>
                                                        <th style={{ paddingBottom: '20px' }}>First Name</th>
                                                        <th style={{ paddingBottom: '20px' }}>Mobile Number</th>
                                                        <th style={{ paddingBottom: '20px' }}>Email</th>
                                                        <th style={{ paddingBottom: '20px' }}>Address</th>
                                                        <th style={{ paddingBottom: '20px' }}>Service Name</th>
                                                        <th style={{ paddingBottom: '20px' }}>Action</th>


                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentPoojaRequest.length > 0 ? (
                                                        renderPoojaRequestRows()
                                                    ) : (
                                                        <tr>
                                                        <td colSpan="7">No data available</td>
                                                        </tr>
                                                    )}
                                               </tbody>
                                                </Table>
                                                <Pagination
                                                    nPages={poojaRequestTotalPages}
                                                    currentPage={poojaRequestPage}
                                                    setCurrentPage={setPoojaRequestPage}
                                                />
                                        </Card>
                                    </Col>
                                </Row>
                            </Tab>
                            <Tab eventKey="profile" title="Online Orders">
                            {currentOnlineOrders.length > 0 ? (
                                    <Card style={{ padding: '20px' }}>
                                        <Table striped sm="6" responsive className="table-inside-card">
                                        <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th style={{ paddingBottom: '20px' }}>S.No</th>

                                                    <th style={{ paddingBottom: '20px',lineHeight:"20px" }}>Product Name</th>
                                                    <th style={{ paddingBottom: '20px',lineHeight:"20px" }}>Product Category</th>
                                                    <th style={{ paddingBottom: '20px' }}>Product Fees</th>
                                                    <th style={{ paddingBottom: '20px' }}>Product Quantity</th>
                                                    <th style={{ paddingBottom: '20px' }}>Cart Total</th>

                                                </tr>
                                            </thead>
                                            <tbody>{renderOnlineOrdersRows()}</tbody>
                                        </Table>
                                    </Card>
                               ) : (
                                <div>No online order data available</div>
                              )}
                              <Pagination
                                nPages={onlineOrdersTotalPages}
                                currentPage={onlineOrdersPage}
                                setCurrentPage={setOnlineOrdersPage}
                              />
                            </Tab>
                            <Tab eventKey="contact" title="Donation">
                            {currentDonation.length > 0 ? (
                                    <Card style={{ padding: '20px' }}>
                                        
                                        <Table striped sm="6" responsive className="table-inside-card">
                                            <thead>
                                                <tr style={{ textAlign: "center" }}>
                                                    <th style={{ paddingBottom: '20px' }}>S.No</th>

                                                    <th style={{ paddingBottom: '20px' }}>Product Name</th>
                                                    <th style={{ paddingBottom: '20px' }}>Product Category</th>
                                                    <th style={{ paddingBottom: '20px' }}>Product Fees</th>
                                                    <th style={{ paddingBottom: '20px' }}>Product Quantity</th>
                                                    <th style={{ paddingBottom: '20px' }}>Cart Total</th>

                                                </tr>
                                            </thead>
                                            
                                            <tbody>{renderDonationRows()}</tbody>
                                        </Table>
                                    </Card>
                                    ) : (
                                        <div>No donation data available</div>
                                      )}
                                      <Pagination
                                        nPages={donationTotalPages}
                                        currentPage={donationPage}
                                        setCurrentPage={setDonationPage}
                                      />
                                    
                            </Tab>
                        </Tabs>
                    </div>
                </Container>
            </Col>
        </Container>
    );
}

export default Fulfillment;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Row, Col, Card, Container, Label, Table } from 'reactstrap';
// import Button from 'react-bootstrap/Button';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import { Link } from 'react-router-dom';

// function Fulfillment() {
//     const [data, setData] = useState([]);
//     const [user, setUser] = useState([]);
//     const [onlineorder, setOnlineorder] = useState([]);
//     const [loading, setLoading] = useState(true);
//     const [errors, setErrors] = useState(null);
//     const [key, setKey] = useState('home');

//     useEffect(() => {
//         searchdata();
//     }, []);

//     async function searchdata() {
//         try {
//             const response = await axios.get(`http://svt.know3.com/api/view_orders`);
//             setData(response.data.Pooja_request);
//             setUser(response.data.Donation_data.original)
//             setOnlineorder(response.data.Pooja_order);

//         } catch (error) {
//             console.error("Error fetching data: ", error);
//             setErrors(error);
//         } finally {
//             setLoading(false);
//         }
//     }

//     if (loading) {
//         return (
//             <div>
//                 <div className="loader">
//                     <div className="loader-inner">
//                         <div className="loader-line-wrap">
//                             <div className="loader-line"></div>
//                         </div>
//                         <div className="loader-line-wrap">
//                             <div className="loader-line"></div>
//                         </div>
//                         <div className="loader-line-wrap">
//                             <div className="loader-line"></div>
//                         </div>
//                         <div className="loader-line-wrap">
//                             <div className="loader-line"></div>
//                         </div>
//                         <div className="loader-line-wrap">
//                             <div className="loader-line"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         );
//     }

//     if (errors) {
//         return "Error!";
//     }
//     var id = 1
//     return (
//         <Container>
//             <Col>
//                 <Container className="form">

//                     <Label style={{ height: '50px' }}>
//                         <h1 style={{ padding: '15px', textAlign: 'center', fontSize: '19px', fontWeight: 'bold' }}>Fulfillment</h1>
//                         <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
//                     </Label>
//                     <div className="modal show" style={{ display: 'block', position: 'initial' }}>
//                         <Tabs
//                             id="controlled-tab-example"
//                             activeKey={key}
//                             onSelect={(k) => setKey(k)}
//                             style={{ outerWidth: "40px", marginTop: "20px", justifyContent: "center", textColor: "blue", indicatorColor: "red" }}>

//                             <Tab eventKey="home" title="Pooja Request">
//                                 <Row>
//                                     <Col sm='12'>
//                                         <Card style={{ padding: '20px' }}>
//                                             <Table striped sm="6" responsive className="table-inside-card">
//                                                 <thead>
//                                                     <tr style={{ textAlign: "center" }}>
//                                                         <th style={{ paddingBottom: '20px' }}>S.No</th>
//                                                         <th style={{ paddingBottom: '20px' }}>First Name</th>
//                                                         <th style={{ paddingBottom: '20px' }}>Mobile Number</th>
//                                                         <th style={{ paddingBottom: '20px' }}>Email</th>
//                                                         <th style={{ paddingBottom: '20px' }}>Address</th>
//                                                         <th style={{ paddingBottom: '20px' }}>Service Name</th>
//                                                         <th style={{ paddingBottom: '20px' }}>Action</th>


//                                                     </tr>
//                                                 </thead>
//                                                 <tbody>
//                                                     {data.length > 0 ? (
//                                                         data.map((poojaRequest, index) => (
//                                                             <tr key={poojaRequest._id}>
//                                                                 <td>{index + 1}</td>
//                                                                 <td>{poojaRequest.Firstname}</td>
//                                                                 <td>{poojaRequest.MobileNumber}</td>
//                                                                 <td>{poojaRequest.Email}</td>
//                                                                 <td>{poojaRequest.Address}</td>
//                                                                 <td>{poojaRequest.Service_Name}</td>
//                                                                 <td> <Link to={`/fulfillmentview/${poojaRequest._id}`}>
//                                                                     <Button variant="success">view</Button>
//                                                                 </Link></td>

                                                                
//                                                             </tr>
//                                                         ))
//                                                     ) : (
//                                                         <tr>
//                                                             <td colSpan="11">No data available</td>
//                                                         </tr>
//                                                     )}
//                                                 </tbody>
//                                             </Table>
//                                         </Card>
//                                     </Col>
//                                 </Row>
//                             </Tab>
//                             <Tab eventKey="profile" title="Online Orders">
//                                 {onlineorder.length > 0 ? (
//                                     <Card style={{ padding: '20px' }}>
//                                         <Table striped sm="6" responsive className="table-inside-card">
//                                         <thead>
//                                                 <tr style={{ textAlign: "center" }}>
//                                                     <th style={{ paddingBottom: '20px' }}>S.No</th>

//                                                     <th style={{ paddingBottom: '20px',lineHeight:"20px" }}>Product Name</th>
//                                                     <th style={{ paddingBottom: '20px',lineHeight:"20px" }}>Product Category</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Product Fees</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Product Quantity</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Cart Total</th>

//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {onlineorder.map((order, index) =>
//                                                     order.matched_products.map((product) => (
//                                                         <tr key={order.order_id}>
//                                                             <td>{index + 1}</td>
//                                                             <td style={{lineHeight:"20px"}}>{product.product_name}</td>
//                                                             <td style={{lineHeight:"20px"}}>{product.product_category}</td>
//                                                             <td>{product.product_fees}</td>
//                                                             <td>{product.product_qty}</td>
//                                                             <td>{order.cart_total}</td>
//                                                         </tr>
//                                                     ))
//                                                 )}
//                                             </tbody>
//                                         </Table>
//                                     </Card>
//                                 ) : (
//                                     <div>No online order data available</div>
//                                 )}
//                             </Tab>
//                             <Tab eventKey="contact" title="Donation">
//                                 {user.length > 0 ? (
//                                     <Card style={{ padding: '20px' }}>
//                                         <Table striped sm="6" responsive className="table-inside-card">
//                                             <thead>
//                                                 <tr style={{ textAlign: "center" }}>
//                                                     <th style={{ paddingBottom: '20px' }}>S.No</th>

//                                                     <th style={{ paddingBottom: '20px' }}>Product Name</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Product Category</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Product Fees</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Product Quantity</th>
//                                                     <th style={{ paddingBottom: '20px' }}>Cart Total</th>

//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {user.map((donation) =>
//                                                     donation.matched_products.map((product) => (
//                                                         <tr key={donation.order_id}>
//                                                             <td>{id++}</td>

//                                                             <td style={{lineHeight:"20px"}}>{product.product_name}</td>
//                                                             <td style={{lineHeight:"20px"}}>{product.product_category}</td>
//                                                             <td>{product.product_fees}</td>
//                                                             <td>{product.product_qty}</td>
//                                                             <td>{donation.cart_total}</td>

//                                                         </tr>
//                                                     ))
//                                                 )}
//                                             </tbody>
//                                         </Table>
//                                     </Card>
//                                 ) : (
//                                     <div>No donation data available</div>
//                                 )}

//                             </Tab>
//                         </Tabs>
//                     </div>
//                 </Container>
//             </Col>
//         </Container>
//     );
// }

// export default Fulfillment;
