// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/index.jsx';
import CreateRecipe from './pages/CreateRecipe/index.jsx';
import Home from './pages/Home/index.jsx';

function App() {
	// const [count, setCount] = useState(0);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/createrecipe" element={<CreateRecipe />} />
				<Route path="*" element={<h1>notFound</h1>} />
			</Routes>
		</Router>
	);
}

export default App;
