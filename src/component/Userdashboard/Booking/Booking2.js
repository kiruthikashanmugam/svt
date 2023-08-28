// import React, { useState, useEffect } from "react";
// import { Table, Container, Col, Row, Card } from 'reactstrap';
// import axios from "axios";
// import Pagination from "../../admin/pages/Pagination";
// import { FaSearch } from 'react-icons/fa';

// function Booking2(props) {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [errors, setErrors] = useState(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 3;

//   useEffect(() => {
//     searchdata();
//   }, []);

//   async function searchdata(query = '') {
//     try {
//       const response = await axios.get(`https://svt.know3.com/api/poojareq_user/${localStorage.getItem('user_id')},1?q=${query}`);
//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching data: ", error);
//       setErrors(error);
//     } finally {
//       setLoading(false);
//     }
//   }

//   const handleSearchInputChange = (event) => {
//     setSearchQuery(event.target.value);
//     searchdata(event.target.value);
//   };

//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = data.slice(indexOfFirstRecord, indexOfLastRecord);
//   const nPages = Math.ceil(data.length / recordsPerPage);

//   const renderTableRows = () => {
//     return currentRecords.map((record, index) => (
//       <tr key={record._id}>
//         <td>{index + 1}</td>
//         <td>{record.Pooja_Start_Date}</td>
//         <td>{record.Pooja_Start_Time}</td>
//         <td>{record.Service_Name}</td>
//         <td>{record.Service_Type}</td>
//         <td>{record.Status}</td>
//         <td>{record.Country}</td>
//       </tr>
//     ));
//   };

//   if (loading) {
//     return (
//       <div className="loader">
//         <div className="loader-inner">
//           <div className="loader-line-wrap">
//             <div className="loader-line"></div>
//           </div>
//           <div className="loader-line-wrap">
//             <div className="loader-line"></div>
//           </div>
//           <div className="loader-line-wrap">
//             <div className="loader-line"></div>
//           </div>
//           <div className="loader-line-wrap">
//             <div className="loader-line"></div>
//           </div>
//           <div className="loader-line-wrap">
//             <div className="loader-line"></div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   if (errors) {
//     return "Error!";
//   }

//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col xs={1}>
//             <div className="search-input-container">
//               <FaSearch className="search-icon" />
//               <input
//                 type="text"
//                 onChange={handleSearchInputChange}
//                 className="search-input"
//                 placeholder="Search..."
//                 style={{ marginTop: "20px", marginBottom: "20px", height: "36px", width: "118px", paddingLeft: "13px !important" }}
//               />
//             </div>
//           </Col>
//         </Row>
//         <Row>
//           <Col sm='12'>
//             <Card style={{ marginTop: '20px', padding: '20px' }}>
//               <Table striped sm="6" responsive>
//                 <thead>
//                   {currentRecords.length === 0 ? (
//                     <tr>
//                       <th colSpan="8" style={{ textAlign: "center" }}>
//                         No users found.
//                       </th>
//                     </tr>
//                   ) : (
//                     <tr style={{ textAlign: "center" }}>
//                       <th>S.No</th>
//                       <th>Date</th>
//                       <th>Time</th>
//                       <th>Service</th>
//                       <th>Type</th>
//                       <th>Status</th>
//                     </tr>
//                   )}
//                 </thead>
//                 <tbody>{renderTableRows()}</tbody>
//               </Table>
//             </Card>
//           </Col>
//         </Row>
//         <Pagination
//           nPages={nPages}
//           currentPage={currentPage}
//           setCurrentPage={setCurrentPage}
//         />
//       </Container>
//     </div>
//   );
// }

// export default Booking2;


import React, { useState, useEffect } from "react";
import { Table, Container, Col, Row, Card } from 'reactstrap';
import axios from "axios";
import Pagination from "../../admin/pages/Pagination";
import { FaSearch } from 'react-icons/fa';
import loader from '../../../Loader.gif';


function Booking2(props) {
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
      const response = await axios.get(`https://svt.know3.com/api/poojareq_user/${localStorage.getItem('user_id')},1?q=${query}`);
      const filteredData = response.data.filter((record) => {
        return (
          (record.Service_Name &&
            record.Service_Name.toLowerCase().includes(query.toLowerCase())) ||
          (record.Service_Type &&
            record.Service_Type.toLowerCase().includes(query.toLowerCase())) ||
          (record.Country &&
            record.Country.toLowerCase().includes(query.toLowerCase())) ||
          (record.Status &&
            record.Status.toLowerCase().includes(query.toLowerCase()))
        );
      });
      setData(filteredData);
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
        (record.Service_Name &&
          record.Service_Name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Service_Type &&
          record.Service_Type.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Country &&
          record.Country.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (record.Status &&
          record.Status.toLowerCase().includes(searchQuery.toLowerCase()))

      );
    });
    return filteredRecords.map((use) => (
      <tr key={use._id}>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{id++}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.Pooja_Start_Date}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.Pooja_Start_Time}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.Service_Name}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.Service_Type}</td>
        <td style={{ textAlign: "center", lineHeight: '48px' }}>{use.Status}</td>

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
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>Date</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>Time</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>Service</th>
                      <th style={{ textAlign: "center", lineHeight: '48px' }}>Type</th>
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

export default Booking2;
