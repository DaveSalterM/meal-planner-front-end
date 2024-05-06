// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileLayout = ({ logout }) => {
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate('/login');
	};

	return (
		<>
			<div className="sidebar-column">
				<ul className="sidebar">
					<Link to={'/profile/favorites'}>
						<li id="side-item">Favorites</li>
					</Link>
					<Link to={'/profile/changepassword'}>
						<li id="side-item">Change Password</li>
					</Link>
					<Link to={`/profile/editrecipes`}>
						<li id="side-item">Your Recipes</li>
					</Link>
					<li id="side-items" className="sidebars" onClick={handleLogout}>
						Logout
					</li>
				</ul>
			</div>
		</>
	);
};

export default ProfileLayout;
