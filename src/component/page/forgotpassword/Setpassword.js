import { React, useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuths } from '../../auth page/AuthProviders';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';



function Setpassword() {
    const navigate = useNavigate();
    const auth = useAuths();
    const [responseData, setResponseData] = useState(null);
    const [user, setUser] = useState({})
    const [error, setError] = useState({})



    const handlechange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const userRegistration = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("valid input received");
            handleLogin()
        }
    }
    const handleLogin = () => {

        axios.post('https://svt.know3.com/api/otp', user, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {


                if (response.data.trim() === "OTP is correct") {
                    auth.signin(user, () => {
                        navigate('/resetpassword', { replace: true });
                    });
                } else {
                    setResponseData(response.data);
                }
            })
            .catch(error => {
                console.error(error.response.data.message);
                alert(error.response.data.message);
            });

    };


    const validateForm = () => {

        let error = {}
        let formIsValid = true;
        //email
        if (!user["otp"]) {
            formIsValid = false;
            error["otp"] = "Please enter OTP";
        }
        if (typeof user["otp"] !== "undefined") {

            if (!user["otp"]) {
                formIsValid = false
                error["otp"] = "Incorrect OTP"
            }
        }


        setError(error)
        return formIsValid;

    }


    return (

        <div style={{backgroundColor:"white"}}  >
            <Helmet>
                <title>User | Setpassword</title>
            </Helmet>
            <Container >
                <div className="auth-wrapper" style={{ padding: '10px' }}>
                    <div className='auth-inner' style={{ marginTop: '100px' }}>
                        {responseData && (
                            <Alert variant="success" >
                                {responseData}
                            </Alert>
                        )}


                        <form method='post' name="userRegistration" onSubmit={userRegistration}>

                            <h4 style={{ textAlign: "center" }} className="mb-3">Set Password</h4>

                            <div className="mb-2">
                                <input type="number" className="form-control" name="otp" placeholder="Verification code" onChange={handlechange} />
                            </div>
                            <div style={{ color: "red" }}>{error.otp}</div>
                            <p className="forgot-password text-right" >
                                {/* <Link>Resent Verification Code</Link> */}

                            </p>

                            <div className="d-grid">
                                <button type="submit" class="sigma_btn-custom d-block w-20" name="button"> Ok <i class="far fa-arrow-right"></i> </button>

                            </div>

                        </form>





                    </div>

                </div>
            </Container>



        </div>
    )
}

export default Setpassword
