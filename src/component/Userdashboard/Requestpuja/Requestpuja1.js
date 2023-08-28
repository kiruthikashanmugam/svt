// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { RiDashboardFill } from 'react-icons/ri';
// import { Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Select from 'react-select';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Requestpuja1() {
//   const [formData, setFormData] = useState({
//     userid: localStorage.getItem('user_id'),
//     First_name: '',
//     Last_name: '',
//     email: '',
//     Mobile_Number: '',
//     servicename: '',
//     Puja_venue: '',
//     pooja_start_date: '',
//     pooja_end_date: '',
//     pooja_start_time: '',
//     pooja_end_time: '',
//     Address: ''
//   });

//   const [users, setUsers] = useState({});
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState({});
//   const [responseData, setResponseData] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [deactive, setDeactive] = useState(false);
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     setDeactive(!deactive);
//   };
//   const handleCategoryChange = (selectedOption) => {
//     setCategory(selectedOption);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       servicename: selectedOption.value // Set the selected value to servicename
//     }));
//   };

//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };

//   const handleLogin = () => {
//     axios
//       .get(`https://svt.know3.com/api/edituserview/${localStorage.getItem('user_id')}`, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })

//       .then((response) => {
//         const userData = response.data[0];

//         setUsers({
//           First_name: userData.First_name,
//           Last_name: userData.Last_name,
//           Mobile_Number: userData.Mobile_Number,
//           email: userData.email,
//           Address: userData.Address,
//           City: userData.City
//         });
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   };

//   useEffect(() => {
//     getData();
//     handleLogin();
//   }, []);

//   // pooja name
//   async function getData() {
//     try {
//       const response = await axios.get('https://svt.know3.com/api/view_pujalist');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const options = data
//     ? data.flatMap((item) =>
//       item.category.map((category) => ({

//         value: `${item.pooja_name} - ${category.pooja_type}`,
//         label: `${item.pooja_name} - ${category.pooja_type}`,
//         id: item.pageid,
//       }))
//     )
//     : [];

