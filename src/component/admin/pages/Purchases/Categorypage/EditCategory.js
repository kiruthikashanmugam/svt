

import React, { useState, useEffect } from 'react';
import { Form, FormGroup, Label, Button, Input, Row, Col, Container } from 'reactstrap';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';

function EditCategory() {
    const [data, setData] = useState([]);
    const [error, setError] = useState({});
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [image, setImage] = useState(null);
    const [responseData, setResponseData] = useState(null);
    const [imagePreview, setImagePreview] = useState(data.catimg ? `https://svt.know3.com/images/${data.catimg}` : null);
    const [selectedImage, setSelectedImage] = useState(data.catimg || null);



    const { _id } = useParams();



    useEffect(() => {
        searchdata();
    }, []);

    async function searchdata() {
        setLoading(true);
        try {
            const response = await axios.get(`https://svt.know3.com/api/view_editcategory/${_id}`);
            if (response.data.length > 0) {
                setData(response.data[0]);
            }
            console.log(response.data);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError(error);
        } finally {
            setLoading(false);
        }
    }
    const handleSubmit = async (event) => {
        event.preventDefault();
        const isValid = validateForm();
      
        if (isValid) {
          try {
            const formData = new FormData();
            formData.append('Type', data.Type);
            formData.append('Category_Name', data.Category_Name);
            formData.append('Sub_category', data.Sub_category);
      
            if (selectedImage) {
              formData.append('catimg', selectedImage);
            }
      
            if (formData.has('catimg')) {
              await axios.post(`https://svt.know3.com/api/edit_categorydata/${_id}`, formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
              });
            } else {
              await axios.post(`https://svt.know3.com/api/edit_categorydata/${_id}`, {
                Type: data.Type,
                Category_Name: data.Category_Name,
                Sub_category: data.Sub_category
              });
            }
            navigate("/admin/category");
          } catch (error) {
            console.log("Error updating user: ", error);
          }
        }
      };
      
      
    const validateForm = () => {
        let formIsValid = true;
        let newError = {};

        if (!data.Type || data.Type.trim() === "") {
            formIsValid = false;
            newError["type"] = "Please enter the puja type";
        } else if (!/^[A-Za-z\s]+$/.test(data.Type)) {
            formIsValid = false;
            newError["type"] = "Puja type must contain only text characters";
        }

        if (!data.Category_Name || data.Category_Name.trim() === "") {
            formIsValid = false;
            newError["poojacategory"] = "Please enter the category name";
        } else if (!/^[A-Za-z\s]+$/.test(data.Category_Name)) {
            formIsValid = false;
            newError["poojacategory"] = "Category name must contain only text characters";
        }

        if (!data.Sub_category || data.Sub_category.trim() === "") {
            formIsValid = false;
            newError["poojasubcategory"] = "Please enter the subcategory";
        } else if (!/^[A-Za-z\s]+$/.test(data.Sub_category)) {
            formIsValid = false;
            newError["poojasubcategory"] = "Subcategory must contain only text characters";
        }



        setError(newError);
        return formIsValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };
    const handleImageChange = (e) => {
        const selectedImageFile = e.target.files[0];
        if (selectedImageFile) {
          setSelectedImage(selectedImageFile);
          setImagePreview(URL.createObjectURL(selectedImageFile));
        } 
      };
      
      


    return (
        <Container style={{ width: "75%" }}>
            <Helmet>
                <title>Admin | EditCategory</title>
            </Helmet>
            <Row>
                {responseData && (
                    <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
                        {responseData}
                    </Alert>
                )}
                <Container>
                    <Form method="post" onSubmit={handleSubmit} className="form-admin">
                        <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Category</h1>
                        <FormGroup row>
                            <Col>
                                <Label style={{ fontWeight: 'normal' }} for="poojaname" sm={5}>Type</Label>
                                <br />
                                <select
                                    className="form-select"
                                    name="Type"
                                    value={data.Type || ""}
                                    onChange={handleChange}
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
                            <Col>
                                <Label style={{ fontWeight: 'normal' }} for="poojacategory" sm={5}>Category Name</Label>
                                <Input
                                    type="text"
                                    name="Category_Name"
                                    value={data.Category_Name || ""}
                                    onChange={handleChange}
                                    style={{ height: "45px" }}
                                />
                                {error.poojacategory && (
                                    <div style={{ color: "red" }}>{error.poojacategory}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label style={{ fontWeight: 'normal' }} for="poojasubcategory" sm={5}>Subcategory</Label>
                                <Input
                                    type="text"
                                    name="Sub_category"
                                    value={data.Sub_category || ""}
                                    onChange={handleChange}
                                    style={{ height: "45px" }}
                                />
                                {error.poojasubcategory && (
                                    <div style={{ color: "red" }}>{error.poojasubcategory}</div>
                                )}
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Col>
                                <Label style={{ fontWeight: 'normal' }} for="poojacategoryimg" sm={5}>Image</Label>
                                <Input
                                    type="file"
                                    name="catimg"
                                    value={""}
                                    onChange={handleImageChange}
                                    style={{ height: "45px", paddingTop: "10px" }}
                                />


                                {error.image && (
                                    <div style={{ color: "red" }}>{error.image}</div>
                                )}
                            </Col>
                            <Col>
                                {imagePreview && (
                                    <img src={imagePreview} alt="Selected Image" />
                                )}
                                {!imagePreview && data.catimg && (
                                    <img src={`https://svt.know3.com/images/${data.catimg}`} alt="Category Image" />
                                )}
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Col style={{ textAlign: 'right' }}>
                                <Link to="/admin/category">
                                    <Button style={{ marginRight: '4px' }}>
                                        Back
                                    </Button>
                                </Link>
                                <Button variant="warning" type="submit" className="btnnavbaradmin">Add</Button>
                            </Col>
                        </FormGroup>
                    </Form>
                </Container>
            </Row>
        </Container>
    );
}

export default EditCategory

