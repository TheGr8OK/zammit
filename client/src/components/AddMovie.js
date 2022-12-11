import React, { useEffect, useState } from 'react'
import Cookies from 'universal-cookie'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Button, FormControl, InputLabel, OutlinedInput } from '@mui/material'



const AddMovie = () => {
    const [newMovieData, setNewMovieData] = useState({
        Title: '',
        Released: '',
        imgURL: ''
    });
    const [message, setMessage] = useState("");

    const navigate = useNavigate()
    const cookies = new Cookies();

    if(cookies.get("accessToken") === ""){
        navigate("/")
    }


    const handleChangeTitle = (event) => {
        setNewMovieData({ ...newMovieData, Title: event.target.value });
    };
    const handleChangeReleased = (event) => {
        setNewMovieData({ ...newMovieData, Released: event.target.value });
    };
    const handleChangeImg = (event) => {
        setNewMovieData({ ...newMovieData, imgURL: event.target.value });
    };

    const addNewMovie = () => {
        axios.post("http://localhost:4000/movie", newMovieData, {
            headers: {
                authorization: cookies.get('accessToken')
            }
        }).then(res => {
            console.log(res)
            if (res.data === "Unauthorized") {
                setMessage(res.data);
            } else {
                setMessage("")
                setNewMovieData({
                    Name: '',
                    Password: '',
                })
                window.alert("Movie added successfully");
                window.location.reload();
            }
        })
    }

    return (
        <div className='mainContainer'>
            <div className='inputForm'>
                <h1>Add Movie</h1>
                <div className='inputField'>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Movie Title</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={newMovieData.Title}
                            onChange={handleChangeTitle}
                            label="Movie Title"
                        />
                    </FormControl>
                </div>
                <div className='inputField'>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Released At (dd/mm/yyyy)</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={newMovieData.Released}
                            onChange={handleChangeReleased}
                            label="Released At (dd/mm/yyyy)"
                        />
                    </FormControl>
                </div>
                <div className='inputField'>
                    <FormControl>
                        <InputLabel htmlFor="component-outlined">Poster URL</InputLabel>
                        <OutlinedInput
                            id="component-outlined"
                            value={newMovieData.imgURL}
                            onChange={handleChangeImg}
                            label="Poster URL"
                        />
                    </FormControl>
                </div>
                <div className='inputField'>
                    <Button onClick={() => addNewMovie()} variant="contained">Add Movie</Button>
                </div>
                <div>{message}</div>
            </div>
        </div>
    )
}

export default AddMovie

