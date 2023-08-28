import React, { useState, useEffect } from 'react';
import { Row, Form, FormGroup, Label, Button, Input, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal';

const Addservice = (props) => {
  const [poojaName, setPoojaName] = useState('');
  const [duration, setDuration] = useState('');
  const [poojatype, setPoojatype] = useState("");

  const [poojafees, setPoojafees] = useState('');

  const [pujaList, setPujaList] = useState('');
  const [responseData, setResponseData] = useState(null)
const [modal,setModal]=useState(false)
  const [errors, setErrors] = useState({});
      const navigate=useNavigate()

  const validateForm = () => {
    const errors = {};

    if (!poojaName) {
      errors.poojaName = 'Please enter a puja name';
    } else if (!/^[A-Za-z\s]+$/.test(poojaName)) {

      errors["poojaName"] = "Puja Name must contain only text characters";
    }

    if (!duration) {
      errors.duration = 'Select the duration';
    }

    if (!poojatype) {
      errors.poojatype = 'Select the puja type';
    }

    if (!poojafees) {
      errors.poojafees = 'Please enter the Puja fees';
    }


    // if (!pujaList) {
    //   errors.pujaList = 'Please enter the puja list url';
    // }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append('poojaname', poojaName);
    formData.append('Duration', duration);
    formData.append('poojatype', poojatype);
    formData.append('poojafees', poojafees);

    formData.append('pujalist', pujaList);

    axios
      .post('https://svt.know3.com/api/add_pujalist', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((res) => {
        console.log(res.data);
        setResponseData(res.data.message.trim());
        setModal(true)
        // if(res.data.message.trim()==="Data inserted successfully"){

        //   navigate("/servicepage")
        // }
        // Handle success, if needed
      })
      .catch((err) => {
        console.error(err);
        // Handle error, display error message or take appropriate action
      });

    setPoojaName('');
    setDuration('');
    setPoojatype(null);
    setPoojafees('');

    setPujaList('');
  };

  // useEffect(() => {
  //   if (responseData) {
  //     const timeout = setTimeout(() => {
  //       setResponseData(null); // Clear the success message after 1 second


  //     }, 1000);
  //     return () => {

  //       clearTimeout(timeout); // Clear the timeout on component unmount
  //     };
  //   }
  // }, [responseData]);

  const handleCloseModal=()=>{
        if(responseData.trim()==="Data inserted successfully"){

          navigate("/admin/servicepage")
        }else{
          setModal(false)
        }
  }
  return (
    <div>
      <Helmet>
        <title>Admin | AddService</title>
      </Helmet>

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
      <Container style={{width:"75%"}}>
        <Row>
          <Container>
          
            <Form className="form-admin" onSubmit={onSubmit} >
              <FormGroup row>
                <Label style={{ height: '50px' }}>
                  <h1 style={{padding: '15px', textAlign: 'center',color:'black', fontSize: '19px', fontWeight:'bold'}}>Add Service</h1>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
                </Label>
                  <Col >
                  <Label  style={{fontWeight:'normal'}} sm={5}>Puja Name</Label>
                    <Input type="text" name="poojaname" value={poojaName} onChange={(e) => setPoojaName(e.target.value)} 
                    style={{height:"45px"}}/>
                    {errors.poojaName && <div style={{ color: 'red' }}>{errors.poojaName}</div>}
                  </Col>
              </FormGroup>

              <FormGroup row>
                <Col >
                <Label  style={{fontWeight:'normal'}} sm={5}>Duration</Label>
                    <Input type="time" name="Duration" value={duration} onChange={(e) => setDuration(e.target.value)}
                    style={{height:"45px"}} />
                      {errors.duration && <div style={{ color: 'red' }}>{errors.duration}</div>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col >
                <Label  style={{fontWeight:'normal'}} sm={5}>Service Type</Label>
                  <select
                      className="form-select"
                      aria-label="Default select example"
                      name="poojatype"
                      value={poojatype || ""}
                      onChange={(e) => setPoojatype(e.target.value)}
                      style={{height:"45px"}}>
                    <option value=""></option>
                    <option value="Temple Premise">Temple Premise</option>
                    <option value="Within Triangle">Within Triangle</option>
                    <option value="Outside Triangle">Outside Triangle</option>
                  </select>
                  {errors.poojatype && <div style={{ color: 'red' }}>{errors.poojatype}</div>}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col >
                <Label  style={{fontWeight:'normal'}} sm={5}>Puja Fees</Label>
                  <Input
                    type="number"
                    name="poojafees"
                    value={poojafees}
                    min={1}
                    onChange={(e) => setPoojafees(e.target.value)}
                    style={{height:"45px"}}
                  />
                    {errors.poojafees && <div style={{ color: 'red' }}>{errors.poojafees}</div>}
                </Col>
              </FormGroup>

                {/* <FormGroup row>
                  <Label sm={2}>Outside Triangle</Label>
                  <Col sm={10}>
                    <Input
                      type="number"
                      name="outsidetriangle"
                      value={outsideTriangle}
                      min={1}
                      onChange={(e) => setOutsideTriangle(e.target.value)}
                    />
                      {errors.outsideTriangle && <div style={{ color: 'red' }}>{errors.outsideTriangle}</div>}
                  </Col>
                
                </FormGroup> */}

                <FormGroup row>
                  <Col>
                    <Label  style={{fontWeight:'normal'}} sm={5}>Puja List Url</Label>
                    <Input type="url" name="pujalist" value={pujaList} onChange={(e) => setPujaList(e.target.value)} multiple 
                    style={{height:"45px"}}/>
                    {errors.pujaList && <div style={{ color: 'red' }}>{errors.pujaList}</div>}
                  </Col>

                </FormGroup>

                <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/servicepage">
                    <Button  style={{ marginRight: '4px' }}>
                      Back
                    </Button>
                  </Link>
                  <Button variant="warning" className="btnnavbaradmin" type="submit">
                    Add
                  </Button>
                </Col>
              </Form>
            </Container>
        </Row>
      </Container>
    </div>
  );
};

export default Addservice;
