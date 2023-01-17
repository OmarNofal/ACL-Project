import React from 'react'
import { useRef,useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'






function ResetPasswordPage() {

    const [searchParams, setSearchParams] = useSearchParams();

    const username = searchParams.get('username');
    const hash = searchParams.get('hash');


    

}