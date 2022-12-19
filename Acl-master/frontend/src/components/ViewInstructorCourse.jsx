import React from 'react'
import { useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

function ViewInstructorCourse() {
    const [search,setSearch]=useState('')
    const [search1,setSearch1]=useState('')
    const [search2,setSearch2]=useState('')
    const [search3,setSearch3]=useState('')


    const{user}=useSelector((state)=>state.auth)
    //http://localhost:8000/api/courses/instructor/filterCourses
    const[items,setItems]=useState([])
    const username1=user.Username
    console.log(username1)
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
           <div className='form-group'>
             <input
               type='price'
               className='form-control'
               id='StartPrice'
               name='StartPrice'
               //value={EndPrice}
               placeholder='Start Price '
               onChange={(e)=>setSearch1(e.target.value)}
             />
           </div>
           <div className='form-group'>
             <input
               type='price'
               className='form-control'
               id='EndPrice'
               name='EndPrice'
               //value={EndPrice}
               placeholder='End Price '
               onChange={(e)=>setSearch2(e.target.value)}
             />
           </div>
           <div className='form-group'>
             <input
               type='text'
               className='form-control'
               id='Subject'
               name='Subject'
               //value={EndPrice}
               placeholder='Subject  '
               onChange={(e)=>setSearch3(e.target.value)}
             />
           </div>
            <ul>
            {
                items.filter((item)=>{
                  return search1.toLocaleLowerCase()===''
                  ?item
                  :(item.Price>=search1)
              }).filter((item)=>{
                  return search2.toLocaleLowerCase()===''
                  ?item
                  :(item.Price<=search2)
              }).filter((item)=>{
                    return search.toLocaleLowerCase()===''
                    ?item
                    :(item.Title.toLocaleLowerCase().includes(search))
                    ||(item.Subject.toLocaleLowerCase().includes(search))
                    ||(item.Instructor.toLocaleLowerCase().includes(search))
                }).filter((item)=>{
                  return search3.toLocaleLowerCase()===''
                  ?item
                  :(item.Subject.toLocaleLowerCase()==(search3))
              }).map(item=>{
                    
                    return<pre className='goal'>
                            
                            <h1>Title: {item.Title}</h1>
                            <div>Price: {item.Price}</div>
                            <div>Subject: {item.Subject}</div>
                            <div>Instructor: {item.Instructor}</div>
                         
                        </pre>
                })
            }
        </ul>
        </div>
  )
}

export default ViewInstructorCourse