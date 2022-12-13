import React from 'react'
import SelectCountry from '../components/SelectCountry'
import ViewAllTitlesCoursesAvailable from '../components/ViewAllTitlesCoursesAvailable'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
function InstructorHome() {
  const{user}=useSelector((state)=>state.auth)
  return (
    <>
    <div className='form'>
    <div className='form-group'>Welcome {user&&user.Username}</div>

    <div className='form-group'><SelectCountry /></div>
    <div className='form-group'>
        <button type='submit' className='btn btn-block'>
        Submit
        </button>
    </div>


</div>
<pre className='goal'>
             <Link to='/ViewAllTitlesCoursesAvailable'>
              <t1>                View All Courses available including the total hours of courses and course rating
              </t1>

              </Link>
      </pre>
      <pre className='goal'>
              <Link to='/ViewThePricesOfEachCourse'>
                  <t1>                View the prices of each course
                  </t1>

              </Link>
      </pre>
      <pre className='goal'>
              <Link to='/AddNewCourse'>
                  <t1>                Add New Course
                  </t1>

              </Link>
      </pre>
      <pre className='goal'>
              <Link to='/ViewInstructorCourse'>
                  <t1>               View my courses
                  </t1>

              </Link>
      </pre>
    </>
    
  )
}

export default InstructorHome