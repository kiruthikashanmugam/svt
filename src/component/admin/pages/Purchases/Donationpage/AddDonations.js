// import React from 'react';
// import { Form, FormGroup, Label, Button, Input, Col, Card, CardBody, Container, Row } from 'reactstrap';
// import axios from 'axios';
// import Alert from 'react-bootstrap/Alert';
// import { Helmet } from 'react-helmet';
// import { Link } from 'react-router-dom';

// class AddDonations extends React.Component {
//   constructor() {
//     super();
//     this.onChangeServicename = this.onChangeServicename.bind(this);
//     this.onChangeServicecategory = this.onChangeServicecategory.bind(this);
//     this.onChangeServicefees = this.onChangeServicefees.bind(this);
//     this.onSubmit = this.onSubmit.bind(this);
//     this.state = {
//       servicename: "",
//       servicecategory: "",
//       servicefees: "",
//       error: {},
//       responseData: null
//     };
//   }

//   componentWillUnmount() {
//     this.clearResponseDataTimeout();
//   }

//   clearResponseDataTimeout() {
//     if (this.responseDataTimeout) {
//       clearTimeout(this.responseDataTimeout);
//       this.responseDataTimeout = null;
//     }
//   }

//   componentDidUpdate(prevProps, prevState) {
//     if (prevState.responseData !== this.state.responseData) {
//       this.clearResponseDataTimeout();
  
//       if (this.state.responseData) {
//         this.responseDataTimeout = setTimeout(() => {
//           this.clearResponseDataTimeout();
//           this.setState({ responseData: null });
//         }, 1000); // Increase the timeout duration to 3000 milliseconds (3 seconds)
//       }
//     }
//   }
  

//   onChangeServicename(e) {
//     this.setState({ servicename: e.target.value });
//   }

//   onChangeServicecategory(e) {
//     this.setState({ servicecategory: e.target.value });
//   }

//   onChangeServicefees(e) {
//     this.setState({ servicefees: e.target.value });
//   }

//   validateForm() {
//     const { servicename, servicecategory, servicefees } = this.state;
//     let formIsValid = true;
//     let error = {};

//     if (!servicename || servicename.trim() === "") {
//       formIsValid = false;
//       error["servicename"] = "Please enter the service name";
//     } else if (!/^[A-Za-z\s]+$/.test(servicename)) {
//       formIsValid = false;
//       error["servicename"] = "Service name must contain only text characters";
//     }

//     if (!servicecategory || servicecategory.trim() === "") {
//       formIsValid = false;
//       error["servicecategory"] = "Please enter the service category";
//     } else if (!/^[A-Za-z\s]+$/.test(servicecategory)) {
//       formIsValid = false;
//       error["servicecategory"] = "Service category must contain only text characters";
//     }

//     if (!servicefees || servicefees.trim() === "") {
//       formIsValid = false;
//       error["servicefees"] = "Please enter the service fees";
//     } else if (!/([1-9][0-9]*)|0/.test(servicefees)) {
//       formIsValid = false;
//       error["servicefees"] = "Service fees must contain only numbers";
//     }

//     this.setState({ error });
//     return formIsValid;
//   }

//   onSubmit(e) {
//     e.preventDefault();

//     if (!this.validateForm()) {
//       return;
//     }

//     const userObject = {
//       servicename: this.state.servicename,
//       servicecategory: this.state.servicecategory,
//       servicefees: this.state.servicefees
//     };

//     axios.post('https://svt.know3.com/api/donation', userObject, {
//       params: userObject,
//       headers: {
//         "Content-Type": "application/x-www-form-urlencoded"
//       }
//     })
//       .then(res => {
//         console.log(res.data);
//         this.setState({ responseData: res.data })
//         // Handle success, if needed
//       })
//       .catch(err => {
//         console.error(err);
//         // Handle error, display error message or take appropriate action
//       });

//     this.setState({ servicename: '', servicecategory: '', servicefees: '', error: {} });
//   }

//   render() {
//     const { error, responseData } = this.state;

//     return (
//       <Container style={{width:"75%"}}>
//         <Helmet>
//         <title>Admin | AddDonation</title>
//       </Helmet>
//         <Row>
//           <Container>
//           {responseData && responseData !== "null" && (
//             <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
//               {responseData.message}
//             </Alert>
//           )}
//             <Form className="form-admin" onSubmit={this.onSubmit}>
//                   <FormGroup row>
//                   <Label style={{ height: '50px' }}>
//                       <h1 style={{ padding: '15px', textAlign: 'center',color:'black',  fontSize: '19px', fontWeight:'bold'}}>Donation</h1>
//                       <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
//                   </Label>
//                     <Col >
//                     <Label style={{fontWeight:'normal'}} for="servicename" sm={5}>Service name</Label>
//                       <Input type="text" name="servicename" value={this.state.servicename} onChange={this.onChangeServicename} 
//                       style={{height:"45px"}}/>
//                       {error.servicename && (
//                         <div style={{ color: "red" }}>{error.servicename}</div>
//                       )}
//                     </Col>
//                   </FormGroup>

//                   <FormGroup row>
//                     <Col >
//                     <Label style={{fontWeight:'normal'}} for="servicecategory" sm={5}>Service category</Label>
//                       <Input type="text" name="servicecategory" value={this.state.servicecategory} onChange={this.onChangeServicecategory} 
//                       style={{height:"45px"}}/>
//                       {error.servicecategory && (
//                         <div style={{ color: "red" }}>{error.servicecategory}</div>
//                       )}
//                     </Col>
//                   </FormGroup>

