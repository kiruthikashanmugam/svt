

import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

function Editpoojas() {
  const [data, setData] = useState([]);
  const [error, setError] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const [responseData, setResponseData] = useState(null);


  const { _id } = useParams();



  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata() {
    setLoading(true);
    try {
      const response = await axios.get(`https://svt.know3.com/api/view_editpoojas/${_id}`);
      if (response.data.length > 0) {
        setData(response.data[0]);
      }
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm(); // Validate the form

    if (isValid) {
      try {
        await axios.post(`https://svt.know3.com/api/edit_poojas/${_id}`, data, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => {
          console.log(response.data);
          setResponseData(response.data.message.trim());
          navigate("/admin/pujas");
        });
      } catch (error) {
        console.log("Error updating user: ", error);
      }
    }
    
  };

  const validateForm = () => {
    let formIsValid = true;
    let newError = {};

    if (!data.service_name || data.service_name.trim() === "") {
      formIsValid = false;
      newError["service_name"] = "Please enter the service name";
    } else if (!/^[A-Za-z\s]+$/.test(data.service_name)) {
      formIsValid = false;
      newError["service_name"] = "service name must contain only text characters";
    }

 
   
  
   
    if (!data.service_fees || data.service_fees.trim() === "") {
      formIsValid = false;
      newError["service_fees"] = "Please enter the service fees";
    }



    setError(newError);
    return formIsValid;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };





  return (
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | Editpuja</title>
      </Helmet>
      <Row>
        {responseData && (
          <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
            {responseData}
          </Alert>
        )}
        <Container>
          <Form method="post" className="form-admin">
            <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Puja</h1>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Puja Name</Label>
                <Input
                  type="text"
                  name="service_name"
                  value={data.service_name || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.service_name && (
                  <div style={{ color: "red" }}>{error.service_name}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojacategory" sm={5}>Puja Category</Label>
                <Input
                  type="text"
                  name="service_category"
                  value={data.service_category || ""}
                  // onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {/* {error.service_category && (
                  <div style={{ color: "red" }}>{error.service_category}</div>
                )} */}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Puja Name</Label>
                <Input
                  type="text"
                  name="service_subcategory"
                   value={data.service_subcategory || ""}
                  // onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {/* {error.service_name && (
                  <div style={{ color: "red" }}>{error.service_subcategory}</div>
                )} */}
              </Col>
            </FormGroup>
           
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>Puja Fees </Label>
                <Input
                  type="number"
                  name="service_fees"
                  value={data.service_fees || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.service_fees && (
                  <div style={{ color: "red" }}>{error.service_fees}</div>
                )}
              </Col>
            </FormGroup>


            <FormGroup row>
              <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/pujas">
                  <Button style={{ marginRight: '4px' }}>
                    Back
                  </Button>
                </Link>
                <Button variant="warning" type="submit" onClick={handleSubmit}  className="btnnavbaradmin">Add</Button>
              </Col>
            </FormGroup>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default Editpoojas

