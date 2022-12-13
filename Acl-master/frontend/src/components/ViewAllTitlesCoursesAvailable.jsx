import React from 'react'
import { useEffect,useState } from 'react'
import axios from 'axios'
import GoalItem from './GoalItem'
 
function ViewAllTitlesCoursesAvailable() {
    const[items,setItems]=useState([])
    const [search,setSearch]=useState('')


    useEffect(()=>{
        fetch('http://localhost:8000/api/courses/getAllCourses')
        .then(response=>response.json())
        .then(json=>setItems(json))
    },[])
    return (
        <div >
        <div className='form-group'>
        <input
          type='text'
          className='form-control'
          id='Username'
          name='Username'
          //value={Username}
          placeholder='Search '
          onChange={(e)=>setSearch(e.target.value.toLocaleLowerCase())}
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
                            
                            <h1>{item.Title}</h1>
                            <div>Rating:{item.Rating}</div>
                            <div>Hours:{item.Hours}</div>
                            <div>Subject:{item.Subject}</div>
                            <div>Instructor:{item.Instructor}</div>
                        </pre>
                })
            }
        </ul>
        </div>
      )
}

export default ViewAllTitlesCoursesAvailable