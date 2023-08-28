import { React, useState } from 'react';
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import { useAuths } from '../../auth page/AuthProviders';
import { Helmet } from 'react-helmet';

function Password() {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(null);
  const auth = useAuths();

  const handlechange = (e) => {
    setUser((prevUser) => ({ ...prevUser, [e.target.name]: e.target.value }));
  };

  const userRegistration = (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("valid input received");
      handleLogin();
    }
  };

  const handleLogin = () => {

    axios
      .post('https://svt.know3.com/api/send_otp', user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => {


        if (response.data.trim() === "Basic Email Sent. Check your inbox.") {
          auth.signin(user, () => {
            navigate('/setpassword', { replace: true });
          });
        } else {
          setSuccess(response.data);
        }
      })
      .catch(error => {
        console.error(error);
        setError(error);
      });

  };

  const validateForm = () => {
    let error = {};
    let formIsValid = true;
    // email
    if (!user["toemail"]) {
      formIsValid = false;
      error["email"] = "please enter an email id";
    }

    if (typeof user["toemail"] !== "undefined") {
      var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
      if (!user["toemail"].match(pattern)) {
        formIsValid = false;
        error["email"] = "please enter a valid email-id";
      }
    }

    setError(error);
    return formIsValid;
  };

  return (
    <div style={{backgroundColor:"white"}} >
      <Helmet>
        <title>User | Forgotpassword</title>
      </Helmet>
      <Container>
        <div className="auth-wrapper">
          <div className='auth-inner'  style={{ marginTop: '100px' }}>
            {success && (
              <Alert variant="success" style={{ textAlign: "center" }}>
                {success}
              </Alert>
            )}

            <form method="post" name="userRegistration" onSubmit={userRegistration}>
              <h4 style={{ textAlign: "center" }} className="mb-3">
                Forgot Password
              </h4>
              <p style={{ textAlign: "center" }} className="mb-4">
                Already have an account{" "}
                <Link to="/sign-in">Sign in?</Link>
              </p>
              <div className="mb-4">
                <label>Email ID</label>
                <input type="email" className="form-control" name="toemail" onChange={handlechange} />
              </div>
              <div style={{ color: "red" }}>{error.email}</div>


              <button type="submit" class="sigma_btn-custom d-block w-20" name="button">   Send OTP <i class="far fa-arrow-right"></i> </button>


            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Password;
