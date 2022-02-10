import { Button } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'

const Home = () => {
    return (
        <div>
            <h1>Welcome To Yooda Hostel</h1>
            <h2>"Please Click On the Admin Dashboard Button"</h2>
            <Link to={"/dashboard"}>

                <Button className='btn' variant="contained"> Admin Dashboard</Button>
            </Link >
        </div>
    );
};

export default Home;