//                   <FormGroup row>
//                     <Col >
//                     <Label style={{fontWeight:'normal'}} for="servicefees" sm={5}>Service fees</Label>
//                       <Input type="number" name="servicefees" min={1} value={this.state.servicefees} onChange={this.onChangeServicefees}
//                       style={{height:"45px"}} />
//                       {error.servicefees && (
//                         <div style={{ color: "red" }}>{error.servicefees}</div>
//                       )}
//                     </Col>
//                   </FormGroup>

//                   <Row>
//                   <Col style={{ textAlign: 'right' }}>
//                     <Link to="/admin/donation">
//                     <Button  style={{ marginRight: '4px' }}>
//                       Back
//                     </Button>
//                     </Link>
               
//                     <Button variant="warning" type='submit' className="btnnavbaradmin" >Add</Button>
//                       {/* <Button outline color="success" style={{border:"1px solid green"}} type="submit">
//                         Add
//                       </Button> */}
//                     </Col>
//                   </Row>
//                 </Form>
//           </Container>
//         </Row>
//       </Container>
//     );
//   }
// }

// export default  AddDonations;


import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Button, Input, Col, Card, CardBody, Container, Row } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';


const AddDonations = (props) => {
  const [servicename, setServicename] = useState("");
  const [servicecategory, setServicecategory] = useState("");
  const [servicefees, setServicefees] = useState("");
  const [error, setError] = useState({});
  const [responseData, setResponseData] = useState(null);
  const [modal,setModal]=useState(false)

const navigate=useNavigate()




  const onChangeServicename = (e) => {
    setServicename(e.target.value);
  };

  const onChangeServicecategory = (e) => {
    setServicecategory(e.target.value);
  };

  const onChangeServicefees = (e) => {
    setServicefees(e.target.value);
  };

  const validateForm = () => {
    let formIsValid = true;
    let newError = {};

    if (!servicename || servicename.trim() === "") {
      formIsValid = false;
      newError["servicename"] = "Please enter the service name";
    } else if (!/^[A-Za-z\s]+$/.test(servicename)) {
      formIsValid = false;
      newError["servicename"] = "Service name must contain only text characters";
    }

    if (!servicecategory || servicecategory.trim() === "") {
      formIsValid = false;
      newError["servicecategory"] = "Please enter the service category";
    } else if (!/^[A-Za-z\s]+$/.test(servicecategory)) {
      formIsValid = false;
      newError["servicecategory"] = "Service category must contain only text characters";
    }

    if (!servicefees || servicefees.trim() === "") {
      formIsValid = false;
      newError["servicefees"] = "Please enter the service fees";
    } else if (!/([1-9][0-9]*)|0/.test(servicefees)) {
      formIsValid = false;
      newError["servicefees"] = "Service fees must contain only numbers";
    }

    setError(newError);
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userObject = {
      servicename: servicename,
      servicecategory: servicecategory,
      servicefees: servicefees
    };

    axios.post('https://svt.know3.com/api/donation', userObject, {
      params: userObject,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(res => {
        console.log(res.data);
        setResponseData(res.data.message.trim());
        setModal(true)
        // Handle success, if needed
      })
      .catch(err => {
        console.error(err);
        // Handle error, display error message or take appropriate action
      });

    setServicename('');
    setServicecategory('');
    setServicefees('');
    setError({});
  };

  const handleCloseModal=()=>{
    if(responseData==="Data inserted successfully"){
     navigate("/admin/donation") 
    }else{
      setModal(false)
    }
  }

  return (
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | AddDonation</title>
      </Helmet>
      <Row>
        <Container>
          {/* {responseData && responseData !== "null" && (
            <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
              {responseData.message}
            </Alert>
          )} */}
            <Modal  {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={modal} onHide={() => setModal(false)}>

          <Modal.Body>
            {responseData === "Data inserted successfully" ? (
              <div>
                <h6>Registered Successfully</h6>
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
          <Form className="form-admin" onSubmit={onSubmit}>
            <FormGroup row>
              <Label style={{ height: '50px' }}>
                <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Donation</h1>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
              </Label>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="servicename" sm={5}>Service name</Label>
                <Input type="text" name="servicename" value={servicename} onChange={onChangeServicename}
                  style={{ height: "45px" }} />
                {error.servicename && (
                  <div style={{ color: "red" }}>{error.servicename}</div>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="servicecategory" sm={5}>Service category</Label>
                <Input type="text" name="servicecategory" value={servicecategory} onChange={onChangeServicecategory}
                  style={{ height: "45px" }} />
                {error.servicecategory && (
                  <div style={{ color: "red" }}>{error.servicecategory}</div>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="servicefees" sm={5}>Service fees</Label>
                <Input type="number" name="servicefees" min={1} value={servicefees} onChange={onChangeServicefees}
                  style={{ height: "45px" }} />
                {error.servicefees && (
                  <div style={{ color: "red" }}>{error.servicefees}</div>
                )}
              </Col>
            </FormGroup>

            <Row>
              <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/donation">
                  <Button style={{ marginRight: '4px' }}>
                    Back
                  </Button>
                </Link>

                <Button variant="warning" type='submit' className="btnnavbaradmin" >Add</Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
};

export default AddDonations;
