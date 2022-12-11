import React from 'react'
import { Link, useNavigate } from 'react-router-dom'



function test() {
  return (
    <div className='form'>
      <pre className='goal'>
             <Link to='/AddAnotherInstructor'>
              <t1> Add Another Instructor
              </t1>

              </Link>
      </pre>
      <pre className='goal'>
              <Link to='/AddAnotherAdmin'>
                  <t1>    Add Another Admin
                  </t1>

              </Link>
      </pre>
      <pre className='goal'>
              <Link to='/AddAnotherCorporateTrainee'>
                  <t1> Add AnotherCorporate Trainee
                  </t1>

              </Link>
      </pre>


    </div>
  )
}

export default test