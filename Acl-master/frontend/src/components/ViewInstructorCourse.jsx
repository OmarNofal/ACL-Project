import React from 'react'
import { useEffect,useState } from 'react'



function ViewInstructorCourse() {
    const[items,setItems]=useState([])

    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/instructor/viewCoursesTitles')
        .then(response=>response.json())
        .then(json=>setItems(json))
    },[])
  return (
    <div >
            <ul>
            {
                items.map(item=>{
                    
                    return<pre className='goal'>
                            
                            <h1>{item.Title}</h1>
                         
                        </pre>
                })
            }
        </ul>
        </div>
  )
}

export default ViewInstructorCourse