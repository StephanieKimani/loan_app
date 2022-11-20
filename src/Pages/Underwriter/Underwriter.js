import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Table from 'react-bootstrap/Table';
import './Underwriter.css';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



class Underwriter extends React.Component{
// Class constructor used to declare the state and bind functions
  constructor(props){
    super(props);
      this.state = {
        loanDetails:[],
      }
      this.renderTooltip = this.renderTooltip.bind(this)
      this.fetchTasks = this.fetchTasks.bind(this)
      this.loanClick = this.loanClick.bind(this)
      this.authentication = this.authentication.bind(this)
      this.tokenDestroy =this.tokenDestroy.bind(this)
  };
// Guides the user (underwriter) on where to click
  renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Click on Loan Number for more 
    </Tooltip>
  );
// Loads Loan Details on page load
  componentWillMount(){
    this.fetchTasks()
    this.authentication()
  }
// Gets the loan Details from the Django Api
  fetchTasks(){
    fetch('http://127.0.0.1:8000/loan/apilist/')
    .then(response => response.json())
    .then(data =>
      this.setState({
        loanDetails:data
      }),
      
      )
  }
// Sets loanId and accountNo, and loads an individual's loan details
  loanClick(id,accountNo){
  localStorage.setItem('loanId',id)
  localStorage.setItem('loanAccountNo',accountNo)
  fetch(`http://127.0.0.1:8000/loan/apiupdatedefault/${localStorage.getItem("loanId")}/${localStorage.getItem("loanAccountNo")}`)
  window.location.href="http://localhost:3000/underwriter-process"
  }

  authentication(){
    let token = localStorage.getItem('token')
    /*let role = localStorage.getItem('role') */
    if (!token){
      window.location.href="http://localhost:3000" 
    }
  }

   tokenDestroy(){
    localStorage.removeItem('token')
      }

  render(){
    var loanDetails= this.state.loanDetails
    var self = this
    return(
      <div>
          <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                <Navbar.Text >
                  Welcome <span>{localStorage.getItem("username")}</span>
                </Navbar.Text>
                </Nav>
                <Nav>
                  <Nav.Link  href="/" onClick={()=>this.tokenDestroy()}>
                    Log out
                  </Nav.Link>
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
          <Container className='loantable'>
            <h3>Loan Application Requests</h3>
          <Table striped bordered hover >
            <thead>
              <tr>
                <th>#</th>
                <th>Account no</th>
                <th>Amount</th>
                <th>Interest</th>
                <th>Loan Duration(In Months) </th>
                <th>Monthly Payment </th>
                <th>Loan Purpose </th>
                <th>Loss Given Default </th>
                <th>Status </th>

              </tr>
            </thead>
            <OverlayTrigger
                placement="top"
                delay={{ show: 250, hide: 400 }}
                overlay={this.renderTooltip}
              >
            <tbody>
              <tr>
              <td>
              {/*This function inserts values from the loaded loan
              details array into the laon application table.
              The filter sets the values only to appear when the 
              status is "pending"*/}
              {loanDetails
              .filter(loanDetails=>{
              return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index} 
                          onClick={()=>self.loanClick(loanDetails.id,loanDetails.accountNo)}>
                          <span>{loanDetails.id}</span>
                          </div>)})}             
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
              return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.accountNo}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.amount}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.interest}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.loanDuration}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.monthlyPayment}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.loanPurpose}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.lossGivenDefault}</span>
                          </div>)})}
              </td>
              <td>
              {loanDetails
              .filter(loanDetails=>{
                return loanDetails.status==='pending';})
              .map(function(loanDetails, index){
                      return(
                          <div key={index}>
                          <span>{loanDetails.status}</span>
                          </div>)})}
              </td>
              </tr>
            </tbody>
            </OverlayTrigger>
          </Table>
          </Container>

    </div>
    );
  }
}
export default Underwriter;