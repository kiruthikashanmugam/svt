import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button } from 'react-bootstrap';


function Section6() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handlechange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const userRegistration = (e) => {
    e.preventDefault();
    if (validateform()) { // Invoke the validateform function
    
      console.log("valid input received");
      handleLogin(user);
    }
  };
  
  const handleLogin = () => {
 
    axios
      .post('https://svt.know3.com/api/getquote', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {

        // Show the success modal
        setShowModal(true);
        // Clear the form fields
        // Clear the form fields after 1 second
        setTimeout(() => {
          const form = document.querySelector('form');
          if (form) {
            form.reset();
          }
        
        }, 1000);
      })


      .catch(error => {
        console.error(error);
        setError(error);
      });
    

  };
  const closeModal = () => {
    setShowModal(false);
  };

  const validateform=()=>{
    let error={}
    let formIsValid=true


    if(!user["firstname"]){
      formIsValid=false
      error["firstname"]="please enter the first name"

    }

    if(!user["subject"]){
      formIsValid=false
      error["subject"]="please enter the subject"
    }
    if(!user["emailaddress"]){
      formIsValid=false
      error["emailaddress"]="Please enter the email address"

    }
    setError(error)
    return formIsValid
  }

  return (
    <div>
      <Modal size="sm" show={showModal} onHide={closeModal} centered>
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: 'center' }}>Your request has been submitted successfully</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={closeModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {/* <!-- Form Start --> */}
      <div className="section dark-overlay dark-overlay-3 bg-cover bg-center bg-norepeat" style={{backgroundColor:"#rgb(196, 189, 189)" }} >

        <div className="container">
          <div className="row align-items-center" style={{paddingBottom:"87px"}}>
            <div className="col-lg-12 mb-lg-30">
              <form method="post" onSubmit={userRegistration}>
                <div className="form-row">
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control transparent" placeholder="First Name" name="firstname" onChange={handlechange} />
                   <div style={{ color: "red" }}>{error.firstname}</div>
                   
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control transparent" placeholder="Last Name" name="lastname" onChange={handlechange} />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control transparent" placeholder="Subject" name="subject" onChange={handlechange} />
                    <div style={{ color: "red" }}>{error.subject}</div>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <input type="text" className="form-control transparent" placeholder="Email Address" name="emailaddress" onChange={handlechange} />
                      <div style={{ color: "red" }}>{error.emailaddress}</div>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <textarea name="message" className="form-control transparent" placeholder="Enter Message" rows="4" onChange={handlechange} ></textarea>
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <button type="submit" className="sigma_btn-custom d-block w-100" name="button"> Get a Quote <i className="far fa-arrow-right"></i> </button>
                  </div>
                </div>
              </form>
            </div>
            {/* <div className="col-lg-6">
              <div className="row">
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client1} alt="client" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client2} alt="client" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client3} alt="client" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client4} alt="client" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client5} alt="client" />
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="sigma_client">
                    <img src={Client6} alt="client" />
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
      {/* <!-- Form End --> */}

    </div>
  )
}

export default Section6