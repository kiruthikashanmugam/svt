import React, { Component } from 'react';
import { Table,Container,Col,Row,Card} from 'reactstrap';
import axios from 'axios';



class DonationMain extends Component {

  
  constructor(props){
          super(props) 
            this.state = {
              modal: false,
              loading: true,

              tableData: [],
            }          
        }
        
componentDidMount(){
    this.getData();
    setTimeout(() => {
        this.setState({
          loading: false,
        });
      }, 3000);
      }
   
      getData() {
        axios
          .get(`https://jsonplaceholder.typicode.com/users`,{}  )
          .then((response) => {
            const data = response.data;
            this.setState({tableData: data});
          })
          .catch((error) => {
            console.error(error);
            // Handle error, display error message or take appropriate action
          });
      }


      toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
      }
  

      
  render() {
  
    if (this.state.loading) {
        return <div>
         <div class="loader">
      <div class="loader-inner">
          <div class="loader-line-wrap">
              <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
              <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
              <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
              <div class="loader-line"></div>
          </div>
          <div class="loader-line-wrap">
              <div class="loader-line"></div>
          </div>
      </div>
  </div>
        </div>;
      }
    var id = 1;
    var temp =0;
    if (this.state.loading) {
        return <div>Loading...</div>;
      }


    return (      
       <>

       <Container> 
   
       <Row>  
       <Col sm="12">
        <Card style={{marginTop:"20px",padding:"10px" }}>
       <Table  sm="6">   
                       <thead>
                          <tr>
                          <th>#</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th></th>
                            
                            <th>  Email   </th>
                          </tr>
                        </thead>
                    
                        <tbody>
                            {
                                this.state.tableData.map((tdata) =>(
                                <tr>
                                <td>{ id++ }</td>
                            
                                <td>{ tdata.name}  </td>
                                <td>{tdata.address.city}    </td>
                                <td>{tdata.expiry_date}    </td>
                                <td >{tdata.email} </td>
                              
                              
                                <td style={{display:"none" }}> {temp++}</td> 
                                   
                              </tr>
                              ) )
                            }                    
                        </tbody>
              
                    </Table>
                    </Card>
            </Col>     
            </Row>
            </Container>
            </>
    )
}
} 
export default DonationMain;