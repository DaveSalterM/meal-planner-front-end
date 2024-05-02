// import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import API from '../../../utils/API';
// import burger from './burger.jpg';
// import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './styles.css';

const RecipeCard = ({ image, id, user, userId, token }) => {
	const [userFavorites, setUserFavorites] = useState([]);

	useEffect(() => {
		// console.log(user);
		if (userId !== 0) {
			API.getOneUser(userId).then((data) => {
				setUserFavorites(data.favorites);
			});
		}
	}, [userId]);

	const handleLike = (e) => {
		e.preventDefault();
		API.likeRecipe(userId, { recipeId: id }, token).then(() => {
			setUserFavorites([...userFavorites, id]);
		});
	};

	const handleUnlike = (e) => {
		e.preventDefault();
		API.unlikeRecipe(userId, { recipeId: id }, token).then(() => {
			setUserFavorites(
				userFavorites.filter((recipeId) => {
					recipeId !== id;
				})
			);
		});
	};

	return (
		<div className="card-container">
			<div className="img-card">
				<div className="favorite-button">
					{userFavorites.includes(id) ? (
						<AiFillHeart onClick={handleUnlike} />
					) : (
						<AiOutlineHeart onClick={handleLike} />
					)}
				</div>
				<img src={image} alt="burger" />
			</div>
			{/* <h1>{recipeName}</h1>
			<p>By: {user}</p> */}
			{/* <img src="http://localhost:3001/uploads/image-1714443178086.jpg" alt="" /> */}
		</div>
	);
};

export default RecipeCard;
