import { useState, useEffect} from 'react';

const useForm = (callback, validateInfo) => {
  const [values, setValues] = useState({
    id:null,
    username: '',
    accountNo: '',
    email: '',
    password: '',
    password2: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  /* To allow changing of values in the form*/
  const handleChange = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  }; 
  const handleSubmit = e => {
    e.preventDefault();

    setErrors(validateInfo(values));
    setIsSubmitting(true);

    /*Register user using the set values*/
    /*After user has been created,clear the set values*/
    var url = 'http://127.0.0.1:8000/user/apicreate/'
    
    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
        'Accept': 'application/json',
      },
      body:JSON.stringify(values)
    }).then((response)  => {
      setValues({
        ...values,
       id:null,
       username: '',
       accountNo: '',
       email: '',
       password: '',
       password2: ''
      });
    }).catch(function(error){
      console.log('ERROR:', error)
    })
  };

  /* To recognize any errors if any before form submission*/
  useEffect(
    () => {
      if (Object.keys(errors).length === 0 && isSubmitting) {
        callback();
      }
    },
    [errors]
  );

  return { handleChange, handleSubmit, values, errors };
};

export default useForm;