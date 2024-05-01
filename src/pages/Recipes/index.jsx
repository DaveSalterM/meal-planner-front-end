// import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import API from '../../../utils/API';
import RecipeCard from '../../components/RecipeCard';
import './styles.css';

const Recipes = () => {
	// Fetch the recipes that was searched by using the params
	// Need to create an method in API file to fetch the recipes
	// Set recipes to state
	// Render recipes to cards

	const [foundRecipes, setFoundRecipes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { recipe } = useParams();

	useEffect(() => {
		// API.getSearchedRecipe(recipe).then((data) => console.log(data));
		API.getSearchedRecipe(recipe)
			.then((response) => setFoundRecipes(response))
			.then(() => setIsLoading(false));
	}, [recipe]);

	return (
		<div>
			Recipes: {recipe}
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="recipe-container">
					{foundRecipes.map((data) => (
						<div key={data._id}>
							{/* {data.name} {data.user.username} */}
							{/* {data.imgUrl} */}
							<Link to={`/recipes/${recipe}/${data._id}`}>
								<RecipeCard
									recipeName={data.name}
									user={data.user.username}
									image={data.imgUrl}
								/>
							</Link>
							<div className="name-link">
								<Link to={`/recipes/${recipe}/${data._id}`}>
									<h1>{data.name}</h1>
								</Link>
							</div>
							<p>By: {data.user.username}</p>
							{/* <h1>{recipeName}</h1>
							<p>By: {user}</p> */}
							{/* {data._id} */}
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Recipes;
