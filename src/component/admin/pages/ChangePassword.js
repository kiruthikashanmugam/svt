import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { useNavigate } from "react-router-dom";
import { useAuths } from '../../auth page/AuthProviders';
import Alert from 'react-bootstrap/Alert';
import axios from 'axios';
import { Helmet } from 'react-helmet';


const ChangePassword = () => {

    var bgColors = {
        "Default": "#81b71a",
        "Blue": "#00B1E1",
        "Cyan": "#37BC9B",
        "Green": "#8CC152",
        "Red": "#E9573F",
        "Yellow": "#F6BB42",
    };
    const navigate = useNavigate();
    const auth = useAuths();
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [responseData, setResponseData] = useState({})
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setConfirmPassword] = useState(false);
    const email = JSON.parse(sessionStorage.getItem("user"));
    const [data, setData] = useState({ message: '', status: '' })
    const handlechange = (e) => {
        user[e.target.name] = e.target.value;
        setUser(user);
    }
    // const changePassword = (e) => {
    //     e.preventDefault();
    //     // e.target.reset();
    //     if (validatePassword()) {
    //         handleSubmit(user)
    //     }
     
    // }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (validatePassword()) {
        const params = {
            useremail: email.useremail,
            oldpassword: user["oldpassword"],
            new_password: user["new_password"],
            confirm_password:user["confirm_password"]
        };

        console.log('Request params : ', params)
        axios.post('https://svt.know3.com/api/forgot_password', params, {
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log("Response data :", response.data)
            setData(response.data)

                 // Clear the response data after API response
                 setTimeout(() => {
                    setData({ message: "", status: "" });
                    e.target.reset()
                }, 1000);
        }).catch(error => {
            console.error(error);

        });

        }
   
    };


    const validatePassword = () => {

        let error = {}
        let formIsValid = true

        
        if(!user["useremail"]){
            formIsValid=false
            error["useremail"]="Please enter the email id"
        }
 
        if (typeof user["useremail"]!=="undefined"){
            var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
           if(!user["useremail"].match(pattern)){
            formIsValid=false
            error["useremail"]="please enter valid email-id"
           }
        }
 

        if (!(user["oldpassword"])) {
            formIsValid = false;
            console.log("currentpassword  is empty")
            error["oldpassword"] = "Please enter the current password"
        }


        if (!(user["oldpassword"])) {
            formIsValid = false;
            console.log("confirm_password  is empty")
            error["oldpassword"] = "Please enter the confirm password"
        }
        // if (typeof user["oldpassword"] !== "undefined") {
  
        //     if (!user["oldpassword"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
        //       formIsValid = false;
        //       error["oldpassword"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters."
              
        //     }
         // }
 
        if ((!user["new_password"])) {
            formIsValid = false;
            error["new_password"] = "Please enter the new password"
        }

        if (typeof user["new_password"] !== "undefined") {

            if (!user["new_password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                error["new_password"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters."
            }
        }

        if (user["new_password"] && user["confirm_password"]) {
            if (user["new_password"] !== user["confirm_password"]) {
                formIsValid = false
                error["confirm_password"] = "Confirm password is not matched"
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
    const toggleConfirmPassword = (e) => {
        if (showConfirmPassword) {
            setConfirmPassword(false);
        } else {
            setConfirmPassword(true)
        }
    }
    const toggleCurrentPassword = (e) => {
        if (showCurrentPassword) {
            setShowCurrentPassword(false);
        } else {
            setShowCurrentPassword(true)
        }
    }


    return (

        <div  >
            <Helmet>
                <title>Admin | ChangePassword</title>
            </Helmet>
            <Container >
                <div className="auth-wrapper-admin">
                    <div className="auth-inner-admin">
                    {data.message != '' && (
                            data.status != '0' && (
                                <Alert variant="success" style={{ textAlign: 'center', marginTop: '20px' }}>
                                    {data.message}
                                </Alert>
                            )

                        )}
                        {data.message != '' && (
                            data.status != '1' && (
                                <Alert variant="warning" style={{ textAlign: 'center', marginTop: '20px' }}>
                                    {data.message}
                                </Alert>
                            )

                        )}

                        <form method='post' name="userRegistration"onSubmit={(e) => handleSubmit(e)}>

                            <h5 style={{ textAlign: "center", color: 'black' }} className="mb-3">Change Password</h5>
                            <div className="input-containers-admin mb-4">
                                <input style={{ fontWeight: 'normal' }} type='email' className="form-control" name="useremail" placeholder="Email Id" onChange={handlechange} />
                                <div style={{ color: "red" }}>{error.useremail}</div>
                            </div>
                            <div className="input-containers-admin mb-4">
                                <input style={{ fontWeight: 'normal' }} type={showCurrentPassword ? 'text' : 'password'} className="form-control" name="oldpassword" placeholder="Current password" onChange={handlechange} />
                                <button type="button" className="btn reset toggle-eye" style={{ top: "19px" }} onClick={(e) => toggleCurrentPassword(e)} ><i className={showCurrentPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                <div style={{ color: "red" }}>{error.oldpassword}</div>
                            </div>


                            <div className="input-containers-admin mb-4">
                                <input style={{ fontWeight: 'normal' }} type={showPassword ? 'text' : 'password'} className="form-control" name="new_password" placeholder="New Password" onChange={handlechange} />
                                <button type="button" className="btn reset toggle-eye" style={{ top: "19px" }} onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                <div style={{ color: "red" }}>{error.new_password}</div>
                            </div>

                            <div className="input-containers-admin mb-4">
                                <input style={{ fontWeight: 'normal' }} type={showConfirmPassword ? 'text' : 'password'} className="form-control" name="confirm_password" placeholder="Confirm password" onChange={handlechange} />
                                <button type="button" className="btn  toggle-eye" style={{ top: "19px" }} onClick={(e) => toggleConfirmPassword(e)} ><i className={showConfirmPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
                                <div style={{ color: "red" }}>{error.confirm_password}</div>
                            </div>


                            <div className="d-grid">
                                <button type="Signin" className="btn btn-primary" >
                                    Submit
                                </button>
                            </div>

                        </form>
                    
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default ChangePassword
