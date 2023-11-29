import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useUser } from '../App';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { Button, Paper, TextField } from '@mui/material';


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
    <Paper elevation={3} style={{width: "fit-content", padding: "50px"}} >
        <h1>Add Employee</h1>
        <form onSubmit={(e) => onSubmitForm(e)}>
            <div>
                <TextField label="First Name" variant="standard" onChange={onValueChanged} name='first_name' />
            </div>
            <div>
                <TextField label="Last Name" variant="standard" onChange={onValueChanged} name='last_name' />
            </div>
            <div>
                <TextField label="Email" variant="standard" onChange={onValueChanged} name='email' />
            </div>
            <div>
                <TextField label="Gender" variant="standard" onChange={onValueChanged} name='gender'  />
            </div>
            <div>
                <TextField label="Salary" variant="standard" onChange={onValueChanged} name='salary' />
            </div>
            <Button type='submit' >Submit</Button>
        </form>
        <Button component={Link} to="/" color='primary'>Cancel</Button>
        {formSubmitted && <Navigate to={"/"}/>
        }
    </Paper>
  ) :  (
    <Navigate to={'/login'}/>
  )
}


