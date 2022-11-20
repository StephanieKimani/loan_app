import React from 'react'
import Table from 'react-bootstrap/Table';

class PendingLoans extends React.Component{
// Class constructor used to declare the state and bind functions
constructor(props){
  super(props);
    this.state = {
      loanDetails:[],
    }
    this.fetchTasks = this.fetchTasks.bind(this)
};
// Loads Loan Details on page load
componentWillMount(){
  this.fetchTasks()
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

render(){
  var loanDetails= this.state.loanDetails
  var loanAccountNo = localStorage.getItem("loanAccountNo")
  return(
    <div>
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
          <tbody>
            <tr>
            <td>
            {/*This function inserts values from the loaded loan
            details array into the loan application table.
            The filter sets the values only to appear when the 
            status is "pending"*/}
            {loanDetails
            .filter(loanDetails=>{ 
            return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.id}</span>
                        </div>)})}             
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
            return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.accountNo}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.amount}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.interest}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.loanDuration}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.monthlyPayment}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.loanPurpose}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.lossGivenDefault}</span>
                        </div>)})}
            </td>
            <td>
            {loanDetails
            .filter(loanDetails=>{
              return loanDetails.accountNo===JSON.parse(loanAccountNo) && loanDetails.repayed==='no' && loanDetails.status==='accepted';})
            .map(function(loanDetails, index){
                    return(
                        <div key={index}>
                        <span>{loanDetails.status}</span>
                        </div>)})}
            </td>
            </tr>
          </tbody>
        </Table>

  </div>
  );
}
}
export default PendingLoans