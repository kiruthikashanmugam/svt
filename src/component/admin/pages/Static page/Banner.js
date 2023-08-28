


import React from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import 'react-datepicker/dist/react-datepicker.css';
import DatePicker from 'react-datepicker';
import '../../assets/styles/Header.css';
import { Helmet } from 'react-helmet';
import Alert from 'react-bootstrap/Alert';


class Banner extends React.Component {
  constructor() {
    super();
    this.onChangePoojaname = this.onChangePoojaname.bind(this);
    this.onChangePoojacategory = this.onChangePoojacategory.bind(this);
    this.onChangePoojasubcategory = this.onChangePoojasubcategory.bind(this);
    this.onChangePoojafees = this.onChangePoojafees.bind(this);
    this.onChangePoojacategoryimg = this.onChangePoojacategoryimg.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      eventname: "",
      startdate: null,
      enddate: null,
      eventtime: "",
      file: [],
      error: {},
      responseData: null
    };
  }

  componentWillUnmount() {
    this.clearResponseDataTimeout();
  }

  clearResponseDataTimeout() {
    if (this.responseDataTimeout) {
      clearTimeout(this.responseDataTimeout);
      this.responseDataTimeout = null;
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.responseData !== this.state.responseData) {
      this.clearResponseDataTimeout();
  
      if (this.state.responseData) {
        this.responseDataTimeout = setTimeout(() => {
          this.clearResponseDataTimeout();
          this.setState({ responseData: null });
        }, 1000); // Increase the timeout duration to 3000 milliseconds (3 seconds)
      }
    }
  }
  

  onChangePoojaname(e) {
    this.setState({ eventname: e.target.value })
  }

  onChangePoojacategory(date) {
    this.setState({ startdate: date });
  }
  
  onChangePoojasubcategory(date) {
    this.setState({ enddate: date });
  }
  
  onChangePoojafees(e) {
    this.setState({ eventtime: e.target.value })
  }

  onChangePoojacategoryimg(event) {
    const files = Array.from(event.target.files);
    this.setState({ file: files });
  }

  validateForm() {
    const { eventname, enddate, startdate, eventtime, file } = this.state;
    let formIsValid = true;
    let error = {};


    if (!eventname || eventname.trim() === "") {
      formIsValid = false;
      error["eventname"] = "Please enter the event name";
    } else if (!/^[A-Za-z\s]+$/.test(eventname)) {
      formIsValid = false;
      error["eventname"] = "Event Name must contain only text characters";
    }

    if (!startdate) {
      formIsValid = false;
      error["startdate"] = "Select the start date";
    } 

    if (!enddate) {
      formIsValid = false;
      error["enddate"] = "Select the end date";
    } 

    if (!eventtime || eventtime.trim() === "") {
      formIsValid = false;
      error["eventtime"] = "Select the event time";
    } 

    if (!file.length) {
      formIsValid = false;
      error["file"] = "Please upload the image";
    } 


    this.setState({ error });
    return formIsValid;
  }

  onSubmit(e) {
    e.preventDefault();
  
    if (!this.validateForm()) {
      return;
    }
  
    const formData = new FormData();
    formData.append("eventname", this.state.eventname);
    formData.append("startdate", this.formatDate(this.state.startdate)); // Format the start date
    formData.append("enddate", this.formatDate(this.state.enddate)); // Format the end date
    formData.append("eventtime", this.state.eventtime);
  
    // Append each file separately with a unique key
    if (this.state.file.length) {
      this.state.file.forEach((file, index) => {
        formData.append(`file[${index}]`, file);
      });
    }
  
    axios
      .post("https://svt.know3.com/api/addbanner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        this.setState({ responseData: res.data.trim() });
        // Handle success, if needed
      })
      .catch((err) => {
        console.error(err);
        // Handle error, display error message or take appropriate action
      });
  
    this.setState({
      eventname: "",
      startdate: null,
      enddate: null,
      file: [],
      eventtime: "",
      error: {},
    });
  
    // Clear the form fields
    e.target.reset();
  }


  
  formatDate(date) {
    const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
    return formattedDate;
  }
 
  
  
  
  
  
  
  
  render() {
    const { error,responseData } = this.state;

    return (
     <Container style={{width:"75%"}}>
      <Helmet>
        <title>Admin | Banner</title>
      </Helmet>
        <Row>
        <Container>
       
        <Form className="form-admin" onSubmit={this.onSubmit} autoComplete="off">     
        {responseData && responseData !== "null" && (
            <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
              {responseData}
            </Alert>
          )}   
        <FormGroup row>
              <Label style={{ height: '50px' }}>
                      <h1 style={{padding: '15px', color:'black', textAlign: 'center', fontSize: '19px', fontWeight:'bold'}}>Banner</h1>
                      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
                    </Label>
            
            <Col >
            <Label  style={{fontWeight:'normal'}} for="Event Name" sm={5}>Event Name</Label>
            <Input type="text" name="eventname"  value={this.state.eventname}
            onChange={this.onChangePoojaname} 
            style={{height:"45px"}} />
              {error.eventname && (
                  <div  style={{ color: "red" }}>{error.eventname}</div>
                )}
            </Col>
            
        </FormGroup>
       
        <FormGroup row>
                
                <Col>
                <Label  style={{fontWeight:'normal'}} for="Start Date" sm={5}>Start Date</Label>
                {/* <Input type="date" name="startdate"  
                value={this.state.startdate} onChange={this.onChangePoojacategory}  /> */}
                  <DatePicker
                    selected={this.state.startdate}
                    onChange={this.onChangePoojacategory}
                    dateFormat="dd-MM-yyyy"                 
                       name="startdate"
                    className="custom-datepicker-admin form-control" 
                    autocomplete="off"
                  />
                 {error.startdate && (
                  <div  style={{ color: "red" }}>{error.startdate}</div>
                )}
                 
                </Col>
             
        </FormGroup>  
        <FormGroup row>
            
            <Col >
            <Label  style={{fontWeight:'normal'}} for="End Date" sm={5}>End Date</Label>
            {/* <Input type="date" name="enddate" 
            value={this.state.enddate} onChange={this.onChangePoojasubcategory}  /> */}
              <DatePicker 
                selected={this.state.enddate}
                onChange={this.onChangePoojasubcategory}
                dateFormat="dd-MM-yyyy"
                className="custom-datepicker-admin form-control" 
                name="enddate"
                autocomplete="off"
             />
             {error.enddate && (
                  <div  style={{ color: "red" }}>{error.enddate}</div>
                )}
           
              </Col>
        </FormGroup>
        <FormGroup row>
            
            <Col >
            <Label  style={{fontWeight:'normal'}} for="Event Time" sm={5}>Event Time</Label>
            <Input type="time" name="eventtime" value={this.state.eventtime} onChange={this.onChangePoojafees} autocomplete="off"
              style={{height:"45px"}}  />
            {error.eventtime && (
                  <div  style={{ color: "red" }}>{error.eventtime}</div>
                )}
            </Col>
        </FormGroup>
        <FormGroup row>
            
            <Col >
            <Label  style={{fontWeight:'normal'}} for="Image" sm={5}> Category Image</Label>
              <Input type="file" name="file" onChange={this.onChangePoojacategoryimg}  multiple
                style={{height:"45px",paddingTop:"10px"}}  />

                {error.file && (
                      <div  style={{ color: "red" }}>{error.file}</div>
                    )}
            </Col>
        </FormGroup>
        <Col style={{ textAlign: 'right' }}>
                    <Button variant="warning" className="btnnavbaradmin" type='submit' >Add</Button>
                      {/* <Button outline color="success" style={{border:"1px solid green"}} type="submit">
                        Add
                      </Button> */}
                    </Col>
        </Form>
        </Container>
        </Row>
      </Container>
    );
  }
}

export default Banner;
