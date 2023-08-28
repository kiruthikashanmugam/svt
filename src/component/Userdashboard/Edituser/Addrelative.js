import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function Addrelative(props) {
  const [error, setError] = useState(null);
  const [relative, setRelative] = useState({})
  const [showModal, setShowModal] = useState(false);
  const [responseData, setResponseData] = useState(null);
const navigate = useNavigate()

  const handlechangedata = (e) => {
    relative[e.target.name] = e.target.value;
    setRelative(relative)
  }



  const onClick = (e) => {
    e.preventDefault();
    console.log('valid input received');
    relativedata(relative);
  };
  

  const relativedata = (relative) => {
    const userId = localStorage.getItem('user_id');
    const relativeDataWithId = {
      ...relative,
      user_id: userId // Add the user_id property to the relative object
    };

    const formIsValid = validateFormrelative(relative);
    if (formIsValid) {
      axios
        .post(`https://svt.know3.com/api/add_relative`, relativeDataWithId, {
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setResponseData(response.data.trim()); 
          setShowModal(true); // Open the modal here// Trim the response before storing it
        
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      // Handle form errors
      console.log('Form validation failed');
      // Display the errors to the user or perform any other error handling
    }
  };


  //relative

  const validateFormrelative = (relative) => {
    let errors = {};
    let formIsValid = true;

    if (!relative.relationfirstname) {
      formIsValid = false;
      errors["relationfirstname"] = "Please enter the first name";
    }
    if (typeof relative.relationfirstname !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!relative.relationfirstname.match(regex)) {
        formIsValid = false;
        errors["relationfirstname"] = "First name contains only text characters ";
      }
    }

    if (!relative.relationlastname) {
      formIsValid = false;
      errors["relationlastname"] = "Please enter the last name";
    }
    if (typeof relative.relationlastname !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!relative.relationlastname.match(regex)) {
        formIsValid = false;
        errors["relationlastname"] = "Last name contains only text characters ";
      }
    }

    if (typeof relative.relationmobileno !== "undefined") {
      if (!relative.relationmobileno.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        formIsValid = false;
        errors["relationmobileno"] = "Mobile Number should be 10 digits";
      }
    }

    if (typeof relative.relationgothra !== "undefined") {
      const regex = /^[A-Za-z\s]+$/;
      if (!relative.relationgothra.match(regex)) {
        formIsValid = false;
        errors["relationgothra"] = "Gothra contains only text characters ";
      }
    }

    setError(errors);
    return formIsValid;
  };

  const handleCloseModal=()=>{
    if (responseData) {
      navigate('/user/dashboard/edituser');
    }
   
  }
  return (
    <div >
       <Helmet>
        <title>User | AddRelative</title>
      </Helmet>
           
      <Modal  {...props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={showModal} onHide={() => setShowModal(false)}>

                    <Modal.Body>
                        {responseData && (
                            <div>
                                <h6>Relative Added Successfully !</h6>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
      <Container >
        <div className="auth-wrapper" style={{ padding: '10px' }}>
          <div className='auth-inner'  style={{ marginTop: '100px' }} >
            <h4>Add Relatives</h4>
            <Form method="post" >
              <Row>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label >First Name <span className="required">*</span></label>
                      <input type="text" className="form-control" name="relationfirstname" onChange={handlechangedata} />
                      {error && error["relationfirstname"] && (
                        <div className="error">{error["relationfirstname"]}</div>
                      )}
                    </div>




                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Last Name <span className="required">*</span></label>
                      <input type="text" className="form-control" name="relationlastname" onChange={handlechangedata} />
                      {error && error["relationlastname"] && (
                        <div className="error">{error["relationlastname"]}</div>
                      )}
                    </div>

                  </Col>

                </Row>
                <Row>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Mobile Number</label>
                      <input type="tel" className="form-control" name="relationmobileno" onChange={handlechangedata} />
                      {error && error["relationmobileno"] && (
                        <div className="error">{error["relationmobileno"]}</div>
                      )}
                    </div>


                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Date Of Birth</label>
                      <input type="date" className="form-control" name="relationdob" onChange={handlechangedata} />
                    </div>


                  </Col>

                </Row>
                <Row>
                  <Col lg={6}>
                    <div>
                      <label>Gender</label>
                      <Form.Select name="relationgender" onChange={handlechangedata}>
                        <option></option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>

                      </Form.Select>

                    </div>
                  </Col>
                  <Col lg={6}>
                    <div className="mb-3">
                      <label>Gothra</label>
                      <input type="text" className="form-control" name="relationgothra" onChange={handlechangedata} />
                      {error && error["relationgothra"] && (
                        <div className="error">{error["relationgothra"]}</div>
                      )}
                    </div>


                  </Col>

                </Row>

                <Row>
                  <Col lg={6}>

                    <div>
                      <label for="cars">Nakshatra</label>

                      <Form.Select id="cars" name="relationnakshatra" onChange={handlechangedata}>
                      <option></option>
                    <option value="Aarudhra [Midunam] (Tiruvaadirai)"> Aarudhra [Midunam] (Tiruvaadirai)  </option>
                    <option value="Aaslesha [Katakam] (AAyilyam) ">Aaslesha [Katakam] (AAyilyam) </option>
                    <option value=" Anurada [Vrichchikam] (Anusham)  "> Anurada [Vrichchikam] (Anusham)  </option>
                    <option value=" Asvini [Mesham] (Asvathi)  "> Asvini [Mesham] (Asvathi)  </option>
                    <option value=" Bharani [Mesham] "> Bharani [Mesham] </option>
                    <option value=" Chitira [Kanya] "> Chitira [Kanya] </option>
                    <option value=" Chitira [Rasi-Not-Known] "> Chitira [Rasi-Not-Known] </option>
                    <option value=" Chitira [Tula] "> Chitira [Tula] </option>
                    <option value=" Danishta  [Kumbam] (Avittam)"> Danishta  [Kumbam] (Avittam)  </option>
                    <option value=" Danishta [Makara] (Avittam)  ">  Danishta [Makara] (Avittam)   </option>
                    <option value=" Danishta [Rasi-Not-Known] (Avittam) ">   Danishta [Rasi-Not-Known] (Avittam)  </option>
                    <option value=" Hastha [Kanya] ">   Hastha [Kanya]  </option>
                    <option value=" Jyeshta [Viruchchikam] (Kettai)  ">  Jyeshta [Viruchchikam] (Kettai)    </option>
                    <option value=" Krittikai [Mesham] (Kaarttikai) "> Krittikai [Mesham] (Kaarttikai)    </option>
                    <option value=" Krittikai [Rasi-Not-Known] (Kaarttkai) ">  Krittikai [Rasi-Not-Known] (Kaarttkai)   </option>
                    <option value=" Krittikai [Rishabham] (Kaarttkai)  ">  Krittikai [Rishabham] (Kaarttkai)    </option>
                    <option value=" Makha [Simham] ">  Makha [Simham]   </option>
                    <option value=" Mrigasheersham [Midunam] ">   Mrigasheersham [Midunam]  </option>
                    <option value=" Mrigasheersham [Rasi-Not-Known] ">  Mrigasheersham [Rasi-Not-Known]   </option>
                    <option value=" Mrigasheersham [Rishabham] ">  Mrigasheersham [Rishabham]   </option>
                    <option value=" Mula  [Danur] ">  Mula  [Danur]   </option>
                    <option value=" Poorvaashada [Danur] (Pooraadam)  ">  Poorvaashada [Danur] (Pooraadam)    </option>
                    <option value=" Poorvabhathrapada [Meenam] (Poorattaathi)  ">   Poorvabhathrapada [Meenam] (Poorattaathi)   </option>
                    <option value=" Poorvabhatrapada [Kumbam ] (Poorattathi)  ">  Poorvabhatrapada [Kumbam ] (Poorattathi)    </option>
                    <option value="  Poorvabhatrapada [Rasi-Not-Known] (Poorattathi)  ">  Poorvabhatrapada [Rasi-Not-Known] (Poorattathi)   </option>
                    <option value="  Poorvapalguni [Simham] (Pooram)   "> Poorvapalguni [Simham] (Pooram)     </option>
                    <option value="  Punarvasu  [Katakam] (Punarpoosam)  "> Punarvasu  [Katakam] (Punarpoosam)    </option>
                    <option value=" Punarvasu  [Midunam] (Punarpoosam)   ">  Punarvasu  [Midunam] (Punarpoosam)   </option>
                    <option value="  Punarvasu [Rasi-Not-Known] (Punarpoosam)  ">  Punarvasu [Rasi-Not-Known] (Punarpoosam)   </option>
                    <option value=" Pushya [Katakam] (Poosam)    "> Pushya [Katakam] (Poosam)     </option>
                    <option value=" Revati [Meenam]   ">   Revati [Meenam]  </option>
                    <option value="  Rohini [Rishabham]  "> Rohini [Rishabham]    </option> 
                    <option value=" Satabhisha  [Kumbam] (Sadayam)   ">  Satabhisha  [Kumbam] (Sadayam)   </option>
                    <option value=" Sravanam  [Makara] (Thiruvonam)   ">  Sravanam  [Makara] (Thiruvonam)    </option>
                    <option value=" Swathi [Tula]  "> Swathi [Tula]    </option>
                    <option value=" Uthrabhatrapada [Meenam] (Uttirattaadi)   "> Uthrabhatrapada [Meenam] (Uttirattaadi)    </option>
                    <option value=" Uttirapalguni [Kannyai] (Uttiram)   "> Uttirapalguni [Kannyai] (Uttiram)     </option>
                    <option value=" Uttirapalguni [Rasi-Not-Known] (Uttiram)  ">  Uttirapalguni [Rasi-Not-Known] (Uttiram)   </option>
                    <option value="  Uttirapalguni [Simham] (Uttiram)  "> Uttirapalguni [Simham] (Uttiram)     </option>
                    <option value=" Uttirashada [Danur] (Uttiradam)  "> Uttirashada [Danur] (Uttiradam)    </option>
                    <option value="  Uttirashada [Makara] (Uttiradam)">  Uttirashada [Makara] (Uttiradam)    </option>
                    <option value=" Uttirashada [Rasi-Not-Known] (Uttiradam)">  Uttirashada [Rasi-Not-Known] (Uttiradam)   </option>
                    <option value=" Visaka [Rasi-Not-Known]">  Visaka [Rasi-Not-Known]   </option>
                    <option value=" Visaka [Tula]">  Visaka [Tula]   </option>
                    <option value=" Visaka [Vruchchikam]  ">  Visaka [Vruchchikam]   </option>
                      </Form.Select>


                    </div>

                  </Col>
                  <Col lg={6}>
                    <div>
                      <label for="cars">Relationship</label>
                      <Form.Select id="cars" name="relationship" onChange={handlechangedata}>
                      <option></option>
                      <option value="Aunt">Aunt</option>
                      <option value="Brother">Brother</option>
                      <option value="Brother-in-law">Brother-in-law</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Daughter-in-law">Daughter-in-law</option>
                      <option value="Father">Father</option>
                      <option value="Father-in-law">Father-in-law</option>
                      <option value="Friend">Friend</option>
                      <option value="Grand Child">Grand Child</option>
                      <option value="Grand Father">Grand Father</option>
                      <option value="Grand Mother">Grand Mother</option>
                      <option value="Mother">Mother</option>
                      <option value="Mother-in-law">Mother-in-law</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Niece">Niece</option>
                      <option value="Not Known">Not Known</option>
                      <option value="Others">Others</option>
                      <option value="Sister">Sister</option>
                      <option value="Sister-in-law">Sister-in-law</option>
                      <option value="Son">Son</option>
                      <option value="Son-in-law">Son-in-law</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Uncle">Uncle</option>
                      </Form.Select>

                    </div>
                  </Col>

                </Row>

                <Row>

                  <input type="hidden" className="form-control" name={localStorage.getItem('user_id')} />



                </Row>


              </Row>
              <Row style={{ marginTop: '20px' }}>
        
                <Col lg={12} style={{textAlign:"end"}}>
                  <Link to="/user/dashboard/edituser">
                  <a class="sigma_btn-custom secondary" style={{  backgroundColor: "#a19090", marginRight: "20px" }}  >Close</a>

                  </Link>
                
                  <a class="sigma_btn-custom secondary" style={{backgroundColor:'#7E4555'}}  onClick={onClick} type='submit'>Add</a>
                  
              
              
                
                </Col>
               
           

              </Row>


            </Form>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Addrelative