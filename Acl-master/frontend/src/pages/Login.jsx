import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    Name: '',
    Email: '',
   
  })

  const { Email, Password } = formData

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )

  
 useEffect(()=>{
  if(isError){
      toast.error(message)
  }
  if(isSuccess||user){
    if(user.Type=="Admin"){
      navigate('/AdminHome')
    }else if(user.Type=="Instructor"){
      navigate('/InstructorHome')

    }
    else if(user.Type=="CorporateTrainee"){
      navigate('/CorporateTrainee')

    }
    else if(user.Type=="IndividualTrainee"){
      navigate('/IndiviualTrainee')

    }
  }
  dispatch(reset())


},[user,isError,isSuccess,message,navigate,dispatch])

 

  
  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const userData={
      Email,Password
    }
    dispatch(login(userData))

    
  }

  if(isLoading){
    return <Spinner/>
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Login</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          
          <div className='form-group'>
            <input
              type='email'
              className='form-control'
              id='email'
              name='Email'
              value={Email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='password'
              className='form-control'
              id='password'
              name='Password'
              value={Password}
              placeholder='Enter password'
              onChange={onChange}
            />
          </div>
          
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default Login