// import React from 'react';
import { useEffect, useState } from 'react';
// import { FaRegStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import API from '../../../utils/API';

// import FavoritesButton from '../../components/FavoriteBtn';
import RecipeCard from '../../components/RecipeCard';
import './styles.css';

const Recipes = ({ user, userId, token }) => {
	// Fetch the recipes that was searched by using the params
	// Need to create an method in API file to fetch the recipes
	// Set recipes to state
	// Render recipes to cards

	const [foundRecipes, setFoundRecipes] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	// const [userData, setUserData] = useState(null);
	// const [userFavorites, setUserFavorites] = useState([]);
	// const [testLike, setTestLike] = useState(['663158158e036292a64fd6eb']);

	const { recipe } = useParams();

	// MAYBE PASS THE USER PROPS TO THE RECIPE CARD SO THAT IT CHECKS IF IT IS LIKE THERE?????
	useEffect(() => {
		// API.getSearchedRecipe(recipe).then((data) => console.log(data));
		// API.getSearchedRecipe(recipe)
		// 	.then((response) => setFoundRecipes(response))
		// 	.then(() => {
		// 		console.log(user);
		// 		console.log(userId);
		// 		console.log(user.favorites);

		// 		// console.log('not logged in');
		// 	})
		// 	.then(() => setIsLoading(false));

		// API.getSearchedRecipe(recipe)
		// 	.then((response) => {
		// 		// setUserData(user);
		// 		console.log('user: ', user);
		// 		console.log(user.favorites);
		// 		setFoundRecipes(response);
		// 	})
		// 	.then(() => {
		// 		if (user.favorites === undefined) {
		// 			setUserFavorites([]);
		// 		} else {
		// 			setUserFavorites(user.favorites);
		// 		}
		// 	})
		// 	.then(() => {
		// 		setIsLoading(false);
		// 		console.log(isLoading);
		// 	});

		API.getSearchedRecipe(recipe)
			.then((response) => {
				setFoundRecipes(response);
			})
			.then(() => {
				// console.log(user);
				setIsLoading(false);
			});
	}, [recipe, user]);

	const handleClick = () => {
		// console.log(e.target);
		// console.log(userFavorites);
		// console.log(e.target.getAttribute('value'));
		// console.log('touched');
	};

	return (
		<div>
			Recipes: {recipe}
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="recipe-container">
					{foundRecipes.map((data) => (
						<div key={data._id} onClick={handleClick}>
							{/* {data.name} {data.user.username} */}
							{/* {data.imgUrl} */}
							{/* <input id="heart" type="checkbox" /> */}

							<Link to={`/recipes/${recipe}/${data._id}`}>
								<RecipeCard
									// recipeName={data.name}
									// user={data.user.username}
									image={data.imgUrl}
									id={data._id}
									user={user}
									userId={userId}
									token={token}

									// isLiked={userFavorites.includes(data._id) ? true : false}
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
