import axios from "axios";
import { useParams, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import loader from '../../../Loader.gif';



function Editrelative(props) {
  const { Relative_id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState({});
  


  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    fetchData();
  }, [Relative_id]);


  const fetchData = async () => {
    try {
      const response = await axios.get(`https://svt.know3.com/api/view_editrelative/${localStorage.getItem('user_id')},${Relative_id}`);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      try {
        await axios.post(
          `https://svt.know3.com/api/edit_relative?user_id=${localStorage.getItem('user_id')}`,
          data,
          {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
            }
          }
        );
        navigate("/user/dashboard/edituser");
      } catch (error) {
        console.log("Error updating user: ", error);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({
      ...prevData,
      [name]: value
    }));

    setValidationErrors(prevErrors => ({
      ...prevErrors,
      [name]: ''
    }));
  };


  const validateForm = () => {
    const errors = {};
  
    if (!data || !data.FirstName) {
      errors.FirstName = 'Please enter the first name';
    } else if (!/^[A-Za-z\s]+$/.test(data.FirstName)) {
      errors.FirstName = 'First Name must contain only text characters';
    }
  
    if (!data || !data.LastName) {
      errors.LastName = 'Please enter the last name';
    } else if (!/^[A-Za-z\s]+$/.test(data.LastName)) {
      errors.LastName = 'Last Name must contain only text characters';
    }
  
    if (data && data.MobileNo && typeof data.MobileNo !== 'undefined') {
      if (!data.MobileNo.match(/^(\+\d{1,3}[- ]?)?\d{10}$/)) {
        errors.MobileNo = 'Mobile Number should be 10 digits';
      }
    }
    
    if (data && data.Gothra && typeof data.Gothra !== 'undefined') {
      const regex = /^[A-Za-z\s]+$/;
      if (!data.Gothra.match(regex)) {
        errors.Gothra = 'Gothra contains only text characters';
      }
    }
    
  
    setValidationErrors(errors);
  
    return Object.keys(errors).length === 0;
  };
  

  useEffect(()=>{
    setLoading(false)
  },[])

  if (loading) {
    return (
<div>
        <div style={{width:'100%',height:'100%',textAlign:'center',marginTop:'300px'}}>
          <img src={loader} alt='Loading Please Wait...'></img>
          </div>
      </div>
    );
  }

  if (error) {
    return "Error!";
  }

  const user_id = localStorage.getItem('user_id');

  return (
    <div>
      <Helmet>
        <title>User | EditRelative</title>
      </Helmet>
      <Container>
        <div className="auth-wrapper">
          <div className="auth-inners">
            <form method='post' name="userRegistration" >
              <h3>Edit User Details</h3>

              <Row>
              <input type="hidden" className="form-control" name="Relative_id" defaultValue={data.Relative_id || ''} onChange={handleChange} />
                <input type="hidden" className="form-control" name="user_id" defaultValue={user_id} onChange={handleChange} />

                <Col lg={6}>
                  <div className="mb-3">
                    <label>First Name <span className="required">*</span></label>
                    <input  style={{height:'45px'}}
                      type="text"
                      className={`form-control ${validationErrors.FirstName ? 'is-invalid' : ''}`}
                      name="FirstName"
                      value={data.FirstName || ''}
                      onChange={handleChange}
                    />
                    {validationErrors.FirstName && (
                      <div className="invalid-feedback">{validationErrors.FirstName}</div>
                    )}
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Last Name <span className="required">*</span> </label>
                    <input  style={{height:'45px'}} type="text" className={`form-control ${validationErrors.LastName ? 'is-invalid' : ''}`} name="LastName" value={data.LastName || ''} onChange={handleChange} />
                    {validationErrors.LastName && <div className="invalid-feedback">{validationErrors.LastName}</div>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Date Of Birth</label>
                    <input type="date" style={{height:'45px'}} className={`form-control ${validationErrors.DateOfBirth ? 'is-invalid' : ''}`} name="DateOfBirth" value={data.DateOfBirth || ''} onChange={handleChange} />
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Gender</label>
                    <Form.Select id="country" style={{ paddingBottom: "12px"  ,height:'45px'}} className={`form-select ${validationErrors.Gender ? 'is-invalid' : ''}`} name="Gender" value={data.Gender || ''} onChange={handleChange}>
                      <option></option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Select>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Relationship</label>
                    <Form.Select  style={{height:'45px'}} className={`form-select ${validationErrors.Relationship ? 'is-invalid' : ''}`} name="Relationship" value={data.Relationship || ''} onChange={handleChange}>
                      <option></option>
                      <option value="Aunt">Aunt</option>
                      <option value="Brother">Brother</option>
                      <option value="Brother-in-law">Brother-in-law</option>
                      <option value="Cousin">Cousin</option>
                      <option value="Daughter">Daughter</option>
                      <option value="Daughter-in-law">Daughter-in-law</option>
                      <option value="Father">Father</option>
                      <option value="Father-in-law">Father-in-law</option>
                      <option value="Friend">Friend</option>
                      <option value="Grand Child">Grand Child</option>
                      <option value="Grand Father">Grand Father</option>
                      <option value="Grand Mother">Grand Mother</option>
                      <option value="Mother">Mother</option>
                      <option value="Mother-in-law">Mother-in-law</option>
                      <option value="Nephew">Nephew</option>
                      <option value="Niece">Niece</option>
                      <option value="Not Known">Not Known</option>
                      <option value="Others">Others</option>
                      <option value="Sister">Sister</option>
                      <option value="Sister-in-law">Sister-in-law</option>
                      <option value="Son">Son</option>
                      <option value="Son-in-law">Son-in-law</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Uncle">Uncle</option>
                   


                    </Form.Select>
                    </div>


                  
                </Col>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Mobile Number</label>
                    <input type="text"  style={{height:'45px'}} className={`form-control ${validationErrors.MobileNo ? 'is-invalid' : ''}`} name="MobileNo" value={data.MobileNo || ''} onChange={handleChange} />
                    {validationErrors.MobileNo && <div className="invalid-feedback">{validationErrors.MobileNo}</div>}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Nakshatra</label>
                    <Form.Select id="cars"  style={{height:'45px'}} className={`form-select ${validationErrors.Nakshatra ? 'is-invalid' : ''}`} name="Nakshatra" value={data.Nakshatra || ''} onChange={handleChange} >
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
                <Col lg={6}>
                  <div className="mb-3">
                    <label>Gothra</label>
                    <input type="text"  style={{height:'45px'}} className={`form-control ${validationErrors.Gothra ? 'is-invalid' : ''}`} name="Gothra" value={data.Gothra || ''} onChange={handleChange} />
                    {validationErrors.Gothra && <div className="invalid-feedback">{validationErrors.Gothra}</div>}
                  </div>
                </Col>
              </Row>
              <Col lg={12} style={{textAlign:"end"}}>
                  <Link to="/user/dashboard/edituser">
                  <a class="sigma_btn-custom secondary" style={{  backgroundColor: "#a19090", marginRight: "20px" }}  >Close</a>

                  </Link>
                
                  <a class="sigma_btn-custom secondary" type="submit" onClick={handleSubmit}  style={{ backgroundColor: '#7E4555' }}>Save Changes</a>
                  
              
              
                
                </Col>
               
{/* 
              <Button variant="primary" type="submit" className="btn btn-primary btn-block" style={{ backgroundColor: '#7E4555' }}>Save Changes</Button>
              <Link to="/user/dashboard/edituser" className="btn btn-link">Cancel</Link> */}
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}

export default Editrelative;






// import axios from "axios";
// import { useParams, useNavigate } from 'react-router-dom';
// import React, { useState, useEffect } from 'react';
// import { Button, Row, Col, Container } from 'react-bootstrap';
// import Form from 'react-bootstrap/Form';
// import { Link } from 'react-router-dom';

// function Editrelative() {
//   const { Relative_id } = useParams();
//   const navigate = useNavigate();
//   const [data, setData] = useState({});

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [validationErrors, setValidationErrors] = useState({});

//   useEffect(() => {
//     fetchData();
//   }, [Relative_id]);


//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`https://svt.know3.com/api/view_editrelative/${localStorage.getItem('user_id')},${Relative_id}`);
//       setData(response.data);
//       setLoading(false);
//     } catch (error) {
//       setError(error);
//       setLoading(false);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const isValid = validateForm();

//     if (isValid) {
//       try {
//         await axios.post(
//           `https://svt.know3.com/api/edit_relative?user_id=${localStorage.getItem('user_id')}`,
//           data,
//           {
//             headers: {
//               'Content-Type': 'application/x-www-form-urlencoded'
//             }
//           }
//         );
//         navigate("/user/dashboard/edituser");
//       } catch (error) {
//         console.log("Error updating user: ", error);
//       }
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData(prevData => ({
//       ...prevData,
//       [name]: value
//     }));

//     setValidationErrors(prevErrors => ({
//       ...prevErrors,
//       [name]: ''
//     }));
//   };


//   const validateForm = () => {
//     const errors = {};

//     if (data.FirstName === '') {
//       errors.FirstName = 'Please enter the first name';
//     } else if (!/^[A-Za-z\s]+$/.test(data.FirstName)) {
//       errors.FirstName = 'First Name must contain only text characters';
//     }

//     if (data.LastName === '') {
//       errors.LastName = 'Please enter the last name';
//     } else if (!/^[A-Za-z\s]+$/.test(data.LastName)) {
//       errors.LastName = 'Last Name must contain only text characters';
//     }

//     setValidationErrors(errors);

//     return Object.keys(errors).length === 0;
//   };

//   if (loading) {
//     return (
//       <div>
//         <div className="loader">
//           <div className="loader-inner">
//             <div className="loader-line-wrap">
//               <div className="loader-line"></div>
//             </div>
//             <div className="loader-line-wrap">
//               <div className="loader-line"></div>
//             </div>
//             <div className="loader-line-wrap">
//               <div className="loader-line"></div>
//             </div>
//             <div className="loader-line-wrap">
//               <div className="loader-line"></div>
//             </div>
//             <div className="loader-line-wrap">
//               <div className="loader-line"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }


//   if (error) {
//     return "Error!";
//   }
//   const user_id = localStorage.getItem('user_id');

//   return (
//     <div>
//       <Container>
//         <div className="auth-wrapper">
//           <div className="auth-inners">
//             <form method='post' name="userRegistration" onSubmit={handleSubmit}>
//               <h3>Edit User Details</h3>

//               <Row>
//                 <input type="hidden" className="form-control" name="Relative_id" onChange={handleChange} />
//                 <input type="hidden" className="form-control" name="user_id" value={user_id} onChange={handleChange} />

//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>First Name <span className="required">*</span></label>
//                     <input
//                       type="text"
//                       className={`form-control ${validationErrors.FirstName ? 'is-invalid' : ''}`}
//                       name="FirstName"
//                       value={data.FirstName || ''}
//                       onChange={handleChange}
//                     />
//                     {validationErrors.FirstName && (
//                       <div className="invalid-feedback">{validationErrors.FirstName}</div>
//                     )}
//                   </div>

//                 </Col>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Last Name <span className="required">*</span> </label>
//                     <input type="text" className={`form-control ${validationErrors.LastName ? 'is-invalid' : ''}`} name="LastName" value={data.LastName || ''} onChange={handleChange} />
//                     {validationErrors.LastName && <div className="invalid-feedback">{validationErrors.LastName}</div>}
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Date Of Birth</label>
//                     <input type="date" className={`form-control ${validationErrors.DateOfBirth ? 'is-invalid' : ''}`} name="DateOfBirth" value={data.DateOfBirth || ''} onChange={handleChange} />
                  
//                   </div>
//                 </Col>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Gender</label>
//                     <Form.Select id="country" style={{ paddingBottom: "12px" }} className={`form-control ${validationErrors.Gender ? 'is-invalid' : ''}`} name="Gender" value={data.Gender || ''} onChange={handleChange}>
//                       <option></option>
//                       <option value="Male">Male</option>
//                       <option value="Female">Female</option>
//                     </Form.Select>
                   
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Nakshatra</label>
//                     <Form.Select id="cars" className={`form-control ${validationErrors.Nakshatra ? 'is-invalid' : ''}`} name="Nakshatra" value={data.Nakshatra || ''} onChange={handleChange} >
//                       <option></option>
//                       <option value="Visaka [Tula]">Visaka [Tula]</option>
//                       <option value="Swathi [Tula]">Swathi [Tula]</option>
//                       <option value="Mula [Danur]">Mula [Danur]</option>
//                       <option value="Bharani [Mesham]">Bharani [Mesham]</option>
//                     </Form.Select>

                  
//                   </div>
//                 </Col>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Gothra</label>
//                     <input type="text" className={`form-control ${validationErrors.Gothra ? 'is-invalid' : ''}`} name="Gothra" value={data.Gothra || ''} onChange={handleChange} />
//                     {validationErrors.Gothra && <div className="invalid-feedback">{validationErrors.Gothra}</div>}
//                   </div>
//                 </Col>
//               </Row>
//               <Row>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Relationship</label>
//                     <Form.Select className={`form-control ${validationErrors.Relationship ? 'is-invalid' : ''}`} name="Relationship" value={data.Relationship || ''} onChange={handleChange}>
//                       <option></option>
//                       <option value="Aunt">Aunt</option>
//                       <option value="Brother">Brother</option>
//                       <option value="Sister">Sister</option>
//                       <option value="Friend">Friend</option>
//                       <option value="Other">Other</option>

//                     </Form.Select>
//                     </div>


                  
//                 </Col>
//                 <Col lg={6}>
//                   <div className="mb-3">
//                     <label>Mobile Number</label>
//                     <input type="text" className={`form-control ${validationErrors.MobileNo ? 'is-invalid' : ''}`} name="MobileNo" value={data.MobileNo || ''} onChange={handleChange} />
//                     {validationErrors.MobileNo && <div className="invalid-feedback">{validationErrors.MobileNo}</div>}
//                   </div>
//                 </Col>
//               </Row>
//               <div className="mb-3">
//                 <button type="submit" className="btn btn-primary btn-block">Update</button>
//               </div>
//             </form>
//             <Link to="/user/dashboard/edituser" className="btn btn-danger btn-block">Cancel</Link>
//           </div>
//         </div>
//       </Container>
//     </div>
//   );
// }

// export default Editrelative;









