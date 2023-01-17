import React from 'react'
import SelectCountry from '../components/SelectCountry'
import ViewAllTitlesCoursesAvailable from '../components/ViewAllcoursesforcorporatetrainee'
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
              <Link to='/ViewAllCoursesForINSorTRAINEEorGUEST'>
                  <t1>                View all courses
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
      <pre className='goal'>
              <Link to='/CreateExam'>
                  <t1>               Create Exam
                  </t1>

              </Link>
      </pre>
    </>
    
  )
}

export default InstructorHome