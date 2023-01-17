import axios from 'axios'

const API_URL='/api/users/'


//register user

const register=async(userData)=>{

    const response=await axios.post('http://localhost:8000/api/users/registerUser',userData)
    // if(response.data){
    //     localStorage.setItem('user',JSON.stringify(response.data))

    // }
    return response.data
}

//login
const login=async(userData)=>{
    const response=await axios.post('http://localhost:8000/api/users/login',userData)
    if(response.data){
        localStorage.setItem('user',JSON.stringify(response.data))
    }
    return response.data
}
const logout=()=>{
    localStorage.removeItem('user')
}

const authService={
    register,logout,login
}
export default authService