// import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import API from '../../../utils/API';
// import burger from './burger.jpg';
// import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './styles.css';

const RecipeCard = ({ image, id, user, userId, token }) => {
	const [userFavorites, setUserFavorites] = useState([]);
	const navigate = useNavigate();

	// const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (userId !== 0) {
			API.getUserFavorites(userId).then((data) => setUserFavorites(data));
			// API.getOneUser(userId)
			// 	.then((data) => {
			// 		// setUserFavorites(data.favorites);
			// 	})
			// 	.then(() => setIsLoading(false));
		}
	}, [userId]);

	const handleLike = (e) => {
		if (userId === 0) {
			e.preventDefault();
			navigate('/login');
		} else {
			e.preventDefault();
			API.likeRecipe(userId, { recipeId: id }, token).then(() => {
				setUserFavorites([...userFavorites, id]);
			});
		}
	};

	const handleUnlike = (e) => {
		if (userId === 0) {
			e.preventDefault();
			navigate('/login');
		} else {
			e.preventDefault();
			API.unlikeRecipe(userId, { recipeId: id }, token).then(() => {
				setUserFavorites(
					userFavorites.filter((recipeId) => {
						recipeId !== id;
					})
				);
			});
		}
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
		</div>
	);
};

export default RecipeCard;
