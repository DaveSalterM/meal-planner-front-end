// import React from 'react';
import { useEffect, useState } from 'react';
// import { FaRegStar } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import API from '../../../utils/API';

// import FavoritesButton from '../../components/FavoriteBtn';
import RecipeCard from '../../components/RecipeCard';
import Searchbar from '../../components/Searchbar';
import './styles.css';

const Recipes = ({ user, userId, token }) => {
	// Fetch the recipes that was searched by using the params
	// Need to create an method in API file to fetch the recipes
	// Set recipes to state
	// Render recipes to cards
	const navigate = useNavigate();

	const [foundRecipes, setFoundRecipes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasRecipe, setHasRecipe] = useState(true);

	const { recipe } = useParams();

	// MAYBE PASS THE USER PROPS TO THE RECIPE CARD SO THAT IT CHECKS IF IT IS LIKE THERE?????
	useEffect(() => {
		API.getSearchedRecipe(recipe)
			.then((response) => {
				if (response.length === 0) {
					// setHasRecipe(false);
					navigate(`/notfound/${recipe}`, { replace: true });
				}
				setFoundRecipes(response);
				// console.log(response.length === 0);
			})
			.then(() => {
				// console.log(user);
				// console.log(userId);
				setIsLoading(false);
			});
	}, [recipe, user]);

	// const handleClick = (e) => {

	// 	// console.log(e.target);
	// 	// console.log(userFavorites);
	// 	// console.log(e.target.getAttribute('value'));
	// 	// console.log('touched');
	// };

	return (
		<div>
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<Searchbar />
					<>
						<div className="recipe-container">
							{foundRecipes.map((data) => (
								<div key={data._id} className="recipe-card-container">
									<Link to={`/recipes/recipedish/${data._id}`}>
										<RecipeCard
											image={data.imgUrl}
											id={data._id}
											user={user}
											userId={userId}
											token={token}
										/>
									</Link>

									<div className="name-link">
										<Link to={`/recipes/recipedish/${data._id}`}>
											<h1>{data.name}</h1>
										</Link>
									</div>
									<p>By: {data.user.username}</p>
								</div>
							))}
						</div>
					</>
				</>
			)}
		</div>
	);
};

export default Recipes;
