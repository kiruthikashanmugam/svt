import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col, Container, Card, Table } from "reactstrap";
import { Link } from "react-router-dom";

import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

function Managementview() {
  const [data, setData] = useState({
});

  const [list, setList] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState('onlineOrders');
  const [selectedTableData, setSelectedTableData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  const { _id } = useParams();


  useEffect(() => {
    searchdata();
    listdata();
  }, [_id]);

  async function searchdata() {
    setLoading(true);
    try {
      const response = await axios.get(`https://svt.know3.com/api/edituserview/${_id}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  async function listdata() {
    try {
      const response = await axios.get(`https://svt.know3.com/api/userhistory/${_id}`);
      setList(response.data);
    } catch (error) {
      setError(error);
    }
  }

  const handleOptionChange = (event) => {
    const selectedOption = event.target.value;

    if (selectedOption === 'onlineOrders') {
      setSelectedOption(selectedOption);
      setTableHeaders(['Order ID', 'Created At', 'Cart Total', 'Status']);
    } else if (selectedOption === 'poojaOrders') {
      setSelectedOption(selectedOption);
      setTableHeaders(['Id', 'Pooja Fees', 'Status']);
    }
  };

  useEffect(() => {
    if (selectedOption === 'onlineOrders') {
      setSelectedTableData(list['Online order'] || []);
    } else if (selectedOption === 'poojaOrders') {
      setSelectedTableData(list['Pooja Request'] || []);
    }
  }, [selectedOption, list]);

  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }

  if (error) {
    return "Error!";
  }

  return (
    <div>
      <Helmet>
        <title>Admin | view management</title>
      </Helmet>

      <Container>
        <Row>
          <Col lg={8}>
            <Card className="manage-para" style={{ padding: "20px" }}>
              <h5 style={{ color: 'black', textAlign: 'center' }}>Order History</h5>
              <div>
                <Row>
                  <Col lg={7}></Col>
                  <Col lg={5}>
                    <label>Select Order: </label>
                    <select style={{ padding: "10px", margin: "10px", borderRadius: "10px", borderColor: "#f2f2f2" }} id="section-select" value={selectedOption} onChange={handleOptionChange}>
                      <option value="poojaOrders">Pooja Orders</option>
                      <option value="onlineOrders">Online Orders</option>
                    </select>
                  </Col>
                </Row>
              </div>

              <Table>
                <thead>
                  <tr>
                    {tableHeaders.map((header) => (
                      <th key={header}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                {selectedTableData.length === 0 ? (
                    <tr>
                        <td colSpan={tableHeaders.length} style={{ textAlign: 'center' }}>No data found.</td>
                    </tr>
                    ) : (
                    selectedTableData.map((item) => (
                        <tr key={item._id}>
                        {selectedOption === 'onlineOrders' ? (
                            <>
                            <td>{item.order_id}</td>
                            <td>{item.created_at}</td>
                            <td>{item.cart_total}</td>
                            <td>{item.status}</td>
                            </>
                        ) : (
                            <>
                            <td>{item._id}</td>
                            <td>{item.pooja_fees}</td>
                            <td>{item.Status}</td>
                            </>
                        )}
                        </tr>
                    ))
                    )}

                </tbody>
              </Table>
            </Card>
          </Col>
          <Col lg={4}>
            <Card style={{ padding: "20px" }}>
              <Container>
                
                
                  {data.length === 0 ? (
  <div style={{ textAlign: 'center' }}>No user data found.</div>
) : (
  <form method='post' name="userRegistration">
    <h5 style={{ color: 'black', textAlign: 'center' }}>User Details</h5>
    {data.map((use) => (
      <div key={use._id}>
        <Row>
          <Col>
            <p className="manage-para"><small className="management">First Name: </small>{use.First_name} </p>
            <p className="manage-para"><small className="management">Last Name: </small> {use.Last_name} </p>
            <p className="manage-para"><small className="management">Mobile Number: </small> {use.Mobile_Number} </p>
            <p className="manage-para"><small className="management">Address: </small> {use.Address} </p>
            <p className="manage-para"><small className="management">Country: </small> {use.Country} </p>
            <p className="manage-para"><small className="management">City: </small> {use.City} </p>
            <p className="manage-para"><small className="management">Email: </small>{use.email} </p>
            <p className="manage-para"><small className="management">Zip Code: </small> {use.Zip_Code} </p>
            <p className="manage-para"><small className="management">Role: </small> {use.role} </p>
          </Col>
        </Row>
        <Row>
          <Col style={{ textAlign: "right", marginTop: "20px" }}>
            <Link to="/admin/management">
              <Button variant="warning" className="btnnavbaradmin" style={{ marginRight: "10px" }}> Back
              </Button>
            </Link>
            <Link style={{ color: '#000000' }} to={`/admin/edit/${use._id}`} onClick={() => setData(data)}>
            <Button variant="warning" className="btnnavbaradmin" style={{ marginRight: "10px" }} type="submit"> Edit
              </Button>
            </Link>
          </Col>
        </Row>
      </div>
    ))}
  </form>
)}

              </Container>
            </Card>
          </Col>
        </Row>
        
      </Container>
    </div>
  );
}

export default Managementview;


// import axios from "axios";
// import { useParams, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { Button } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import { Row, Col, Container, Card, CardBody, Table } from "reactstrap";
// import { Link } from "react-router-dom";
// import InputGroup from 'react-bootstrap/InputGroup';
// import Alert from 'react-bootstrap/Alert';
// import { AiOutlineArrowLeft } from 'react-icons/ai';
// import { Helmet } from "react-helmet";
// import loader from '../../../../Loader.gif';


// function Managementview() {
//     const [data, setData] = useState({
//         _id: "",
//         Userid: "",
//         Firstname: "",
//         Lastname: "",
//         Service_Name: "",
//         Service_Type: "",
//         Venu_Preference: "",
//         Pooja_Start_Date: "",
//         Pooja_End_Date: "",
//         Pooja_Start_Time: "",
//         Pooja_End_Time: "",
//         MobileNumber: "",
//         Email: "",
//         Address: "",

//     });

//     const [list, setList] = useState({});
//     const [selectedTableData, setSelectedTableData] = useState([]);
//     const [tableHeaders, setTableHeaders] = useState([]);
//     const [selectedOption, setSelectedOption] = useState('onlineOrders');







//     async function listdata() {
//         await axios(`https://svt.know3.com/api/userhistory/${_id}`)
//             .then((response) => {
//                 setList(response.data)
                
//                 console.log(response.data);
//             }).catch((error) => {
//                 setError(error)
//             }).finally(() => {
//                 setLoading(false)
//             })
//     }




//     const [loading, setLoading] = useState(true);
//     const [error, setError] = useState(null);


//     const { _id } = useParams();
//     const navigate = useNavigate();

//     useEffect(() => {
//         searchdata();
//         listdata();
//     }, [_id]);

//     async function searchdata() {
//         setLoading(true);
//         try {
//             const response = await axios.get(`https://svt.know3.com/api/edituserview/${_id}`);
//             setData(response.data);

//         } catch (error) {
//             console.error("Error fetching data: ", error);
//             setError(error);
//         } finally {
//             setLoading(false);
//         }
//     }



//     if (loading) {
//         return (
//             <div>
//                 <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
//                     <img src={loader} alt='Loading Please Wait...'></img>
//                 </div>
//             </div>
//         );
//     }

//     if (error) {
//         return "Error!";
//     }
   
    
//     const handleOptionChange = (event) => {
//         const selectedOption = event.target.value;
      
//         if (selectedOption === 'onlineOrders') {
//           setSelectedOption(selectedOption);
//           setSelectedTableData(list['Online order'] || []);
//           setTableHeaders(['Order ID', 'Created At', 'Cart Total', 'Status']);
//         } else if (selectedOption === 'poojaOrders') {
//           setSelectedOption(selectedOption);
//           setSelectedTableData(list['Pooja Request'] || []);
//           setTableHeaders(['Id', 'Pooja Fees', 'Status']);
//         }
//       };
      


//       if (selectedOption === 'onlineOrders') {
//         selectedTableData = list['Online order'] || [];
//         tableHeaders = ['Order ID', 'Created At', 'Cart Total', 'Status'];
//     } else if (selectedOption === 'poojaOrders') {
//         selectedTableData = list['Pooja Request'] || [];
//         tableHeaders = ['Id', 'Pooja Fees', 'Status'];
//     }
    

//     return (
//         <div>
//             <Helmet>
//                 <title>Admin | view management</title>
//             </Helmet>

//             <Container>
//                 <Row>
//                     <Col lg={8}>

//                         <Card className="manage-para" style={{ padding: "20px" }}>
//                         <h3 style={{ color: 'black', textAlign: 'center' }}>Order History</h3>
//                             <div >
//                                 <Row>
//                                     <Col lg={7}>
//                                     </Col>
//                                     <Col lg={5}>
//                                         <label>Select Order: </label>

//                                        <select style={{padding:"10px",margin:"10px",borderRadius:"10px",borderColor:"#f2f2f2"}} id="section-select" value={selectedOption} onChange={handleOptionChange}>
//                                             <option value="poojaOrders">Pooja Orders</option>
//                                             <option value="onlineOrders">Online Orders</option>
//                                         </select>

//                                     </Col>

//                                 </Row>



//                             </div>

//                             <Table>
//                                 <thead>
//                                     <tr>
//                                         {tableHeaders.map((header) => (
//                                             <th key={header}>{header}</th>
//                                         ))}
//                                     </tr>
//                                 </thead>
//                                 {selectedTableData && selectedTableData.map((item) => (
//                                     <tr key={item._id}>
//                                         {selectedOption === 'onlineOrders' ? (
//                                             <>
//                                                 <td>{item.order_id}</td>
//                                                 <td>{item.created_at}</td>
//                                                 <td>{item.cart_total}</td>
//                                                 <td>{item.status}</td>
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <td>{item._id}</td>

//                                                 <td>{item.pooja_fees}</td>
//                                                 <td>{item.Status}</td>
//                                             </>
//                                         )}
//                                     </tr>
//                                 ))}
//                             </Table>
//                         </Card>

//                     </Col>
//                     <Col lg={4}>
//                         <Card style={{ padding: "20px" }}>
//                             <Container>



//                                 <form method='post' name="userRegistration"  >

//                                     <h3 style={{ color: 'black', textAlign: 'center' }}>User Details</h3>
//                                     {data.map((use) => (

//                                         <Row>
//                                             <Col >
//                                                 <p className="manage-para"><small className="management">First Name: </small>{use.First_name} </p>
//                                                 <p className="manage-para"><small className="management">Last Name: </small> {use.Last_name} </p>
//                                                 <p className="manage-para"><small className="management">Mobile Number: </small> {use.Mobile_Number} </p>
//                                                 <p className="manage-para"><small className="management">Address: </small> {use.Address} </p>
//                                                 <p className="manage-para"><small className="management">Country: </small> {use.Country} </p>
//                                                 <p className="manage-para"><small className="management">City: </small> {use.City} </p>
//                                                 <p className="manage-para"><small className="management">Email: </small>{use.email} </p>
//                                                 <p className="manage-para"><small className="management">Zip Code: </small> {use.Zip_Code} </p>

//                                             </Col>

//                                         </Row>







//                                     ))}

//                                 </form>

//                             </Container>


//                         </Card>



//                     </Col>
//                 </Row>
//             </Container>
//         </div>
//     );
// }

// export default Managementview;
