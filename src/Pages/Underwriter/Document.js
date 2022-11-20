import React from 'react'

class Document extends React.Component{
// Class constructor used to declare the state and bind functions
constructor(props){
  super(props);
    this.state = {
      individualLoanDetail:[],
    }
    this.fetchTasks = this.fetchTasks.bind(this)
};
// Loads Loan Details on page load
componentWillMount(){
  this.fetchTasks()
}
// Gets the loan Details from the Django Api
fetchTasks(){
  fetch(`http://127.0.0.1:8000/loan/apidetail/${localStorage.getItem("loanId")}`)
  .then(response => response.json())
  .then(data =>
    this.setState({
      individualLoanDetail:data
    }),
    )
}
  render(){
var individualLoanDetail= this.state.individualLoanDetail
  return (
    <div>
                  <img 
                  src={`http://127.0.0.1:8000${individualLoanDetail.images}`}
                  alt="Uploaded Document showing the client's trustworthiness"
                  width="300" height="300" 
                  style={{marginBottom: 0,paddingBottom: 0}}
                  >
                  </img>
                         
    </div>
  );
}
}

export default Document