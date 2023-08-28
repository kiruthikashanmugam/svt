

import { React, useState } from 'react';
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuths } from '../../auth page/AuthProviders';
import { v4 as uuidv4 } from 'uuid';
import '../assets/styles/Header.css';
import { Helmet } from 'react-helmet';
import loader from '../../../Loader.gif';
import { useEffect } from 'react';
import { Alert } from 'react-bootstrap';




function Admin() {
  const auth = useAuths();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState({})
  const [error, setError] = useState({})
  const [loading, setLoading] = useState(false);
  const [responseData,setResponseData]=useState(null)

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
      setLoading(true);
      axios.post('https://svt.know3.com/api/admin_check', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          console.log(response);
          setResponseData(response.data)
          if (response.data.trim() === "login successful") {
         

            // Generate a unique session-like ID
            const sessionID = uuidv4();

                 // Store the session ID in session storage
                 sessionStorage.setItem('sessionID', sessionID);

            auth.signin(user, () => {
              navigate('/admin/dashboard', { replace: true });
         
              setUser({});
            });
          }
          setLoading(false);
        })
        
        .catch(error => {
          setLoading(false);
          console.error(error);

        });
    }
  };



  const togglePassword = (e) => {
    if (showPassword) {
      setShowPassword(false);
    } else {
      setShowPassword(true)
    }
  }



  const validateForm = () => {

    let error = {}
    let formIsValid = true;
    //email
    if (!user["useremail"]) {
      formIsValid = false;
      error["email"] = "please enter a valid email";
    }

    if (typeof user["useremail"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!user["useremail"].match(pattern)) {
        formIsValid = false
        error["email"] = "please enter valid email-id"
      }
    }
    if ((!user["password"]) && (!user["confirmpassword"])) {
      formIsValid = false;
      error["password"] = "please enter your password"
      error["confirmpassword"] = "please enter yout confirm password"

    }



    setError(error)
    return formIsValid;

  }

  useEffect(()=>{
    setLoading(false)
  },[])
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

    <div style={{backgroundColor:"white"}} >
      <Helmet>
        <title>Admin | Signin</title>
      </Helmet>

      <Container >
      

        <div className="auth-wrapper-admin" style={{paddingTop:'150px'}}>
    
          <div className="auth-inner-admin">
          {responseData && (
                <Alert variant="success" style={{ textAlign: "center" }}>
                  {responseData}
                </Alert>
              )}
            <form method='post' name="userRegistration" onSubmit={userRegistration}>
              <h3 style={{color:'black'}}>Sign In</h3>
              <div className="input-containers-admin mb-3">
                <label  style={{fontWeight:'normal'}} >Email Id</label>
                <input type="email" className="form-control" name="useremail" onChange={handlechange} />
              </div>
              <div style={{ color: "red" }}>{error.email}</div>
              <div className="input-containers-admin mb-3">
                <label style={{fontWeight:'normal'}}>Password</label>
                <input type={showPassword ? 'text' : 'password'} className="form-control" name="password" onChange={handlechange} />
                <button type="button" className="btn  toggle-eye" onClick={(e) => togglePassword(e)} ><i className={showPassword ? 'far fa-eye' : 'far fa-eye-slash'} ></i> </button>
              </div>
              <div style={{ color: "red" }}>{error.password}</div>


              <div className="d-grid">
                <button type="Signin" className="btn btn-primary" onClick={handleLogin}>
                  Signin
                </button>
              </div>

            </form>





          </div>

        </div>
      </Container>



    </div>
  )
}

export default Admin


