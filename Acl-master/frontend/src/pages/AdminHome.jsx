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
      <pre className='goal'>
             <Link to='/AddAnotherInstructor'>
              <t1> Add Another Instructor
              </t1>

              </Link>
      </pre>
      <pre className='goal'>
             <Link to='/ViewUnseenReportsAdmin'>
              <t1> View unseen Reports
              </t1>

              </Link>
      </pre>
      <pre className='goal'>
             <Link to='/ViewRequestRefundAdmin'>
              <t1> View Refund Requests
              </t1>

              </Link>
      </pre>

      <pre className='goal'>
             <Link to='/ViewCorporateRequests'>
              <t1> View Corporate Requests
              </t1>

              </Link>
      </pre>
      <pre className='goal'>
             <Link to='/CreateDiscountAdmin'>
              <t1> Issue Discount on Courses
              </t1>

              </Link>
      </pre>


    </div>
  )
}

export default test