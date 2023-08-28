

import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import axios from "axios";
import Pagination from "../../admin/pages/Pagination";
import { FaSearch } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { RiDashboardFill } from 'react-icons/ri';

import loader from '../../../Loader.gif';


function Donationreport1(props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 15;

  useEffect(() => {
    searchdata();
  }, []);

  async function searchdata(query = '') {
    try {
      const response = await axios.get(`https://svt.know3.com/api/view_donationuser/${localStorage.getItem('user_id')}?q=${query}`);
      console.log(response.data);
      const responseData = response.data;
      const filteredData = responseData.map((record) => {
        return {
          order_id: record.order_id,
          product_name: record.matched_products[0].product_name,
          product_category: record.matched_products[0].product_category,
          product_fees: record.matched_products[0].product_fees,
          cart_total: record.cart_total,
          status: record.status
        };
      });
      setData(filteredData);
      console.log(filteredData);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{
    setLoading(false)
  },[])

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
    searchdata(event.target.value);
  };

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(data.length / recordsPerPage);

  const renderTableRows = () => {

    var id = 1;
    const filteredRecords = currentRecords.filter((record) => {
      return (
        (record.product_name &&
          record.product_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.product_category &&
          record.product_category.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.product_fees &&
          record.product_fees.toLowerCase().includes(searchQuery.toLowerCase())) ||

        (record.Status &&
          record.Status.toLowerCase().includes(searchQuery.toLowerCase()))

      );
    });
    return filteredRecords.map((use) => (
      <tr key={use._id}>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{id++}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.order_id}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.product_name}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.product_category}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.product_fees}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.cart_total}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.status}</td>

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
  const flexContainer = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '20px 15px 5px 15px',
    backgroundColor: '#7E4555'
  };
  return (
    <div>
         <Link to="/user/dashboard">
        <div style={flexContainer}>
          <h5 style={{ flex: 1, color: 'white' }}> <RiDashboardFill /> Dashboard</h5>
          <h5 style={{ flex: 1, color: 'white', textAlign: 'center', }}>Donation Report</h5>
          <h5 style={{ flex: 1, color: 'white' }}></h5>
        </div>
      </Link>
      <Container>
   
        <Row>
          <Col xs={1}>
            <div className="search-input-container">
              <FaSearch className="search-icon" />

              <input
                type="text"
                onChange={handleSearchInputChange}
                className="search-input"
                placeholder="Search..."
                style={{ marginTop: "20px", marginBottom: "20px", height: "36px", marginLeft: "13px", width: "118px", paddingLeft: "13px !important" }}
              />
            </div>
          </Col>
        </Row>
        <Row>
          <Col sm='12'>
            <Card style={{ marginTop: '20px', padding: '20px' }}>
              <Table striped sm="6" responsive style={{ marginTop: '10px' }}>
                <thead>
                  {currentRecords.length === 0 ? (
                    <tr>
                      <th colSpan="8" style={{ textAlign: "center" }}>
                        No users found.
                      </th>
                    </tr>
                  ) : (
                    <tr style={{ textAlign: "center" }}>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>S.No</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>order Id</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>product Name</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>product Category</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>product Fees</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>cart total</th>

                      <th style={{ textAlign: "center", lineHeight: '48px' }}>Status</th>
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

export default Donationreport1;
