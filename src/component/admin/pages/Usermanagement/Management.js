


import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import Pagination from "../Pagination";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import Modal from 'react-bootstrap/Modal';
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';



function Management(props) {
  // api data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [showAlert, setShowAlert] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const [showAlerts, setShowAlerts] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [recordToBlock, setRecordToBlock] = useState(null);
  const [originalData, setOriginalData] = useState([]);

  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata(query = '') {
    try {
      const response = await axios.post(`https://svt.know3.com/api/view_userlist?q=${query}`);
      setData(response.data);
      setOriginalData(response.data); // Store the original data for searching
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }

  const onBlock = (_id, status) => {
    const newStatus = status === 1 ? 1 : 0; // toggle status between 0 and 1
    setRecordToBlock({ _id, status: newStatus });
    setShowAlerts(true);
  };

  const handleConfirmation = (_id, status) => {
    const newStatus = status === 1 ? 1 : 0; // toggle status between 0 and 1
    axios
      .post(`https://svt.know3.com/api/status/${_id}`, { status: newStatus })
      .then((response) => {
        searchdata();
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error updating status:", error);
      })
      .finally(() => {
        setShowAlerts(false);
      });
  };

  useEffect(() => {
    if (showAlerts && recordToBlock) {
      const message = recordToBlock.status === 1 ? "Are you sure you want to block?" : "Are you sure you want to active?";
      setAlertMessage(message);
    }
  }, [showAlerts, recordToBlock]);

  const onDelete = (_id) => {
    axios
      .get(`https://svt.know3.com/api/deleteuser/${_id}`)
      .then(() => {
        searchdata();
      });
  };

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    // Filter the original data based on the search query
    const filteredData = originalData.filter((record) => {
      return (
        (record.First_name &&
          record.First_name.toLowerCase().includes(query.toLowerCase())) ||
        (record.Mobile_Number &&
          record.Mobile_Number.toString().includes(query)) ||
        (record.user_email &&
          record.user_email.toLowerCase().includes(query.toLowerCase())) ||
        (record.Country &&
          record.Country.toLowerCase().includes(query.toLowerCase())) ||
        (record.State &&
          record.State.toLowerCase().includes(query.toLowerCase())) ||
        (record.City &&
          record.City.toLowerCase().includes(query.toLowerCase())) ||
        (record.Zip_Code && record.Zip_Code.toString().includes(query))
      );
    });

    // Update the filtered data state variable with the search results
    setData(filteredData);
    setCurrentPage(1); // Reset to the first page after search
  };

  // ...

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);
  const renderTableRows = () => {
    const startingSNo = (currentPage - 1) * recordsPerPage + 1;
    var id = 1;
    const filteredRecords = currentRecords.filter((record) => {
      return (
        (record.First_name &&
          record.First_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Mobile_Number &&
          record.Mobile_Number.toString().includes(searchQuery)) ||
        (record.user_email &&
          record.user_email.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Country &&
          record.Country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.State &&
          record.State.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.City &&
          record.City.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Zip_Code && record.Zip_Code.toString().includes(searchQuery))
      );
    });

    return filteredRecords.map((use,index) => (
      
      <tr key={use._id} style={{ textAlign: "center" }}>
         <td>{startingSNo + index}</td>
        <td>{use.First_name}</td>
        <td>{use.email}</td>
        <td>{use.Mobile_Number}</td>
        
        <td>{use.Country}</td>
        <td>{use.role}</td>
        <td>
          <Link to={`/admin/managementview/${use._id}`}>
            <span class="material-symbols-outlined">
              visibility
            </span>
          </Link>
        </td>

    
        <td>
          <Link style={{ color: '#000000' }} onClick={() => setData(data)}>
            <span class="material-symbols-outlined" onClick={() => handleDelete(use._id)}>
              delete
            </span>
          </Link>

        </td>
        <td>
          {use.status === 1 ? (
            <Button style={{ fontSize: '14px' }} onClick={() => onBlock(use._id, use.status)} variant="success">
              Active
            </Button>
          ) : (
            <Button style={{ fontSize: '14px' }} onClick={() => onBlock(use._id, use.status)} variant="danger">
              Block
            </Button>
          )}
        </td>
      </tr>
    ));
  };

  const handleDelete = (_id) => {
    setRecordToDelete(_id);
    setShowAlert(true);
  };

  const handleConfirmDelete = () => {
    if (recordToDelete) {
      onDelete(recordToDelete);
      setRecordToDelete(null);
    }
    setShowAlert(false);
  };

  if (loading) {
    return (
      <div>
        <div style={{ width: '100%', height: '100%', textAlign: 'center', marginTop: '300px' }}>
          <img src={loader} alt='Loading Please Wait...'></img>
        </div>
      </div>
    );
  }

  if (errors) {
    return "Error!";
  }

  return (
    <div>
      <Helmet>
        <title>Admin | UserManagement</title>
      </Helmet>
      <Container>
        <div >
          <Modal   {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={showAlert} onHide={() => setShowAlert(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Delete Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Are you sure you want to delete this record?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAlert(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={handleConfirmDelete}>
                Delete
              </Button>
            </Modal.Footer>
          </Modal>

          <Modal {...props}
            size="sm"
            aria-labelledby="contained-modal-title-vcenter"
            centered show={showAlerts} onHide={() => setShowAlerts(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Status Confirmation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>{alertMessage}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowAlerts(false)}>
                Cancel
              </Button>
              <Button variant={alertMessage.includes('block') ? 'danger' : 'success'} onClick={() => handleConfirmation(recordToBlock._id, recordToBlock.status)}>
                Confirm
              </Button>
            </Modal.Footer>
          </Modal>
        </div>

        <div className="flexbox-container" >
          <div >

            <Row>
              <div className="search-input-container">
                <FaSearch className="search-icon" />
                <input
                  type="text"
                  onChange={handleSearchInputChange}
                  className="search-input"
                  placeholder="Search..."
                  style={{ height: "36px", width: "120px", paddingLeft: "13px !important" }}
                />
              </div>

            </Row>
          </div>
          <div>
            <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>User Management</h1>
          </div>
          <div >
            <Link to="/admin/adduser">
              <Button style={{ marginRight: '.625rem', fontSize: '14px' }} variant="warning" className="btnnavbaradmin" >
                Add user
              </Button>
            </Link>
          </div>
        </div>
        <Row>
          <Col sm='12'>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <Table striped sm="6" responsive className="table-inside-card">
                <thead>
                  {currentRecords.length === 0 && (
                    <tr>
                      <th colSpan="13" style={{ textAlign: "center" }}>
                        No users found.
                      </th>
                    </tr>
                  )}
                  {currentRecords.length > 0 && (
                    <tr style={{ textAlign: "center" }}>
                      <th>S.No</th>
                      <th>First Name</th>
                      <th>Email</th>
                      <th>Mobile Number</th>                    
                     
                      <th>Country</th>   
                      <th>Role</th>                 
                      <th>View</th>                    
                      
                      <th>Delete</th>
                      <th>Status</th>
                    </tr>
                  )}
                </thead>
                <div style={{ margin: '10px' }}></div>
                <tbody >{renderTableRows()}</tbody>
              </Table>
            </Card>
          </Col>
        </Row>
        <Pagination
          className='pagination-admin justify-content-center-admin'
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </div>
  );
}

export default Management;
