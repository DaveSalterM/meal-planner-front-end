// import React from 'react'

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import API from '../../../utils/API';
import ProfileLayout from '../ProfileLayout';

import RecipeCard from '../RecipeCard';
import './styles.css';

const Favorites = ({ user, userId, token }) => {
	const [isLoading, setIsLoading] = useState(true);
	const [userFavorites, setUserFavorites] = useState(null);

	useEffect(() => {
		if (userId !== 0 && Object.keys(user).length !== 0) {
			// console.log('passed check');
			API.getOneUser(userId)
				.then((user) => {
					console.log(user.favorites);
					setUserFavorites(user.favorites);
				})
				.then(() => setIsLoading(false));
		}
	}, [userId, user]);

	return (
		<div className="favorites-container">
			<ProfileLayout />
			{isLoading ? (
				<h1>Loading</h1>
			) : (
				<div className='favorites'>
					{userFavorites.map((favorite) => (
						<div className='hi' key={favorite._id}>
							<Link to={`/recipes/recipedish/${favorite._id}`}>
								<RecipeCard
									image={favorite.imgUrl}
									id={favorite._id}
									user={user}
									userId={userId}
									token={token}
								/>
							</Link>
							<div className="name-link">
								<Link to={`/recipes/recipedish/${favorite._id}`}>
									<h1>{favorite.name}</h1>
								</Link>
							</div>
							<p>By: {favorite.user.username}</p>
						</div>
					))}
				</div>
			)}
		</div>
	);
};

export default Favorites;
