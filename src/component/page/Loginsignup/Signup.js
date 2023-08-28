
import Row from 'react-bootstrap/esm/Row';
import Container from 'react-bootstrap/esm/Container';
import Col from 'react-bootstrap/esm/Col';
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Country, State } from 'country-state-city';
import Select from 'react-select';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';




function Signup(props) {
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [responseData, setResponseData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedState, setSelectedState] = useState(null);
  const [showModal, setShowModal] = useState(false);


  const navigate = useNavigate()


  const handlechange = (e) => {
    user[e.target.name] = e.target.value;
    setUser(user)
  }
  const userRegistration = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("valid input received");
      setUser((prevUser) => ({
        ...prevUser,
        state: selectedState ? selectedState.value : '',
      }));
      fetchData();
    }
  };

  const fetchData = () => {
    axios.post('https://svt.know3.com/api/user', user, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      setResponseData(response.data.trim());
      setShowModal(true); // Open the modal here// Trim the response before storing it

    }).catch((error) => {
      console.error(error)
    });

  }




  const validateForm = () => {

    let error = {}
    let formIsValid = true;


    //fname
    if (!user["firstname"]) {
      formIsValid = false;
      error["fname"] = "Please enter the first name";
    }

    if (typeof user["firstname"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["firstname"].match(regex)) {
        formIsValid = false
        error["fname"] = "First Name  must contain only text character"
      }
    }



    //lname
    if (!user["lastname"]) {
      formIsValid = false;
      error["lname"] = "Please enter the last name";
    }

    if (typeof user["lastname"] !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!user["lastname"].match(regex)) {
        formIsValid = false
        error["lname"] = "Last Name  must contain only text character"
      }
    }


    // mobile

    if (!user["mobileno"]) {

      formIsValid = false;
      error["mobileno"] = "Please enter the mobile number";
    }

    if (typeof user["mobileno"] !== "undefined") {

      if (!user["mobileno"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        formIsValid = false
        error["mobileno"] = "Mobile Number should be 10 digits"
      }
    }

    //Validate zipcode
    if (!user["zipcode"]) {
      formIsValid = false;
      error["zip"] = "Please enter the zipcode";
    } else if (typeof user["zipcode"] !== "undefined") {
      // Regular expressions for validating zipcode/pincode based on country
      const usZipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
      const indiaPinRegex = /^\d{6}$/;
      const saudiArabiaZipRegex = /^\d{5}$/;
      const canadaZipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
      // Regular expression for validating zipcode/pincode based on user's country
      let zipRegex;
      switch (user["country"]) {
        case "US":
          zipRegex = usZipRegex;
          break;
        case "IN":
          zipRegex = indiaPinRegex;
          break;
        case "SA":
          zipRegex = saudiArabiaZipRegex;
          break;
        case "CA":
          zipRegex = canadaZipRegex;
          break;
        default:
          formIsValid = false;
          error["zip"] = "Invalid country";
          break;
      }
      if (zipRegex && !user["zipcode"].match(zipRegex)) {
        formIsValid = false;
        error["zip"] = "Please enter a valid zipcode/pincode";
      }
    }



    //email
    if (!user["useremail"]) {
      formIsValid = false;
      error["email"] = "Please enter the email id";
    }

    if (typeof user["useremail"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!user["useremail"].match(pattern)) {
        formIsValid = false
        error["email"] = "please enter valid email-id"
      }
    }
    //country

    if (!user["country"]) {
      formIsValid = false;
      error["country"] = "Please select the country";
    }
    //state

    if (!user["state"]) {
      formIsValid = false;
      error["state"] = "Please select the state";
    }


    // adress
    if (!user["address"]) {
      formIsValid = false;
      error["address"] = "Please enter the address";
    }

    // city
    if (!user["city"]) {
      formIsValid = false;
      error["city"] = "Please enter the city";
    }

    if (typeof user["city"] !== "undefined") {

      const regex1 = /^[A-Za-z\s.-]+$/;
      if (!user["city"].match(regex1)) {
        formIsValid = false
        error["city"] = "City  must contain only text character"
      }
    }


    if ((!user["userpassword"]) && (!user["confirmpassword"])) {
      formIsValid = false;
      error["password"] = "Please enter the password"
      error["confirmpassword"] = "please enter yout confirm password"

    }

    if (typeof user["userpassword"] !== "undefined") {

      if (!user["userpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        formIsValid = false;
        error["password"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters."
        error["confirmpassword"] = "please enter a strong password"
      }
    }
    setError(error)
    return formIsValid;

  }
  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true)
    }
  }


  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setSelectedState(null);
    setUser((prevUser) => ({
      ...prevUser,
      country: selectedOption ? selectedOption.value : '',
    }));
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption);
    setUser((prevUser) => ({
      ...prevUser,
      state: selectedOption ? selectedOption.label : '',
    }));
  };

  const countryOptions = Country.getAllCountries()
    .filter((country) => ['IN', 'SA', 'US', 'CA'].includes(country.isoCode))
    .map((country) => ({
      value: country.isoCode,
      label: country.name,
    }));


  const stateOptions = selectedCountry
    ? State.getStatesOfCountry(selectedCountry.value).map((state) => ({
      value: state.isoCode,
      label: state.name,
    }))
    : [];


  const handleCloseModal = () => {
    setSelectedState(false);
    if (responseData === 'data inserted successfully') {
      navigate('/sign-in');
    }
    else {
      setShowModal(false);
    }
  }
  return (
    <div style={{ backgroundColor: "white" }}>
      <Helmet>
        <title>User | Signup</title>
      </Helmet>
      <div  >

        <Modal  {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={showModal} onHide={() => setShowModal(false)}>

          <Modal.Body>
            {responseData === "data inserted successfully" ? (
              <div>
                <h6>Registered Successfully</h6>
              </div>
            ) : (
              <div>
                {responseData}
              </div>
            )}

            {/* {responseData && (
                            <div>
                                <h6>
                               
                               </h6>
                            </div>
                        )} */}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Container>


          <div className="auth-wrapper">
            <div className='auth-inner' style={{ marginTop: '100px' }}>
              {/* {responseData && (
                <Alert variant="success" style={{ textAlign: "center" }}>
                  {responseData}
                </Alert>
              )} */}


              <form method='post' name="userRegistration" onSubmit={userRegistration}>

                <h3>Sign Up</h3>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label >First Name</label>
                      <input type="text" className="form-control" name="firstname" onChange={handlechange} />
                    </div>
                    {error.email&&
                      <div style={{ color: "red" }}>{error.fname}</div>
                    }
                  



                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Last  Name</label>
                      <input type="text" className="form-control" name='lastname' onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.lname}</div>
                  </Col>

                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Mobile Number</label>
                      <input type="tel" className="form-control" name="mobileno" onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.mobileno}</div>

                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label >Email Id</label>
                      <input type="email" className="form-control" name="useremail" onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.email}</div>
                  </Col>

                </Row>
                <Row>
                  <Col lg={6}>


                    <div className="input-containers mb-3" >
                      <label>Password</label>

                      <input type={showPassword ? 'text' : 'password'} className="form-control" name="userpassword" onChange={handlechange} />
                      <button type="button" className="btn  toggle-eye" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                    </div>
                    <div style={{ color: "red" }}>{error.password}</div>




                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Address</label>
                      <input type="text" className="form-control" name="address" onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.address}</div>
                  </Col>

                </Row>

                <Row>
                  <Col lg={6}>

                    <div className="mb-3">
                      <label>City</label>
                      <input type="text" className="form-control" name="city" onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.city}</div>

                  </Col>
                  <Col lg={6}>
                    {/* <div className="mb-3">
                    <label >Country</label>
                    <Form.Select id="country" style={{ paddingBottom: "12px" }} name="country" onChange={handlechange} >
                      <option></option>
                      <option value="United states of America">United states of America</option>
                      <option value="India">India</option>
                      <option value="Canada">Canada</option>
                      <option value="Saudi Arabia">Saudi Arabia</option>
                    </Form.Select>

                  </div>
                  <div style={{ color: "red" }}>{error.country}</div> */}

                    <div className="mb-3">
                      <label htmlFor="country" >Country</label>
                      <Select
                        id="country"

                        name="country"
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        options={countryOptions}
                        isClearable
                        isSearchable={false}
                      />
                    </div>
                    <div style={{ color: "red" }}>{error.country}</div>
                  </Col>

                </Row>

                <Row>
                  <Col lg={6}>



                    {/* <div className="mb-3">
                      <label >State</label>
                      <Form.Select id="state" style={{ paddingBottom: "12px" }} name="state" onChange={handlechange} >
                        <option></option>
                        <option value="Alabama">Alabama</option>
                        <option value="Alaska">Alaska</option>
                        <option value="Arizona">Arizona</option>
                        <option value="California">California</option>
                      </Form.Select>

                    </div>
                    <div style={{ color: "red" }}>{error.state}</div> */}

                    <div className="mb-3">
                      <label htmlFor="state">State</label>
                      <Select
                        id="state"
                        name="state"
                        value={selectedState}
                        onChange={handleStateChange}
                        options={stateOptions}
                        isClearable
                        isDisabled={!selectedCountry}
                      />
                    </div>
                    <div style={{ color: "red" }}>{error.state}</div>

                  </Col>
                  <Col lg={6}>

                    <div className="mb-3">
                      <label>Zipcode</label>
                      <input type="text" className="form-control" name="zipcode" onChange={handlechange} />
                    </div>
                    <div style={{ color: "red" }}>{error.zip}</div>
                  </Col>

                </Row>
                <div style={{ textAlign: "-webkit-right" }}>
                  <button type="submit" style={{ width: '35%' }} className="sigma_btn-custom d-block w-20" name="button"> Sign Up <i class="far fa-arrow-right"></i> </button>

                </div>


                {/* <Button style={{alignItems:'center',background:'#f2b263'}}type="submit"> Sign Up</Button> */}


                <p className="forgot-password text-right">
                  Already have an account

                  <Link to="/sign-in"> sign in ?</Link>
                </p>
              </form>



            </div>

          </div>



        </Container>


      </div>
    </div>
  )
}

export default Signup