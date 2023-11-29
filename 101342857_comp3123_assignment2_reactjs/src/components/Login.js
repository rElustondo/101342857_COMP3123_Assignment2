import React, { useState, useContext, createContext } from 'react'
import axios from 'axios'
import { useUser } from '../App';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';
import { Button, TextField } from '@mui/material';

const UserContext = createContext()
export default function Login() {
    const { userData, setUserData } = useUser();
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })
    debugger
    const onSubmitForm = async (event) => {
        event.preventDefault()
        try {
            var res = await axios.post("http://localhost:8089/api/v1/user/login", userDetails)
            //save user data
            localStorage.setItem("user", JSON.stringify(res.data));
            setUserData(res.data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
        console.log('Form Submitted: ' + JSON.stringify(userDetails))
    }

    const onValueChanged = (event) => {
        setUserDetails({
            ...userDetails,
            [event.target.name]: event.target.value
        })
    }
    return (
        <div>
            <h1>Login</h1>
            <form onSubmit={(e) => onSubmitForm(e)}>
                <div className='inputDiv'>
                    <TextField 
                        label="username"
                        name="username"
                        onChange={(e) => onValueChanged(e)} 
                        placeholder="Enter Username or email"
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
                        value="Login"
                    />
                </div>
               
            </form>
            {userData.jwt_token && <Navigate to={"/"}/>}
            <Button component={Link} to="/signup">Sign up</Button>
        </div>
    )
}
