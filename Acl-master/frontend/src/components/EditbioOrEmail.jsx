import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function EditbioOrEmail() {
    const [formData, setFormData] = useState({
        Email:''
      })

      const [formData2, setFormData2] = useState({
        Biography:''
      })

      const {  Email} = formData

      const {  Biography} = formData2


      const navigate = useNavigate()
      const onSubmit = (e) => {

        e.preventDefault()
        const data = {Email:Email};

        fetch('http://localhost:8000/api/users/instructor/editEmail', {
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
        
        navigate('/InstructorHome')  
      } 


      const onSubmit2 = (e) => {
        e.preventDefault()
        const data = {Biography:Biography};
        fetch('http://localhost:8000/api/users/instructor/editBiography', {
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
        
        navigate('/InstructorHome')  
      } 



      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }

      const onChange2 = (e) => {
        setFormData2((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }






  return (
    <>
    <t1>Edit</t1>

    <div className='card'>
   

   <section >
   

     <form onSubmit={onSubmit} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Email'
           name='Email'
           value={Email}
           placeholder='Enter Email'
           onChange={onChange}
         />
       </div>
       
       
       <div className='form-group'>
         <button type='submit'  className='btn btn-block'>
           Submit
         </button>
       </div>
     </form>
     <form onSubmit={onSubmit2} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Bio'
           name='Biography'
           value={Biography}
           placeholder='Enter Biography'
           onChange={onChange2}
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

export default EditbioOrEmail