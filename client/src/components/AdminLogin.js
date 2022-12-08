import * as React from 'react';
import FormControl from '@mui/material/FormControl';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';



function AdminLogin() {
    const [name, setName] = React.useState();
    const [password, setPassword] = React.useState();


    const handleChange = (event) => {
        setName(event.target.value);
    };

    function handleClick(){

    }


    return (
        <div className='inputField'>
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
            >
                <div>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Name</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={name}
                            onChange={handleChange}
                            label="Name"
                        />
                    </FormControl>
                </div>
                <div>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Password</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={password}
                            onChange={handleChange}
                            label="Password"
                        />
                    </FormControl>
                </div>
                <div>
                    <Button onClick={handleClick} variant="contained">Login</Button>
                </div>
            </Box>
        </div>
    )
}

export default AdminLogin;