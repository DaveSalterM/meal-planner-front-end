import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
<h1>Profile</h1>

const Profile = (props) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Perform logout logic here
        props.logout();
        navigate('/login'); // Redirect to login page after logout
    };

    return (
       
        <div className='sidebar-column'>
           <ul className="sidebar">
					<li id="side-item">
						 Favorites
					</li>
                    <li id="side-item">
						Change Password
					</li>
					
                    <li id="side-item">
						Edit Recipes
					</li>
					<li id="side-item">
						Your Recipes
					</li>
                    <li id="side-items"
					
                        className="sidebars"
							onClick={handleLogout}>Logout
					</li>
				</ul>
			</div>

    );
};

export default Profile;