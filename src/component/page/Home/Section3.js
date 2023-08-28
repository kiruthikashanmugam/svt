// import { Link } from 'react-router-dom';
// import React, { useState, useEffect, useRef } from 'react';
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
// import group1 from "../../assets/img/about-group1/1.jpg";
// import axios from 'axios';
// import moment from "moment";
// import Table from 'react-bootstrap/Table';

// function Section3() {
//   const [images, setImages] = useState([]);
//   const [events,setEvents]=useState([]);
//   const sliderRef = useRef(null); // Create a reference to the slider component


//   useEffect(() => {
//     fetch('https://svt.know3.com/api/bannerview')
//       .then(response => response.json())
//       .then(data => {
//         // Filter the images based on the start date and end date
//         const filteredImages = data.filter(image =>
//           isWithinValidDateRange(image.event_startdate, image.event_enddate)

//         );

//         setImages(filteredImages);

//       })
//       .catch(error => console.error('Error fetching images:', error));


//       const fetchData = async () => {
//         try {
//           const response = await axios.get(
//             "https://svt.know3.com/api/view_eventinfo"
//           );

//           // Get the current date
//           const currentDate = new Date();

//           const filteredEvents = response.data.filter((event) => {
//             const displayStartDate = moment(event.displaystartdate, "D.M.YYYY");
//             const displayEndDate = moment(event.display_enddate, "D.M.YYYY");

//             const currentDateMoment = moment(currentDate);

//             return currentDateMoment.isBetween(displayStartDate, displayEndDate, null, '[]');
//           });
//           setEvents(filteredEvents);
//           console.log(filteredEvents);

//         } catch (error) {
//           console.log(error);
//         }
//       };

//       fetchData();
//   }, []);

//   const isWithinValidDateRange = (startDate, endDate) => {
//     // Check if the start date and end date are valid
//     return startDate && endDate && new Date(startDate) <= new Date(endDate);

//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplaySpeed: 3000,
//     autoplay: true, // Add this line to enable autoplay
//     beforeChange: (currentSlide, nextSlide) => {
//       // Pause the autoplay when the dots are clicked
//       if (currentSlide !== nextSlide) {
//         sliderRef.current.slickPause();
//       }
//     },
//     afterChange: () => {
//       // Resume autoplay after 3 seconds
//       setTimeout(() => {
//         sliderRef.current.slickPlay();
//       }, 3000);
//     }
//   };

//   const handleImageClick = () => {
//     // Move the slider to the next slide when an image is clicked
//     sliderRef.current.slickNext();
//   };


//   return (
//     <div>
//       <section className="section  light-bg" style={{ backgroundColor: "rgb(241, 194, 123)",paddingBottom:"0px" }}>
//         <div className="container">
//           <div className="row ">

//             <div className="col-lg-6 col-md-7 mb-lg-30">
//               <div >

//                 <div>

//                   {images.length > 0 ? (
//                     <Slider {...settings} ref={sliderRef}>
//                       {images.map(image => (
//                         <div key={image._id} onClick={handleImageClick}>
//                           <div className="section-title mb-0 text-start" >
//                             <h5 className="title" style={{ marginBottom: "31px" }}>Sponsor the {image.event_name} </h5>
//                           </div >
//                           <div style={{textAlign:"center"}}>
//                           <img
//                             src={`https://svt.know3.com/images/${image.photo}`}
//                             style={{ width: "85%", height: "361px" }}
//                             alt={image.event_name}
//                           />

//                           </div>

//                         </div>
//                       ))}
//                     </Slider>
//                   ) : (
//                     <img src={group1} style={{ width: "85%", height: "361px",marginBottom:"100px" }} alt="about" />
//                   )}


//                 </div>

//               </div>





//             </div>
//             <div className="col-lg-6 col-md-5">
//               <div className="me-lg-30 post-detail-wrapper" style={{ backgroundColor: "rgb(254 255 231)", border: "none" }}>
//                 <div className="section-title mb-0 text-start">
//                   <h4 className="title" style={{ marginBottom: "20px" }}>Upcoming Events</h4>
//                 </div>
//                 <Table  striped bordered responsive size="sm">
//                   <thead>
//                     <tr>
//                       <th>Date</th>
//                       <th>Event Info</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     {events.length>0?(
//                        events.map((event) => (

//                         <tr>
//                           <td>{event.displaystartdate}-{event.display_enddate}</td>
//                           <td><Link to="/event">{event.event_name}</Link></td>
//                         </tr>
//                            ))

