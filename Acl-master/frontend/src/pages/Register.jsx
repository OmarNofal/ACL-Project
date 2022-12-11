import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    Username: '',
    Email: '',
    Password: '',
    Password2: '',
    Type:'',
  
  FirstName:'',
  LastName:'',
  Gender:''
  })



  const { Username, Email, Password, Password2,Type,FirstName,LastName,Gender } = formData

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
        navigate('/Login')
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


    if(Password!=Password2){
        toast.error('password not match')
    }else{
        const userData={
          Username,
          Email,
          Password,
          Type,
        
          FirstName,
          LastName,
          Gender
        }

        dispatch(register(userData))
    }
    
  }

  if(isLoading){
    return <Spinner />
  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='name'
              name='Username'
              value={Username}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input
              type='password'
              className='form-control'
              id='password2'
              name='Password2'
              value={Password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='Type'
              name='Type'
              value={Type}
              placeholder='Enter Type'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='FirstName'
              name='FirstName'
              value={FirstName}
              placeholder='FirstName'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              className='form-control'
              id='LastName'
              name='LastName'
              value={LastName}
              placeholder='LastName'
              onChange={onChange}
            />
          </div>
          <div className='form-group'>
            <input
              type='Gender'
              className='form-control'
              id='Gender'
              name='Gender'
              value={Gender}
              placeholder='Gender'
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

export default Register