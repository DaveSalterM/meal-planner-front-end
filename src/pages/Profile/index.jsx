import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

<h1>Profile</h1>

const Profile = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        props.logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
        <div>
            <h1>Profile</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Profile;