import React, { useState } from 'react';
import Email from "../../assets/img/Email.png";
import Location from "../../assets/img/location.png";
import Call from "../../assets/img/phone-call.png";
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';
import { Helmet } from 'react-helmet';

function Contact1() {
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [showModal, setShowModal] = useState(false);

  const handlechange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const userRegistration = (e) => {
    e.preventDefault();

    if(validateform()){
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

  const validateform = () => {
    let error = {}
    let formIsValid = true

    if (!user["fullname"]) {
      formIsValid = false
      error["fullname"] = "Please enter the  name"
    }


    if(!user["emailaddress"]){
      formIsValid=false
      error["emailaddress"]="please enter the email"
    }

    if(!user["subject"]){
      formIsValid=false
      error["subject"]="please enter the subject"
    }

    setError(error)
    return formIsValid

  }

  return (
    <div>
      <Helmet>
        <title>ContactUs</title>
      </Helmet>
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
      {/* <!-- Map Start --> */}
      <div className="sigma_map">
        <iframe
          src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=Sri Venkateswara Temple of North Carolina&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
          allowfullscreen=""></iframe>
      </div>
      {/* <!-- Map End -->

  <!-- Contact form Start --> */}
      <div className="section mt-negative pt-0">
        <div className="container">

          <form className="sigma_box box-lg m-0 mf_form_validate ajax_submit" onSubmit={userRegistration} enctype="multipart/form-data" style={{ backgroundColor: "#c4bdbd" }}>
            <div className="row">
              <div className="col-lg-4">
                <div className="form-group">
                  <input type="text" placeholder="Name" className="form-control dark" onChange={handlechange} name="fullname" />
                  <div style={{ color: "red" }}>{error.fullname}</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <input type="email" placeholder="Email Address" className="form-control dark" onChange={handlechange} name="emailaddress" />
                  <div style={{ color: "red" }}>{error.emailaddress}</div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="form-group">
                  <input type="text" placeholder="Subject" className="form-control dark" onChange={handlechange} name="subject" />
                  <div style={{ color: "red" }}>{error.subject}</div>
                </div>
              </div>
            </div>
            <div className="form-group">
              <textarea name="message" placeholder="Enter Message" cols="45" rows="5" onChange={handlechange} className="form-control dark"></textarea>
            </div>
            <div className="text-center">
              <button type="submit" className="sigma_btn-custom" name="button">Submit Now</button>
              <div className="server_response w-100">
              </div>
            </div>
          </form>

        </div>
      </div>
      {/* <!-- Contact form End -->

  <!-- Icons Start --> */}
      <div className="section section-padding pt-0">
        <div className="container">
          <div className="row">

            <div className="col-lg-4">
              <div className="sigma_icon-block text-center light icon-block-7">

                {/* <i className="flaticon-email"></i> */}
                <div className="sigma_icon-block-content">
                  <span>Send Email <i className="far fa-arrow-right"></i> </span>
                  <h5> Email Address</h5>
                  <p>chairman@svtemplenc.org</p>
                  <p>vicechairman@svtemplenc.org</p>
                </div>
                <br />
                <div className="icon-wrapper">
                  <img src={Email} width="60px" height="60px" style={{ color: "#7E4555" }} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sigma_icon-block text-center light icon-block-7">
                <i className="flaticon-call"></i>
                <div className="sigma_icon-block-content">
                  <span>Call Us Now <i className="far fa-arrow-right"></i> </span>
                  <h5> Phone Number </h5>
                  <p> (919) 468-0040</p>
                </div>
                <br />
                <div className="icon-wrapper">
                  <img src={Call} width="60px" height="60px" style={{ color: "#7E4555" }} />
                </div>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="sigma_icon-block text-center light icon-block-7">
                <i className="flaticon-location"></i>
                <div className="sigma_icon-block-content">
                  <span>Find Us Here <i className="far fa-arrow-right"></i> </span>
                  <h5> Location </h5>
                  <p>16/A Daddy Yankee Tower</p>
                  <p>New York, US</p>
                </div>
                <br />
                <div className="icon-wrapper">
                  <img src={Location} width="60px" height="60px" style={{ color: "#7E4555" }} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      {/* <!-- Icons End --> */}

    </div>
  )
}

export default Contact1