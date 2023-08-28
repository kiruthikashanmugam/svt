

import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Row, Col, Container } from "reactstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

function Fulfillmentview() {
    const [data, setData] = useState({
        _id: "",
        Userid: "",
        Firstname: "",
        Lastname: "",
        Service_Name: "",
        Service_Type: "",
        Venu_Preference: "",
        Pooja_Start_Date: "",
        Pooja_End_Date: "",
        Pooja_Start_Time: "",
        Pooja_End_Time: "",
        MobileNumber: "",
        Email: "",
        Address: "",

    });
    const [responseData, setResponseData] = useState(null);
    const [show, setShow] = useState(false);
    const [cancelrequest, setcancelrequest] = useState(null)
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { _id } = useParams();
    const navigate = useNavigate();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    useEffect(() => {
        if (responseData) {
            const timeout = setTimeout(() => {
                setResponseData(null); // Clear the success message after 1 second


            }, 1000);
            return () => {

                clearTimeout(timeout); // Clear the timeout on component unmount
            };
        }
    }, [responseData]);

    const searchdatas = async (event) => {
        event.preventDefault();

        try {
            const formData = new FormData(event.target);

            const response = await axios.post(
                "https://svt.know3.com/api/poojarequest_accept",
                formData,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log(response);
            setResponseData(response.data)
            if (response.data.trim() === 'Email Sent') {
                setTimeout(() => {
                    navigate('admin/fulfillment');
                }, 1000); // Delay of 1000 milliseconds (1 second)
            }
            // Process the response if needed
        } catch (error) {
            console.error("Error fetching data: ", error);
            // Handle error, display error message, or take appropriate action
        }
    };


    const calcenrequest = async (event) => {
        event.preventDefault();

    
        try {
            const formDatacancel = new FormData(event.target);
         
            const response = await axios.post(
                "https://svt.know3.com/api/cancel_poojareq",
                formDatacancel,
                {
                    headers: {
                        "Content-Type": "application/x-www-form-urlencoded",
                    },
                }
            );

            console.log(response);
            setcancelrequest(response.data);
            if (response.data.trim() === 'Mail sent successfully') {
                setTimeout(() => {
                    navigate('admin/fulfillment');
                }, 1000); // Delay of 1000 milliseconds (1 second)
            }
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

  

    };






    useEffect(() => {
        searchdata();
    }, [_id]);

    async function searchdata() {
        setLoading(true);
        try {
            const response = await axios.get(`https://svt.know3.com/api/view_poojarequest/${_id}`);
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }



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
                <title>Admin | Fulfillmentview</title>
            </Helmet>

            <Container>
                <Modal
                    show={show}
                    onHide={handleClose}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>Cancel Request</Modal.Title>
                    </Modal.Header>
                    <Form  onSubmit={calcenrequest}>
                        <Modal.Body>


                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" hasValidation>
                                <Form.Label>Request Reason</Form.Label>
                                <input type="hidden" name="request_id" value={_id} />
                                <input type="hidden" name="user_id" value={localStorage.getItem("user_id")} />
                                <Form.Control as="textarea" rows={3} name="cancel_reason" required  />
                                <Form.Control.Feedback type="invalid">
                                  Cancel request is required
                                </Form.Control.Feedback>
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>

                            <Button variant="primary" type="submit">Request</Button>


                        </Modal.Footer>
                    </Form>
                </Modal>
                <Row>
                    <Col>

                        <Container>
                            <div className="auth-wrapper">
                                <div className="auth-inners">
                                    {responseData && (
                                        <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
                                            {responseData}
                                        </Alert>
                                    )}
                                    {cancelrequest && (
                                        <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
                                            {cancelrequest}
                                        </Alert>
                                    )}





                                    <form method='post' onSubmit={searchdatas} name="userRegistration"  >
                                        <Link to={"admin/fulfillment"}> <AiOutlineArrowLeft /></Link>
                                        <h3 style={{ color: 'black', textAlign: 'center' }}>Accept Booking</h3>
                                        {data.map((use) => (

                                            <Row>
                                                <Col>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <input
                                                                type="hidden"
                                                                name="_id"
                                                                value={use._id}
                                                            />
                                                            <input
                                                                type="hidden"
                                                                name="Userid"
                                                                value={use.Userid}
                                                            />


                                                            <div className="mb-3">
                                                                <label>First Name</label>
                                                                <input type="text" className="form-control" value={use.Firstname} />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Last Name</label>
                                                                <input type="text" className="form-control" value={use.Lastname} readOnly />
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Email id</label>
                                                                <input type="text" className="form-control" value={use.Email} readOnly />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Mobile Number</label>
                                                                <input type="text" className="form-control" value={use.MobileNumber} readOnly />
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Service Name</label>
                                                                <input type="text" className="form-control" value={use.Service_Name} readOnly />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Venue Preference</label>
                                                                <input type="text" className="form-control" value={use.Venu_Preference} readOnly />
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Puja Start Date</label>
                                                                <input type="text" className="form-control" value={use.Pooja_Start_Date} readOnly />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Puja End Date</label>
                                                                <input type="text" className="form-control" value={use.Pooja_End_Date} readOnly />
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Puja Start Time</label>
                                                                <input type="text" className="form-control" value={use.Pooja_Start_Time} readOnly />
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Puja End Time</label>
                                                                <input type="text" className="form-control" value={use.Pooja_End_Time} readOnly />
                                                            </div>
                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col style={{ textAlign: "right" }}>

                                                        </Col>
                                                        <Col style={{ textAlign: "right" }}>
                                                            {/* <Link to={"/fulfillment"}> */}
                                                            <Button variant="warning" className="btnnavbaradmin"  onClick={handleShow} >  Cancel  Booking
                                                            </Button>
                                                            {/* </Link> */}

                                                            <Button variant="warning" className="btnnavbaradmin" type="submit">
                                                                Accept Booking
                                                            </Button>



                                                        </Col>
                                                    </Row>
                                                </Col>

                                            </Row>









                                        ))}

                                    </form>
                                </div>
                            </div>
                        </Container>


                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Fulfillmentview;
