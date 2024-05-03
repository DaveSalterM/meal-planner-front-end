// import React from 'react';
import RecipeCard from '../../components/RecipeCard';
import Searchbar from '../../components/Searchbar';
import './styles.css';

const Home = (props) => {
	// console.log('Home page props: ', props);
	return (
		<div>
			<Searchbar />
			<div>
				{/* <RecipeCard /> */}
			</div>
		</div>
	);
};

export default Home;
