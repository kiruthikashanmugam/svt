
import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import Pagination from "../Pagination";
import axios from "axios";
import { Helmet } from "react-helmet";
import loader from '../../../../Loader.gif';

function ActiveUsers(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errors, setErrors] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(15);

    useEffect(() => {
        searchdata();
    }, []);

    async function searchdata(query = '') {
        try {
            const response = await axios
                .get(`https://svt.know3.com/api/active_currentmonth`);
            // .then((response) => {
            console.log("check active users list   ", response.data)

            // });
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
            <tr key={use._id}  style={{ textAlign: "center" }}>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{id++}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.First_name}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.Mobile_Number}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.email}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.Address}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.City}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}> {use.State}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.Country}</td>
                <td style={{ padding: '20px', lineHeight: '20px' }}>{use.Zip_Code}</td>

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
                <title>Admin | ActiveUsers</title>
            </Helmet>
            <Container>

                <div className="flexbox-container" >
                    <div >
                    </div>
                    <div>
                        <h1 style={{ paddingRight: '10px', paddingTop: '5px', fontSize: '20px', fontWeight: 'bold', color: '#000000' }}>Active Users</h1>
                    </div>
                    <div >
                    </div>
                </div>

                <Row>
                    <Col sm='12'>
                        <Card style={{ marginTop: '20px', padding: '20px' }}>
                            <Table striped sm="6" responsive className="table-inside-card">
                                <thead>
                                    {currentRecords.length === 0 && (
                                        <tr>
                                            <th colSpan="13" style={{ textAlign: "center", padding: '20px' }}>
                                                No Active Users found.
                                            </th>
                                        </tr>
                                    )}
                                    {currentRecords.length > 0 && (
                                        <tr style={{ textAlign: "center" }}>
                                            <th style={{ lineHeight: '20px' }}>S.No</th>
                                            <th style={{ lineHeight: '20px' }}>Name</th>
                                            <th style={{ lineHeight: '20px' }}>Mobile Number</th>
                                            <th style={{ lineHeight: '20px' }}>Email</th>
                                            <th style={{ lineHeight: '20px' }}>Address</th>
                                            <th style={{ lineHeight: '20px' }}>City</th>
                                            <th style={{ lineHeight: '20px' }}>State</th>
                                            <th style={{ lineHeight: '20px' }}>Country</th>
                                            <th style={{ lineHeight: '20px' }}>Zip Code</th>
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

export default ActiveUsers;
