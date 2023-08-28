

import { RiDashboardFill } from 'react-icons/ri';
import { Link, Navigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Accordion from 'react-bootstrap/Accordion';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Table } from 'reactstrap';
import InputGroup from 'react-bootstrap/InputGroup';
import Alert from 'react-bootstrap/Alert';
import Card from 'react-bootstrap/Card';
import loader from '../../../Loader.gif';
import { message } from 'antd';


function Edituser1(props) {

    const [showAlert, setShowAlert] = useState(false);
    const [recordToDelete, setRecordToDelete] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [relative, setRelative] = useState({})
    const [showModal, setShowModal] = useState(false);
    const [users, setUsers] = useState({});
    const [error, setError] = useState({});
    const [user, setUser] = useState({});
    const [errorsPass, setErrorsPass] = useState();
    const [showoldPassword, setShowoldPassword] = useState(false);
    const [shownewPassword, setShownewPassword] = useState(false);
    const [shownconPassword, setShownconPassword] = useState(false);

    const [changepassData, setPassData] = useState({
        message: '',
        status: ''
    })
    const [formData, setFormData] = useState({
        userid: localStorage.getItem('user_id'),
        First_name: '',
        Last_name: '',
        email: '',
        Mobile_Number: '',
        DevoteeCode: '',
        DateOfBirth: '',
        Nakshatra: '',
        Gothra: '',
        Gender: '',
        Address: '',
        City: '',
        Country: '',
        State: '',
        Zip_Code: '',
        // HomePhone: '',
        // WorkEmail: '',
        WorkPhone: '',
        MailFtemple: '',
        Thankyouletter: '',
        Hardcopy: '',
    });

    useEffect(() => {
        handleLogin();
        searchdata();
    }, []);


    const handlechangedata = (e) => {
        relative[e.target.name] = e.target.value;
        setRelative(relative)
    }



    async function searchdata() {
        try {
            const response = await axios.get(`https://svt.know3.com/api/view_relative/${localStorage.getItem('user_id')}`);
            // const relativeArray = Object.values(response.data); // Convert response object to array
            // setData(relativeArray);
            setData(response.data)
            // Handle the response if needed        } catch (error) {
            console.error("Error fetching data: ", error);
            setErrors(error);
        } finally {
            setLoading(false);
        }
    }




    const onDelete = (Relative_id) => {
        console.log("delete");
        axios
            .get(`https://svt.know3.com/api/delete_relative/${localStorage.getItem('user_id')},${Relative_id}`)
            .then(() => {
                searchdata();
            });
    };


    useEffect(() => {
        setLoading(false)
    }, [])
    const handleLogin = () => {
        axios
            .get(`https://svt.know3.com/api/edituserview/${localStorage.getItem('user_id')}`, {
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((response) => {

                const userData = response.data[0];
                setUsers({
                    First_name: userData.First_name,
                    Last_name: userData.Last_name,
                    Mobile_Number: userData.Mobile_Number,
                    email: userData.email,
                    Address: userData.Address,
                    Country: userData.Country,
                    State: userData.State,
                    City: userData.City,
                    Zip_Code: userData.Zip_Code,
                });
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handlechange = (e) => {
        const { name, value } = e.target;
        setUsers((prevUsers) => ({
            ...prevUsers,
            [name]: value,
        }));
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };
    const validateFormNew = () => {
        let errorsPass = {};
        let formIsValid = true;

        if (!user["oldpassword"]) {
            formIsValid = false;
            errorsPass["oldpassword"] = "Current Password is required";
        }

        if (typeof user["oldpassword"] !== "undefined") {
            if (!user["oldpassword"].match(/^.*(?=.{8,}).*$/)) {
                formIsValid = false;
                errorsPass["oldpassword"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters.";
            }
        }

        if (!user["newpassword"]) {
            formIsValid = false;
            errorsPass["newpassword"] = "New Password is required";
        }

        if (typeof user["newpassword"] !== "undefined") {
            if (!user["newpassword"].match(/^.*(?=.{8,}).*$/)) {
                formIsValid = false;
                errorsPass["newpassword"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters.";
            }
        }

        if (!user["confirmpassword"]) {
            formIsValid = false;
            errorsPass["confirmpassword"] = "Confirm Password is required";
        }

        if (typeof user["confirmpassword"] !== "undefined") {
            if (!user["confirmpassword"].match(/^.*(?=.{8,}).*$/)) {
                formIsValid = false;
                errorsPass["confirmpassword"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters.    ";
            }
        }

        if (user["confirmpassword"] && user["newpassword"]) {
            if (user["confirmpassword"] !== user["newpassword"]) {
                formIsValid = false;
                errorsPass["confirmpassword"] = "Confirm Password does not match";
            }
        }

        setErrorsPass(errorsPass);
        return formIsValid;
    };


    const userchangePassword = (e) => {
        e.preventDefault();
        if (validateFormNew()) {
            console.log("valid input received");
            handleChangePassword(user)
        }
        e.target.reset()
    }

    const handleChangePassword = (user) => {
        if (validateFormNew()) {
            axios
                .post(`https://svt.know3.com/api/reset_user/${localStorage.getItem('user_id')}`, user, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                })
                .then((response) => {
                    console.log("check response in password change    ---   ", response.data)
                    setPassData(response.data);
                    console.log("check response in password change    ---   ", changepassData.message)

                    // Clear the response data after API response
                    setTimeout(() => {
                        setPassData(
                          {  message:""}
                        );
                      
                    }, 1000); // Delayed clearing of the response data after 1 second (adjust as needed)
                 
                })
                .catch((error) => {
                    console.error(error);
                });
        }


    };



    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({
          ...prevUser,
          [name]: value
        }));
      };
      
    const toggleoldPassword = (e) => {
        if (showoldPassword) {
            setShowoldPassword(false);
        } else {
            setShowoldPassword(true)
        }
    }

    const togglenewPassword = (e) => {
        if (shownewPassword) {
            setShownewPassword(false);
        } else {
            setShownewPassword(true)
        }
    }
    const togglenconPassword = (e) => {
        if (shownconPassword) {
            setShownconPassword(false);
        } else {
            setShownconPassword(true)
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const updatedFormData = {
                ...formData,
                First_name: users?.First_name || '',
                Last_name: users?.Last_name || '',
                email: users?.email || '',
                Mobile_Number: users?.Mobile_Number || '',
                Address: users?.Address,
                Country: users?.Country,
                State: users?.State,
                City: users?.City,
                Zip_Code: users?.Zip_Code,
            };

            axios
                .post(`https://svt.know3.com/api/edit_userInfo/${localStorage.getItem('user_id')}`, updatedFormData)
                .then((response) => {
                    setResponseData(response.data);
                    setShowModal(true); // Open the modal here
                })
                .catch((error) => {
                    console.error('Failed to update user info:', error);
                });
        }
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

    const validateForm = () => {
        let errors = {};
        let formIsValid = true;

        if (!users.First_name) {
            formIsValid = false;
            errors["First_name"] = "Please enter the first name";
        }
        if (typeof users["First_name"] !== "undefined") {
            const regex = /^[A-Za-z\s]+$/;
            if (!users["First_name"].match(regex)) {
                formIsValid = false
                errors["First_name"] = "First name contains only text characters "
            }
        }


        if (!users.Last_name) {
            formIsValid = false;
            errors["Last_name"] = "Please enter the last name";
        }
        if (typeof users["Last_name"] !== "undefined") {
            const regex = /^[A-Za-z\s]+$/;
            if (!users["Last_name"].match(regex)) {
                formIsValid = false
                errors["Last_name"] = "Last name contains only text characters "
            }
        }
        if (!users.Mobile_Number) {
            formIsValid = false;
            errors["Mobile_Number"] = "Please enter the mobile number";
        }
        if (typeof users["Mobile_Number"] !== "undefined") {

            if (!users["Mobile_Number"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                formIsValid = false
                errors["Mobile_Number"] = "Mobile Number should be 10 digits"
            }
        }

        if (typeof formData["HomePhone"] !== "undefined") {
            if (!formData["HomePhone"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                formIsValid = false;
                errors["HomePhone"] = "Home phone number should be 10 digits";
            }
        }


        if (typeof users["WorkPhone"] !== "undefined") {

            if (!users["WorkPhone"].match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
                formIsValid = false
                errors["WorkPhone"] = "Mobile Number should be 10 digits"
            }
        }


        if (typeof users["WorkEmail"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!users["WorkEmail"].match(pattern)) {
                formIsValid = false
                errors["WorkEmail"] = "Work Email contains character (A-Z or a-z), numbers (0-9) and special characters “.”, “@”, “_”. Work Email should contain at least minimum 5 characters."
            }
        }


        if (!users.email) {
            formIsValid = false;
            errors["email"] = "Please enter the email";
        }

        if (typeof users["email"] !== "undefined") {
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
            if (!users["email"].match(pattern)) {
                formIsValid = false
                errors["email"] = "please enter valid email-id"
            }
        }





        // Validate zipcode
        if (!users["Zip_Code"]) {
            formIsValid = false;
            errors["Zip_Code"] = "Please enter the zip code";
        } else if (typeof users["Zip_Code"] !== "undefined") {
            // Regular expressions for validating zipcode/pincode based on country
            const usZipRegex = /(^\d{5}$)|(^\d{5}-\d{4}$)/;
            const indiaPinRegex = /^\d{6}$/;
            const saudiArabiaZipRegex = /^\d{5}$/;
            const canadaZipRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;
            // Regular expression for validating zipcode/pincode based on user's country
            let zipRegex;
            switch (users["Country"]) {
                case "United states of America":
                    zipRegex = usZipRegex;
                    break;
                case "India":
                    zipRegex = indiaPinRegex;
                    break;
                case "Saudi Arabia":
                    zipRegex = saudiArabiaZipRegex;
                    break;
                case "Canada":
                    zipRegex = canadaZipRegex;
                    break;
                default:
                    formIsValid = false;
                    errors["Zip_Code"] = "Invalid country";
                    break;
            }
            if (zipRegex && !users["Zip_Code"].match(zipRegex)) {
                formIsValid = false;
                errors["Zip_Code"] = "Please enter a valid zipcode/pincode";
            }
        }




        if (!users.Address) {
            formIsValid = false;
            errors["Address"] = "Please enter the address";
        }

        if (!users.City) {
            formIsValid = false;
            errors["City"] = "Please enter the city";
        }

        if (!users.Country) {
            formIsValid = false;
            errors["Country"] = "Please enter the country";
        }

        if (!users.State) {
            formIsValid = false;
            errors["State"] = "Please enter the state";
        }



        setError(errors);
        return formIsValid;
    };


    const handleDelete = (Relative_id) => {
        console.log(Relative_id);
        setRecordToDelete(Relative_id);
        setShowAlert(true);
    };

    const handleConfirmDelete = () => {

        if (recordToDelete) {
            onDelete(recordToDelete);
            setRecordToDelete(null);
        }
        setShowAlert(false);
    };

    const flexContainer = {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '20px 15px 5px 15px',
        backgroundColor: '#7E4555'
    };


    const emailPattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);

    return (
        <div>


            <Link to="/user/dashboard" style={{}}>

                <div style={flexContainer}>
                    <h5 style={{ flex: 1, color: 'white' }}> <RiDashboardFill /> Dashboard</h5>
                    <h5 style={{ flex: 1, color: 'white', textAlign: 'center', }}>EditUsers</h5>
                    <h5 style={{ flex: 1, color: 'white' }}></h5>
                </div>
            </Link>

            <Container>
                <Modal   {...props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={showAlert} onHide={() => setShowAlert(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Delete Confirmation</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>Are you sure you want to delete this record?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowAlert(false)}>
                            Cancel
                        </Button>
                        <Button variant="danger" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal  {...props}
                    size="sm"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered show={showModal} onHide={() => setShowModal(false)}>

                    <Modal.Body>
                        {responseData && (
                            <div>
                                <h6>Saved successfully !</h6>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>



                <Row>

                    <Col lg={8}>
                        <form method='post' >
                            <div
                                className="modal show"
                                style={{ display: 'block', position: 'initial', size: "lg" }}

                            >

                                <Modal.Dialog>
                                    <Modal.Body>
                                        <Accordion defaultActiveKey="0" alwaysOpen>
                                            <Accordion.Item eventKey="0">
                                                <Accordion.Header><h5>Personal Information</h5></Accordion.Header>
                                                <Accordion.Body>



                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>First Name <span className="required">*</span></label>
                                                                <input type="text" className="form-control " name="First_name" onChange={handlechange} value={users.First_name || ''} />
                                                                {error && error["First_name"] && (
                                                                    <div className="error">{error["First_name"]}</div>
                                                                )}
                                                            </div>
                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Last Name <span className="required">*</span></label>
                                                                <input
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="Last_name"
                                                                    onChange={handlechange}
                                                                    value={users.Last_name || ''}
                                                                />
                                                                {error && error["Last_name"] && (
                                                                    <div className="error">{error["Last_name"]}</div>
                                                                )}
                                                            </div>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Mobile Number <span className="required">*</span></label>
                                                             
                                                                   
                                                                    <input
                                                                      
                                                                        type="tel"
                                                                        className="form-control"
                                                                        name="Mobile_Number"
                                                                        value={users.Mobile_Number || ''}
                                                                        onChange={handlechange}
                                                                    />
                                                               

                                                                {error && error["Mobile_Number"] && (
                                                                    <div className="error">{error["Mobile_Number"]}</div>
                                                                )}

                                                            </div>


                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label >Email Id <span className="required">*</span></label>
                                                                <input
                                                                    type="email"
                                                                    className="form-control"
                                                                    name="email"
                                                                    value={users.email || ''}
                                                                    onChange={handlechange}
                                                                    required
                                                                />

                                                                {error && error["email"] && (
                                                                    <div className="error">{error["email"]}</div>
                                                                )}
                                                            </div>

                                                        </Col>

                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>


                                                            <div className="mb-3">
                                                                <label>Devotee Code</label>
                                                                <input type="text" className="form-control" onChange={handlechange} name="DevoteeCode" />

                                                            </div>




                                                        </Col>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Date of Birth</label>
                                                                <input type="date" style={{ height: '45px' }} className="form-control" onChange={handlechange} name="DateOfBirth" placeholder="mm-dd-yyy" />
                                                            </div>

                                                        </Col>

                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>

                                                            <div className="mb-3">
                                                                <label>Gothra</label>
                                                                <input type="text" className="form-control" onChange={handlechange} name="Gothra" placeholder="Gothra" />
                                                            </div>


                                                        </Col>
                                                        <Col lg={6}>
                                                            <div>
                                                                <label for="cars">Nakshatra</label>

                                                                <Form.Select style={{ height: '45px' }} id="cars" name="Nakshatra" onChange={handlechange}>
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

                                                    </Row>

                                                    <Row>
                                                        <Col lg={6}>



                                                            <div>
                                                                <label for="cars">Gender</label>
                                                                <Form.Select style={{ height: '45px' }} id="cars" name="Gender" onChange={handlechange}>
                                                                    <option></option>
                                                                    <option value="Male">Male</option>
                                                                    <option value="Female">Female</option>

                                                                </Form.Select>

                                                            </div>




                                                        </Col>


                                                    </Row>







                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="1">
                                                <Accordion.Header>Address</Accordion.Header>
                                                <Accordion.Body>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Address <span className="required">*</span></label>
                                                                <input type="text" className="form-control" name="Address" onChange={handlechange} value={users.Address || ''} />
                                                                {error && error["Address"] && (
                                                                    <div className="error">{error["Address"]}</div>
                                                                )}
                                                            </div>

                                                        </Col>
                                                        <Col>
                                                            <Col lg={6}>

                                                                <div className="mb-3">
                                                                    <label>City <span className="required">*</span></label>
                                                                    <input type="text" className="form-control" name="City" style={{width:"292px"}} onChange={handlechange} value={users.City || ''} />
                                                                    {error && error["City"] && (
                                                                        <div className="error">{error["City"]}</div>
                                                                    )}
                                                                </div>


                                                            </Col>

                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div>
                                                                <label >Country <span className="required">*</span></label>
                                                                <input type="text" className="form-control" name="City" onChange={handlechange} value={users.Country || ''} readOnly />
                                                                {/* <Form.Select style={{ height: '45px' }} name="Country" onChange={handlechange} value={users.Country || ''} >
                                                                    <option></option>
                                                                    <option value="United states of America">United states of America</option>
                                                                    <option value="India">India</option>
                                                                    <option value="Canada">Canada</option>
                                                                    <option value="Saudi Arabia">Saudi Arabia</option>
                                                                </Form.Select> */}
                                                                {error && error["Country"] && (
                                                                    <div className="error">{error["Country"]}</div>
                                                                )}
                                                            </div>

                                                        </Col>
                                                        <Col lg={6}>



                                                            <div>
                                                                <label>State <span className="required">*</span></label>
                                                                <input type="text" className="form-control" name="City" onChange={handlechange} value={users.State || ''} readOnly />

                                                                {/* <Form.Select style={{ height: '45px' }} name="State" onChange={handlechange} value={users.State || ''} >
                                                                    <option></option>
                                                                    <option value="Alabama">Alabama</option>
                                                                    <option value="Alaska">Alaska</option>
                                                                    <option value="Arizona">Arizona</option>
                                                                    <option value="California">California</option>
                                                                </Form.Select> */}
                                                                {error && error["State"] && (
                                                                    <div className="error">{error["State"]}</div>
                                                                )}
                                                            </div>




                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>

                                                            <div className="mb-3">
                                                                <label>Zibcode <span className="required">*</span></label>
                                                                <input type="text" className="form-control" name="Zip_Code" value={users.Zip_Code || ''} onChange={handlechange} />
                                                            </div>
                                                            {error && error["Zip_Code"] && (
                                                                <div className="error">{error["Zip_Code"]}</div>
                                                            )}
                                                        </Col>

                                                    </Row>

                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="2">
                                                <Accordion.Header>Secondary Contact Information</Accordion.Header>
                                                <Accordion.Body>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Home phone</label>
                                                                {/* <InputGroup className="mb-3">
                                                                    <Col>
                                                                        <Form.Select id="state" style={{
                                                                            width: '80px',
                                                                            paddingBottom: "12px", borderRadius: "unset"
                                                                        }}
                                                                            className="form-select" >
                                                                            <option value="Alabama">+1</option>
                                                                            <option value="Alaska">+91</option>
                                                                            <option value="Arizona">+44</option>
                                                                            <option value="California">+966</option>
                                                                        </Form.Select> */}
                                                                    {/* </Col> */}
                                                                    <input
                                                                        
                                                                        type="tel"
                                                                        className={`form-control ${error && error["HomePhone"] ? "is-invalid" : ""}`}
                                                                        maxLength={10}
                                                                        name="HomePhone"
                                                                        onChange={handlechange}
                                                                    />
                                                                {/* </InputGroup> */}
                                                                {error && error["HomePhone"] && (
                                                                    <div className="error">{error["HomePhone"]}</div>
                                                                )}
                                                            </div>


                                                        </Col>
                                                        <Col>
                                                            <Col lg={6}>
                                                                <div className="mb-3">
                                                                    <label>Work Email</label>
                                                                    <input
                                                                        type="email"
                                                                        style={{width:"292px"}}

                                                                        className={`form-control ${error && error["WorkEmail"] && error["WorkEmail"] !== "This field is required" ? "is-invalid" : ""}`}
                                                                        onChange={handlechange}
                                                                        name="WorkEmail"
                                                                        pattern={emailPattern}
                                                                    />
                                                                    {error && error["WorkEmail"] && error["WorkEmail"] !== "This field is required" && (
                                                                        <div className="error">{error["WorkEmail"]}</div>
                                                                    )}
                                                                </div>

                                                            </Col>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <div className="mb-3">
                                                                <label>Work Phone</label>
                                                                <InputGroup className="mb-3">
                                                                   
                                                                    <input style={{ width: '70%' }} type="tel" className={`form-control ${error && error["WorkPhone"] ? "is-invalid" : ""}`} maxLength={10} name="WorkPhone" onChange={handlechange} placeholder='Work Phone' />
                                                                </InputGroup>
                                                                {error && error["WorkPhone"] && (
                                                                    <div className="error">{error["WorkPhone"]}</div>
                                                                )}
                                                            </div>


                                                        </Col>
                                                    </Row>

                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="3">
                                                <Accordion.Header>Subscription</Accordion.Header>
                                                <Accordion.Body>


                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Check
                                                                type="switch"
                                                                id="custom-switch1"
                                                                label="Receive emails from temple"
                                                                name="MailFtemple"
                                                                onChange={handlechange}
                                                            />


                                                        </Col>
                                                        <Col lg={6}>
                                                            <Form.Check
                                                                type="switch"
                                                                id="custom-switch2"
                                                                name='Thankyouletter'
                                                                label="Receive thank you letter
                                                        for donations
                                                        " onChange={handlechange}
                                                            />
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col lg={6}>
                                                            <Form.Check
                                                                type="switch"
                                                                id="custom-switch3"
                                                                label="Receive hard copy news letter"
                                                                name='Hardcopy'
                                                                onChange={handlechange}
                                                            />
                                                        </Col>
                                                    </Row>

                                                </Accordion.Body>
                                            </Accordion.Item>
                                            <Accordion.Item eventKey="4" alwaysOpen>
                                                <Accordion.Header>Relative Information</Accordion.Header>
                                                <Accordion.Body>
                                                    <Link to="/user/dashboard/addrelative">
                                                        <Button variant="primary" style={{ backgroundColor: '#7E4555' }} >
                                                            Add Relative
                                                        </Button>
                                                    </Link>






                                                    <div>
                                                        {data && data.length > 0 ? (
                                                            <Table striped sm="6" responsive className="table-inside-card" style={{ marginTop: "30px" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>First Name</th>
                                                                        <th>Last Name</th>
                                                                        <th>Date of Birth</th>
                                                                        <th>Gender</th>
                                                                        <th>Mobile Number</th>
                                                                        <th>Gothra</th>
                                                                        <th>Nakshatra</th>
                                                                        <th>Relationship</th>
                                                                        <th>View/Edit</th>
                                                                        <th>Actions</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {data !== null && data.map((item) => (
                                                                        <tr key={item.Relative_id}>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}
                                                                                    className="form-control"
                                                                                    name="FirstName"
                                                                                    value={item.FirstName}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="LastName"
                                                                                    value={item.LastName}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="DateOfBirth"
                                                                                    value={item.DateOfBirth}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="Gender"
                                                                                    value={item.Gender}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="MobileNo"
                                                                                    value={item.MobileNo}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="Gothra"
                                                                                    value={item.Gothra}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="Nakshatra"
                                                                                    value={item.Nakshatra}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>

                                                                            <td>
                                                                                <input
                                                                                    type="text"
                                                                                    style={{ width: "auto" }}

                                                                                    className="form-control"
                                                                                    name="Relationship"
                                                                                    value={item.Relationship}
                                                                                    onChange={handlechangedata}
                                                                                    readOnly
                                                                                />
                                                                            </td>
                                                                            <td>
                                                                                <Link style={{ color: '#000000' }} to={`/editrelative/${item.Relative_id}`} onClick={() => setData(data)}>
                                                                                    <span class="material-symbols-outlined">
                                                                                        edit
                                                                                    </span>

                                                                                </Link>
                                                                            </td>
                                                                            <td>
                                                                                <Link style={{ color: '#000000' }} onClick={() => setData(data)}>
                                                                                    <span class="material-symbols-outlined" onClick={() => handleDelete(item.Relative_id)}>
                                                                                        delete
                                                                                    </span>
                                                                                </Link>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </Table>
                                                        ) : (
                                                            <h6 style={{ textAlign: "center" }}>No relatives found.</h6>
                                                        )}


                                                    </div>






                                                </Accordion.Body>
                                            </Accordion.Item>

                                        </Accordion>

                                    </Modal.Body>

                                    <Modal.Footer>
                                        <Link to="/user/dashboard"><Button variant="secondary">Close</Button></Link>
                                        <Button variant="primary" style={{ backgroundColor: '#7E4555' }} type='Submit' onClick={handleSubmit}>Save changes</Button>
                                    </Modal.Footer>
                                </Modal.Dialog>
                            </div>

                        </form>


                    </Col>
                    <Col lg={4}>

                        <Row>
                            <div
                                className="modal show"
                                style={{ display: 'block', position: 'initial' }}
                            >
                                <Modal.Dialog>
                                    <Modal.Header >
                                        <Accordion.Header style={{ textAlign: "center" }}><h5 style={{ alignItems: "center" }}>Change Password</h5></Accordion.Header>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <Container >
                                            <div className="auth-wrapper-old" >
                                                {changepassData.message != '' && (
                                                    changepassData.status != '0' && (
                                                        <Alert variant="success" style={{ textAlign: 'center', marginTop: '20px' }}>
                                                            {changepassData.message}
                                                        </Alert>
                                                    )

                                                )}
                                                {changepassData.message != '' && (
                                                    changepassData.status != '1' && (
                                                        <Alert variant="warning" style={{ textAlign: 'center', marginTop: '20px' }}>
                                                            {changepassData.message}
                                                        </Alert>
                                                    )

                                                )}
                                                <form method='post' id="myForm  " name="changePassword" style={{ alignContent: "center" }} onSubmit={userchangePassword}>
                                                    <div className="input-containers-admin mb-3">
                                                        <input type={showoldPassword ? 'text' : 'password'} className="form-control" name="oldpassword" placeholder='Your Current password' onChange={handlePasswordChange} />
                                                        <button type="button" style={{ top: "19px" }} className="btn  toggle-eye" onClick={(e1) => toggleoldPassword(e1)} ><i className={showoldPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                                        {errorsPass && errorsPass["oldpassword"] && (
                                                            <div style={{ color: "red" }}>{errorsPass.oldpassword}</div>
                                                        )}
                                                    </div>
                                                    <div className="input-containers-admin mb-3">
                                                        <input type={shownewPassword ? 'text' : 'password'} className="form-control" name="newpassword" placeholder='Your new password' onChange={handlePasswordChange} />
                                                        <button type="button" style={{ top: "19px" }} className="btn  toggle-eye" onClick={(e2) => togglenewPassword(e2)} ><i className={shownewPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                                        {errorsPass && errorsPass["newpassword"] && (
                                                            <div style={{ color: "red" }}>{errorsPass.newpassword}</div>
                                                        )}
                                                    </div>
                                                    <div className="input-containers-admin mb-3">
                                                        <input type={shownconPassword ? 'text' : 'password'} className="form-control" name="confirmpassword" placeholder='Confirm your new password' onChange={handlePasswordChange} />
                                                        <button type="button" style={{ top: "19px" }} className="btn  toggle-eye" onClick={(e3) => togglenconPassword(e3)} ><i className={shownconPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                                        {errorsPass && errorsPass["confirmpassword"] && (
                                                            <div style={{ color: "red" }}>{errorsPass.confirmpassword}</div>
                                                        )}
                                                    </div>
                                                    <div className="d-grid">
                                                        <button type="submit" style={{ backgroundColor: '#7E4555' }} className="btn btn-primary" >
                                                            Change Password
                                                        </button>
                                                    </div>
                                                </form>



                                            </div>
                                        </Container>
                                    </Modal.Body>
                                </Modal.Dialog>
                            </div>
                        </Row>

                    </Col>




                </Row>



            </Container>







        </div >
    )
}

export default Edituser1
