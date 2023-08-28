
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

function Editservice() {
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
       
        
          const response = await axios.get(`https://svt.know3.com/api/view_editservice/${_id}`);
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

      const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateForm(); // Validate the form
        if (isValid) {
          try {
           
            await axios.post(`https://svt.know3.com/api/edit_service/${_id}`, data, {
              headers: {
               
                'Content-Type': 'multipart/form-data'
              }
            });
           
            navigate("/admin/servicepage");
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

      const validateForm = () => {
        let formIsValid = true;
        let newError = {};
        if (!data.pooja_name || data.pooja_name.trim() === "") {
            formIsValid = false;
            newError["pooja_name"] = "Please enter the puja Name";
          } else if (!/^[A-Za-z\s]+$/.test(data.pooja_name)) {
            formIsValid = false;
            newError["pooja_name"] = "Puja Name must contain only text characters";
          }


          if (!data.pooja_Duration || data.pooja_Duration.trim() === "") {
            formIsValid = false;
            newError["pooja_Duration"] = "Select the Duration";
          }
          if (!data.pooja_type || data.pooja_type.trim() === "") {
            formIsValid = false;
            newError["pooja_type"] = "Please enter the puja type";
          } else if (!/^[A-Za-z\s]+$/.test(data.pooja_type)) {
            formIsValid = false;
            newError["pooja_type"] = "puja type must contain only text characters";
          }
          if (!data.pooja_fees || data.pooja_fees.trim() === "") {
            formIsValid = false;
            newError["pooja_fees"] = "Please enter the puja fees";
          }
          setError(newError);
          return formIsValid;
            

      };
    
  return (
    <div>
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | Category</title>
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
                  name="pooja_name"
                  value={data.pooja_name || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.pooja_name && (
                  <div style={{ color: "red" }}>{error.pooja_name}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojacategory" sm={5}>Puja Duration</Label>
                <Input
                  type="time"
                  name="pooja_Duration"
                  value={data.pooja_Duration || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.pooja_Duration && (
                  <div style={{ color: "red" }}>{error.pooja_Duration}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>Puja Type</Label>
              
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="pooja_type"
                  value={data.pooja_type || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}>
                  <option value=""></option>
                  <option value="Temple Premise">Temple Premise</option>
                  <option value="Within Triangle">Within Triangle</option>
                  <option value="Outside Triangle">Outside Triangle</option>
                </select>
                {error.pooja_type && (
                  <div style={{ color: "red" }}>{error.pooja_type}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>puja fees</Label>
                <Input
                  type="number"
                  name="pooja_fees"
                  value={data.pooja_fees || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.pooja_fees && (
                  <div style={{ color: "red" }}>{error.pooja_fees}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>puja List URl </Label>
                <Input
                  type="text"
                  name="poojalist_url"
                  value={data.poojalist_url || ""}
                  onChange={handleChange}
                  style={{ height: "45px" }}
                />
                {error.poojalist_url && (
                  <div style={{ color: "red" }}>{error.poojalist_url}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/servicepage">
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

export default Editservice




