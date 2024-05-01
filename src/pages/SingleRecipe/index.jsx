// import React from 'react';
import { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import API from '../../../utils/API';

import './styles.css';

const SingleRecipePage = () => {
	const [recipeData, setRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const { recipeId } = useParams();

	useEffect(() => {
		// console.log(recipeId);
		API.getSingleRecipe(recipeId)
			.then((response) => setRecipeData(response))
			.then(() => setIsLoading(false));
	}, [recipeId]);

	return (
		<div className="recipe-data">
			{/* SingleRecipePage */}
			{/* <div>{recipeId}</div> */}
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div className="recipe-header">
						<div>
							<h1>{recipeData.name}</h1>
							<p>{recipeData.user.username}</p>
						</div>
						<div className="serv-cal-star">
							<p>{recipeData.servings} serving</p>
							<p>{recipeData.calories} calories</p>
							<FaRegStar />
						</div>
					</div>
					<div className="recipe-data-container">
						<div>
							<div className="image-buttons">
								<img src={recipeData.imgUrl} alt="" />
								<div>
									<button type="button">Add to shopping list</button>
									<button type="button">Add to meal plan</button>
								</div>
							</div>
						</div>
						<div className="ingredients-instruction-container">
							<div className="recipe-ingredients">
								<h2>Ingredients</h2>
								<ul>
									{recipeData.ingredients.map((ingredient, i) => (
										<li key={i}>
											{ingredient.amount} {ingredient.unit}{' '}
											{ingredient.ingredient}
										</li>
									))}
								</ul>
							</div>
							<div className="recipe-instructions">
								<h2>Instructions</h2>
								<ol>
									{recipeData.instructions.map((instruction, i) => (
										<li key={i}>{instruction}</li>
									))}
								</ol>
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleRecipePage;
