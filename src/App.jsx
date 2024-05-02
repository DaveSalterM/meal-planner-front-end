// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import API from '../utils/API.js';
import './App.css';
import Navbar from './components/Navbar/index.jsx';
import CreateRecipe from './pages/CreateRecipe/index.jsx';
import Home from './pages/Home/index.jsx';
// <<<<<<< HEAD
// =======
// import Profile from './pages/Profile/index.jsx';
import MealPlan from './pages/MealPlan/index.jsx';
import ShoppingList from './pages/ShoppingList/index.jsx';
// >>>>>>> dev
import Login from './pages/Login/index.jsx';
import Profile from './pages/Profile/index.jsx';
import Recipes from './pages/Recipes/index.jsx';
import SingleRecipePage from './pages/SingleRecipe/index.jsx';

function App() {
	const [userId, setUserId] = useState(0);
	// <<<<<<< HEAD
	// 	const [token, setToken] = useState('');
	// =======
	const [token, setToken] = useState('');
	const [user, setUser] = useState({});
	// >>>>>>> dev

	//Pulls token from local storage
	// Uses API.checkToken to verify if it's valid
	// IF it is, setToken and setUserId
	// ELSE remove token from local storage
	useEffect(() => {
		const savedToken = localStorage.getItem('token');
		const savedUserId = localStorage.getItem('userId');
		if (savedToken) {
			API.checkToken(savedToken)
				.then((data) => {
					if (data.validToken) {
						setToken(savedToken);
						setUserId(savedUserId);

						// API.getOneUser(savedUserId).then((res) => {
						// 	setUser(res);
						// });
					} else {
						localStorage.removeItem('token');
						localStorage.removeItem('userId');
					}
				})
				.then(() =>
					API.getOneUser(savedUserId).then((res) => {
						setUser(res);
					})
				);
		}
	}, [token]);

	// Passes object to API.signup
	// API.signup returns a promise
	// Sets token and userId to local storage
	// <<<<<<< HEAD
	// 	const handleSignup = (obj) => {
	// 		API.signup(obj).then((data) => {
	// 			setToken(data.token);
	// 			setUserId(data.user._id);
	// 			localStorage.setItem('token', data.token);
	// 			localStorage.setItem('userId', data.user._id);
	// 		});
	// 	};

	// =======
	const handleSignup = (obj) => {
		API.signup(obj).then((data) => {
			setToken(data.token);
			setUserId(data.userData._id);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.userData._id);
		});
	};

	// >>>>>>> dev
	// Passes object to API.login
	// API.login returns a promise
	// Sets token and userId to local storage
	const handleLogin = (obj) => {
		API.login(obj).then((data) => {
			// console.log(data);
			setUserId(data.user._id);
			setToken(data.token);
			localStorage.setItem('token', data.token);
			localStorage.setItem('userId', data.user._id);
		});
	};

	// Logout: removes token from local storage
	const logout = () => {
		setToken('');
		setUserId(0);
		setUser({});
		localStorage.removeItem('token');
		localStorage.removeItem('userId');
	};

	return (
		<Router>
			<Navbar userId={userId} />
			<Routes>
				{/* ============================ *IMPORTANT ============================ */}
				{/* Pass token and userId to all pages that require user to be logged in */}
				{/* ============================ *IMPORTANT ============================ */}
				{/* <<<<<<< HEAD */}
				<Route path="/" element={<Home userId={userId} token={token} />} />
				<Route
					path="profile"
					element={<Profile logout={logout} userId={userId} token={token} />}
				/>
				<Route
					path="/meal-plan"
					element={<MealPlan user={user} userId={userId} token={token} />}
				/>
				<Route
					path="/shopping-list"
					element={<ShoppingList user={user} userId={userId} token={token} />}
				/>
				<Route
					path="/createrecipe"
					element={<CreateRecipe userId={userId} token={token} />}
				/>
				<Route
					path="/login"
					element={
						<Login
							handleLogin={handleLogin}
							handleSignup={handleSignup}
							userId={userId}
						/>
					}
				/>
				<Route
					path="/recipes/:recipe"
					element={<Recipes user={user} userId={userId} token={token} />}
				/>
				<Route
					path="/recipes/:recipe/:recipeId"
					element={<SingleRecipePage userId={userId} token={token} />}
				/>
				{/* =======
				<Route path="/" element={<Home user={user} userId={userId} token={token}/>} />
				<Route path="profile" element={<Profile user={user} logout={logout} userId={userId} token={token}/>} />
				<Route path="/meal-plan" element={<MealPlan user={user} userId={userId} token={token} />} />
				<Route path="/shopping-list" element={<ShoppingList user={user} userId={userId} token={token} />} />
				<Route path="/createrecipe" element={<CreateRecipe user={user} userId={userId} token={token}/>} />
				<Route path="/login" element={<Login handleLogin={handleLogin} handleSignup={handleSignup} userId={userId}/>} />
>>>>>>> dev */}
				<Route path="*" element={<h1>notFound</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
