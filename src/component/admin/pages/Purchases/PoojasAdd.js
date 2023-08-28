
import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';
import { Helmet } from 'react-helmet';
import loader from '../../../../Loader.gif';
import { Link, useNavigate } from 'react-router-dom';
import Modal from "react-bootstrap/Modal"

function PoojasAdd(props) {
  const [poojaname, setPoojaname] = useState("");
  const [error, setError] = useState({});
  const [data, setData] = useState(null);
  const [poojacategory, setPoojacategory] = useState(null);
  const [poojasubcategory, setPoojasubcategory] = useState(null);
  const [poojafees, setPoojafees] = useState("");
  const [loading, setLoading] = useState(true);
  const [responseData, setResponseData] = useState(null);
  const [subcategoryOptions, setSubcategoryOptions] = useState([]);
  const [modal,setModal]=useState(false);
  const navigate=useNavigate();

  useEffect(() => {
    if (responseData) {
      const timeout = setTimeout(() => {
       
        setPoojaname("");
        setPoojacategory("");
        setPoojasubcategory("");
        setPoojafees("");
        setError({});
      }, 1000);
      return () => {
        clearTimeout(timeout); // Clear the timeout on component unmount
      };
    }
  }, [responseData]);

  const onChangePoojaname = (e) => {
    setPoojaname(e.target.value);
  };
  const onChangePoojacategory = (selectedOption) => {
    const selectedCategory = selectedOption.value;
    const category = data.find((item) => item.Category_Name === selectedCategory);
    const subcategories = category ? category.Subcategories : [];

    setPoojacategory(selectedOption); // Update the selected category directly
    setPoojasubcategory(null); // Reset the subcategory selection
    setSubcategoryOptions(getSubcategoryOptions(subcategories));
  };


  const onChangePoojasubcategory = (selectedOption) => {
    setPoojasubcategory(selectedOption); // Set the entire selected option object
  };

  const onChangePoojafees = (e) => {
    setPoojafees(e.target.value);
  };

  const validateForm = () => {
    let formIsValid = true;
    let newError = {};

    if (!poojaname || poojaname.trim() === "") {
      formIsValid = false;
      newError["poojaname"] = "Please enter the puja name";
    } else if (!/^[A-Za-z\s]+$/.test(poojaname)) {
      formIsValid = false;
      newError["poojaname"] = "Pujaname must contain only text characters";
    }

    if (!poojacategory || poojacategory === "") {
      formIsValid = false;
      newError["poojacategory"] = "Please select a puja category";
    }

    if (!poojasubcategory || poojasubcategory === "") {
      formIsValid = false;
      newError["poojasubcategory"] = "Please select a puja subcategory";
    }

    if (!poojafees || poojafees === "") {
      formIsValid = false;
      newError["poojafees"] = "Please enter the puja fees";
    }

    setError(newError);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = {
      Pooja_Name: poojaname,
      Category_Name: poojacategory,
      Sub_Category: poojasubcategory,
      Pooja_Fees: poojafees,
    };

    try {
      const response = await axios.post("https://svt.know3.com/api/pooja", formData);
      setResponseData(response.data.trim());
      setLoading(false);
      setModal(true)
    } catch (error) {
      console.error(error);
    }
  };

  const getSubcategoryOptions = (subcategories) => {
    return subcategories.map((subcategory) => ({
      value: subcategory.Sub_category,
      label: subcategory.Sub_category,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://svt.know3.com/api/view_category");
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);


  const handleCloseModal=()=>{
    if(responseData==="Pooja created successfully"){
  navigate("/admin/pujas")
    }
    else{
      setModal(false)
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

  const categoryOptions = data.map((category) => ({
    value: category.Category_Name,
    label: category.Category_Name,
  }));

  const subcategorySelectOptions = subcategoryOptions.length
    ? [

      ...subcategoryOptions,
    ]
    : [];

  return (
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | AddPuja</title>
      </Helmet>
      <Modal  {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={modal} onHide={() => setModal(false)}>

          <Modal.Body>
            {responseData === "Pooja created successfully" ? (
              <div>
                <h6> Puja added successfully! </h6>
              </div>
            ) : (
              <div>
                {responseData}
              </div>
            )}

         
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      <Row>
        <Container>
          {/* {responseData && (
            <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
              Puja added successfully!
            </Alert>
          )} */}
          <Form className="form-admin" onSubmit={handleSubmit}>
            <FormGroup row>
              <Label style={{ height: '50px' }}>
                <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Puja</h1>
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
              </Label>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Puja Name</Label>
                <Input
                  type="text"
                  name="poojaname"
                  id="poojaname"
                  value={poojaname}
                  onChange={onChangePoojaname}
                  style={{ height: "45px" }}
                />
                {error.poojaname && (
                  <div style={{ color: "red" }}>{error.poojaname}</div>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col>
                <Label style={{ fontWeight: 'normal' }} sm={5}>Puja Category</Label>
                <Select
                  className='mySelect__value-container'
                  id="poojacategory"
                  name='poojacategory'
                  options={categoryOptions}
                  value={poojacategory}
                  isSearchable={false}
                  onChange={onChangePoojacategory}
                />
                {error.poojacategory && (
                  <div style={{ color: "red" }}>{error.poojacategory}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} sm={5}>Puja Subcategory</Label>
                <Select
                  className='mySelect__value-container'
                  id="poojasubcategory"
                  name='poojasubcategory'
                  options={subcategorySelectOptions}
                  value={poojasubcategory}
                  isSearchable={false}
                  onChange={onChangePoojasubcategory}
                />
                {error.poojasubcategory && (
                  <div style={{ color: "red" }}>{error.poojasubcategory}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojafees" sm={5}>Puja Fees</Label>
                <Input
                  type="number"
                  name="poojafees"
                  min={1}
                  id="poojafees"
                  value={poojafees}
                  onChange={onChangePoojafees}
                  style={{ height: "45px" }}
                />
                {error.poojafees && (
                  <div style={{ color: "red" }}>{error.poojafees}</div>
                )}
              </Col>
            </FormGroup>
            <Row>
              <Col style={{ textAlign: 'right' }}>
              <Link to="/admin/pujas">
                  <Button style={{ marginRight: '4px' }}>
                    Back
                  </Button>
                </Link>
                <Button variant="warning" className="btnnavbaradmin" type="submit">
                  Add
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default PoojasAdd;
