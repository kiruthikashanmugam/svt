import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import Select from 'react-select';
import { Form, FormGroup, Label, Button, Input, Col, Container, Row } from 'reactstrap';
import Alert from 'react-bootstrap/Alert';
import { Helmet } from 'react-helmet';
import loader from '../../../../Loader.gif';

function Addcms() {
  const [category, setCategory] = useState(null);
  const [pageName, setPageName] = useState('');
  const [data, setData] = useState(null);
  const [pageId, setPageId] = useState('');
  const [responseData, setResponseData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editorContent, setEditorContent] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleCategoryChange = (selectedOption) => {
    setCategory(selectedOption);
    setPageId(selectedOption.id);
  };

  const handlePageNameChange = (e) => {
    setPageName(e.target.value);
  };

  const handleEditorChange = (content) => {
    setEditorContent(content);
  };

  useEffect(() => {
    if (responseData) {
      const timeout = setTimeout(() => {
        setResponseData(null); // Clear the success message after 1 second
        setCategory(null);
        setPageName('');
        setEditorContent('');

      }, 1000);
      return () => {
        setEditorContent(''); // Reset the editor content
        clearTimeout(timeout); // Clear the timeout on component unmount
      };
    }
  }, [responseData]);


  const handleSubmit = (event) => {
    event.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      setFormErrors({});
      const url = 'https://svt.know3.com/api/add_cms';
      const id = pageId ? pageId : '';

      const params = new URLSearchParams();
      params.append('pageid', id);
      params.append('pagename', pageName);
      params.append('editor', editorContent);

      axios.post(url, params)
        .then((response) => {
          console.log(response);
          setResponseData(response.data);



        })
        .catch((error) => {
          console.error(error);
          // Handle error
        })
        .finally(() => {
          setLoading(false);
        });

    } else {
      setFormErrors(errors);
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!category) {
      errors.category = 'Please select a category';
    }
    if (pageName.trim() === '') {
      errors.pageName = 'Please enter the page name';
    }
    if (pageName.trim() !== '' && !/^[A-Za-z\s]+$/.test(pageName)) {
      errors.pageName = 'Page Name must contain only text characters';
    }
    if (editorContent.trim() === '') {
      errors.editorContent = 'Please enter the editor content';
    }

    return errors;
  };
  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    await axios('https://svt.know3.com/api/cms')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data: ', error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }


  const options = data
    ? [
      { value: 0, label: 'Select a category' }, // empty option
      ...data.map((item) => ({
        value: item.pagename,
        label: item.pagename,
        id: item.pageid,
      })),
    ]
    : [];



  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }
  if (error) return 'Error!';

  return (
    <div>
      <Helmet>
        <title>Admin | Addcms</title>
      </Helmet>
      <Container style={{ width: "75%" }}>
        <Row>
          <Container>
            {responseData && (
              <Alert variant="success" style={{ textAlign: "center", marginTop: "25px" }}>
                {responseData.message}
              </Alert>
            )}
            <Form className="form-admin" id="myForm" onSubmit={handleSubmit}>
              <FormGroup row>
                <Label style={{ height: '50px' }}>
                  <h1 style={{ padding: '15px', textAlign: 'center', color: 'black', fontSize: '19px', fontWeight: 'bold' }}>Addcms</h1>
                  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '-59px' }}></div>
                </Label>
                <Col >
                  <Label style={{ fontWeight: 'normal' }} for="eventname" sm={5}>
                    Page Category
                  </Label>
                  <Select
                    className='mySelect__value-container'
                    value={category}
                    name='category'
                    onChange={handleCategoryChange}
                    options={options}
                    isSearchable={false}
                  />
                  {formErrors.category && <span className="error">{formErrors.category}</span>}

                </Col>
              </FormGroup>
              <FormGroup row>
                <Col >
                  <Label style={{ fontWeight: 'normal' }} for="startdate" sm={5}>
                    Page Name
                  </Label>
                  <Input type="text" value={pageName} onChange={handlePageNameChange}
                    style={{ height: "45px" }} />
                  {formErrors.pageName && <span className="error">{formErrors.pageName}</span>}
                </Col>
              </FormGroup>
              <FormGroup row>
                <Col >
                  <Label style={{ fontWeight: 'normal' }} for="enddate" sm={5}>
                    Page content
                  </Label>
                  <CKEditor
                    className='ck-editor__editable_inline'
                    editor={ClassicEditor}
                    data={editorContent} // Set the editor content from the editorContent state
                    onReady={(editor) => {
                      console.log('Editor is ready to use!', editor);
                    }}
                    onChange={(event, editor) => {
                      const content = editor.getData();
                      handleEditorChange(content);
                    }}
                    onFocus={(event, editor) => {
                      console.log('Focus.', editor);
                    }}
                  />
                  {formErrors.editorContent && <span className="error">{formErrors.editorContent}</span>}

                </Col>
              </FormGroup>
              <Row>
                <Col style={{ textAlign: 'right' }}>
                  <Button variant="warning" className="btnnavbaradmin" type='submit' >Add</Button>
                  {/* <Button outline color="success" style={{border:"1px solid green"}} type="submit">
                        Add
                      </Button> */}
                </Col>
              </Row>
            </Form>
          </Container>
        </Row>
      </Container>
    </div>
  );
}

export default Addcms;


