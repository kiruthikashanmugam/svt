
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import DatePicker from 'react-datepicker';

import React, { useState, useEffect } from 'react';



// Helper function to format the date as dd.mm.yyyy
function formatDate(date) {
  const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
  return formattedDate;
}




function Editevent() {
    const [data, setData] = useState([]);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [responseData, setResponseData] = useState(null);
    const { _id } = useParams();
    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [displayStartDate, setDisplayStartDate] = useState(null);
    const [displayEndDate, setDisplayEndDate] = useState(null);

    useEffect(() => {
        searchdata();
      
      }, []);
    
    async function searchdata() {
        setLoading(true);
        try {
       
        
          const response = await axios.get(`https://svt.know3.com/api/view_editeventinfo/${_id}`);
          if (response.data.length > 0) {
            setData(response.data[0]);
          }
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching data: ", error);
          setError(error);
  
          setLoading(false);
        }
      }
      const handlechange = (e) => {
   
        if (e.target && e.target.name) {
          setData((prevdata) => ({
            ...prevdata,
            [e.target.name]: e.target.value,
           
          }));
        }
       
      };
    
 
      const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateForm(); // Validate the form
        if (isValid) {
          try {
           
            await axios.post(`https://svt.know3.com/api/edit_eventinfo/${_id}`, data, {
              headers: {
               
                'Content-Type': 'multipart/form-data'
              }
            });
           
            navigate("/admin/upcomingevent");
          } catch (error) {
            console.log("Error updating user: ", error);
          }
        }
      };
      const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleDateChange = (date, name) => {
        if (name === 'event_startdate') {
          setSelectedStartDate(date);
        } else if (name === 'event_enddate') {
          setSelectedEndDate(date);
        }
        else if (name === 'displaystartdate') {
          setDisplayStartDate(date);
        }
        else if (name === 'display_enddate') {
          setDisplayEndDate(date);
        }
        handlechange({ target: { name, value: formatDate(date) } });
      };
    

      const validateForm = () => {
        let formIsValid = true;
        let newError = {};
        if (!data.event_name || data.event_name.trim() === "") {
            formIsValid = false;
            newError["event_name"] = "Please enter the event name";
          } else if (!/^[A-Za-z\s]+$/.test(data.event_name)) {
            formIsValid = false;
            newError["event_name"] = "Event name must contain only text characters";
          }

          if (!data.event_startdate || data.event_startdate.trim() === "") {
            formIsValid = false;
            newError["event_startdate"] = "Please enter the event start date";
          }

          if (!data.event_enddate || data.event_enddate.trim() === "") {
            formIsValid = false;
            newError["event_enddate"] = "Please enter the event end date";
          }


          if (!data.displaystartdate || data.displaystartdate.trim() === "") {
            formIsValid = false;
            newError["displaystartdate"] = "Please enter the display start date";
          }



          if (!data.display_enddate || data.display_enddate.trim() === "") {
            formIsValid = false;
            newError["display_enddate"] = "Please enter the display end date ";
          }

       
          setError(newError);
          return formIsValid;
            

      };
    
  return (
    <div>
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | EditEvent</title>
      </Helmet>
      <Row>
        {responseData && (
          <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
            {responseData}
          </Alert>
        )}
        <Container>
          <Form method="post" onSubmit={handleSubmit} className="form-admin">
            <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Category</h1>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Puja Name</Label>
                <Input
                  type="text"
                  name="event_name"
                  value={data.event_name || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.event_name && (
                  <div style={{ color: "red" }}>{error.event_name}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
            <Col>
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event Start Date</label>
                <DatePicker
                  selected={selectedStartDate}
                  onChange={(date) => handleDateChange(date, 'event_startdate')}
                  value={data.event_startdate || ""}
                  dateFormat="yyyy/MM/dd"
                  className="custom-datepicker form-control"
                  name="event_startdate"
                  autoComplete="off"
                />
              </div>
              {error.event_startdate && (
                  <div style={{ color: "red" }}>{error.event_startdate}</div>
                )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Event End Date</label>
                <DatePicker
                  selected={selectedEndDate}
                  onChange={(date) => handleDateChange(date, 'event_enddate')}
                  dateFormat="yyyy/MM/dd"
                  value={data.event_enddate || ""}
                  className="custom-datepicker form-control"
                  name="event_enddate"
                  autoComplete="off"
                />
              </div>
              {error.event_enddate && (
                  <div style={{ color: "red" }}>{error.event_enddate}</div>
                )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className="mb-3">
                <label style={{ fontWeight: 'normal' }}>Display Start Date</label>
                <DatePicker
                  selected={displayStartDate}
                  onChange={(date) => handleDateChange(date, 'displaystartdate')}
                  dateFormat="yyyy/MM/dd"
                  value={data.displaystartdate || ""}
                  className="custom-datepicker form-control"
                  name="displaystartdate"
                  autoComplete="off"
                />
              </div>
              {error.displaystartdate && (
                  <div style={{ color: "red" }}>{error.displaystartdate}</div>
                )}
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col >
              <div className=" mb-3">
                <label style={{ fontWeight: 'normal' }} >Display End Date</label>
                <DatePicker
                  selected={displayEndDate}
                  onChange={(date) => handleDateChange(date, 'display_enddate')}
                  dateFormat="yyyy/MM/dd"
                  value={data.display_enddate || ""}
                  className="custom-datepicker form-control"
                  name="display_enddate"
                  autoComplete="off"
                />


              </div>
              {error.display_enddate && (
                  <div style={{ color: "red" }}>{error.display_enddate}</div>
                )}
            </Col>

          </FormGroup>
            <FormGroup row>
              <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/upcomingevent">
                  <Button style={{ marginRight: '4px' }}>
                    Back
                  </Button>
                  </Link>
                <Button variant="warning" type="submit" className="btnnavbaradmin">Add</Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
      </Row>
    </Container>
    </div>
              
  );
}

export default Editevent



