import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaSignInAlt } from 'react-icons/fa'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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
                <Link href="#" variant="body2">
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