import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function ChangePassword() {
    const{user}=useSelector((state)=>state.auth)
    const username1=user.Username

      const [formData, setFormData] = useState({
          Password:'',
 
        })
        const {  Password} = formData
  
        const navigate = useNavigate()
        const onSubmit = (e) => {
  
          e.preventDefault()
          const data = {username:username1,
            newPassword:Password};
  
          fetch('http://localhost:8000/api/users/changePasswordUser', {
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
  
  
  
  
  
  
    return (
      <>
      <t1>Chnage Password</t1>
  
      <div className='card'>
     
  
     <section >
     
  
       <form onSubmit={onSubmit} >
         <div className='form-group'>
           <input
             type='Password'
             className='form-control'
             id='Password'
             name='Password'
             value={Password}
             placeholder='Enter Password'
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

export default ChangePassword