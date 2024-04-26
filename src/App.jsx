// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar/index.jsx';
import CreateRecipe from './pages/CreateRecipe/index.jsx';
import Home from './pages/Home/index.jsx';
import Login from './pages/Login/index.jsx';

function App() {
	const [userId, setUserId] = useState(0);
	const [token, setToken] = useState("");
	
	//Pulls token from local storage
	// Uses API.checkToken to verify if it's valid
	// IF it is, setToken and setUserId
	// ELSE remove token from local storage
	useEffect(()=>{
		const savedToken = localStorage.getItem("token");
		if(savedToken){
			API.checkToken(savedToken).then(data=>{
				if(data.validToken){
					setToken(savedToken);
					setUserId(data.userId)
				} else {
					localStorage.removeItem("token")
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
			setUserId(data.userId);
			localStorage.setItem("token", data.token)
		})
	}
	
	// Passes object to API.login
	// API.login returns a promise
	// Sets token and userId to local storage
	const handleLogin = (obj) =>{
		API.login(obj).then(data=>{
			setToken(data.token);
			setUserId(data.userId);
			localStorage.setItem("token", data.token)
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
			<Navbar />
			<Routes>

				{/* Pass token and userId to all pages that require user to be logged in */}
				<Route path="/" element={<Home />} />
				<Route path="/createrecipe" element={<CreateRecipe />} />
				<Route path="/login" element={<Login handleLogin={handleLogin} handleSignup={handleSignup} userId={userId}/>} />
				<Route path="*" element={<h1>notFound</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
