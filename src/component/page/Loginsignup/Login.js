import { React, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuths } from '../../auth page/AuthProviders';
import Alert from 'react-bootstrap/Alert';
import { useRef } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import loader from '../../../Loader.gif';


function Login() {
  const auth = useAuths();
  const navigate = useNavigate();
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [showPassword, setShowPassword] = useState(false);
  const [responseData, setResponseData] = useState(null);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);


  const handlechange = (e) => {
    user[e.target.name] = e.target.value;
    setUser(user);

  }

  useEffect(()=>{
    setLoading(false)
  })
  const userRegistration = (e) => {
    e.preventDefault();


    if (validateForm()) {
      console.log("valid input received");
      handleLogin(user)
    }
  }
  const handleLogin = () => {
    if (validateForm()) {
      setLoading(true);
      axios.post('https://svt.know3.com/api/user_check', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {

          if (response.data.message.trim() === "Login success") {
            // Store user ID in local storage
            localStorage.setItem('user_id', response.data.user_id);




            auth.signin(user, () => {
              navigate('/user/dashboard', { replace: true });
            });
          } else {
            setResponseData(response.data);
          }
          setLoading(false);
        })
        .catch(error => {
          setLoading(false);
          console.error(error);

        });
    }
  };


  useEffect(()=>{
 setLoading(false)
  },[])

  const validateForm = () => {

    let error = {}
    let formIsValid = true;
    //email
    if (!user["useremail"]) {
      formIsValid = false;
      error["email"] = "Please enter the email-id";
    }

    if (typeof user["useremail"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!user["useremail"].match(pattern)) {
        formIsValid = false
        error["email"] = "please enter valid email id"
      }
    }
    if ((!user["password"]) && (!user["confirmpassword"])) {
      formIsValid = false;
      error["password"] = "Password is required"
      error["confirmpassword"] = "please enter your confirm password"

    }

    // if (typeof user["password"] !== "undefined") {

    //   if (!user["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
    //     formIsValid = false;
    //     error["password"] = "The password must contain at least 8 or more characters, including a number,special character, uppercase and lowercase letters."
    //     error["confirmpassword"] = "please enter a strong password"
    //   }
    // }
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

  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', backgroundColor:"white", textAlign: 'center', marginTop: '300px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }


  return (
    <div style={{backgroundColor:"white"}}>
      <Helmet>
        <title>User | Signin</title>
      </Helmet>

      <div   >
        <Container >
          <div className="auth-wrapper" style={{ padding: '10px' }}>
            <div className='auth-inner' style={{ marginTop: '100px' }}>
              {responseData && (
                <Alert variant="success" style={{ textAlign: "center" }}>
                  {responseData.message}
                </Alert>
              )}


              <form method='post' ref={formRef} name="userRegistration" onSubmit={userRegistration}>
                <h3>Sign In</h3>
                <div className="mb-3">
                  <label >Email Id</label>
                  <input type="email" className="form-control" name="useremail" placeholder='Type your email' onChange={handlechange} />
                </div>
                <div style={{ color: "red" }}>{error.email}</div>


                <div className="input-containers mb-3">
                  <label>Password</label>

                  <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" placeholder='Type your password' onChange={handlechange} />
                  <button type="button" className="btn  toggle-eye" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>


                </div>
                <div style={{ color: "red" }}>{error.password}</div>

                <div>
                  <Row>
                    <div style={{ width: '60%', textAlign: "start" }} >

                      <Link to="/forgotpassword" style={{ textDecoration: "none" }}>Forgot password?</Link>

                    </div>
                    <button type="submit" style={{ width: '35%' }} class="sigma_btn-custom d-block w-20" onClick={handleLogin} name="button"> Sign in <i class="far fa-arrow-right"></i> </button>
                  </Row>
                </div>




                <p style={{ marginTop: "20px", textAlign: "center" }} className="forgot-password text-right" >
                  Don't have a account?
                  {/* <a href="/sign-up">Sign Up</a> */}
                  <Link to="/sign-up"> Sign Up</Link>
                </p>
              </form>





            </div>

          </div>
        </Container>



      </div>

    </div>
  )
}

export default Login



