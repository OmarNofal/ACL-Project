import React from 'react'
import SelectCountry from '../components/SelectCountry'
import { Link, useNavigate } from 'react-router-dom'

import ViewAllTitlesCoursesAvailable from '../components/ViewAllcoursesforcorporatetrainee'
function IndividualTrainee() {
  return (
    <>
    <div className='form'>
            <div className='form-group'>Welcome individualTrainee</div>

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
                  <Link to='/MyCourses'>
                      <t1>                View my courses
                      </t1>

                  </Link>
          </pre>
    </>
    
  )
}

export default IndividualTrainee