//   // sending data
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (validateForm()) {
//       const updatedFormData = {
//         ...formData,
//         First_name: users?.First_name || '',
//         Last_name: users?.Last_name || '',
//         email: users?.email || '',
//         Mobile_Number: users?.Mobile_Number || '',
//         Address: deactive ? (formData.Address || '') : (users?.Address || ''),
//         servicename: formData.servicename
//       };

//       axios
//         .post('https://svt.know3.com/api/pooja_request', updatedFormData)
//         .then((response) => {
//           console.log(response.data);
//         })
//         .catch((error) => {
//           console.error('Failed to add puja list: ', error);
//         });
//     }
//   };


//   const validateForm = () => {

//     let error = {}
//     let formIsValid = true;


//     //fname
//     if (!users["pooja_start_date"]) {
//       formIsValid = false;
//       error["pooja_start_date"] = "Select the start date";
//     }

//     // if (typeof users["pooja_start_date"] !== "undefined") {
//     //   const regex = /^[A-Za-z\s]+$/;
//     //   if (!users["pooja_start_date"].match(regex)) {
//     //     formIsValid = false
//     //     error["pooja_start_date"] = "First Name  must contain only text character"
//     //   }
//     // }


//     if (!users["pooja_end_date"]) {
//       formIsValid = false;
//       error["pooja_end_date"] = "Select the end date";
//     }



//     if (!users["pooja_start_time"]) {
//       formIsValid = false;
//       error["pooja_start_time"] = "Please enter the start time ";

//     }


//     if (!users["pooja_end_time"]) {
//       formIsValid = false;
//       error["pooja_end_time"] = "Please enter the end time ";

//     }
//     if (!users["Address"]) {
//       formIsValid = false;
//       error["Address"] = "Please enter the address";

//     }
//     if (!users["servicename"]) {
//       formIsValid = false;
//       error["servicename"] = "Select the service name";

//     }


//     if (!users["Puja_venue"]) {
//       formIsValid = false;
//       error["Puja_venue"] = "Please enter the puja venue";
//     }

//     if (typeof users["Puja_venue"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!users["Puja_venue"].match(regex)) {
//         formIsValid = false
//         error["Puja_venue"] = "Puja venue must contain only text character"
//       }
//     }

//     setError(error)
//     return formIsValid;

//   }

//   return (
//     <div>

//       <Link to="/user/dashboard">
//         <h4 className='dashboard'> <RiDashboardFill /> Dashboard/Request a Puja</h4>
//       </Link>
//       <Container>
//         <Row>
//           <Col>
//             <div
//               className="modal show"
//               style={{ display: 'block', position: 'initial' }}
//             >
//               <Modal.Dialog size="lg">
//                 <Modal.Body>

//                   <Row>
//                     <Col>

//                       <label>Puja location </label>
//                       <Tabs
//                         defaultActiveKey="home"
//                         transition={false}
//                         id="noanim-tab-example"
//                         className="mb-3"
//                         textColor="primary"
//                         indicatorColor="primary"

//                         style={{ display: "flex", justifyContent: "center" }}
//                       >
//                         <form onSubmit={handleSubmit}>

//                           <Tab eventKey="home" title="Inside">
//                             <Row>
//                               <input type="hidden" name='userid' />
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja Start Date</label>
//                                   <input type="date" className="form-control" name="pooja_start_date" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_start_date}</div>
//                                 </div>
//                               </Col>
//                               <Col lg={6}>

//                                 <div className="mb-3">
//                                   <label>Puja End Date</label>
//                                   <input type="date" className="form-control" name="pooja_end_date" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_end_date}</div>
//                                 </div>

//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja Start Time</label>
//                                   <input type="time" className="form-control" name="pooja_start_time" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_start_time}</div>
//                                 </div>
//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja End Time</label>
//                                   <input type="time" className="form-control" name="pooja_end_time" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_end_time}</div>
//                                 </div>
//                               </Col>

//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div>
//                                   <label for="cars">Service Name</label>
//                                   <Select
//                                     id="category"
//                                     name="servicename"
//                                     value={category}
//                                     onChange={handleCategoryChange}
//                                     options={options}
//                                     isSearchable={false}
//                                     aria-label="Select a category"
//                                   />
//                                   <div style={{ color: "red" }}>{error.servicename}</div>

//                                 </div>
//                               </Col>
//                               <Col lg={6}>
//                                 <label>
//                                   Venue Preference/Location Of Puja
//                                 </label>
//                                 <input type="search" className="form-control" name="Puja_venue" onChange={handlechange} />
//                                 <div style={{ color: "red" }}>{error.Puja_venue}</div>


//                               </Col>

//                             </Row>


//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label >Fist Name</label>
//                                   <input type="text" className="form-control" name="First_name" value={users.First_name || ''} onChange={handlechange} readOnly />

//                                 </div>




//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Last Name</label>
//                                   <input type="text" className="form-control" name="Last_name" value={users.Last_name || ''} onChange={handlechange} readOnly />

//                                 </div>

//                               </Col>

//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Mobile Number</label>
//                                   <input type="tel" className="form-control" name="Mobile_Number" value={users.Mobile_Number || ''} onChange={handlechange} readOnly />

//                                 </div>


//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label >Email Id</label>
//                                   <input type="email" className="form-control" name="email" value={users.email || ''} onChange={handlechange} readOnly />

//                                 </div>

//                               </Col>

//                             </Row>
//                             <Button variant="secondary" className="btnnavbar">
//                               <Link to="/user/dashboard" style={{ color: "white" }}>

//                                 Close
//                               </Link>
//                             </Button>
//                             <Button variant="warning" className="btnnavbar" onClick={handleSubmit}>Request</Button>



//                           </Tab>

//                         </form>
//                         <form onSubmit={handleSubmit}>

//                           <Tab eventKey="profile" title="Outside">
//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja Start Date</label>
//                                   <input type="date" className="form-control" name="pooja_start_date" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_start_date}</div>
//                                 </div>
//                               </Col>
//                               <Col lg={6}>

//                                 <div className="mb-3">
//                                   <label>Puja End Date</label>
//                                   <input type="date" className="form-control" name="pooja_end_date" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_end_date}</div>
//                                 </div>

//                               </Col>
//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja Start Time</label>
//                                   <input type="time" className="form-control" name="pooja_start_time" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_start_time}</div>
//                                 </div>
//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Puja End Time</label>
//                                   <input type="time" className="form-control" name="pooja_end_time" onChange={handlechange} />
//                                   <div style={{ color: "red" }}>{error.pooja_end_time}</div>
//                                 </div>
//                               </Col>

//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div>
//                                   <label for="cars">Service Name</label>
//                                   <Select
//                                     id="category"
//                                     name="servicename"
//                                     value={category}
//                                     onChange={handleCategoryChange}
//                                     options={options}
//                                     isSearchable={false}
//                                     aria-label="Select a category"
//                                   />
//                                   <div style={{ color: "red" }}>{error.servicename}</div>

//                                 </div>

//                               </Col>
//                               <Col lg={6}>

//                               </Col>

//                             </Row>

//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label >First Name</label>
//                                   <input type="text" className="form-control" name="First_name" value={users.First_name || ''} onChange={handlechange} readOnly />

//                                 </div>




//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Last  Name</label>
//                                   <input type="text" className="form-control" name="Last_name" value={users.Last_name || ''} onChange={handlechange} readOnly />

//                                 </div>

//                               </Col>

//                             </Row>
//                             <Row>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label>Mobile Number</label>
//                                   <input type="tel" className="form-control" name="Mobile_Number" value={users.Mobile_Number || ''} onChange={handlechange} readOnly />

//                                 </div>


//                               </Col>
//                               <Col lg={6}>
//                                 <div className="mb-3">
//                                   <label >Email Id</label>
//                                   <input type="email" className="form-control" name="email" value={users.email || ''} onChange={handlechange} readOnly />

//                                 </div>

//                               </Col>

//                             </Row>
//                             <Row>
//                               <Col lg={6}>

//                                 <>
//                                   <Form.Group className="mb-3" onClick={handleButtonClick}>
//                                     <Form.Check
//                                       required
//                                       label="Same as devotee address"


//                                       feedback="You must agree before submitting."
//                                       feedbackType="invalid"
//                                       checked={!deactive}
//                                       onChange={handlechange}
//                                     />


//                                   </Form.Group>


//                                 </>




//                               </Col>
//                               <Col lg={6}>

//                                 <InputGroup>
//                                   {!deactive ? (
//                                     <Form.Control
//                                       type="hidden"
//                                       value={users.Address || ''}
//                                       name="Address"
//                                     />

//                                   ) : (
//                                     <Form.Control
//                                       as="textarea"


//                                       type="text"
//                                       name="Address"

//                                       onChange={handlechange}
//                                     />
//                                   )}
//                                 </InputGroup>


//                                 <div style={{ color: "red" }}>{error.Address}</div>
//                               </Col>
//                             </Row>


//                           </Tab>
//                           <Button variant="secondary" className="btnnavbar">
//                             <Link to="/user/dashboard" style={{ color: "white" }}>

//                               Close
//                             </Link>
//                           </Button>
//                           <Button variant="warning" className="btnnavbar" onClick={handleSubmit}>Request</Button>

//                         </form>

//                       </Tabs>


//                     </Col>

//                   </Row>

//                 </Modal.Body>

//                 {/* <Modal.Footer>
//                   <Button variant="secondary" className="btnnavbar">
//                     <Link to="/user/dashboard" style={{ color: "white" }}>

//                       Close
//                     </Link>
//                   </Button>
//                   <Button variant="warning" className="btnnavbar" >Request</Button>

//                 </Modal.Footer> */}
//               </Modal.Dialog>
//             </div>


//           </Col>
//         </Row>
//       </Container>









//     </div >
//   )
// }

// export default Requestpuja1


import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { RiDashboardFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Select from 'react-select';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import loader from '../../../Loader.gif';

function Requestpuja1(props) {
  const [formData, setFormData] = useState({
    userid: localStorage.getItem('user_id'),
    First_name: '',
    Last_name: '',
    email: '',
    Mobile_Number: '',
    servicename: '',
    Puja_venue: '',
    pooja_start_date: '',
    pooja_end_date: '',
    pooja_start_time: '',
    pooja_end_time: '',

  });
  const [formDataOutside, setFormDataOutside] = useState({
    userid: localStorage.getItem('user_id'),
    First_name: '',
    Last_name: '',
    email: '',
    Mobile_Number: '',
    servicename: '',
    pooja_start_date: '',
    pooja_end_date: '',
    pooja_start_time: '',
    pooja_end_time: '',
    Address: ''
  });
  const [userOutside, setUserOutside] = useState({});
  const [users, setUsers] = useState({});
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState({});
  const [errorOutside, setErrorOutside] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryOutside, setCategoryOutside] = useState(null);
  const [deactive, setDeactive] = useState(false);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedStartDateOutside, setSelectedStartDateOutside] = useState(null);
  const [selectedEndDateOutside, setSelectedEndDateOutside] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate();


  useEffect(()=>{
    setLoading(false)
  },[])

  const handleDateChange = (date, name) => {
    if (name === 'pooja_start_date') {
      setSelectedStartDate(date);
    } else if (name === 'pooja_end_date') {
      setSelectedEndDate(date);
    }
    handlechange({ target: { name, value: date.toLocaleDateString('en-US') } });
  };




  const handleButtonClick = () => {
    setDeactive(!deactive);
  };
  //inside
  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
    setFormData((prevFormData) => ({
      ...prevFormData,
      servicename: selectedOption.value // Set the selected value to servicename
    }));
  };

  const handlechange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value
    }));
  };
  
  //outside
  const handleCategoryChangeOutside = (selectedOption) => {
    setCategoryOutside(selectedOption);
    setFormDataOutside((prevFormDataOutside) => ({
      ...prevFormDataOutside,
      servicename: selectedOption.value // Set the selected value to servicename
    }));
  };

  const handlechangeOutside = (e) => {
    const { name, value } = e.target;
    setFormDataOutside((prevFormDataOutside) => ({
      ...prevFormDataOutside,
      [name]: value
    }));
  };  
  const handleDateChangeOutside = (date, name) => {
    if (name === 'pooja_start_date') {
      setSelectedStartDateOutside(date);
    } else if (name === 'pooja_end_date') {
      setSelectedEndDateOutside(date);
    }
    handlechangeOutside({ target: { name, value: date.toLocaleDateString('en-US') } });
  };
  const handleLogin = () => {
    axios
      .get(`https://svt.know3.com/api/edituserview/${localStorage.getItem('user_id')}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then((response) => {
        const userData = response.data[0];

        setUsers({
          First_name: userData.First_name,
          Last_name: userData.Last_name,
          Mobile_Number: userData.Mobile_Number,
          email: userData.email,
          Address: userData.Address,
          City: userData.City
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };

  const handleLoginOutside = () => {
    axios
      .get(`https://svt.know3.com/api/edituserview/${localStorage.getItem('user_id')}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })

      .then((response) => {
        const userData = response.data[0];

        setUserOutside({
          First_name: userData.First_name,
          Last_name: userData.Last_name,
          Mobile_Number: userData.Mobile_Number,
          email: userData.email,
          Address: userData.Address,
          City: userData.City
        });
      })

      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    getData();
    handleLogin();
    handleLoginOutside();
  }, []);

  // pooja name
  async function getData() {
    try {
      const response = await axios.get('https://svt.know3.com/api/view_pujalist');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const options = data
    ? data.flatMap((item) =>
      item.category.map((category) => ({

        value: `${item.pooja_name} - ${category.pooja_type}`,
        label: `${item.pooja_name} - ${category.pooja_type}`,
        id: item.pageid,
      }))
    )
    : [];

    const optionsOutside = data
    ? data.flatMap((item) =>
      item.category.map((category) => ({

        value: `${item.pooja_name} - ${category.pooja_type}`,
        label: `${item.pooja_name} - ${category.pooja_type}`,
        id: item.pageid,
      }))
    )
    : [];

    const handleSubmit = (e) => {
      e.preventDefault();
      if (validateForm()) {
        const updatedFormData = {
          ...formData,
          First_name: users?.First_name || '',
          Last_name: users?.Last_name || '',
          email: users?.email || '',
          Mobile_Number: users?.Mobile_Number || '',
          servicename: formData.servicename,
        };
    
        axios
          .post('https://svt.know3.com/api/pooja_request', updatedFormData)
          .then((response) => {
            console.log(response.data);
            setResponseData(response.data);
            setShowModal(true); // Open the modal here
          })
          .catch((error) => {
            console.error('Failed to add puja list: ', error);
          });
      } else {
        console.log('Form validation failed. Please check the form inputs.');
      }
    };
    
  const handleSubmitdata = (e) => {
    e.preventDefault();
    if (validateFormData()) {
      const updatedFormData = {
        ...formDataOutside,
        First_name: userOutside?.First_name || '',
        Last_name: userOutside?.Last_name || '',
        email: userOutside?.email || '',
        Mobile_Number: userOutside?.Mobile_Number || '',
        Address: deactive ? (formDataOutside.Address || '') : (userOutside?.Address || ''),
        servicename: formDataOutside.servicename
      };
  
      axios
        .post('https://svt.know3.com/api/pooja_request', updatedFormData)
        .then((response) => {
          console.log(response.data);
          setResponseData(response.data);
          setShowModal(true); // Open the modal here
        })
        .catch((error) => {
          console.error('Failed to add puja list: ', error);
        });
    } else {
      console.log('Form validation failed. Please check the form inputs.');
    }
  };
  

  const validateFormData = () => {

    let errorOutside = {}
    let formIsValid = true;


    //fname
    if (!formDataOutside["pooja_start_date"]) {
      formIsValid = false;
      errorOutside["pooja_start_dates"] = "Select the start date";
    }



    if (!formDataOutside["pooja_end_date"]) {
      formIsValid = false;
      errorOutside["pooja_end_dates"] = "Select the end date";
    }



    if (!formDataOutside["pooja_start_time"]) {
      formIsValid = false;
      errorOutside["pooja_start_times"] = "Please enter the start time ";

    }


    if (!formDataOutside["pooja_end_time"]) {
      formIsValid = false;
      errorOutside["pooja_end_times"] = "Please enter the end time ";

    }
    if (deactive && !formDataOutside.Address) {
      formIsValid = false;
      errorOutside.Address = 'Please enter the address';
    }
    
    

    if (!formDataOutside["servicename"]) {
      formIsValid = false;
      errorOutside["servicenames"] = "Select the service name";

    }




    setErrorOutside(errorOutside)
    return formIsValid;

  }


  const validateForm = () => {

    let error = {}
    let formIsValid = true;


    //fname
    if (!formData["pooja_start_date"]) {
      formIsValid = false;
      error["pooja_start_dates"] = "Select the start date";
    }



    if (!formData["pooja_end_date"]) {
      formIsValid = false;
      error["pooja_end_dates"] = "Select the end date";
    }



    if (!formData["pooja_start_time"]) {
      formIsValid = false;
      error["pooja_start_times"] = "Please enter the start time ";

    }


    if (!formData["pooja_end_time"]) {
      formIsValid = false;
      error["pooja_end_times"] = "Please enter the end time ";

    }

    if (!formData["servicename"]) {
      formIsValid = false;
      error["servicenames"] = "Select the service name";

    }

    if (!formData["Puja_venue"]) {
      formIsValid = false;
      error["Puja_venues"] = "Select the puja venue";
    }

   
    setError(error)
    return formIsValid;

  }
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px 15px 5px 15px',
    backgroundColor: '#7E4555'
  };

  if(loading){
    return(
<div>
        <div style={{width:'100%',height:'100%',textAlign:'center',marginTop:'300px'}}>
          <img src={loader} alt='Loading Please Wait...'></img>
          </div>
      </div>
    );
  }
  
  return (
    <div>
      <Link to="/user/dashboard">
        <div style={flexContainer}>
          <h5 style={{ flex: 1, color: 'white' }}> <RiDashboardFill /> Dashboard</h5>
          <h5 style={{ flex: 1, color: 'white', textAlign: 'center', }}>Request a Puja</h5>
          <h5 style={{ flex: 1, color: 'white' }}></h5>
        </div>
      </Link>
      <Container>
      <Modal
  {...props}
  size="sm"
  aria-labelledby="contained-modal-title-vcenter"
  centered
  show={showModal}
  onHide={() => setShowModal(false)}
>


                    <Modal.Body>
                        {responseData && (
                            <div>
                                <h6>Puja Request Submitted</h6>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

        <Row>
          <Col>
            <div
              className="modal show"
              style={{ display: 'block', position: 'initial' }}
            >
              <Modal.Dialog size="lg">
                <Modal.Body>
                  <label>Puja location </label>
                  <Tabs
                    defaultActiveKey="home"
                    transition={false}
                    id="noanim-tab-example"
                    className="mb-3"
                    textColor="primary"
                    indicatorColor="primary"

                    style={{ display: "flex", justifyContent: "center" }}
                  >


                    <Tab eventKey="home" title="Inside">
                      <form>
                        <Row>
                          <input type="hidden" name='userid' />
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja Start Date</label>
                             <DatePicker
                      selected={selectedStartDate}
                      onChange={(date) => handleDateChange(date, 'pooja_start_date')}
                      dateFormat="yyyy/MM/dd"
                      className="custom-datepicker form-control"
                      name="pooja_start_date"
                      autoComplete="off"
                    />
                           {/* //  <input type="date" className="form-control" name="pooja_start_date"  /> */}
                              {error && error["pooja_start_dates"] && (
                                <div className="error">{error["pooja_start_dates"]}</div>
                              )}

                            </div>
                          </Col>
                          <Col lg={6}>

                            <div className="mb-3">
                              <label>Puja End Date</label>
                              <DatePicker
                      selected={selectedEndDate}
                      onChange={(date) => handleDateChange(date, 'pooja_end_date')}
                      dateFormat="yyyy/MM/dd"
                      className="custom-datepicker form-control"
                      name="pooja_end_date"
                      autoComplete="off"
                    />
                       {/* <input type="date" className="form-control" name="pooja_end_date" onChange={handlechange} /> */}
                              {error && error["pooja_end_dates"] && (
                                <div className="error">{error["pooja_end_dates"]}</div>
                              )}

                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja Start Time</label>
                              <input style={{height:'45px'}} type="time" className="form-control" name="pooja_start_time" onChange={handlechange} />
                              {error && error["pooja_start_times"] && (
                                <div className="error">{error["pooja_start_times"]}</div>
                              )}

                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja End Time</label>
                              <input style={{height:'45px'}} type="time" className="form-control" name="pooja_end_time" onChange={handlechange} />
                              {error && error["pooja_end_times"] && (
                                <div className="error">{error["pooja_end_times"]}</div>
                              )}

                            </div>
                          </Col>

                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div>
                              <label for="cars">Service Name</label>
                              <Select style={{height:'45px'}}
                                id="category"
                                name="servicename"
                                value={category}
                                onChange={handleCategoryChange}
                                options={options}
                                isSearchable={false}
                                aria-label="Select a category"
                              />
                              {error && error["servicenames"] && (
                                <div className="error">{error["servicenames"]}</div>
                              )}


                            </div>
                          </Col>
                          <Col lg={6}>
                            <label>
                              Venue Preference/Location Of Puja
                            </label>
                            <Form.Select aria-label="Default select example" name="Puja_venue" onChange={handlechange}>
                            <option ></option>
                        <option value="Sivalayam">Sivalayam</option>
                        <option value="Srivaru Sannidhi">Srivaru Sannidhi</option>
                          
                          </Form.Select>
                         
                            {error && error["Puja_venues"] && (
                                <div className="error">{error["Puja_venues"]}</div>
                              )}


                          </Col>

                        </Row>


                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label >First Name</label>
                              <input type="text" className="form-control" name="First_name" value={users.First_name || ''} onChange={handlechange} readOnly />

                            </div>




                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Last Name</label>
                              <input type="text" className="form-control" name="Last_name" value={users.Last_name || ''} onChange={handlechange} readOnly />

                            </div>

                          </Col>

                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Mobile Number</label>
                              <input type="tel" className="form-control" name="Mobile_Number" value={users.Mobile_Number || ''} onChange={handlechange} readOnly />

                            </div>


                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label >Email Id</label>
                              <input type="email" className="form-control" name="email" value={users.email || ''} onChange={handlechange} readOnly />

                            </div>

                          </Col>

                        </Row>
                        <Row>
                          <Col style={{textAlign:"end"}}>
                          <Button variant="secondary" style={{marginRight:"17px"}} className="btnnavbar">
                          <Link to="/user/dashboard" style={{ color: "white" }}>

                            Close
                          </Link>
                        </Button>
                        <Button variant="warning"  style={{color:'white', backgroundColor:'#7E4555' }} className="btnnavbar" onClick={handleSubmit}>Request</Button>
                          </Col>
                        </Row>
            
                      </form>

                    </Tab>



                    <Tab eventKey="profile" title="Outside">
                      <form>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja Start Date</label>
                              <DatePicker
                      selected={selectedStartDateOutside}
                      onChange={(date) => handleDateChangeOutside(date, 'pooja_start_date')}
                      dateFormat="yyyy/MM/dd"
                      className="custom-datepicker form-control"
                      name="pooja_start_date"
                      autoComplete="off"
                    />
                              {/* <input type="date" className="form-control" name="pooja_start_date" onChange={handlechangeOutside} /> */}
                              {errorOutside && errorOutside["pooja_start_dates"] && (
                                <div className="error">{errorOutside["pooja_start_dates"]}</div>
                              )}

                            </div>
                          </Col>
                          <Col lg={6}>

                            <div className="mb-3">
                              <label>Puja End Date</label>
                                 <DatePicker
                      selected={selectedEndDateOutside}
                      onChange={(date) => handleDateChangeOutside(date, 'pooja_end_date')}
                      dateFormat="yyyy/MM/dd"
                      className="custom-datepicker form-control"
                      name="pooja_end_date"
                      autoComplete="off"
                    />
                              {/* <input type="date" className="form-control" name="pooja_end_date" onChange={handlechangeOutside} /> */}
                              {errorOutside && errorOutside["pooja_end_dates"] && (
                                <div className="error">{errorOutside["pooja_end_dates"]}</div>
                              )}

                            </div>

                          </Col>
                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja Start Time</label>
                              <input style={{height:'45px'}} type="time" className="form-control" name="pooja_start_time" onChange={handlechangeOutside} />
                              {errorOutside && errorOutside["pooja_start_times"] && (
                                <div className="error">{errorOutside["pooja_start_times"]}</div>
                              )}

                            </div>
                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Puja End Time</label>
                              <input style={{height:'45px'}} type="time" className="form-control" name="pooja_end_time" onChange={handlechangeOutside} />
                              {errorOutside && errorOutside["pooja_end_times"] && (
                                <div className="error">{errorOutside["pooja_end_times"]}</div>
                              )}

                            </div>
                          </Col>

                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div>
                              <label for="cars">Service Name</label>
                              <Select
                                id="category"
                                name="servicename"
                                value={categoryOutside}
                                onChange={handleCategoryChangeOutside}
                                options={optionsOutside}
                                isSearchable={false}
                                aria-label="Select a category"
                              />
                              {errorOutside && errorOutside["servicenames"] && (
                                <div className="error">{errorOutside["servicenames"]}</div>
                              )}


                            </div>

                          </Col>
                          <Col lg={6}>

                          </Col>

                        </Row>

                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label >First Name</label>
                              <input type="text" className="form-control" name="First_name" value={userOutside.First_name || ''} onChange={handlechange} readOnly />

                            </div>




                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Last  Name</label>
                              <input type="text" className="form-control" name="Last_name" value={userOutside.Last_name || ''} onChange={handlechange} readOnly />

                            </div>

                          </Col>

                        </Row>
                        <Row>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label>Mobile Number</label>
                              <input type="tel" className="form-control" name="Mobile_Number" value={userOutside.Mobile_Number || ''} onChange={handlechange} readOnly />

                            </div>


                          </Col>
                          <Col lg={6}>
                            <div className="mb-3">
                              <label >Email Id</label>
                              <input type="email" className="form-control" name="email" value={userOutside.email || ''} onChange={handlechange} readOnly />

                            </div>

                          </Col>

                        </Row>
                        <Row>
                          <Col lg={6}>

                            <>
                              <Form.Group className="mb-3" onClick={handleButtonClick}>
                                <Form.Check
                                  required
                                  label="Same as devotee address"


                                  feedback="You must agree before submitting."
                                  feedbackType="invalid"
                                  checked={!deactive}
                                  onChange={handlechangeOutside}
                                />


                              </Form.Group>


                            </>




                          </Col>
                          <Col lg={6}>
                            <div>
                                                        <InputGroup>
                              {!deactive ? (
                                <Form.Control
                                  type="hidden"
                                  value={users.Address || ''}
                                  name="Address"
                                />
                              ) : (
                                <Form.Control
                                  as="textarea"
                                  type="text"
                                  name="Address"
                                  onChange={handlechangeOutside}
                                />
                              )}

                            </InputGroup>
                            {errorOutside && errorOutside.Address && (
                                <div className="error">{errorOutside.Address}</div>
                              )}

                            </div>



                        

                          </Col>
                        </Row>
                        <Row>
                        
                          <Col style={{textAlign:"end",marginTop:"20px"}}>
                          <Button variant="secondary" style={{marginRight:"17px"}} className="btnnavbar">
                          <Link to="/user/dashboard" style={{ color: "white" }}>

                            Close
                          </Link>
                        </Button>
                        <Button variant="warning"  style={{color:'white', backgroundColor:'#7E4555' }} className="btnnavbar" onClick={handleSubmitdata}>Request</Button>
                          </Col>
                        </Row>
                    
                      </form>


                    </Tab>


                  </Tabs>
                </Modal.Body>
              </Modal.Dialog>
            </div>



          </Col>
        </Row>
      </Container>

    </div>
  )
}

export default Requestpuja1



// import React, { useState, useEffect } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { RiDashboardFill } from 'react-icons/ri';
// import { Link } from 'react-router-dom';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Tab from 'react-bootstrap/Tab';
// import Tabs from 'react-bootstrap/Tabs';
// import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';
// import Select from 'react-select';
// import 'react-datepicker/dist/react-datepicker.css';
// import DatePicker from 'react-datepicker';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// function Requestpuja1() {
//   const [formData, setFormData] = useState({
//     userid: localStorage.getItem('user_id'),
//     First_name: '',
//     Last_name: '',
//     email: '',
//     Mobile_Number: '',
//     servicename: '',
//     Puja_venue: '',
//     pooja_start_date: '',
//     pooja_end_date: '',
//     pooja_start_time: '',
//     pooja_end_time: '',

//   });


//   const [users, setUsers] = useState({});
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState({});

//   const [responseData, setResponseData] = useState(null);
//   const [category, setCategory] = useState(null);
//   const [deactive, setDeactive] = useState(false);
//   const navigate = useNavigate();

//   const handleButtonClick = () => {
//     setDeactive(!deactive);
//   };
//   //inside
//   const handleCategoryChange = (selectedOption) => {
//     setCategory(selectedOption);
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       servicename: selectedOption.value // Set the selected value to servicename
//     }));
//   };
  
//   const handlechange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevFormData) => ({
//       ...prevFormData,
//       [name]: value
//     }));
//   };
  

//   const handleLogin = () => {
//     axios
//       .get(`https://svt.know3.com/api/edituserview/${localStorage.getItem('user_id')}`, {
//         headers: {
//           'Content-Type': 'application/json'
//         }
//       })

//       .then((response) => {
//         const userData = response.data[0];

//         setUsers({
//           First_name: userData.First_name,
//           Last_name: userData.Last_name,
//           Mobile_Number: userData.Mobile_Number,
//           email: userData.email,
//           Address: userData.Address,
//           City: userData.City
//         });
//       })

//       .catch((error) => {
//         console.error(error);
//       });
//   };


//   useEffect(() => {
//     getData();
//     handleLogin();
    
//   }, []);

//   // pooja name
//   async function getData() {
//     try {
//       const response = await axios.get('https://svt.know3.com/api/view_pujalist');
//       setData(response.data);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//       setError(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const options = data
//     ? data.flatMap((item) =>
//       item.category.map((category) => ({

//         value: `${item.pooja_name} - ${category.pooja_type}`,
//         label: `${item.pooja_name} - ${category.pooja_type}`,
//         id: item.pageid,
//       }))
//     )
//     : [];
//     const handleSubmit = (e) => {
//       e.preventDefault();
//       if (validateForm()) {
//         const updatedFormData = {
//           ...formData,
//           First_name: users?.First_name || '',
//           Last_name: users?.Last_name || '',
//           email: users?.email || '',
//           Mobile_Number: users?.Mobile_Number || '',
//           servicename: formData.servicename,
//         };
    
//         axios
//           .post('https://svt.know3.com/api/pooja_request', updatedFormData)
//           .then((response) => {
//             console.log(response.data);
//           })
//           .catch((error) => {
//             console.error('Failed to add puja list: ', error);
//           });
//       } else {
//         console.log('Form validation failed. Please check the form inputs.');
//       }
//     };
    




//   const validateForm = () => {

//     let error = {}
//     let formIsValid = true;


//     //fname
//     if (!formData["pooja_start_date"]) {
//       formIsValid = false;
//       error["pooja_start_dates"] = "Select the start date";
//     }



//     if (!formData["pooja_end_date"]) {
//       formIsValid = false;
//       error["pooja_end_dates"] = "Select the end date";
//     }



//     if (!formData["pooja_start_time"]) {
//       formIsValid = false;
//       error["pooja_start_times"] = "Please enter the start time ";

//     }


//     if (!formData["pooja_end_time"]) {
//       formIsValid = false;
//       error["pooja_end_times"] = "Please enter the end time ";

//     }

//     if (!formData["servicename"]) {
//       formIsValid = false;
//       error["servicenames"] = "Select the service name";

//     }


//     if (!formData["Puja_venue"]) {
//       formIsValid = false;
//       error["Puja_venues"] = "Please enter the puja venue";
//     }

//     if (typeof formData["Puja_venue"] !== "undefined") {
//       const regex = /^[A-Za-z\s]+$/;
//       if (!formData["Puja_venue"].match(regex)) {
//         formIsValid = false
//         error["Puja_venues"] = "Puja venue must contain only text character"
//       }
//     }

//     setError(error)
//     return formIsValid;

//   }

//   return (
//     <div>
//       <Link to="/user/dashboard">
//         <h4 className='dashboard'> <RiDashboardFill /> Dashboard/Request a Puja</h4>
//       </Link>
//       <Container>
//         <Row>
//           <Col>
//             <div
//               className="modal show"
//               style={{ display: 'block', position: 'initial' }}
//             >
//               <Modal.Dialog size="lg">
//                 <Modal.Body>
//                   <label>Puja location </label>
//                   <Tabs
//                     defaultActiveKey="home"
//                     transition={false}
//                     id="noanim-tab-example"
//                     className="mb-3"
//                     textColor="primary"
//                     indicatorColor="primary"

//                     style={{ display: "flex", justifyContent: "center" }}
//                   >


//                     <Tab eventKey="home" title="Inside">
//                       <form>
//                         <Row>
//                           <input type="hidden" name='userid' />
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label>Puja Start Date</label>
//                               <input type="date" className="form-control" name="pooja_start_date" onChange={handlechange} />
//                               {error && error["pooja_start_dates"] && (
//                                 <div className="error">{error["pooja_start_dates"]}</div>
//                               )}

//                             </div>
//                           </Col>
//                           <Col lg={6}>

//                             <div className="mb-3">
//                               <label>Puja End Date</label>
//                               <input type="date" className="form-control" name="pooja_end_date" onChange={handlechange} />
//                               {error && error["pooja_end_dates"] && (
//                                 <div className="error">{error["pooja_end_dates"]}</div>
//                               )}

//                             </div>

//                           </Col>
//                         </Row>
//                         <Row>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label>Puja Start Time</label>
//                               <input type="time" className="form-control" name="pooja_start_time" onChange={handlechange} />
//                               {error && error["pooja_start_times"] && (
//                                 <div className="error">{error["pooja_start_times"]}</div>
//                               )}

//                             </div>
//                           </Col>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label>Puja End Time</label>
//                               <input type="time" className="form-control" name="pooja_end_time" onChange={handlechange} />
//                               {error && error["pooja_end_times"] && (
//                                 <div className="error">{error["pooja_end_times"]}</div>
//                               )}

//                             </div>
//                           </Col>

//                         </Row>
//                         <Row>
//                           <Col lg={6}>
//                             <div>
//                               <label for="cars">Service Name</label>
//                               <Select
//                                 id="category"
//                                 name="servicename"
//                                 value={category}
//                                 onChange={handleCategoryChange}
//                                 options={options}
//                                 isSearchable={false}
//                                 aria-label="Select a category"
//                               />
//                               {error && error["servicenames"] && (
//                                 <div className="error">{error["servicenames"]}</div>
//                               )}


//                             </div>
//                           </Col>
//                           <Col lg={6}>
//                             <label>
//                               Venue Preference/Location Of Puja
//                             </label>
//                             <input type="search" className="form-control" name="Puja_venue" onChange={handlechange} />
//                             {error && error["Puja_venues"] && (
//                                 <div className="error">{error["Puja_venues"]}</div>
//                               )}


//                           </Col>

//                         </Row>


//                         <Row>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label >Fist Name</label>
//                               <input type="text" className="form-control" name="First_name" value={users.First_name || ''} onChange={handlechange} readOnly />

//                             </div>




//                           </Col>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label>Last Name</label>
//                               <input type="text" className="form-control" name="Last_name" value={users.Last_name || ''} onChange={handlechange} readOnly />

//                             </div>

//                           </Col>

//                         </Row>
//                         <Row>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label>Mobile Number</label>
//                               <input type="tel" className="form-control" name="Mobile_Number" value={users.Mobile_Number || ''} onChange={handlechange} readOnly />

//                             </div>


//                           </Col>
//                           <Col lg={6}>
//                             <div className="mb-3">
//                               <label >Email Id</label>
//                               <input type="email" className="form-control" name="email" value={users.email || ''} onChange={handlechange} readOnly />

//                             </div>

//                           </Col>

//                         </Row>
//                         <Button variant="secondary" className="btnnavbar">
//                           <Link to="/user/dashboard" style={{ color: "white" }}>

//                             Close
//                           </Link>
//                         </Button>
//                         <Button variant="warning" className="btnnavbar" onClick={handleSubmit}>Request</Button>
//                       </form>

//                     </Tab>



//                     <Tab eventKey="profile" title="Outside">
//                       hai
                 

//                     </Tab>


//                   </Tabs>
//                 </Modal.Body>
//               </Modal.Dialog>
//             </div>



//           </Col>
//         </Row>
//       </Container>

//     </div>
//   )
// }

// export default Requestpuja1