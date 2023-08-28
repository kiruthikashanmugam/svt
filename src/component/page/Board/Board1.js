import React from 'react'
import Table from 'react-bootstrap/Table';
import { Helmet } from 'react-helmet';

function Board1() {
  return (
    <div>

      <Helmet>
        <title>Board</title>
      </Helmet>
      {/* <!--Cart Start --> */}
      <div className="section">
        <div className="container">


          {/* <!-- Cart Table Start --> */}
          <div className="post-detail-wrapper">
            <h5>Board of Trustees</h5>
            <Table className="sigma_responsive" responsive>
              <thead style={{ color: '#db4242' }}>
                <tr>

                  <th style={{ color: '#db4242' }}>#</th>
                  <th style={{ color: '#db4242' }}>Name</th>
                  <th style={{ color: '#db4242' }}>Portfolio</th>
                  <th style={{ color: '#db4242' }}>Phone</th>
                  <th style={{ color: '#db4242' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td >Dr. Pavan Yerramsetty</td>
                  <td >Chairman & Fundraising</td>
                  <td >919-225-6702</td>
                  <td >chairman@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td >Sri. Ramakrishna (Ramki) Kornepati</td>
                  <td >Vice-Chairman</td>
                  <td >919-986-0561</td>
                  <td >vicechairman@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td >Sri. Lakshminarayanan Srinivasan</td>
                  <td >General Secretary, Communications & Gurukulam</td>
                  <td >919-641-2386</td>
                  <td >secretary@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td >Dr. Valliprasad Kodali</td>
                  <td >Planning</td>
                  <td >910-308-8364</td>
                  <td >planning.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td >Dr. Raj Polavaram</td>
                  <td >Construction</td>
                  <td >919-559-6141</td>
                  <td >construction.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td >Smt. Preeti Devarasetti</td>
                  <td >Admin & Food</td>
                  <td >919-760-9248</td>
                  <td >admin.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td >Dr. Lakshman Rao</td>
                  <td >Re<table className="sigma_responsive-table"></table>ligious & Public Relations</td>
                  <td >919-820-4981</td>
                  <td >religious.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td > Sri. Jagadish Gadi</td>
                  <td >By-Law & Membership</td>
                  <td >919-706-6804</td>
                  <td >bylaw.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td > Sri. Anil Katarey</td>
                  <td >Finance & Procurement</td>
                  <td >919-324-4761</td>
                  <td >finance.bot@svtemplenc.org</td>
                </tr>


              </tbody>
            </Table>
            <p>Write to <a href="#">bots@svtemplenc.org</a>to contact all the BOTs for any strategic issues.</p>

            <h5 style={{ marginTop: "50px" }}>Board of Directors</h5>
            <Table className="sigma_responsive" responsive>
              <thead>
                <tr>

                  <th style={{ color: '#db4242' }}>#</th>
                  <th style={{ color: '#db4242' }}>Name</th>
                  <th style={{ color: '#db4242' }}>Portfolio</th>
                  <th style={{ color: '#db4242' }}>Phone</th>
                  <th style={{ color: '#db4242' }}>Email</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td >Sri. Suneel Kolluru</td>
                  <td >President</td>
                  <td >919-225-6702</td>
                  <td >chairman@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td >Smt. Vidya Aravapalli</td>
                  <td >Vice President & Admin</td>
                  <td >919-986-0561</td>
                  <td >vicechairman@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>3</td>
                  <td >Sri. Ramamurthy Dasari</td>
                  <td >Secretary & Membership</td>
                  <td >919-641-2386</td>
                  <td >secretary@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>4</td>
                  <td >Sri. Madhu Mahesh Sunku</td>
                  <td >Treasurer</td>
                  <td >910-308-8364</td>
                  <td >planning.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>5</td>
                  <td >Sri. Ravi Boorugadda</td>
                  <td >Religious</td>
                  <td >919-559-6141</td>
                  <td >construction.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>6</td>
                  <td >Sri. Srinivasa Dandepally</td>
                  <td >Communications & Public Relations</td>
                  <td >919-760-9248</td>
                  <td >admin.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>7</td>
                  <td >Sri. Amarnath Ravi</td>
                  <td >Food & Gurukulam</td>
                  <td >919-820-4981</td>
                  <td >religious.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>8</td>
                  <td > Smt. Uma Subramanian</td>
                  <td >Facilities</td>
                  <td >919-706-6804</td>
                  <td >bylaw.bot@svtemplenc.org</td>
                </tr>
                <tr>
                  <td>9</td>
                  <td >Smt. Subhangi Damodaran</td>
                  <td >Procurement & Cultural</td>
                  <td >919-324-4761</td>
                  <td >finance.bot@svtemplenc.org</td>
                </tr>


              </tbody>
            </Table>
            <p>Write to <a href="#">bods@svtemplenc.org</a>to contact all the BODs for any strategic issues.</p>
          </div>
          {/* <!-- Cart Table End --> */}



        </div>
      </div>
      {/* <!-- Cart End --> */}
    </div>
  )
}

export default Board1