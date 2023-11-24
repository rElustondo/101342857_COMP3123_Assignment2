import React, { useState } from 'react'
import axios from 'axios'


export default function Login() {
    const [userDetails, setUserDetails] = useState({
        username: '',
        password: ''
    })

    const onSubmitForm = async (event) => {
        event.preventDefault()
        try {
            var res = await axios.post("https://impossible-flannel-nightgown-worm.cyclic.app/api/v1/user/login/", userDetails)
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
        </div>
    )
}
