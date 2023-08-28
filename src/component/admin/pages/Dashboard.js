
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import { Row, Col, Container } from 'reactstrap';
import Card from 'react-bootstrap/Card';
import { CategoryScale } from 'chart.js';
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import loader from '../../../Loader.gif';



Chart.register(CategoryScale);




function ErrorBoundaryFallbackComponent() {
  return <div>Oops! Something went wrong while rendering the chart.</div>;
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }


  static getDerivedStateFromError(error) {
    return { hasError: true };
  }


  render() {
    if (this.state.hasError) {
      return <ErrorBoundaryFallbackComponent />;
    }


    return this.props.children;
  }
}


function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [chartDatapayment, setChartDatapayment] = useState(null);

  useEffect(() => {
    fetchData();
    getData();
    fetchDatapayment();

  }, []);


  //first graph
  async function fetchData() {
    try {
      const response = await axios.get('https://svt.know3.com/api/user_graph');
      setChartData({
        labels: Object.keys(response.data),
        datasets: [
          {
            label: 'User Count',
            data: Object.values(response.data),
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data: ', error);
      setError(error.message);
    }
  }


  const options = {
    scales: {
      x: {
        type: 'category',
      },
      y: {


        ticks: {
          beginAtZero: true,
          min: 0,
          max: 100,
          stepSize: 100,
        },
        title: {
          display: true,
          text: 'User Count',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };


  //second graph


  async function fetchDatapayment() {
    try {
      const response = await axios.get('https://svt.know3.com/api/payment_monthwise');
      setChartDatapayment({
        labels: Object.keys(response.data),
        datasets: [
          {
            label: 'Payment',
            data: Object.values(response.data),
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
          },
        ],
      });
    } catch (error) {
      console.error('Error fetching chart data: ', error);
      setError(error.message);
    }
  }


  const optionsdata = {
    scales: {
      x: {
        type: 'category',
      },
      y: {


        ticks: {
          beginAtZero: true,
          min: 0,
          max: 1000,
          stepSize: 50,
        },
        title: {
          display: true,
          text: ' Payment',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
    },
  };




  async function getData() {
    try {
      const response = await axios.get('https://svt.know3.com/api/Kpi_user');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data: ', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }


  if (loading) {
    return (
      <div>
        <div style={{width:'100',textAlign:'center',marginTop:'300px'}}>
          <img src={loader} alt='Loading Please Wait...'></img>
          </div>
      </div>
    );
  }


  if (error) {
    return <div>Error: {error}</div>;
  }




  return (
    <div>

      <Helmet>
        <title>Admin | Dashboard</title>
      </Helmet>

      {data && (
        <Container>
          <Row>
            <Col class="col-lg mb-4 col-sm-6 col-md-6">
              <Card className='dashboard-admin' >
                <Link to={"/admin/Newusers"} style={{ color: 'black' }}>
                  <Card.Body>
                  <Row>
                    <Col >
                      <h4 style={{ color: 'black', fontWeight: 'normal' }} >{data.newuser_count}</h4>
                      </Col>
                      <Col  >
                      <div className="icon-design">
                       
                      <span
                            className="material-symbols-outlined"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '35px',
                            }}
                          >
                         person
                       </span>
                       </div>
                   
                   </Col>

                    </Row>
                    <Row>
                      <Col  >
                        <h6 style={{ color: 'gray', fontWeight: 'normal' }} className="user-admin">New Users</h6>
                      </Col>
                     
                    </Row>
                    <Row>
                   
                  
                   
                      
                    </Row>
                 
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col class="col-lg mb-4 col-sm-6 col-md-6">
              <Card className='dashboard-admin'>
                <Link to={"/admin/Activeusers"} style={{ color: 'black' }}>
                  <Card.Body>
                    <Row>
                      <Col>
                      <h3 style={{ color: 'black', fontWeight: 'normal' }}>{data.activeuser_count}</h3>
                      </Col>
                      <Col >
                        <div className="icon-design">
                          <span
                            className="material-symbols-outlined"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '35px',
                            }}
                          >
                            group
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <h6 style={{ color: 'gray', fontWeight: 'normal' }} className="user-admin">Active Users</h6>
              
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col class="col-lg mb-4 col-sm-6 col-md-6">
              <Card className='dashboard-admin'>
                <Card.Body>
                  <Link style={{ color: '#000000' }} to='/admin/visitors'>
                    <Row>
                      <Col  >
                      <h3 style={{ color: 'black', fontWeight: 'normal' }} >{data.visitor_count}</h3>
                       
                      </Col>
                      <Col >
                        <div className="icon-design">
                          <span
                            className="material-symbols-outlined"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '35px',
                              paddingTop: "2px",
                            }}
                          >
                            temple_hindu
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <h6 style={{ color: 'gray', fontWeight: 'normal' }} className="user-admin">Visitors</h6>
                
                    </Row>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
            <Col class="col-lg mb-4 col-sm-6 col-md-6">
              <Card className='dashboard-admin'>
                <Link to={"/admin/Payments"} style={{ color: 'black' }}>
                  <Card.Body>
                    <Row>
                      <Col  >
                      <h3 style={{ color: 'black', fontWeight: 'normal' }}>{data.payment}</h3>
                      
                      </Col>
                      <Col  >
                        <div className="icon-design">
                          <span
                            className="material-symbols-outlined"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '35px',
                              paddingTop: "2px",
                            }}
                          >
                            attach_money
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <h6 style={{ color: 'gray', fontWeight: 'normal' }} className="user-admin">Payment</h6>
               
                    </Row>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            <Col class="col-lg mb-4 col-sm-6 col-md-6">
              <Card className='dashboard-admin'>
                <Card.Body>
                  <Link style={{ color: '#000000' }} to='/admin/pujaslist'>
                    <Row>
                      <Col >
                      <h3 style={{ color: 'black', fontWeight: 'normal' }}>{data.pooja_count}</h3>
                     
                      </Col>
                      <Col >
                        <div className="icon-design">
                          <span
                            className="material-symbols-outlined"
                            style={{
                              display: 'flex',
                              justifyContent: 'center',
                              fontSize: '35px',
                              paddingTop: "2px",
                            }}
                          >
                            folded_hands
                          </span>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                    <h6 style={{ color: 'gray', fontWeight: 'normal' }} className="user-admin">Pujas</h6>
                      
                    </Row>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      )}


      <Container style={{ marginTop: "100px" }}>


        <Row>
          <Col lg={6}>
            < Card>
              <ErrorBoundary>
                {chartData ? (
                  <Line data={chartData} options={options} />
                ) : (
                  <div>Loading chart data...</div>
                )}
              </ErrorBoundary>
            </Card>
          </Col>
          <Col lg={6}>
            <Card>
              <ErrorBoundary>
                {chartDatapayment ? (
                  <Line data={chartDatapayment} options={optionsdata} />
                ) : (
                  <div>Loading chart data...</div>
                )}
              </ErrorBoundary>



            </Card>

          </Col>
        </Row>




      </Container>


    </div>
  );
}


export default Dashboard;

