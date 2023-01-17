import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
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
import ButtonGroup from '@mui/material/ButtonGroup';
import { getType } from '@reduxjs/toolkit'



const theme = createTheme();
// const options = [
//   'Trainee', 'Instructor'
// ];
// const options2 = [
//   'Male', 'Female'
// ];
// const type1='';
// const gender1='';
function TraineeRegistration() {
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

  const[name,setName]=useState(false)





  const { Username, Email, Password, Password2,Type,Gender,FirstName,LastName}= formData;

  const navigate=useNavigate()
  const dispatch=useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  )


 useEffect(()=>{
    // setType(options)
    // setType3(options2)

    if(isError){
        toast.error(message)
    }
    if((isSuccess||user)&&name==true){
   
      toast.success("success you have to verify your account then log in")
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
        if(name==true)
        {
            const userData={
                Username,
                Email,
                Password,
                Type:'IndividualTrainee',
              
                FirstName,
                LastName,
                Gender
        }
        dispatch(register(userData))

        }

    }
    
  }
  

  if(isLoading){
    return <Spinner />
  }
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: '' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={onSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>

              
                <TextField
                  autoComplete="given-name"
                  name="Username"
                  required
                  fullWidth
                  id="Username"
                  label="Username"
                  onChange={onChange}
                  value={Username}


                  autoFocus
                />
              </Grid>

              

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="Email"
                  value={Email}
                  autoComplete="email"
                  onChange={onChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={Password}
                  onChange={onChange}

                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="Password2"
                  label="Password2"
                  type="password"
                  id="password2"
                  autoComplete="new-password"
                  value={Password2}
                  onChange={onChange}

                />
              </Grid>
              {/* <Grid item xs={12} sm={12}>

              
                <TextField
                  required
                  autoComplete="given-type"
                  name="Type"
                  fullWidth
                  id="Type"
                  label="Type"
                  onChange={onChange}
                  value={Type}
                  autoFocus
                />
              </Grid> */}
              <Grid item xs={12} sm={12}>

              
                <TextField
                  required
                  autoComplete="given-name"
                  name="FirstName"
                  fullWidth
                  id="FirstName"
                  label="FirstName"
                  onChange={onChange}
                  value={FirstName}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>

              
                <TextField



                  autoComplete="given-name"
                  name="LastName"
                  required
                  fullWidth
                  id="LastName"
                  label="LastName"
                  onChange={onChange}
                  value={LastName}


                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={12}>

              
                <TextField
                  required
                  autoComplete="given-gender"
                  name="Gender"
                  fullWidth
                  id="Gender"
                  label="Gender"
                  onChange={onChange}
                  value={Gender}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                required
                  control={<Checkbox value="allowExtraEmails" color="primary" onChange={(e)=>setName(e.target.checked)}/>}
                  label="I accept the website/ company refund/ payment policy"
                />
                <Link href="/WebsitePolicy" variant="body2">
                View website policy
                </Link>
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
             Continue Signing Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/Login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
 
}

export default TraineeRegistration

/*
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
              required
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
*/