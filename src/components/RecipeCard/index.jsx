// import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { FaRegStar } from 'react-icons/fa';
import { FaHeart, FaRegHeart, FaStar } from 'react-icons/fa6';
// import burger from './burger.jpg';
// import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';
import './styles.css';

const RecipeCard = ({ image, id, user }) => {
	// const handleClick = (e) => {
	// 	e.preventDefault();
	// 	// console.log('?', e.target);
	// 	// console.log(e.target.getAttribute('value'));
	// 	console.log(id);
	// 	// console.log('clicked');
	// };
	const [userFavorites, setUserFavorites] = useState([]);
	// const [isLiked, setIsLiked] = useState()

	useEffect(() => {
		// console.log(user);
		if (user.favorites !== undefined) {
			setUserFavorites(user.favorites);
		}
	}, [user]);

	const handleLike = (e) => {
		e.preventDefault();
		console.log('liked');
	};

	const handleUnlike = (e) => {
		e.preventDefault();
		console.log('unliked');
	};

	return (
		<div className="card-container">
			<div className="img-card">
				<div className="favorite-button">
					{/* {isLiked ? (
						<FaStar onClick={handleClick} value={id} />
					) : (
						<FaRegStar className="test-star" onClick={handleClick} value={id} />
					)} */}
					{/* {isLiked ? (
						<AiFillHeart onClick={handleUnlike} />
					) : (
						<AiOutlineHeart onClick={handleLike} />
					)} */}
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
