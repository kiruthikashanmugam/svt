

import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Row, Col, Container } from "reactstrap";
import { Link } from "react-router-dom";
import InputGroup from 'react-bootstrap/InputGroup';
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';


function Edit() {
  const [data, setData] = useState({

  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({}); // Track validation errors

  const { _id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    searchdata();
  }, [_id]);

  async function searchdata() {
    setLoading(true);
    try {
      const response = await axios.get(`https://svt.know3.com/api/edituserview/${_id}`);
      setData(response.data[0]);
      console.log('Response : ', response.data)
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
        await axios.post('https://svt.know3.com/api/updateuser', data, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });
        navigate(`/admin/managementview/${data._id}`);
      } catch (error) {
        console.log("Error updating user: ", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));

    // Clear the validation error for the changed field
    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };

  const validateForm = () => {
    const errors = {};

    // Validate each field manually
    if (data.First_name === '') {
      errors.First_name = 'Please enter the first name';
    } else if (!/^[A-Za-z\s]+$/.test(data.First_name)) {
      errors.First_name = 'First Name must contain only text characters';
    }

    if (data.Last_name === '') {
      errors.Last_name = 'Please enter the last name';
    } else if (!/^[A-Za-z\s]+$/.test(data.Last_name)) {
      errors.Last_name = 'Last Name must contain only text characters';
    }

    if (data.Mobile_Number === '') {
      errors.Mobile_Number = 'Please enter the mobile number';
    } else if (!/^\d{10}$/.test(data.Mobile_Number)) {
      errors.Mobile_Number = 'Mobile Number must be a 10-digit number';
    }

    if (data.email === '') {
      errors.email = 'Please enter the email-id';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }

    if (data.Address === '') {
      errors.Address = 'Please enter the address';
    }

    if (data.City === '') {
      errors.City = 'Please enter the city';
    } else if (!/^[A-Za-z\s]+$/.test(data.City)) {
      errors.City = 'City must contain only text characters';
    }

    if (data.Country === '') {
      errors.Country = 'Please enter the country';
    }
    
    if (data.role === '') {
      errors.Country = 'Please select the role';
    }
    if (data.State === '') {
      errors.State = 'Please enter the state';
    }

    if (data.Zip_Code === '') {
      errors.Zip_Code = 'Please enter the zip code';
    } else if (data.Zip_Code !== undefined) {
      // Regular expressions for validating zipcode/pincode based on country
      const usZipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      const indiaPinRegex = /^\d{6}$/;
      const saudiArabiaZipRegex = /^\d{5}$/;
      const canadaZipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

      // Regular expression for validating zipcode/pincode based on user's country
      let zipRegex;
      switch (data.Country) {
        case "US":
          zipRegex = usZipRegex;
          break;
        case 'IN':
          zipRegex = indiaPinRegex;
          break;
        case 'SA':
          zipRegex = saudiArabiaZipRegex;
          break;
        case 'CA':
          zipRegex = canadaZipRegex;
          break;
        default:
          errors.Zip_Code = 'Invalid country';
          break;
      }

      if (zipRegex && !data.Zip_Code.match(zipRegex)) {
        errors.Zip_Code = 'Please enter a valid zip code';
      }
    }

    // Set the validation errors
    setValidationErrors(errors);

    return Object.keys(errors).length === 0; // Return true if there are no errors
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

  if (error) {
    return "Error!";
  }

  return (
    <div>
      <Helmet>
        <title>Admin | EditUser</title>
      </Helmet>
      <Container>
        <div className="auth-wrapper-admin">
          <div className="auth-inners-admin">
            <form method='post' name="userRegistration" onSubmit={handleSubmit} >
              <h3>Edit User Details</h3>

              <Row>
                <input type="hidden" className="form-control" name="_id" value={data._id || ''} onChange={handleChange} required />
                <Col lg={6}>
                  <div className="mb-3">
                    <label>First Name</label>
                    <input type="text" className={`form-control ${validationErrors.First_name ? 'is-invalid' : ''}`} name="First_name" value={data.First_name || ''} onChange={handleChange} />
                    {validationErrors.First_name && <div className="invalid-feedback">{validationErrors.First_name}</div>}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Last Name</label>
                    <input type="text" className={`form-control ${validationErrors.Last_name ? 'is-invalid' : ''}`} name="Last_name" value={data.Last_name || ''} onChange={handleChange} />
                    {validationErrors.Last_name && <div className="invalid-feedback">{validationErrors.Last_name}</div>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Mobile Number</label>
                    {/* <InputGroup className="mb-3"> */}
                      <Col>
                        {/* <Form.Select id="state" name="state" style={{ width: "89px", paddingBottom: "13px", borderRadius: "unset" }} className="form-select" >
                          <option value="Alabama">+1</option>
                          <option value="Alaska">+91</option>
                          <option value="Arizona">+44</option>
                          <option value="California">+966</option>
                        </Form.Select> */}
                      </Col>
                      <input type="tel"  className={`form-control ${validationErrors.Mobile_Number ? 'is-invalid' : ''}`} name="Mobile_Number" value={data.Mobile_Number || ''} onChange={handleChange} />
                      {validationErrors.Mobile_Number && <div className="invalid-feedback">{validationErrors.Mobile_Number}</div>}
                    {/* </InputGroup> */}

                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Email address</label>
                    <input type="email" className={`form-control ${validationErrors.email ? 'is-invalid' : ''}`} name="email" value={data.email || ''} onChange={handleChange} />
                    {validationErrors.email && <div className="invalid-feedback">{validationErrors.email}</div>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Address</label>
                    <input type="text" className={`form-control ${validationErrors.Address ? 'is-invalid' : ''}`} name="Address" value={data.Address || ''} onChange={handleChange} />
                    {validationErrors.Address && <div className="invalid-feedback">{validationErrors.Address}</div>}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>City</label>
                    <input type="text" className={`form-control ${validationErrors.City ? 'is-invalid' : ''}`} name="City" value={data.City || ''} onChange={handleChange} />
                    {validationErrors.City && <div className="invalid-feedback">{validationErrors.City}</div>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label >Country</label>
                    <input type="text" className={`form-control ${validationErrors.Country ? 'is-invalid' : ''}`} name="Country" value={data.Country || ''} onChange={handleChange} readOnly/>
                    {/* <Form.Select id="country" style={{ paddingBottom: "12px" }} className={`form-select ${validationErrors.Country ? 'is-invalid' : ''}`} name="Country" value={data.Country || ''} onChange={handleChange} >
                      <option></option>
                      <option value="United states of America">United states of America</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </Form.Select>
                    {validationErrors.Country && <div className="invalid-feedback">{validationErrors.Country}</div>} */}
                  </div>

                </Col>
                <Col lg={6}>



                  <div className="mb-3">
                    <label >State</label>
                    <input type="text" className={`form-control ${validationErrors.State ? 'is-invalid' : ''}`} name="State" value={data.State || ''} onChange={handleChange} readOnly/>

                    {/* <Form.Select id="state" style={{ paddingBottom: "12px" }} className={`form-select ${validationErrors.State ? 'is-invalid' : ''}`} name="State" value={data.State || ''} onChange={handleChange} >
                      <option></option>
                      <option value="Alabama">Alabama</option>
                      <option value="Alaska">Alaska</option>
                      <option value="Arizona">Arizona</option>
                      <option value="California">California</option>
                    </Form.Select>
                    {validationErrors.State && <div className="invalid-feedback">{validationErrors.State}</div>} */}
                  </div>

                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Zip Code</label>
                    <input type="text" className={`form-control ${validationErrors.Zip_Code ? 'is-invalid' : ''}`} name="Zip_Code" value={data.Zip_Code || ''} onChange={handleChange} />
                    {validationErrors.Zip_Code && <div className="invalid-feedback">{validationErrors.Zip_Code}</div>}
                  </div>
                </Col>
                <Col lg={6}>
          <div className="mb-3">
              <label >User role:</label>
                  <Form.Select id="userrole" style={{ paddingBottom: "12px" }} className={`form-select ${validationErrors.State ? 'is-invalid' : ''}`} name="role" value={data.role || ''} onChange={handleChange} >
                  {/* <option value = {data.role || ''}>{data.role || ''}</option> */}
                  <option value="Visitor">Visitor</option>
                  <option value="Member">Member</option>
                  <option value="Admin">Admin</option>
                  </Form.Select>
                  {validationErrors.role && <div className="invalid-feedback">{validationErrors.role}</div>}
                  
            </div>
         </Col>
              </Row>
              <Row>
              
                <Col style={{ textAlign: "right" }}>
                  <Link to={`/admin/managementview/${data._id}`}> <Button variant="warning" className="btnnavbaradmin" style={{ marginRight: "10px" }} type="submit">    Cancel
                  </Button></Link>


                  <Button variant="warning" className="btnnavbaradmin" type="submit">
                    Update
                  </Button>
                </Col>
              </Row>

            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Edit;
