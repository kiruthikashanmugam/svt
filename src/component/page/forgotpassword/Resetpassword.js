import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuths } from '../../auth page/AuthProviders';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';





function Setpassword() {
    const navigate = useNavigate();
    const auth = useAuths();
    const [user, setUser] = useState({})
    const [error, setError] = useState({})
    const [responseData, setResponseData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showconfirmpass,setShowconfirmpass]=useState(false)



    const handlechange = (e) => {
        user[e.target.name] = e.target.value;
        setUser(user);

    }
    const userRegistration = (e) => {
        e.preventDefault();
        e.target.reset();
        if (validateForm()) {
            console.log("valid input received");
            handleLogin(user)
        }
    }
    const handleLogin = () => {
        if (validateForm()) {
            axios.post('https://svt.know3.com/api/reset_password', user, {
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(response => {
                if (response.data.trim() === "Password updated") {
                    auth.signin(user, () => {
                        navigate('/sign-in', { replace: true });
                    });
                } else {
                    setResponseData(response.data);
                }
            }).catch(error => {
                console.error(error);

            });
        }
    };


    const validateForm = () => {

        let error = {}
        let formIsValid = true;


        //email

        //fname
        if (!user["useremail"]) {
            formIsValid = false;
            error["email"] = "Please enter the email id";
        }

        if (typeof user["useremail"] !== "undefined") {

            if (!user["useremail"]) {
                formIsValid = false
                error["email"] = "please enter valid email id"
            }
        }

        if ((!user["password"]) && (!user["confirm_password"])) {
            formIsValid = false;
            error["password"] = "please enter the password"
            error["confirmpassword"] = "Confirm Password is required"

        }

        if (typeof user["password"] !== "undefined") {

            if (!user["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
                formIsValid = false;
                error["password"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters."
                error["confirmpassword"] = "confirm password is incorrect"
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

    const confirmpassword=(e)=>{
        if(showconfirmpass){
         setShowconfirmpass(false)
        }
        else{
            setShowconfirmpass(true)
        }
    }


    return (

        <div style={{backgroundColor:"white"}} >

            <Helmet>
                <title>User | Resetpassword</title>
            </Helmet>
            <Container >
                <div className="auth-wrapper" style={{ padding: '10px' }}>
                    <div className='auth-inner' style={{ marginTop: '100px' }}  >
                        {responseData && (
                            <Alert variant="success" style={{ textAlign: "center" }}>
                                {responseData}
                            </Alert>
                        )}


                        <form method='post' name="userRegistration" onSubmit={userRegistration}>


                            <h4 style={{ textAlign: "center" }} className="mb-3">Reset Password</h4>
                            <div className="mb-4">

                                <input type="email" className="form-control" name="useremail" placeholder="Email ID" onChange={handlechange} />
                            </div>
                            <div style={{ color: "red" }}>{error.email}</div>



                            <div className="input-containers mb-4">


                                <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder=" Password" onChange={handlechange} />
                                <button type="button" className="btn reset toggle-eye" style={{ top: "19px" }} onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>


                            </div>
                            <div style={{ color: "red" }}>{error.password}</div>
                            <div className="input-containers mb-4">


                                <input type={showconfirmpass ? 'text' : 'password'} className="form-control" name="confirm_password" placeholder="Confirm password" onChange={handlechange} />
                                <button type="button" className="btn  toggle-eye" style={{ top: "19px" }} onClick={(e) => confirmpassword(e)} ><i className={showconfirmpass ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>


                            </div>
                            <div style={{ color: "red" }}>{error.confirmpassword}</div>


                            <button type="submit" class="sigma_btn-custom d-block w-20" name="button">  Submit<i class="far fa-arrow-right"></i> </button>




                        </form>





                    </div>

                </div>
            </Container>



        </div>
    )
}

export default Setpassword
