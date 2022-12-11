import React from 'react'
import "../App.css"

const Movie = ({ data }) => {
    return (
        <div className='movie'>
                            <img src={data.imgURL} alt="alternatetext" width="200px" height="320px"/>

            <div className='movieData'>
                    <label className='movieText'>{"Title :  " + data.Title}  </label>
                    <br />
                    <label className='movieText'>{"Released :  " + data.Released}  </label>
                    <br />
            </div>

            <br />

        </div>)
}

export default Movie