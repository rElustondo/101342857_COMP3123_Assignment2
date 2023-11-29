import { TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import { Navigate } from 'react-router'

export default function Signup() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        email:'',
        password: ''
    })
    const [registered, setRegistered] = useState(false)
    const onValueChanged = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        })
    }
    const onSubmitForm = async (event) => {
        event.preventDefault()
        try {
            var res = await axios.post("http://localhost:8089/api/v1/user/signup", userDetails)
            //save user data
            setRegistered(true)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        console.log('Form Submitted: ' + JSON.stringify(userDetails))
    }
  return (
    <div>
        <h1>Sign up</h1>
        <form onSubmit={(e) => onSubmitForm(e)}>
            <div className='inputDiv'>
                <TextField 
                    label="Username"
                    name="username"
                    onChange={(e) => onValueChanged(e)} 
                    placeholder="Enter Username"
                />
            </div>
            <div className='inputDiv'>
                <TextField 
                    label="Email"
                    name="email"
                    onChange={(e) => onValueChanged(e)} 
                    placeholder="Enter email"
                />
            </div>
            <div className='inputDiv'>
                <TextField
                    label="Password"
                    type='password'
                    name="password"
                    onChange={(e) => onValueChanged(e)} 
                    placeholder="Enter Password"
                />
            </div>
            <div className='inputDiv'>
                <TextField 
                    name='btnSubmit'
                    type="submit"
                    value="Sign up" />
            </div>
        </form>
        {registered && <Navigate to={"/login"}/>}
    </div>
  )
}
