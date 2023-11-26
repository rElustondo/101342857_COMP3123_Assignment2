import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useUser } from '../App';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';


export default function AddEmployee() {
    const { userData, setUserData } = useUser();
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [employeeDetails, setEmployeeDetails] = useState({
        first_name: '',
        last_name: '',
        email:'',
        gender:'',
        salary:''
    })
    const onSubmitForm = async (event) => {
        event.preventDefault()
        debugger
         console.log(JSON.stringify(employeeDetails))
        try {
            var res = await axios.post("http://localhost:8089/api/v1/emp/employees", {...employeeDetails,jwtToken:userData.jwt_token})
            console.log(res)
          
        } catch (error) {
            console.log(error)
        }
        setFormSubmitted(true)
        console.log('Form Submitted: ' + JSON.stringify(employeeDetails))
    }

    const onValueChanged = (event) => {
        setEmployeeDetails({
            ...employeeDetails,
            [event.target.name]: event.target.value
        })
    }
  return userData.jwt_token ? (
    <div>
        <h1>Add Employee</h1>
        <form onSubmit={(e) => onSubmitForm(e)}>
            <input type='text' onChange={onValueChanged} placeholder='first name' name='first_name'/>
            <input type='text' onChange={onValueChanged} placeholder='last name' name='last_name'/>
            <input type='text' onChange={onValueChanged} placeholder='email' name='email'/>
            <input type='text' onChange={onValueChanged} placeholder='gender' name='gender'/>
            <input type='text' onChange={onValueChanged} placeholder='salary' name='salary'/>
            <input type='submit' />
        </form>
        <Link to="/">Cancel</Link>
        {formSubmitted && <Navigate to={"/"}/>
        }
    </div>
  ) :  (
    <Navigate to={'/login'}/>
  )
}
