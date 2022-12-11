import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function AddAnotherCorporateTrainee() {

  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: ''
  })
  const { Username, Email, Password } = formData

  const navigate = useNavigate()
  const onSubmit = (e) => {
    e.preventDefault()
    const data = { Username: Username,Email:Email,Password:Password };

    fetch('http://localhost:8000/api/users/addTrainees', {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json;chaerset=UTF-8'

        },
        body: JSON.stringify(data),
        
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error);
    });
    
    navigate('/AdminHome')  
  } 

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }


  return (
    <>
    <t1>Add Another Corporate Trainee</t1>

    <div className='card'>
   

   <section >
     <form onSubmit={onSubmit} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Username'
           name='Username'
           value={Username}
           placeholder='Enter Trainee Name'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='email'
           className='form-control'
           id='Email'
           name='Email'
           value={Email}
           placeholder='Enter Trainee email'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='password'
           className='form-control'
           id='Password'
           name='Password'
           value={Password}
           placeholder='Enter Trainee password'
           onChange={onChange}
         />
       </div>
       
       <div className='form-group'>
         <button type='submit'  className='btn btn-block'>
           Submit
         </button>
       </div>
     </form>
   </section>
 </div>
    </>
  )
}

export default AddAnotherCorporateTrainee