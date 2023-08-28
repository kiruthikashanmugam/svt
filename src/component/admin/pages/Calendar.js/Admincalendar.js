
import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import Pagination from "../Pagination";
import axios from "axios";
import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import { FaSearch } from 'react-icons/fa';
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

function Admincalendar() {
  // api data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const[originaldata,setOriginalData]=useState([])

  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/calendar_events?q=${query}`);
 
      setData(response.data);
      setOriginalData(response.data)
      
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }



  const handleSearchInputChange = (event) => {
  const query=event.target.value
    setSearchQuery(query)

    const filteredRecords=originaldata.filter((record)=>{
      return (
        (record.Service_Name &&
          record.Service_Name.toLowerCase().includes(query.toLowerCase())) ||
        (record.Category_Name &&
          record.Category_Name.toLowerCase().includes(query.toLowerCase())) ||
        (record.Sub_Category &&
          record.Sub_Category.toLowerCase().includes(query.toLowerCase())) ||
        (record.recurrence_pattern &&
          record.recurrence_pattern.toLowerCase().includes(query.toLowerCase()))

      );
     
    })
    setData(filteredRecords)
    setCurrentPage(1);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const renderTableRows = () => {
    var id = 1;
    const filteredRecords = currentRecords.filter((record) => {
      return (
        (record.Service_Name &&
          record.Service_Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Category_Name &&
          record.Category_Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Sub_Category &&
          record.Sub_Category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.recurrence_pattern &&
          record.recurrence_pattern.toLowerCase().includes(searchQuery.toLowerCase()))

      );
    });

    return filteredRecords.map((use) => (
      <tr key={use._id} style={{ textAlign: "center" }}>
        <td>{id++}</td>
        <td>{use.Service_Name}</td>
        <td>{use.Category_Name}</td>
        <td>{use.Sub_Category}</td>
        <td>{use.Pooja_Start_Date}</td>
        <td>{use.Pooja_End_Date}</td>
        {/* <td>{use.Start_Time}</td>
        <td>{use.End_Time}</td> */}
        <td>{use.recurrence_pattern}</td>


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
        <title>Admin | Calendar</title>
      </Helmet>
      <Container>
        <div style={{ display: "flex", justifyContent: "center" }}>

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
            <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Calendar</h1>
          </div>
          <div >
            <Link to="/admin/addcalendaradmin">
              <Button style={{ marginRight: '.625rem', fontSize: '14px' }} variant="warning" className="btnnavbaradmin" >
                Add Events
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
                      <th>Event Name</th>
                      <th> Event Category</th>
                      <th>Event Subcategory</th>
                      <th>Event Start Date</th>
                      <th>Event End Date</th>
                      <th>Recurrence</th>
                    </tr>
                  )}
                </thead>
                <tbody>{renderTableRows()}</tbody>
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

export default Admincalendar;
