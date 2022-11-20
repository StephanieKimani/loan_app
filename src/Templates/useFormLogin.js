import { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const useFormLogin = (callback, validateInfoLogin) => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate=useNavigate();
 
  /* To allow changing of values in the form*/
  const handleChangeLogin = e => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value 
    });
  }; 

  const handleSubmitLogin = e => {
    e.preventDefault();

    setErrors(validateInfoLogin(values)) 
    setIsSubmitting(true)
 
    /*Post User Login Details to get a response consisting of token and role*/
    /*After User has been posted,clear the set values*/
    /*If the token exists,Login the User to their respective page,based on the role*/
    /*If there is no existing token,User is not Logged in*/
    var url = 'http://127.0.0.1:8000/user/apilogin/'

    fetch(url, {
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body:JSON.stringify(values)
    })
    .then(response=>response.json())
    .then(data =>
       {
      setValues({
        ...values,
       username: '',
       password: '',
      });
      console.log(data); 
      localStorage.setItem('username',data.username)
      localStorage.setItem('id',data.id)
      localStorage.setItem('accountNo',data.accountNo)
      localStorage.setItem('token',data.token)
      localStorage.setItem('role',data.role)

      let token =localStorage.getItem('token')  
      if(token){
        if(data.role ==='client'){
        navigate('/successful-clientlogin');
        } else if(data.role==='underwriter'){
          navigate('/successful-underwriterlogin');
        }
        else if(data.role==='admin'){
          window.location.href = 'http://localhost:8000/admin';
        }
      } else{
        navigate('/');  
      }
    }
    )
    .catch(function(error){
      console.log('ERROR:', error)
    })
  };

  /* To recognize any errors if any before form submission*/
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {callback();}
    },
   [errors]
  );

  return { handleChangeLogin, handleSubmitLogin, values, errors };
};


export default useFormLogin;