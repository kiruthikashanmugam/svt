
import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import Pagination from "../Pagination";
import axios from "axios";
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

function Newusers(props) {
  // api data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(15);

  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/user_currentmonth${query}`);
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

    return currentRecords.map((use) => (
      <tr key={use._id}  style={{ textAlign: "center" }} >
        <td style={{ lineheight: '20px', padding: '20px' }}>{id++}</td>
        <td style={{ lineheight: '20px', padding: '20px' }}>{use.First_name}</td>
        <td style={{ lineheight: '20px', padding: '20px' }}>{use.Mobile_Number}</td>
        <td style={{ lineheight: '20px', padding: '20px' }}>{use.email}</td>

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
        <title>Admin | NewUsers</title>
      </Helmet>
      <Container>
        <div >

        </div>

        <div className="flexbox-container" >
          <div >
          </div>
          <div>
            <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>New Users List</h1>
          </div>
          <div >
          </div>
        </div>
        <Row>
          <Col >
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <Table striped sm="6" responsive className="table-inside-card" >
                <thead>
                  {currentRecords.length === 0 && (
                    <tr>
                      <th style={{ textAlign: "center" }}>
                        No users found.
                      </th>
                    </tr>
                  )}
                  {currentRecords.length > 0 && (
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ lineheight: '20px', width: '25px' }}>S.NO</th>
                      <th style={{ lineheight: '20px' }}>Name</th>
                      <th style={{ lineheight: '20px' }}>Mobile Number</th>
                      <th style={{ lineheight: '20px' }}>Email</th>
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

export default Newusers;
