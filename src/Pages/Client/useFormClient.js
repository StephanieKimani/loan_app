import { useState, useEffect } from 'react';

const useFormClient = (callback, validate) => {

  //file uploads
  const [files, setFiles] = useState();
  const handleFiles=e=>{
    setFiles(e.target.files[0]);
  };
  

  const [values, setValues] = useState({
    amount: '',
    monthlyPayment: '',
    loanDuration: '',
    loanPurpose:'',
    images:'',
    accountNo:'',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [status,setStatus]=useState('');

  {/* To allow changing of values in the form*/}
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }; 

  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validate(values));
    setIsSubmitting(true);

    values.images=files
    values.accountNo=localStorage.getItem('accountNo')
    console.log(values);


    /*Register loan details using the set values*/
    /*After loan details have been created,clear the set values*/
    const formData = new FormData();
    formData.append("amount", values.amount);
    formData.append("monthlyPayment", values.monthlyPayment);
    formData.append("loanDuration", values.loanDuration);
    formData.append("loanPurpose", values.loanPurpose);
    formData.append("images", values.images,values.images.name);
    formData.append("accountNo", values.accountNo);

    var url = 'http://127.0.0.1:8000/loan/apicreate/'
    
    fetch(url, {
      method:'POST',
      body:formData
    }).then((response)  => {
      setValues({
        ...values,
       id:null,
       amount: '',
       monthlyPayment: '',
       loanDuration: '',
       loanPurpose:'',
       images:'',
       accountNo:'',
      });
    }).catch(function(error){
      console.log('ERROR:', error)
    })
  };

   {/* To recognize any errors if any before form submission*/}
   useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  const fetchStatus=()=>(
    fetch(`http://127.0.0.1:8000/loan/apistatus/${localStorage.getItem("accountNo")}`)
    .then(response => response.json())
    .then(data =>{
      setStatus(data.status) 
    }
    )
  );
 
  

  return {setValues,handleChange, handleSubmit, values, errors ,
   files,setFiles,handleFiles,status,fetchStatus};
};


export default useFormClient;