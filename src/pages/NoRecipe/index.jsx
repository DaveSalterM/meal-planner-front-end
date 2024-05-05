// import React from 'react';
import { useParams } from 'react-router-dom';
import Searchbar from '../../components/Searchbar';

const NoRecipe = () => {
	const { recipe } = useParams();

	return (
		<div>
			<Searchbar />
			<div>
				<h1>No search results for "{recipe}"</h1>
			</div>
		</div>
	);
};

export default NoRecipe;
