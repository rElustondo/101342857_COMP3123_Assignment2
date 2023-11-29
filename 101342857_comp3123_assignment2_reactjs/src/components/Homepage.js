import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router';
import { useUser } from '../App';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: 'green',
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function Homepage() {
    const { userData, setUserData } = useUser();
    let [empData, setEmpData] = useState([])
    let [deletedID, setDeletedID] = useState(null)
    debugger
    useEffect(() => {
        debugger
        const getEmployees = async () => {
            try {
                const employeeData = await axios.get(
                    "http://localhost:8089/api/v1/emp/employees/",
                    {
                        headers: {
                            Authorization: userData.jwt_token
                        }
                    }
                );

                setEmpData(employeeData.data)
            } catch (error) {
                console.log(error)
            }
        }
        if (userData && userData.jwt_token) {
            getEmployees()
        }
    }, [userData, deletedID])

    const deleteButton = async (id) => {
        debugger
        try {
            debugger
            const response = await axios.delete(`http://localhost:8089/api/v1/emp/employees?eid=${id}`, {
                headers: {
                    Authorization: userData.jwt_token
                }
            })
            debugger

            console.log("deleted", response)
            setDeletedID(response.data._id)
        } catch (error) {
            console.log(error)
        }
    }
    const signOut = () => {
        localStorage.removeItem("user");
        setUserData({})
    }
    return userData.jwt_token ? (
        <Paper elevation={3} >
            <h1 style={{ textAlign: "center" }}>Employees List</h1>

            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell>First Name</StyledTableCell>
                            <StyledTableCell align="right">Last Name</StyledTableCell>
                            <StyledTableCell align="right">Email</StyledTableCell>
                            <StyledTableCell align="right">Actions</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {empData.map((emp, i)=> (
                            <StyledTableRow key={emp.email}>
                                <StyledTableCell component="th" scope="row">
                                    {emp.first_name}
                                </StyledTableCell>
                                <StyledTableCell align="right">{emp.last_name}</StyledTableCell>
                                <StyledTableCell align="right">{emp.email}</StyledTableCell>
                                <StyledTableCell align="right">
                                    <div>
                                        <div>
                                            <Button component={Link} to={`/add-employee/${i}`} color="primary">Update</Button>
                                        </div>
                                        <div>
                                            <Button onClick={() => { deleteButton(emp._id) }}  color="warning">Delete</Button>
                                        </div>
                                        <div>
                                            <Button component={Link} to={`/view-employee/${i}`} color="primary">View</Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Button component={Link} to="/add-employee/_add" color="primary">Add Employee</Button>
            <Button onClick={() => { signOut() }}>log out</Button>
        </Paper>
    ) : (
        <Navigate to={'/login'} />
    )
}
