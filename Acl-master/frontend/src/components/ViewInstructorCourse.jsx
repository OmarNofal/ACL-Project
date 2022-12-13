import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

function ViewInstructorCourse() {
    const [search,setSearch]=useState('')
    const{user}=useSelector((state)=>state.auth)
    //http://localhost:8000/api/courses/instructor/filterCourses
    const[items,setItems]=useState([])
    const username1=user.Username
    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/instructor/viewCoursesTitles/'+username1)
        .then(response=>response.json())
        .then(json=>setItems(json))
    },[])


  return (
    <div >
        <div> view my courses</div>
        <div className='form-group'>
             <input
               type='text'
               className='form-control'
               id='Username'
               name='Username'
               //value={Username}
               placeholder='Search '
               onChange={(e)=>setSearch(e.target.value)}
             />
           </div>
            <ul>
            {
                items.filter((item)=>{
                    return search.toLocaleLowerCase()===''
                    ?item
                    :(item.Title.toLocaleLowerCase().includes(search))
                    ||(item.Subject.toLocaleLowerCase().includes(search))
                    ||(item.Instructor.toLocaleLowerCase().includes(search))
                }).map(item=>{
                    
                    return<pre className='goal'>
                            
                            <h1>Title: {item.Title}</h1>
                            <div>Rating: {item.Rating}</div>
                            <div>Price: {item.Price}</div>
                            <div>Subject: {item.Subject}</div>
                            <div>Instructor: {item.Instructor}</div>
                            <div>Subject: {item.Subtitles}</div>
                         
                        </pre>
                })
            }
        </ul>
        </div>
  )
}

export default ViewInstructorCourse