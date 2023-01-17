import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function EditACourse() {
  const value=0
  const{user}=useSelector((state)=>state.auth)

    const [formData, setFormData] = useState({
    discount:'',
       
    day:'',
    month:'',
    year:''
      })
      const {  discount,
      
        day,
        month,
      
        year} = formData

      const navigate = useNavigate()
      const onSubmit = (e) => {
        const res=localStorage.getItem('courseName')

        e.preventDefault()
        const data = { 
            Course:res,
            DiscountPercentage:discount,
           
            Day:day,
            Month:month,
            Year:year
        };

        fetch('http://localhost:8000/api/users/instructor/createDiscount', {
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
    <t1>Add discount</t1>

    <div className='card'>
   

   <section >
   

     <form onSubmit={onSubmit} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='discount'
           name='discount'
           value={discount}
           placeholder='Enter discount'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='day'
           name='day'
           value={day}
           placeholder='Enter day'
           onChange={onChange}
         />
       </div>
       
       
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='month'
           name='month'
           value={month}
           placeholder='Enter month'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='year'
           name='year'
           value={year}
           placeholder='Enter year'
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

export default EditACourse