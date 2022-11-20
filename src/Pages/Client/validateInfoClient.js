export default function validateInfoClient(values) {
    let errors = {};
  
    if (!values.amount) {
      errors.amount = 'Loan Amount required';
    }
   
    if (!values.monthlyPayment) {
        errors.monthlyPayment = 'Monthly Repayment amount required';
      }
  
      if (!values.loanDuration) {
        errors.loanDuration = 'Loan Duration is required';
      } else if (values.loanDuration.length >2) {
        errors.loanDuration = 'loan Duration should not be more than a year';
      }
   
    return errors;
  }
  