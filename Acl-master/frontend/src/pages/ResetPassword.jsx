import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'





function ResetPasswordPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const [passwordText, setPasswordText] = useState("");


    const username = searchParams.get('username');
    const hash = searchParams.get('hash');




    const onSubmitForm = (e) => {
        e.preventDefault();
        
        const newPassword = e.target.elements.password.value;
        if (newPassword.length < 1) {
            toast.error("Fill the password");
            return;
        }
        axios(
            {
                method: "POST",
                url: "http://localhost:8000/api/users/resetPassword",
                data: {
                    username: username,
                    hash: hash,
                    newPassword: newPassword
                }
            }
        ).then( ( res => { toast.success("Password reset successfuly") } ) )
        .catch(res => { toast.error("There was an error whil resetting") } )

    }

    return (
        <div className='form-group'>
            
            <h3>Hello {username}, Reset your password here</h3>
            <br/><br/>
            <form onSubmit={onSubmitForm}>
                <label>New Password</label>
            <input type={"password"} 
            name={"password"}
            onChange={event=>{setPasswordText(event.target.value)}} 
            value={passwordText}
            placeholder="Password..."/>
            <input type="submit" value={"Reset Password"}/>
            </form>


        </div>
    )

    

}




export default ResetPasswordPage;