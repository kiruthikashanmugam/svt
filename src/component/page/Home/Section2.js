import React, { useEffect, useState, useRef } from 'react';
import Isotope from 'isotope-layout';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import moment from 'moment';
import { Col, Row, Form, Container } from 'react-bootstrap';
import { FcCalendar } from 'react-icons/fc';

function Section2() {
  const [data, setData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('*');

  const isotopeRef = useRef(null);
  const [events, setEvents] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState('today');

  useEffect(() => {
    fetchData();
  }, []);
  
  useEffect(() => {
    setupIsotope();
  }, []);

  // useEffect(() => {
  //   setupIsotope();
  // }, [data]);

  useEffect(() => {
    fetchEvents();
  }, [searchCriteria]);
  const portfolioGridRef = React.useRef(null);

  const fetchData = async () => {
    try {
      const response = await fetch('https://svt.know3.com/api/pooja_cat');
      const jsonData = await response.json();
      setData(jsonData);
      console.log(jsonData);
      setSelectedCategory(jsonData.length > 0 ? jsonData[0].service_category : '*');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const setupIsotope = () => {
    const $portfolioGrid = portfolioGridRef.current;
    isotopeRef.current = new Isotope($portfolioGrid, {
      itemSelector: '.col-lg-4',
      layoutMode: 'fitRows',
    });
  };
  function limitChars(str, limit) {
    if (str && str.length > limit) {
      return str.substring(0, limit) + '...';
    }
    return str;
  }

  const handleFilterClick = (event) => {
    const filterValue = event.currentTarget.getAttribute('data-filter');
    isotopeRef.current.arrange({ filter: filterValue });
    setSelectedCategory(filterValue);
  };

  const fetchEvents = () => {
    let startDate, endDate;

    if (searchCriteria === 'week') {
      startDate = moment().startOf('day');
      endDate = moment().endOf('day');
    } else if (searchCriteria === 'today') {
      startDate = moment().startOf('week');
      endDate = moment().endOf('week');
    } else if (searchCriteria === 'next30days') {
      startDate = moment();
      endDate = moment().add(30, 'days');
    }

    fetch('https://svt.know3.com/api/calendar_events')
      .then((response) => response.json())
      .then((data) => {
        const filteredEvents = data.filter(
          (item) =>
            moment(`${item.Pooja_Start_Date} ${item.Start_Time}`, 'YYYY-MM-DD HH:mm').isBetween(
              startDate,
              endDate,
              null,
              '[]'
            ) && item.recurrence_pattern === 'weekly'
        );

        setEvents(filteredEvents);
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
      });
  };

  const handleSearchCriteriaChange = (e) => {
    setSearchCriteria(e.target.value);
  };

  const filteredData = selectedCategory === '*' ? data : data.filter((category) => category.service_category === selectedCategory);

  return (
    <div>
      <div className="section section-padding" style={{ background: "rgb(254 255 231)"}}>
        <div className="container">
          <div className="row">
            <div className=" col-lg-8 col-md-6 puja"  >
              <Container>
                <div className="section-title text-start">
                  {/* <p className="subtitle">Book a</p> */}
                  <h4 className="title">Puja</h4>
                </div>

                <div className="filter-items">
                  {/* <h5
                  className={`portfolio-trigger ${selectedCategory === '*' ? 'active' : ''}`}
                  data-filter="*"
                  onClick={handleFilterClick}
                >
                  All
                </h5> */}
                  {data.map((category) => (
                    <h5
                      key={category.service_category}
                      className={`portfolio-trigger ${selectedCategory === category.service_category ? 'active' : ''}`}
                      data-filter={category.service_category}
                      onClick={handleFilterClick}
                    >
                      {category.service_category}
                    </h5>
                  ))}
                </div>

                <div className="portfolio-filter row  custom-height" style={{height:"0px"}} ref={portfolioGridRef}>
                  {filteredData.map((category) => (
                    <React.Fragment key={category.service_category}>
                      {category.service_subcategories.map((subcategory, subIndex) => (
                        <Col lg={4} key={subIndex} className="portfolio-item">
                          <div  className={`sigma_portfolio-item style-2 ${subcategory.subcategory}`}>
                          <Card className='porfolioimage' style={{width:"100%",height:"200px",maxWidth:"100%",backgroundColor:"#fff"}}>
                          <img src={`https://svt.know3.com/images/${subcategory.images[0]}`} alt="portfolio"  />

                         
                         
                            <Link to={`brick/${category.service_category}/${subcategory.subcategory}`}>
                              <div className="sigma_portfolio-item-content">
                                <div className="sigma_portfolio-item-content-inner">
                                  <h5>{limitChars(subcategory.subcategory, 20)}</h5>
                                </div>
                                <i className="far fa-arrow-right"></i>
                              </div>
                            </Link>
                            </Card>
                          </div>
                        </Col>
                      ))}
                    </React.Fragment>
                  ))}


                </div>

              </Container>

            </div>
            <div className=" col-lg-4 col-md-6"   >
              <div className="section-title text-start">
                {/* <p className="subtitle">Pooja</p> */}
                <h4 className="title">Calendar</h4>

                <Card classname="car-image" style={{ width: '100%', padding: '16px', height: '532px', background: '#fff5eb', backgroundBlendMode: 'lighten', border: 'none', overflowX: 'hidden' }}>
                  <Card.Title>
                    <Row>
                      {/* <Col lg={1} style={{ paddingTop: '7px' }}>
                        <span class="material-symbols-outlined">calendar_month</span>
                      </Col> */}
                      <Col lg={6} style={{ paddingTop: '5px' }}>
                        <span style={{ fontSize: '15px' }}>Weekly Schedule</span>
                      </Col>
                      <Col lg={6} >
                        <Form.Select aria-label="Default select example" onChange={handleSearchCriteriaChange} value={searchCriteria}>
                          <option value="today">Week</option>
                          <option value="week">Today</option>
                          <option value="next30days">Next 30 Days</option>
                        </Form.Select>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FcCalendar />
                        <Link to="/calendarview">
                          <small style={{ fontSize: '12px', paddingLeft: '10px', fill: 'blue' }}>Calendar View</small>
                        </Link>
                      </Col>
                    </Row>
                  </Card.Title>
                  <Card className="card-overflow">
                    <Card.Body>
                      <Card.Title className="cal-div">
                        {events.map((event) => (
                          <div key={event._id}>
                            <Row>
                              <Col>
                                <h6 style={{ backgroundColor: 'rgb(223 239 225)', padding: '14px' }}>
                                  {event.Pooja_Start_Date}
                                </h6>
                              </Col>
                            </Row>
                            <Row>
                              <Col>
                                <p className="calendar-name">{event.Service_Name}</p>
                              </Col>
                            </Row>
                            <Row>
                              <Col lg={9}>
                                <p className="calendar-name">
                                  {event.Start_Time}-{event.End_Time}
                                </p>
                              </Col>
                              <Col lg={3}>
                                <p className="calendar-name">
                                  <span class="material-symbols-outlined">perm_contact_calendar</span>
                                </p>
                              </Col>
                            </Row>
                          </div>
                        ))}
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Section2;

