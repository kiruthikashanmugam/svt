
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { FormGroup } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import { Label } from 'reactstrap';
import { Helmet } from 'react-helmet';
import Modal from "react-bootstrap/Modal";
// Helper function to format the date as dd.mm.yyyy
function formatDate(date) {
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return formattedDate;
}

function Addevent(props) {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [displayStartDate, setDisplayStartDate] = useState(null);
  const [displayEndDate, setDisplayEndDate] = useState(null);
  const [modal,setModal]=useState(false)

  const navigate = useNavigate();

  const handlechange = (e) => {
   
    if (e.target && e.target.name) {
      setUser((prevUser) => ({
        ...prevUser,
        [e.target.name]: e.target.value,
       
      }));
    }
   
  };

  const handleDateChange = (date, name) => {
    if (name === 'eventstartdate') {
      setSelectedStartDate(date);
    } else if (name === 'eventenddate') {
      setSelectedEndDate(date);
    }
    else if (name === 'displaysdate') {
      setDisplayStartDate(date);
    }
    else if (name === 'displayedate') {
      setDisplayEndDate(date);
    }
    handlechange({ target: { name, value: formatDate(date) } });
  };

  const userRegistration = (e) => {
 
    e.preventDefault();
    
      fetchData(user);
      console.log(fetchData);
    
  };


  const fetchData = (user) => {
    if(validateForm){
    axios
      .post('https://svt.know3.com/api/add_eventinfo', user, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(response.data);
        setResponseData(response.data.message);
        setModal(true)
       
      })
      .catch((error) => {
        console.error(error);
      });
    }
  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;

    // fname
    if (!user['eventname']) {
      formIsValid = false;
      error['eventname'] = 'Please enter the event name';
    }

    if (typeof user['eventname'] !== 'undefined') {
      const regex = /^[A-Za-z\s]+$/;
      if (!user['eventname'].match(regex)) {
        formIsValid = false;
        error['eventname'] = 'Event name contains only text characters ';
      }
    }


    if (!user['eventstartdate']) {
      formIsValid = false;
      error['eventstartdate'] = 'Please enter the event start date';
    }

    if (!user['eventenddate']) {
      formIsValid = false;
      error['eventenddate'] = 'Please enter the event end date';
    }
    if (!user['displaysdate']) {
      formIsValid = false;
      error['displaysdate'] = 'Please enter the display start date';
    }
    if (!user['displayedate']) {
      formIsValid = false;
      error['displayedate'] = 'Please enter the display end end';
    }

    if (!user['recurrencepattern']) {
      formIsValid = false;
      error['recurrencepattern'] = 'Please select the radio button';
    }

    setError(error);
    return formIsValid;
  };

  
const handleCloseModal=()=>{
  if(responseData==="Event added successfully"){
    navigate("/admin/upcomingevent")
  }else{
    setModal(false)
  }

}
 
  return (
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | AddEvent</title>
      </Helmet>
      <Modal  {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={modal} onHide={() => setModal(false)}>

          <Modal.Body>
            {responseData === "Event added successfully" ? (
              <div>
                <h6>Event Added Successfully</h6>
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
   

        <form className="form-admin" method="post" onSubmit={userRegistration}   name="userRegistration" autoComplete='off'>
          <Label style={{ height: '50px' }}>
            <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Add Events</h1>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
          </Label>
          <FormGroup row>
            <Col >
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }} >Event Name</label>
                <input type="text" className="form-control" name="eventname" onChange={handlechange} />
              </div>
              <div style={{ color: 'red' }}>{error.eventname}</div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event Start Date</label>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => handleDateChange(date, 'eventstartdate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="eventstartdate"
                  autoComplete="off"
                />
              </div>
              <div style={{ color: 'red' }}>{error.eventstartdate}</div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event End Date</label>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => handleDateChange(date, 'eventenddate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="eventenddate"
                  autoComplete="off"
                />
              </div>
              <div style={{ color: 'red' }}>{error.eventenddate}</div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Display Start Date</label>
                <DatePicker
                  selected={displayStartDate}
                  onChange={(date) => handleDateChange(date, 'displaysdate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="displaysdate"
                  autoComplete="off"
                />
              </div>
              <div style={{ color: 'red' }}>{error.displaysdate}</div>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className=" mb-3">
                <label style={{ fontWeight: 'normal' }} >Display End Date</label>
                <DatePicker
                  selected={displayEndDate}
                  onChange={(date) => handleDateChange(date, 'displayedate')}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="displayedate"
                  autoComplete="off"
                />


              </div>
              <div style={{ color: 'red' }}>{error.displayedate}</div>
            </Col>

          </FormGroup>

          <FormGroup row>
            <Col style={{ textAlign: 'right' }}>
              <Link to="/admin/upcomingevent">
                <Button type="button" style={{ marginRight: '4px',background:"#6c757d"  }}>
                  Back
                </Button>
              </Link>
              <Button style={{ border: '1px solid green' }} type="submit">
                Add
              </Button>
            </Col>
          </FormGroup>

        </form>

      </Container>
    </Container>
  );
}

export default Addevent;
