// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/index.jsx';
import CreateRecipe from './pages/CreateRecipe/index.jsx';
import Home from './pages/Home/index.jsx';
import Profile from './pages/Profile/index.jsx';
import ShoppingList from './pages/ShoppingList/index.jsx';
import MealPlan from './pages/MealPlan/index.jsx';
import Login from './pages/Login/index.jsx';
import API from '../utils/API.js';

function App() {
	const [userId, setUserId] = useState(0);
	const [token, setToken] = useState("");
	const [user, setUser] = useState({});

	//Pulls token from local storage
	// Uses API.checkToken to verify if it's valid
	// IF it is, setToken and setUserId
	// ELSE remove token from local storage
	useEffect(()=>{
		const savedToken = localStorage.getItem("token");
		const savedUserId = localStorage.getItem("userId");
		if(savedToken){
			API.checkToken(savedToken).then(data=>{
				if(data.validToken){
					setToken(savedToken);
					setUserId(savedUserId);
					
					API.getOneUser(savedUserId).then((res) => {
						setUser(res);
					})

				} else {
					localStorage.removeItem("token");
					localStorage.removeItem("userId");
				}
			})
		}
	},[])

	// Passes object to API.signup
	// API.signup returns a promise
	// Sets token and userId to local storage
	const handleSignup = (obj) =>{
		
		API.signup(obj).then(data=>{
			setToken(data.token);
			setUserId(data._id);
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data._id);
		})
	}
	
	// Passes object to API.login
	// API.login returns a promise
	// Sets token and userId to local storage
	const handleLogin = (obj) =>{
		API.login(obj).then(data=>{
			setUserId(data.user._id);
			setToken(data.token);
			localStorage.setItem("token", data.token);
			localStorage.setItem("userId", data.user._id);
		})
	}

	// Logout: removes token from local storage
	const logout = ()=>{
		setToken("");
		setUserId(0);
		localStorage.removeItem("token")
	}
	
	return (
		<Router>
			<Navbar userId={userId}/>
			<Routes>
				{/* ============================ *IMPORTANT ============================ */}
				{/* Pass token and userId to all pages that require user to be logged in */}
				{/* ============================ *IMPORTANT ============================ */}
				<Route path="/" element={<Home user={user} userId={userId} token={token}/>} />
				<Route path="profile" element={<Profile user={user} logout={logout} userId={userId} token={token}/>} />
				<Route path="/meal-plan" element={<MealPlan user={user} userId={userId} token={token} />} />
				<Route path="/shopping-list" element={<ShoppingList user={user} userId={userId} token={token} />} />
				<Route path="/createrecipe" element={<CreateRecipe user={user} userId={userId} token={token}/>} />
				<Route path="/login" element={<Login handleLogin={handleLogin} handleSignup={handleSignup} userId={userId}/>} />
				<Route path="*" element={<h1>notFound</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
