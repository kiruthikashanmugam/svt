import React, { useState } from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';

import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-bootstrap/Modal'

function AddCategory(props) {
  const [type, setType] = useState("");
  const [error, setError] = useState({});
  const [categoryname, setPoojacategory] = useState("");
  const [subcategory, setPoojasubcategory] = useState("");
  const [modal,setModal]=useState(false)
  const navigate=useNavigate()

  const [image, setImage] = useState(null);
  const [responseData, setResponseData] = useState(null);




  const onChangePoojaname = (e) => {
    setType(e.target.value);
  };

  const onChangePoojacategory = (e) => {
    setPoojacategory(e.target.value);
  };

  const onChangePoojasubcategory = (e) => {
    setPoojasubcategory(e.target.value);
  };



  const onChangePoojacategoryimg = (e) => {
    setImage(e.target.files[0]);
  };

  const validateForm = () => {
    let formIsValid = true;
    let newError = {};

    if (!type || type.trim() === "") {
      formIsValid = false;
      newError["type"] = "Please enter the puja type";
    } else if (!/^[A-Za-z\s]+$/.test(type)) {
      formIsValid = false;
      newError["type"] = "Puja type must contain only text characters";
    }

    if (!categoryname || categoryname.trim() === "") {
      formIsValid = false;
      newError["poojacategory"] = "Please enter the  category name";
    } else if (!/^[A-Za-z\s]+$/.test(categoryname)) {
      formIsValid = false;
      newError["poojacategory"] = " category name must contain only text characters";
    }

    if (!subcategory || subcategory.trim() === "") {
      formIsValid = false;
      newError["poojasubcategory"] = "Please enter the  subcategory";
    } else if (!/^[A-Za-z\s]+$/.test(subcategory)) {
      formIsValid = false;
      newError["poojasubcategory"] = "Subcategory must contain only text characters";
    }

    if (!image) {
      formIsValid = false;
      newError["image"] = "Please upload the image";
    }

    setError(newError);
    return formIsValid;
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    formData.append("type", type);
    formData.append("categoryname", categoryname);
    formData.append("subcategory", subcategory);
    formData.append("image", image);

    axios
      .post("https://svt.know3.com/api/add_category", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res.data);
        setResponseData(res.data.trim());
        setModal(true)
        // if(res.data.trim()==="Category added successfully"){
        //   navigate("/admin/category")
        // }
        setType("");
        setPoojacategory("");
        setPoojasubcategory("");
        setImage(null);
        setError({})
      })
      .catch((err) => {
        console.error(err);
        // Handle error, display error message, or take appropriate action
      });
    e.target.reset();
  };


const handleCloseModal=()=>{
  if(responseData==="Category added successfully"){
    navigate("/admin/category")

  }else{
    setModal(false)
  }
}
  return (
    <Container style={{ width: "75%" }}>
      <Helmet>
        <title>Admin | AddCategory</title>
      </Helmet>
      <Modal  {...props}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered show={modal} onHide={() => setModal(false)}>

          <Modal.Body>
            {responseData === "Category added successfully" ? (
              <div>
                <h6>Category added successfully</h6>
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
        {/* {responseData && (
          <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
            {responseData}
          </Alert>
        )} */}
        <Container>
          <Form className="form-admin" onSubmit={onSubmit}>


            <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Category</h1>


            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Type</Label>
                <br />
                <select
                  className="form-select"
                  type="text"
                  name="type"
                  onChange={onChangePoojaname}
                  style={{ height: "45px" }}>
                  <option value=""></option>
                  <option value="Pooja">Puja</option>
                  <option value="Donation">Donation</option>

                </select>
                {error.type && (
                  <div style={{ color: "red" }}>{error.type}</div>
                )}



              </Col>
            </FormGroup>
            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojacategory" sm={5}>Category Name</Label>
                <Input
                  type="text"
                  name="categoryname"
                  onChange={onChangePoojacategory}
                  style={{ height: "45px" }}
                />
                {error.poojacategory && (
                  <div style={{ color: "red" }}>{error.poojacategory}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>Subcategory</Label>
                <Input
                  type="text"
                  name="subcategory"
                  onChange={onChangePoojasubcategory}
                  style={{ height: "45px" }}
                />
                {error.poojasubcategory && (
                  <div style={{ color: "red" }}>{error.poojasubcategory}</div>
                )}
              </Col>
            </FormGroup>

            <FormGroup row>
              <Col >
                <Label style={{ fontWeight: 'normal' }} for="poojacategoryimg" sm={5}>Image</Label>
                <Input
                  type="file"
                  name="image"
                  onChange={onChangePoojacategoryimg}
                  style={{ height: "45px", paddingTop: "10px" }}
                />
                {error.image && (
                  <div style={{ color: "red" }}>{error.image}</div>
                )}
              </Col>
            </FormGroup>
            <FormGroup row>
              <Col style={{ textAlign: 'right' }}>
                <Link to="/admin/category">
                <Button  style={{ marginRight: '4px' }}>
                  Back
                </Button>
                </Link>
                <Button variant="warning" type='submit' className="btnnavbaradmin" >Add</Button>

              </Col>
            </FormGroup>
          </Form>
        </Container>
      </Row>
    </Container>
  );
}

export default AddCategory;
