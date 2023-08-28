import React from 'react';
import blog2 from "../../assets/img/blog/2.jpg";
import blog1 from "../../assets/img/blog/1.jpg";
import blog3 from "../../assets/img/blog/3.jpg";
import people1 from "../../assets/img/people/1.jpg";
import people2 from "../../assets/img/people/2.jpg";




function Section7() {
  return (
    <div>
         {/* <!-- Blog Start --> */}
  <div className="section section-padding">
    <div className="container">

      <div className="section-title text-center">
        <p className="subtitle">Blog</p>
        <h4 className="title">News Feed</h4>
      </div>

      <div className="row">

        {/* <!-- Article Start --> */}
        <div className="col-lg-4 col-md-6">
          <article className="sigma_post">
            <div className="sigma_post-thumb">
              <a >
                <img src={blog2} alt="post"/>
              </a>
            </div>
            <div className="sigma_post-body">
              <div className="sigma_post-meta">
                <div className="me-3">
                  <i className="fas fa-om"></i>
                  <a  className="sigma_post-category">Temple</a>,
                  <a  className="sigma_post-category">Love</a>
                </div>
                <a  className="sigma_post-date"> <i className="far fa-calendar"></i> May 20, 2022</a>
              </div>
              <h5> <a>Temple companies are being so transparent with their work</a> </h5>
              <div className="sigma_post-single-author">
                <img src={people1} alt="author"/>
                <div className="sigma_post-single-author-content">
                  By <p>Miha Boukor</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* <!-- Article End -->

        <!-- Article Start --> */}
        <div className="col-lg-4 col-md-6">
          <article className="sigma_post">
            <div className="sigma_post-thumb">
              <a >
                <img src={blog1} alt="post"/>
              </a>
            </div>
            <div className="sigma_post-body">
              <div className="sigma_post-meta">
                <div className="me-3">
                  <i className="fas fa-om"></i>
                  <a  className="sigma_post-category">Temple</a>,
                  <a  className="sigma_post-category">Love</a>
                </div>
                <a  className="sigma_post-date"> <i className="far fa-calendar"></i> May 20, 2022</a>
              </div>
              <h5> <a >How to abide by Puja rules without any risks</a> </h5>
              <div className="sigma_post-single-author">
                <img src={people2} alt="author"/>
                <div className="sigma_post-single-author-content">
                  By <p>Aime Bill</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* <!-- Article End -->

        <!-- Article Start --> */}
        <div className="col-lg-4 col-md-6">
          <article className="sigma_post">
            <div className="sigma_post-thumb">
              <a >
                <img src={blog3} alt="post"/>
              </a>
            </div>
            <div className="sigma_post-body">
              <div className="sigma_post-meta">
                <div className="me-3">
                  <i className="fas fa-om"></i>
                  <a  className="sigma_post-category">Temple</a>,
                  <a  className="sigma_post-category">Love</a>
                </div>
                <a  className="sigma_post-date"> <i className="far fa-calendar"></i> May 20, 2022</a>
              </div>
              <h5> <a >Education for all rural children are necessary.</a> </h5>
              <div className="sigma_post-single-author">
                <img src={people1} alt="author"/>
                <div className="sigma_post-single-author-content">
                  By <p>Yesh Chopra</p>
                </div>
              </div>
            </div>
          </article>
        </div>
        {/* <!-- Article End --> */}

      </div>

    </div>

    <div className="spacer spacer-bottom spacer-lg light-bg pattern-triangles"></div>

  </div>
  {/* <!-- Blog End --> */}
    </div>
  )
}

export default Section7
