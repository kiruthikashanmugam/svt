

import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import Pagination from "../../Pagination";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';

import Modal from 'react-bootstrap/Modal';
import loader from '../../../../../Loader.gif';



function Servicelistview(props) {
  // api data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);
  const [showAlert, setShowAlert] = useState(false);
  const [recordToDelete, setRecordToDelete] = useState(null);
  const[originaldata,setOriginalData]=useState([])



  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/service_list?q=${query}`);
      setData(response.data);
      setOriginalData(response.data)
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }



  const onDelete = (_id) => {
    axios
      .get(`https://svt.know3.com/api/delete_servicelist/${_id}`)
      .then(() => {
        searchdata();
      });
  };

  const handleSearchInputChange = (event) => {
    const query=event.target.value
    setSearchQuery(query);
    const filteredRecords=originaldata.filter((record)=>{
      return(
        (record.pooja_name &&
          record.pooja_name.toLowerCase().includes(query.toLowerCase())) ||
        (record.pooja_Duration &&
          record.pooja_Duration.toString().includes(query)) ||
        (record.pooja_type &&
          record.pooja_type.toLowerCase().includes(query.toLowerCase())) ||
        (record.pooja_fees &&
          record.pooja_fees.includes(query))
      )
    })


  setData(filteredRecords)
  setCurrentPage(1)
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const renderTableRows = () => {
    var id = 1;
    const filteredRecords = currentRecords.filter((record) => {
      return (
        (record.pooja_name &&
          record.pooja_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.pooja_Duration &&
          record.pooja_Duration.toString().includes(searchQuery)) ||
        (record.pooja_type &&
          record.pooja_type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.pooja_fees &&
          record.pooja_fees.includes(searchQuery))

      );
    });

    return filteredRecords.map((use) => (
      <tr key={use._id}>
        <td>{id++}</td>
        <td>{use.pooja_name}</td>
        <td>{use.pooja_Duration}</td>
        <td>{use.pooja_type}</td>
        <td>{use.pooja_fees}</td>
        <td > {use.poojalist_url ? (
          <a href={use.poojalist_url} download>
            Download
          </a>
        ) : null}</td>


        <td>
          <Link style={{ color: '#000000' }} to={`/admin/editservice/${use._id}`} onClick={() => setData(data)}>
            <span class="material-symbols-outlined">
              edit
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
            <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Service List</h1>
          </div>
          <div >
            <Link to="/admin/addservice">
              <Button style={{ marginRight: '.625rem', fontSize: '14px' }} variant="warning" className="btnnavbaradmin" >
                Add Service
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
                      <th>Puja Name</th>
                      <th>Puja Duration</th>
                      <th>Puja Type</th>
                      <th>Puja Fees</th>
                      <th>Puja URL</th>
                      <th>Edit</th>
                      <th>Delete</th>



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

export default Servicelistview;
