import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'universal-cookie'
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'


const ModeratorsList = () => {
    const [moderators, setModerators] = useState([]);
    const [newModeratorData, setNewModeratorData] = useState({
        Name: '',
        Password: '',
    });
    const [formVisible, setFormVisible] = useState(false);

    const cookies = new Cookies();

    useEffect(() => {
        axios.get("http://localhost:4000/moderator", {
            headers: {
                authorization: cookies.get('accessToken')
            }
        }).then(res => setModerators(res.data))
    }, []);

    const handleChangeName = (event) => {
        setNewModeratorData({ ...newModeratorData, Name: event.target.value });
    };

    const handleChangePassword = (event) => {
        setNewModeratorData({ ...newModeratorData, Password: event.target.value });
    };

    const addNewModerator = () => {
        axios.post("http://localhost:4000/moderator", newModeratorData, {
            headers: {
                authorization: cookies.get('accessToken')
            }
        }).then(res => {
            setFormVisible(false);
            setModerators([...moderators, newModeratorData]);
            setNewModeratorData({
                Name: '',
                Password: '',
            })
        })
    }

    const openForm = () => {
        setFormVisible(true)
    }


    return (
        <div className='mainContainer'>
            {!formVisible && moderators.map(moderator => <div>
                <p className='moderatorText'>
                    {moderator.Name}
                </p>
            </div>)}

            {formVisible &&
                <div className = 'inputForm'>
                    <h1>Add Moderator</h1>
                    <div className='inputField'>
                        <FormControl>
                            <InputLabel htmlFor="component-outlined">Name</InputLabel>
                            <OutlinedInput
                                id="component-outlined"
                                value={newModeratorData.Name}
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
                                value={newModeratorData.Password}
                                onChange={handleChangePassword}
                                label="Password"
                            />
                        </FormControl>
                    </div>
                    <div className='inputField'>
                        <Button onClick={() => addNewModerator()} variant="contained">Add Moderator</Button>
                    </div>
                </div>
            }

            {!formVisible && <div className='inputField'>
                <Button onClick={() => openForm()} variant="contained">Add Moderator</Button>
            </div>}
        </div>
    )

}
export default ModeratorsList