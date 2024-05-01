//import React from 'react';
import { Link } from 'react-router-dom';
import './styles.css';

const Navbar = (props) => {
	{
		/* ================================================== */
	}
	let loggedIn = props.userId === 0 ? false : true;
	{
		/* ================================================== */
	}

	//console.log("Navbar: ", loggedIn);
	return (
		<>
			<div id="banner">
				<h1 id="header-title">
					<Link to={'/'}>Meal Mapper</Link>
				</h1>
				<ul className="nav nav-tabs">
					<li id="nav-item">
						<Link
							key={1}
							className="nav-link"
							to={loggedIn ? '/meal-plan' : '/login'}
						>
							Meal Plan
						</Link>
					</li>
					<li id="nav-item">
						<Link
							key={1}
							className="nav-link"
							to={loggedIn ? '/shopping-list' : '/login'}
						>
							Shopping List
						</Link>
					</li>
					<li id="nav-item">
						<Link
							key={1}
							className="nav-link"
							to={loggedIn ? '/createrecipe' : '/login'}
						>
							Create a recipe
						</Link>
					</li>
					<li id="nav-item">
						<Link
							key={1}
							className="nav-link"
							to={loggedIn ? '/profile' : '/login'}
						>
							{loggedIn ? 'Profile' : 'Login'}
						</Link>
					</li>
				</ul>
			</div>
		</>
	);
};

export default Navbar;
