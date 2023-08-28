
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Calendar as BigCalendar, momentLocalizer } from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Modal} from 'react-bootstrap';
import { Row, Col, Table, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, useDispatch, useSelector } from 'react-redux';
import { actFetchProductsRequest, AddCart, IncreaseQuantity, DecreaseQuantity,DeleteCart } from '../../page/Addtocart/Actions/cartActions';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';


// Set the moment locale
moment.locale('en-GB');
const localizer = momentLocalizer(moment);


function Calender({ AddCart, items, IncreaseQuantity, DecreaseQuantity, DeleteCart, props }) {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { _products } = useSelector((state) => state._todoProduct);

  const navigate = useNavigate();
  let ListCart = [];
  let TotalCart = 0;

  Object.keys(items.Carts).forEach(function (item) {
    TotalCart += items.Carts[item].quantity * items.Carts[item].service_fees;
    ListCart.push(items.Carts[item]);
  });

  const handleData = (e, ListCart, carttotal) => {
    e.preventDefault();
    const cartId = localStorage.getItem('cartId') || uuidv4();
    const user_id = localStorage.getItem('user_id');

    const formDatas = [];
    console.log(ListCart);

    ListCart.forEach((item) => {
      const formData = new FormData();
      formData.append('_id', item._id);
      formData.append('service_category', item.service_category);
      formData.append('service_subcategory', item.service_subcategory);

      formData.append('service_name', item.service_name);
      formData.append('service_fees', item.service_fees);
      formData.append('quantity', item.quantity);

      formDatas.push(formData);

    });

    checkout(formDatas, cartId, user_id, carttotal);

  };

  const checkout = (formDatas, cartId, user_id, carttotal) => {
    const payload = formDatas.map((formData) => {
      const plainObject = {};
      for (const [key, value] of formData.entries()) {
        plainObject[key] = value;
      }
      return plainObject;
    });


    axios
      .post('https://svt.know3.com/api/add_order', payload, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          carttotal,
          cartId,
          user_id
        }
      })
      .then((response) => {
        if (response.data.trim() === 'Order created successfully') {
          navigate('/cart');
        }
        if (response.data.trim() === 'Failed to update order') {
          navigate('/cart');
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };




  useEffect(() => {
    fetchCalendarEvents();
    dispatch(actFetchProductsRequest());
  }, [dispatch]);

  const fetchCalendarEvents = () => {
    axios
      .get('https://svt.know3.com/api/calendar_events')
      .then((response) => {
        const formattedEvents = response.data.map((item) => ({
          id: item._id,
          title: `${item.Service_Name} - ${item.Start_Time}`,
          start: new Date(`${item.Pooja_Start_Date} ${item.Start_Time}`),
          end: new Date(`${item.Pooja_Start_Date} ${item.End_Time}`),
          data: item,
        }));
        setEvents(formattedEvents);
      })
      .catch((error) => {
        console.error('Error fetching calendar events:', error);
      });
  };



  const fetchData = (Service_Name) => {
    const encodedServiceName = encodeURIComponent(Service_Name);
    const url = `https://svt.know3.com/api/getalldates_events/${encodedServiceName}`;

    setIsLoading(true);

    axios
      .get(url)
      .then((response) => {
        const dataArray = Object.values(response.data); // Assuming the response is an object containing multiple items
        setData(dataArray);
        console.log(dataArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Failed to fetch data:', error);
        setIsLoading(false);
      });
  };


  const handleEventClick = (event) => {
    setSelectedEvent(event);
    fetchData(event.data.Service_Name);
  };

  const handleClose = () => {
    setSelectedEvent(null);
  };

  const handleAddToCart = (item) => {
    AddCart(item);

  };


  if (_products.length > 0) {
    return (
      <div>
        
        <div style={{ height: 700, marginTop: '40px' }}>
          <BigCalendar
            localizer={localizer}
            events={events}
            step={60}
            views={['month', 'week', 'day', 'agenda']}
            defaultDate={new Date()}
            popup={false}
            startAccessor="start"
            endAccessor="end"
            selectable={false}
            onSelectEvent={handleEventClick}
          />
        </div>
        <Modal   {...props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={selectedEvent !== null} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>View  Puja details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedEvent && (
              <div>
                <Row>
                  <Col>
                    <Row>
                      <Col>
                        <p><b>Service Name:</b> {selectedEvent.data.Service_Name}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><b>Category:</b> {selectedEvent.data.Category_Name}</p>
                      </Col>
                      <Col>
                        <p><b>Sub Category:</b> {selectedEvent.data.Sub_Category}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><b>Start Date:</b> {selectedEvent.data.Pooja_Start_Date}</p>
                      </Col>
                      <Col>
                        <p><b>End Date:</b> {selectedEvent.data.Pooja_End_Date}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><b>Start Time:</b> {selectedEvent.start.toString()}</p>
                      </Col>
                      <Col>
                        <p><b>End Time:</b> {selectedEvent.end.toString()}</p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><b>Recurrence Info:</b> {selectedEvent.data.recurrence_pattern}</p>
                      </Col>
                      <Col>
                        <p><b>Priest:</b></p>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <p><b>Venue: NA</b></p>
                      </Col>
                      <Col>
                        <p><b>Notes: NA</b></p>


                      </Col>
                    </Row>
                    <Row>

                      <Col>
                        <p><b>Secondary Priest:</b></p>
                      </Col>

                    </Row>

                  </Col>

                </Row>
                <Row>
                  <Col>
                    <Container>
                      <Table style={{ marginLeft: '0px' }}>
                        <thead>
                          <tr>

                            <th>Puja Start Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                            <th>
                              Add To Cart
                            </th>
                          </tr>
                        </thead>
                        <tbody>



                          {data.length > 0 ? (
                            data.map((item) => {

                              return (

                                <tr key={item._id}>
                                  <input type="hidden" value={item._id} />
                                  <td data-title="Product">
                                    <div class="sigma_cart-product-wrapper">
                                      <div class="sigma_cart-product-body">
                                        <h6> {item.Pooja_Start_Date}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td data-title="Product">
                                    <div class="sigma_cart-product-wrapper">
                                      <div class="sigma_cart-product-body">
                                        <h6> {item.Start_Time}</h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td data-title="Product">
                                    <div class="sigma_cart-product-wrapper">
                                      <div class="sigma_cart-product-body">
                                        <h6> {item.End_Time}</h6>
                                      </div>
                                    </div>
                                  </td>

                                  <td data-title="Total"><button class="btn" style={{ backgroundColor: "#FFE569" }} onClick={() => handleAddToCart(item, localStorage.getItem('cartId'))}>Add to cart</button></td>

                                </tr>
                              );
                            })
                          ) : (
                            <tr>
                              <td colSpan="5">No data available</td>
                            </tr>
                          )}
                        </tbody>
                      </Table>
                    </Container>

                  </Col>

                  <Col lg={5}>
                    

                        <div class="post-detail-wrapper" style={{ padding: "15px", backgroundColor: "#f7f0f4", border: "none" }}>
                          <h5 style={{ textAlign: 'center', fontSize: '18px' }}>ORDER SUMMARY</h5>
                          {ListCart.length > 0 ? (
                            ListCart.map((item, key) => (
                              <div className="sigma_cart-product-body" key={key}>
                                <input type="hidden" name="_id" value={item._id} style={styles.input} />
                                <input type="hidden" name="service_subcategory" value={item.service_subcategory} style={styles.input} />


                                <input type="hidden" name="service_category" value={item.service_category} style={styles.input} />
                                <div>

                                  <input type="text" name="service_name" value={item.service_name} style={styles.input} readOnly />
                                  <br></br>
                                </div>
                                <div style={styles.cartItemInfo}>
                                  <span className="btn btn-primary" style={{ margin: '4px', color: '#4a4840', background: '#dbd0d0', border: 'none', lineHeight: '10px', fontSize: '13px', borderRadius: '0' }} onClick={() => DecreaseQuantity(key)}>
                                    -
                                  </span>
                                  <input
                                    type="number"
                                    name="quantity"
                                    value={item.quantity}
                                    style={{ ...styles.quantityInput, textAlign: 'center', fontSize: '12px', width: '44px' }}
                                    contentEditable
                                  />
                                  <span className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '4px', color: '#4a4840', background: '#dbd0d0', border: "none", lineHeight: '10px', fontSize: '13px', width: '30px', borderRadius: '0' }} onClick={() => IncreaseQuantity(key)}>
                                    +
                                  </span>
                                  <span style={{ marginLeft: '7px', fontSize: '13px' }}>$</span>
                                  <input type="text" name="service_fees" value={item.service_fees} style={{ ...styles.input, marginLeft: '1px' }} readOnly />
                                  <span class="material-symbols-outlined" style={{ fontSize: '18px', cursor: "default" }} onClick={() => DeleteCart(key)}>
                                    delete
                                  </span>
                                </div>
                                <hr style={{margin:"13px"}}/>
                              </div>
                             
                            ))
                          ) : (
                            <span style={{ textAlign: 'center', marginTop: '3px' }}>No items in the cart</span>
                          )}

                          <div style={styles.totalCart}>

                            <span>
                              {TotalCart !== 0 && (
                                <div style={styles.totalCart}>
                                  <span>
                                    Total Cart Value:{' '}
                                    <input
                                      type="text"
                                      name="carttotal[]"
                                      value={Number(TotalCart).toLocaleString('en-US')}
                                      style={{
                                        border: 'none', outline: 'none', width: '20%', backgroundColor: "#f7f0f4", color: "#db4242",
                                        fontWeight: "700"
                                      }}
                                      readOnly
                                    />
                                  </span>
                                
                                </div>
                              )}

                            </span>

                          </div>
                        </div>
                     
                       
                     


                  </Col>
                </Row>



              </div>
            )}
          </Modal.Body>
          <Modal.Footer>
            {/* <Button variant="secondary" onClick={handleClose}>
              Close
            </Button> */}
            <a class="sigma_btn-custom secondary"  style={{padding:"10px",backgroundColor:"#a19090",marginRight:"20px"}} onClick={handleClose} >Close</a>
            <a class="sigma_btn-custom secondary" style={{padding:"10px",backgroundColor:'#7E4555'}} onClick={(e) => handleData(e, ListCart, TotalCart)} >Checkout</a>

         
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}



const mapStateToProps = (state) => {
  return {
    items: state._todoProduct,
  };
};

const styles = {
  cartItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  cartItemInfo: {
    display: 'flex',
    alignItems: 'center',
  },
  input: {
    border: 'none',
    outline: 'none',
    width: '100%',
    marginRight: '10px',
    backgroundColor: "#f7f0f4",
    color: "#db4242",
    fontFamily: "Poppins",
    lineHeight: "1.2",
    fontWeight: "700",
  },
  quantityInput: {
    width: '15%',
  },
  multiplier: {
    marginRight: '10px',
    marginLeft: '10px',
  },
  totalCart: {
    textAlign: 'right',
    marginTop: '10px',
    backgroundColor: "#f7f0f4"
  },
};

export default connect(mapStateToProps, { actFetchProductsRequest, AddCart, IncreaseQuantity, DecreaseQuantity, DeleteCart })(Calender);

