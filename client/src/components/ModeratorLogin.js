import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import axios from 'axios'
import Cookies from 'universal-cookie'
import jwt from 'jwt-decode'
import NavBar from './NavBar';




function ModeratorLogin() {
    const cookies = new Cookies();

    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const [message, setMessage] = React.useState("");

    const handleChangeName = (event) => {
        setName(event.target.value);
    };

    const handleChangePass = (event) => {
        setPassword(event.target.value);
    };

    function handleClick(name, password) {
        const moderator = {
            Name: name,
            Password: password
        }

        axios.post("http://localhost:4000/moderator/login", moderator)
            .then(res => {
                console.log(res.data)
                if (res.data === "Moderator not found" || res.data === "Password is incorrect") {
                    setMessage(res.data);
                } else {
                    const accessToken = res.data.accessToken;
                    const decoded = jwt(accessToken)
                    cookies.set("accessToken", decoded)
                    setMessage("");
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
                        <h1>Moderator Login</h1>
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
                                    type='password'
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

export default ModeratorLogin;