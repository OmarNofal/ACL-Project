import React from 'react'
import SelectCountry from '../components/SelectCountry'
import ViewAllTitlesCoursesAvailable from '../components/ViewAllcoursesforcorporatetrainee'
import { Link, useNavigate } from 'react-router-dom'


function Guest() {
  return (
    <>

      <div className='form'>
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
              

    </>
    
   
  )
}

export default Guest