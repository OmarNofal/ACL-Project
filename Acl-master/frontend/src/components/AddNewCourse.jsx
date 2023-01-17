import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


function AddNewCourse() {
  const value=0
  const{user}=useSelector((state)=>state.auth)

    const [formData, setFormData] = useState({
        Title:'',
       
        Price:'',
        Subject:'',
      
        Subtitles:'',
        Exercises:'',
        Hours:'',
        PreviewVideoURL:''
      })
      const {  Title,
      
        Price,
        Subject,
        Instructor,
        SubName,
        SubUrl
        ,Subdesc,
        Sublength,
        ExersiceName,
        Hours,
        Summary ,PreviewVideoURL} = formData

      const navigate = useNavigate()
      const onSubmit = (e) => {
        
        //const t=localStorage.getItem('user').Email
        //const v=t.Username;
        
        //console.log(user.Email)
        e.preventDefault()
        const data = { Title:Title,
           
            Price:Price,
            Subject:Subject,
            Instructor:user.Username,
            Subtitles:{Name:SubName, LengthMins: Sublength,VideoURL: SubUrl,VideoDescription: Subdesc},
            Exercises:{Name:ExersiceName,CourseTitle:Title},
            Summary:Summary,
            Hours:Hours,
            PreviewVideoURL:PreviewVideoURL ,
            Rating:{Score:value}};

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
           id='Hours'
           name='Hours'
           value={Hours}
           placeholder='Enter Hours'
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
           id='SubName'
           name='SubName'
           value={SubName}
           placeholder='Enter Subtitle Name'
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
           placeholder='Enter Subtitle length'
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
           placeholder='Enter Subtitle Url'
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
           placeholder='Enter Subtitle description'
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
           placeholder='Enter Exersice Name'
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
         <input
           type='text'
           className='form-control'
           id='PreviewVideoURL'
           name='PreviewVideoURL'
           value={PreviewVideoURL}
           placeholder='Enter video url'
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