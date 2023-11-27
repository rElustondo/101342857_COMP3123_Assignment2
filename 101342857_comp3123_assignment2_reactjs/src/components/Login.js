import React, { useState, useContext, createContext } from 'react'
import axios from 'axios'
import { useUser } from '../App';
import { Navigate } from 'react-router';
import { Link } from 'react-router-dom';

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
            <form onSubmit={(e) => onSubmitForm(e)}>
                <input 
                    type="text"
                    name="username"
                    onChange={(e) => onValueChanged(e)} 
                    placeholder="Enter Username or email"
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
                    value="Login" />
            </form>
            {userData.jwt_token && <Navigate to={"/"}/>}
            <Link to="/signup">Sign up</Link>
        </div>
    )
}
