import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import * as React from 'react';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import axios from "axios";

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


  const onForgotPasswordClicked = () => {
    axios({
      method: "POST",
      url: "http://localhost:8000/api/users/requestPasswordChange",
      data: {
        Email: Email
      }
    }).then(
      res => {toast.success("An email has been sent to you")}
    ).catch(
      res => {toast.error("An error ocurred")}
    )
  }
  
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
      
        
        
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
        <h1>
          <FaSignInAlt /> Login
        </h1>
          
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
          <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid item xs>
                <Link href="#" variant="body2" onClick={onForgotPasswordClicked}>
                  Forgot password?
                </Link>
              </Grid>
           
          </div>
        </form>
      </section>
    </>
  )
}

export default Login