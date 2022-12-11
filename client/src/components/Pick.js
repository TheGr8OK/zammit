import * as React from 'react';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

function Pick() {

    return (
        <div className='mainContainer'>
            <div className='pickForm'>
                <div className='pickUser'>
                    <Link to='/adminLogin'>
                        <Button variant="contained">Admin Login</Button>
                    </Link>
                </div>
                <div className='pickUser'>
                    <Link to='/moderatorLogin'>
                        <Button variant="contained">Moderator Login</Button>
                    </Link>
                </div>
                <div className='pickUser'>
                    <Link to='/movies'>
                        <Button variant="contained">Continue as a Guest</Button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Pick;