//                     ):(
//                       <tr>
//                       <td></td>
//                       <td><Link to="/category">Sponsor a Brick</Link></td>
//                     </tr>

//                     )}

//                   </tbody>
//                 </Table>
//                 <p className="blockquote bg-transparent">We are Hindus who believe in Lord Rama and Vishnu Deva.</p>
//                 <Link to="/event" className="sigma_btn-custom light" style={{ backgroundColor: "#CC7351", color: "white" }}>Sponsor Now<i className="far fa-arrow-right"></i></Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// export default Section3;





import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import Carousel from 'react-bootstrap/Carousel';
import group1 from "../../assets/img/about-group1/1.jpg";
import axios from 'axios';
import moment from "moment";
import Table from 'react-bootstrap/Table';

function Section3() {
  const [images, setImages] = useState([]);
  const [events, setEvents] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setActiveIndex(selectedIndex);
  };

  // Set the interval (in milliseconds) for auto-sliding
  const autoSlideInterval = 5000; // Change this value as per your requirement

  useEffect(() => {
    fetch('https://svt.know3.com/api/bannerview')
      .then(response => response.json())
      .then(data => {
        // Filter the images based on the start date and end date
        const filteredImages = data.filter(image =>
          isWithinValidDateRange(image.event_startdate, image.event_enddate)

        );

        setImages(filteredImages);

      })
      .catch(error => console.error('Error fetching images:', error));


    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://svt.know3.com/api/view_eventinfo"
        );

        // Get the current date
        const currentDate = new Date();

        const filteredEvents = response.data.filter((event) => {
          const displayStartDate = moment(event.displaystartdate, "D.M.YYYY");
          const displayEndDate = moment(event.display_enddate, "D.M.YYYY");

          const currentDateMoment = moment(currentDate);

          return currentDateMoment.isBetween(displayStartDate, displayEndDate, null, '[]');
        });
        setEvents(filteredEvents);
        console.log(filteredEvents);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isWithinValidDateRange = (startDate, endDate) => {
    // Check if the start date and end date are valid
    return startDate && endDate && new Date(startDate) <= new Date(endDate);

  };



  return (
    <div>
      <section className="section  light-bg" style={{ backgroundColor: "rgb(241, 194, 123)", paddingBottom: "0px" }}>
        <div className="container">
          <div className="row " style={{paddingBottom:"75px"}}>

            <div className="col-lg-6 col-md-7 mb-lg-30">
              <div >

                <div>
                {images.length > 0 ? (
                    <Carousel activeIndex={activeIndex} onSelect={handleSelect} interval={autoSlideInterval}>
                      {images.map(image => (
                        <Carousel.Item key={image._id}>
                          <div className="section-title mb-0 text-start">
                            <h5 className="title" style={{ marginBottom: "31px" }}>Sponsor the {image.event_name} </h5>
                          </div>
                          <div >
                            <img
                              src={`https://svt.know3.com/images/${image.photo}`}
                              style={{ width: "85%", height: "321px",marginBottom:"100px" }}
                              alt={image.event_name}
                            />
                          </div>
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  ) : (
                    <img src={group1} style={{ width: "85%", height: "361px", marginBottom: "100px" }} alt="about" />
                  )}


                </div>

              </div>





            </div>
            <div className="col-lg-6 col-md-5">
              <div className="me-lg-30 post-detail-wrapper" style={{ backgroundColor: "rgb(254 255 231)", border: "none" }}>
                <div className="section-title mb-0 text-start">
                  <h4 className="title" style={{ marginBottom: "20px" }}>Upcoming Events</h4>
                </div>
                <Table striped bordered responsive size="sm">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Event Info</th>
                    </tr>
                  </thead>
                  <tbody>
                    {events.length > 0 ? (
                      events.map((event) => (

                        <tr>
                          <td>{event.displaystartdate}-{event.display_enddate}</td>
                          <td><Link to="/event">{event.event_name}</Link></td>
                        </tr>
                      ))

                    ) : (
                      <tr>
                        <td></td>
                        <td><Link to="/category">Sponsor a Brick</Link></td>
                      </tr>

                    )}

                  </tbody>
                </Table>
                <p className="blockquote bg-transparent">We are Hindus who believe in Lord Rama and Vishnu Deva.</p>
                <Link to="/event" className="sigma_btn-custom light" style={{ backgroundColor: "#CC7351", color: "white" }}>Sponsor Now<i className="far fa-arrow-right"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Section3;


