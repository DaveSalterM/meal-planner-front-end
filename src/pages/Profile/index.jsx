import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './styles.css';
// import EditRecipe from '../../components/EditRecipe';
<h1>Profile</h1>;

const Profile = (props) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		// Perform logout logic here
		props.logout();
		navigate('/login'); // Redirect to login page after logout
	};

	return (
		<div>
			<div className="sidebar-column">
				<ul className="sidebar">
					<Link to={'/profile/favorites'}>
						<li id="side-item">Favorites</li>
					</Link>
					<li id="side-item">Change Password</li>
					<Link to={`/profile/editrecipes`}>
						<li id="side-item">Your Recipes</li>
					</Link>
					<li id="side-items" className="sidebars" onClick={handleLogout}>
						Logout
					</li>
				</ul>
			</div>
            <div className='test'>
                
        
            </div>
            </div>
    
    );
};

export default Profile;
