// import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Recipes = () => {
	// Fetch the recipes that was searched by using the params
	// Need to create an method in API file to fetch the recipes
	// Set recipes to state
	// Render recipes to cards

	const [recipes, setRecipes] = useState(null);

	const { recipe } = useParams();

	useEffect(() => {
		console.log('reloaded');
	}, []);

	return <div>Recipes: {recipe}</div>;
};

export default Recipes;
