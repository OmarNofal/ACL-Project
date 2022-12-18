import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


function AddNewCourse() {

    const [formData, setFormData] = useState({
        Title:'',
        Rating:'',
        Price:'',
        Subject:'',
        Instructor:'',
        Subtitles:'',
        Exercises:''
      })
      const {  Title,
        Rating,
        Price,
        Subject,
        Instructor,
        SubName,
        SubUrl
        ,Subdesc,
        Sublength,
        ExersiceName,
        Summary } = formData

      const navigate = useNavigate()
      const onSubmit = (e) => {
        e.preventDefault()
        const data = { Title:Title,
            Rating:Rating,
            Price:Price,
            Subject:Subject,
            Instructor:Instructor,
            Subtitles:{Name:SubName, LengthMins: Sublength,VideoURL: SubUrl,VideoDescription: Subdesc},
            Exercises:{Name:ExersiceName,CourseTitle:Title},
            Summary:Summary };

        fetch('http://localhost:8000/api/courses/instructor/createCourse', {
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
    <t1>Add New Course</t1>

    <div className='card'>
   

   <section >
   

     <form onSubmit={onSubmit} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Title'
           name='Title'
           value={Title}
           placeholder='Enter Title'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Rating'
           name='Rating'
           value={Rating}
           placeholder='Enter Rating'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Price'
           name='Price'
           value={Price}
           placeholder='Enter Price'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Subject'
           name='Subject'
           value={Subject}
           placeholder='Enter Subject'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Instructor'
           name='Instructor'
           value={Instructor}
           placeholder='Enter Instructor'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='SubName'
           name='SubName'
           value={SubName}
           placeholder='Enter SubName'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Sublength'
           name='Sublength'
           value={Sublength}
           placeholder='Enter Sublength'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='SubUrl'
           name='SubUrl'
           value={SubUrl}
           placeholder='Enter SubUrl'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Subdesc'
           name='Subdesc'
           value={Subdesc}
           placeholder='Enter Subdesc'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='ExersiceName'
           name='ExersiceName'
           value={ExersiceName}
           placeholder='Enter ExersiceName'
           onChange={onChange}
         />
       </div>
     
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='Summary'
           name='Summary'
           value={Summary}
           placeholder='Enter Summary'
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

export default AddNewCourse