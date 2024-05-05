// import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ProfileLayout = () => {
	return (
		<>
			<div className="sidebar-column">
				<ul className="sidebar">
					<li id="side-item">Favorites</li>
					<li id="side-item">Change Password</li>
					<Link to={`/profile/editrecipes`}>
						<li id="side-item">Your Recipes</li>
					</Link>
					<li id="side-items" className="sidebars">
						Logout
					</li>
				</ul>
			</div>
		</>
	);
};

export default ProfileLayout;
