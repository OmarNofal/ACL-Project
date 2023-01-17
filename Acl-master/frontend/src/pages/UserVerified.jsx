import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import axios from 'axios'




function UserVerified() {

    const [isVerified, setIsVerified] = useState(undefined);
    const [errorMessage, setErrorMessage] = useState("");

    const [searchParams, setSearchParams] = useSearchParams();
    const username = searchParams.get('username');
    const hash = searchParams.get('hash');

    useEffect(() => {

        console.log(username + hash);
        axios({
            method: "GET",
            url: `http://localhost:8000/api/users/verifyUser?username=${username}&hash=${hash}`
        }).then(res => {
            const data = res.data;
            if (data.result == 'ok')
                setIsVerified(true)
            else {
                setIsVerified(false)
                setErrorMessage(data.message);
            }
        }).catch(() =>
            {setIsVerified(false); setErrorMessage("You are already verified")}
        )

    });

    let message = "";
    if (isVerified == undefined)
        message = "Verifying...Please don't close this window";
    else if (isVerified == false) {
        message = errorMessage;
    } else {
        message = "You have been verified. You can now close this page and login";
    }

    return (
        <div>
            <h2 className='center-screen'>{message}</h2>
        </div>
    );
}


export default UserVerified;
