import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CreateExam() {
    const [formData, setFormData] = useState({
        courseTitle:'',     
        exerciseName:'',
        questions1:'',questions2:'',questions3:'',
        choices1:'', choices2:'',choices3:'', choices4:'',choices5:'', choices6:'', choices7:'', choices8:'',choices9:'', choices10:'',choices11:'',choices12:'',

        choices:'',
        answersIndices:'',answersIndices2:'', answersIndices3:''
      })
      const {  courseTitle,
        exerciseName,
        questions1,questions2,questions3,
        choices1, choices2,choices3, choices4,choices5, choices6, choices7, choices8,choices9, choices10,choices11,choices12,
        answersIndices, answersIndices2, answersIndices3} = formData

      const navigate = useNavigate()
   
      const onSubmit = (e) => {
        
        //const t=localStorage.getItem('user').Email
        //const v=t.Username;
        
//console.log(usEmailer.)
        e.preventDefault()
        const data = { courseTitle:courseTitle,
            exerciseName:exerciseName,
            questions:[questions1, questions2, questions3],
            choices:[[choices1, choices2,choices3, choices4],[choices5, choices6, choices7, choices8],[choices9, choices10,choices11,choices12]],
            answersIndices:[answersIndices, answersIndices2, answersIndices3]};

        fetch('http://localhost:8000/api/courses/addExerciseToCourse', {
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
    <t1>Add New Exam</t1>
    <div className='card'>
   <section >
   

     <form onSubmit={onSubmit} >
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='courseTitle'
           name='courseTitle'
           value={courseTitle}
           placeholder='Enter courseTitle'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='exerciseName'
           name='exerciseName'
           value={exerciseName}
           placeholder='Enter exerciseName'
           onChange={onChange}
         />
       </div>
       
       
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='questions1'
           name='questions1'
           value={questions1}
           placeholder='Enter question 1'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices1'
           name='choices1'
           value={choices1}
           placeholder='Enter choices1'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices2'
           name='choices2'
           value={choices2}
           placeholder='Enter choices2'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices3'
           name='choices3'
           value={choices3}
           placeholder='Enter choices3'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices4'
           name='choices4'
           value={choices4}
           placeholder='Enter choices4'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='answersIndices'
           name='answersIndices'
           value={answersIndices}
           placeholder='Enter answersIndices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='questions2'
           name='questions2'
           value={questions2}
           placeholder='Enter question 2'
           onChange={onChange}
         />
       </div>
       
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices5'
           name='choices5'
           value={choices5}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices6'
           name='choices6'
           value={choices6}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices7'
           name='choices7'
           value={choices7}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices8'
           name='choices8'
           value={choices8}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='answersIndices2'
           name='answersIndices2'
           value={answersIndices2}
           placeholder='Enter answersIndices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='questions3'
           name='questions3'
           value={questions3}
           placeholder='Enter question 3'
           onChange={onChange}
         />
       </div>
       
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices9'
           name='choices9'
           value={choices9}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices10'
           name='choices10'
           value={choices10}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices11'
           name='choices11'
           value={choices11}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='choices12'
           name='choices12'
           value={choices12}
           placeholder='Enter choices'
           onChange={onChange}
         />
       </div>
       
       
       <div className='form-group'>
         <input
           type='text'
           className='form-control'
           id='answersIndices3'
           name='answersIndices3'
           value={answersIndices3}
           placeholder='Enter answersIndices'
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

export default CreateExam