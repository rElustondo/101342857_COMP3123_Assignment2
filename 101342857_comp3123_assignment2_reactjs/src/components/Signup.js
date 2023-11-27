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
            <input 
                type="text"
                name="username"
                onChange={(e) => onValueChanged(e)} 
                placeholder="Enter Username or email"
            />
            <input 
                type="email"
                name="email"
                onChange={(e) => onValueChanged(e)} 
                placeholder="Enter Email"
            />
            <input 
                type="password"
                name="password"
                onChange={(e) => onValueChanged(e)} 
                placeholder="Enter Password"
            />
            <input 
                name='btnSubmit'
                type="submit"
                value="Sign up" />
        </form>
        {registered && <Navigate to={"/login"}/>}
    </div>
  )
}
