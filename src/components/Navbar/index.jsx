//import React from 'react';
import { Link } from 'react-router-dom'
import './styles.css';

const Navbar = () => {
{/* ================================================== */}
		const loggedIn = false;
{/* ================================================== */}	
	
	return (
		<>
		<div className="container">
			<h1>Meal Mapper</h1>
			<ul className="nav nav-tabs">
				<li id="nav-item">
					<Link
						key={1}
						className="nav-link" 
						to={loggedIn ? "/meal-plan" : "/login"}>
							Meal Plan 
					</Link>
				</li>
				<li id="nav-item">
					<Link 
						key={1} 
						className="nav-link" 
						to={loggedIn ? "/shopping-list" : "/login"}>
							Shopping List 
					</Link>
				</li>
				<li id="nav-item">
					<Link 
						key={1} 
						className="nav-link" 
						to={loggedIn ? "/create-recipe" : "/login"}>
							Create a recipe 
					</Link>
				</li>
				<li id="nav-item">
					<Link 
						key={1} 
						className="nav-link" 
						to={loggedIn ? "/profile" : "/login"}>
						{loggedIn ? "Profile" : "Login"} 
					</Link>
				</li>
			</ul>
		</div>
		</>
	);
};

export default Navbar;
