import React from 'react'
import SelectCountry from '../components/SelectCountry'
import { Link, useNavigate } from 'react-router-dom'

import ViewAllTitlesCoursesAvailable from '../components/ViewAllTitlesCoursesAvailable'
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
                  <Link to='/MyCourses'>
                      <t1>                View my courses
                      </t1>

                  </Link>
          </pre>
    </>
    
  )
}

export default IndividualTrainee