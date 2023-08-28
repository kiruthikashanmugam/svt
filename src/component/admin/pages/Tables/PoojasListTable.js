

import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import axios from "axios";
import Pagination from "../Pagination";
import { FaSearch } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

const PoojasListTable = (props) => {
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


  useEffect(() => {
    getPoojaList();
  }, []);

  async function getPoojaList(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/poojacount_currentmonth?q=${query}`);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const renderTableRows = () => {
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

    return currentRecords.map((listitem) => (
      <tr key={listitem._id}  style={{ textAlign: "center" }}>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{id++}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Firstname}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.MobileNumber}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Email}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Address}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Service_Name}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Venu_Preference}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Pooja_Start_Date} - {listitem.Pooja_End_Date}</td>
        <td style={{ lineHeight: '20px', padding: '20px' }}>{listitem.Pooja_Start_Time} - {listitem.Pooja_End_Time}</td>
        <td style={{ lineHeight: '20px', padding: '20px', color: listitem.Status === 'Booked' ? 'green' : 'blue' }}>{listitem.Status}</td>
      </tr>
    ));
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
        <title>Admin | Pujaslist</title>
      </Helmet>
      <Container>
        <div className="flexbox-container" >
          <div >

          
          </div>
          <div >
          </div>
          <div>
            <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Puja List</h1>
          </div>
          <div >
          </div>
        </div>
        <Row>
          <Col sm='12'>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <Table striped responsive className="table-inside-card">
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
                      <th style={{ lineHeight: '20px' }}>S.No</th>
                      <th style={{ lineHeight: '20px' }}>Name</th>
                      <th style={{ lineHeight: '20px' }}>Mobile Number</th>
                      <th style={{ lineHeight: '20px' }}>Email Id</th>
                      <th style={{ lineHeight: '20px' }}>Address</th>
                      <th style={{ lineHeight: '20px' }}>Service Name</th>
                      <th style={{ lineHeight: '20px' }}>Venue Preference</th>
                      <th style={{ lineHeight: '20px' }}>Puja Start/End Date</th>
                      <th style={{ lineHeight: '20px' }}>Puja Start/End Time</th>
                      <th style={{ lineHeight: '20px' }}>Status</th>
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
          nPages={nPages}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </Container>
    </div>
  );
}

export default PoojasListTable;