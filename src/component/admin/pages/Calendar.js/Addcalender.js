import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Label } from 'reactstrap';
import { Helmet } from 'react-helmet';
import Modal from 'react-bootstrap/Modal'
import loader from "../../../../Loader.gif"
import { useEffect } from 'react';

function Addcalendar(props) {
  const [user, setUser] = useState({});
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState('');
  const [selectedServiceCategory, setSelectedServiceCategory] = useState('');
  const [selectedServiceSubcategory, setSelectedServiceSubcategory] = useState('');

  const [error, setError] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handlechange = (e) => {
    if (e.target && e.target.name) {
      setUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const userRegistration = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      fetchData(user); // Use the 'user' state directly in the post request
    }
  };
  
  const handleDateChange = (date, name) => {
    if (name === 'poojastartdate') {
      setSelectedStartDate(date);
    } else if (name === 'poojaenddate') {
      setSelectedEndDate(date);
    }
    handlechange({ target: { name, value: date.toLocaleDateString('en-US') } });
  };


  useEffect(() => {
    searchdata()
  }, [])

  async function searchdata(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/pooja_data`);
      setServices(response.data); // Updating the 'services' state with the response data
      console.log("check active users list   ", response.data); // Logging the response data to the console
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  const handleServiceChange = (event) => {
    const selectedServiceId = parseInt(event.target.value);
    const selectedServiceData = services.find(service => service._id === selectedServiceId);
  
    if (selectedServiceData) {
      setSelectedService(selectedServiceData.service_name);
      setSelectedServiceCategory(selectedServiceData.service_category);
      setSelectedServiceSubcategory(selectedServiceData.service_subcategory);
  
      // Update the user state with the selected values
      setUser(prevUser => ({
        ...prevUser,
        service_name: selectedServiceData.service_name,
        service_category: selectedServiceData.service_category,
        service_subcategory: selectedServiceData.service_subcategory,
      }));
    } else {
      setSelectedService('');
      setSelectedServiceCategory('');
      setSelectedServiceSubcategory('');
  
      // Clear the selected values in the user state
      setUser(prevUser => ({
        ...prevUser,
        service_name: '',
        service_category: '',
        service_subcategory: '',
      }));
    }
  };
  
  const fetchData = (newUser) => {
    // const { service_name, service_category, service_subcategory } = user;
    // const eventData = {
    //   event_name: service_name,
    //   event_category: service_category,
    //   event_subcategory: service_subcategory,
    //   ...user, // Include the rest of the user data
    // };
  
    axios
      .post('https://svt.know3.com/api/create_events', newUser, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data.trim());
        setModal(true)

      })
      .catch((error) => {
        console.error(error);
      });
  };
  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    let error = {};
    let formIsValid = true;

    if (!selectedService) {
      formIsValid = false;
      error['service_name'] = 'Select the service name';
    }
   

    if (!user['poojastartdate']) {
      formIsValid = false;
      error['poojastartdate'] = 'Please enter the start date';
    }

    if (!user['poojaenddate']) {
      formIsValid = false;
      error['poojaenddate'] = 'Please enter the end date';
    }
    if (!user['starttime']) {
      formIsValid = false;
      error['starttime'] = 'Please enter the start time';
    }
    if (!user['endtime']) {
      formIsValid = false;
      error['endtime'] = 'Please enter the end time';
    }

    if (!user['recurrencepattern']) {
      formIsValid = false;
      error['recurrencepattern'] = 'Please select the radio button';
    }

    setError(error);
    return formIsValid;
  };

  const handleCloseModal = () => {
    if (responseData === 'Event updated successfully') {
      navigate('/admin/calendar');
    } else {
      setModal(false)
    }
  }

  return (
    <div>
      <Helmet>
        <title>Admin | Addcalendar</title>
      </Helmet>
      <Modal  {...props}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered show={modal} onHide={() => setModal(false)}>

        <Modal.Body>
          {responseData === "Event updated successfully" ? (
            <div>
              <h6>Event added successfully</h6>
            </div>
          ) : (
            <div>
              {responseData}
            </div>
          )}


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      <Container>
        {/* {responseData && (
          <Alert variant="success" style={{ textAlign: 'center' }}>
            {responseData}
          </Alert>
        )} */}

        <form className='form-admin' method="post" name="userRegistration" onSubmit={userRegistration} autoComplete='off'>

          <Label style={{ height: '50px' }}>
            <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Add Events</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
          </Label>

          <Row>

            <Col lg={6}>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }} >Event Name</label>
                <select id="serviceSelect" name='service_name'   className="form-control" style={{height:"46px",border:'1px solid  #efefef'}} onChange={handleServiceChange}>
                  <option value="">Select a Service</option>
                  {services.map(service => (
                    <option key={service._id} value={service._id}>{service.service_name}</option>
                  ))}
                </select>
                {/* <input type="text" className="form-control" name="servicename" onChange={handlechange} /> */}
              </div>
              <div style={{ color: 'red' }}>{error.service_name}</div>
            </Col>
            <Col lg={6}>
             
                <div id="serviceDetails">
                  <div className="mb-3">
                    <label style={{ fontWeight: 'normal' }} >Event Category</label>
                    <input
                      type="text"
                      className="form-control"
                      name='service_category'
                      value={selectedServiceCategory}
                      disabled
                    />             
                     </div>
                </div>
              
              
            </Col>
          </Row>

          <Row>
            <Col lg={6}>
              <div className="mb-3">
                
                  <div id="serviceDetail">
                    <label style={{ fontWeight: 'normal' }}>Event Subcategory</label>
                    <input
                      type="text"
                      name='service_subcategory'
                      className="form-control"
                      value={selectedServiceSubcategory}
                      disabled
                    />
                  </div>
                
              </div>

           
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event Start Date</label>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => handleDateChange(date, 'poojastartdate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="poojastartdate"
                  autoComplete="off"
                />
              </div>
              <div style={{ color: 'red' }}>{error.poojastartdate}</div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className=" mb-3">
                <label style={{ fontWeight: 'normal' }} >Event End Date</label>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => handleDateChange(date, 'poojaenddate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="poojaenddate"
                  autoComplete="off"
                />


              </div>
              <div style={{ color: 'red' }}>{error.poojaenddate}</div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event Start Time</label>
                <input type="time" className="form-control" name="starttime" onChange={handlechange} style={{ height: "45px" }} />
              </div>
              <div style={{ color: 'red' }}>{error.starttime}</div>
            </Col>
          </Row>
          <Row>
            <Col lg={6}>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event End Time</label>
                <input type="time" className="form-control" name="endtime" onChange={handlechange} style={{ height: "45px" }} />
              </div>
              <div style={{ color: 'red' }}>{error.endtime}</div>
            </Col>
            <Col lg={6}>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Recurrence</label>
                <div className="form-check mb-3" >
                  <Form.Check
                    label="Weekly"
                    type="radio"
                    name="recurrencepattern"
                    value="weekly"
                    onChange={handlechange}
                  />
                  <Form.Check
                    label="Monthly"
                    type="radio"
                    name="recurrencepattern"
                    value="monthly"
                    onChange={handlechange}
                  />
                  <Form.Check
                    label="Yearly"
                    type="radio"
                    name="recurrencepattern"
                    value="yearly"
                    onChange={handlechange}
                  />
                  <Form.Check
                    label="Daily"
                    type="radio"
                    name="recurrencepattern"
                    value="daily"
                    onChange={handlechange}
                  />

                </div>
              </div>
              <div style={{ color: 'red' }}>{error.recurrencepattern}</div>
            </Col>

          </Row>
          <Row>
            <Col style={{ textAlign: 'right' }}>
              <Link to="/admin/calendar">
                <Button style={{ marginRight: '4px', backgroundColor: "rgb(108, 117, 125)" }}>
                  Back
                </Button>
              </Link>
              <Button style={{ border: '1px solid green' }} type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </form>

      </Container>
    </div>
  );
}

export default Addcalendar;

