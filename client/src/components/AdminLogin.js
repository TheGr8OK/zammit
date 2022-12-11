import * as React from 'react';
import { useState } from 'react'
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import { useNavigate } from 'react-router-dom';
import NavBar from './NavBar';



function AdminLogin() {
    const cookies = new Cookies();
    const navigate = useNavigate()
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const [message, setMessage] = useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangePass = (event) => {
        setPassword(event.target.value);
    };

    function handleClick(name, password) {
        const admin = {
            Name: name,
            Password: password
        }

        axios.post("http://localhost:4000/admin/login", admin)
            .then(res => {
                console.log(res.data)
                if (res.data === "Admin not found" || res.data === "Password is incorrect") {
                    setMessage(res.data);
                } else {
                    const accessToken = res.data.accessToken;
                    // const decoded = jwt(accessToken)
                    cookies.set("accessToken", accessToken)
                    setMessage("");
                    navigate('/moderators')

                    window.location.reload()
                }
            })
    }


    return (
        <div className='mainContainer'>
            <div className='inputForm'>
                <Box
                    component="form"
                    sx={{
                        '& > :not(style)': { m: 1 },
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <div>
                        <h1>Admin Login</h1>
                        <div className='inputField'>
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">Name</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={name}
                                    onChange={handleChangeName}
                                    label="Name"
                                />
                            </FormControl>
                        </div>
                        <div className='inputField'>
                            <FormControl>
                                <InputLabel htmlFor="component-outlined">Password</InputLabel>
                                <OutlinedInput
                                    id="component-outlined"
                                    value={password}
                                    onChange={handleChangePass}
                                    label="Password"
                                />
                            </FormControl>
                        </div>
                        <div className='inputField'>
                            <Button onClick={() => handleClick(name, password)} variant="contained">Login</Button>
                        </div>
                        <div>{message}</div>
                    </div>
                </Box>

            </div>
        </div>
    )
}

export default AdminLogin;