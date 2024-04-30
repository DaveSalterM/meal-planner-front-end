// import React from 'react';
import { FaRegStar } from 'react-icons/fa';
import burger from './burger.jpg';

import './styles.css';

const RecipeCard = () => {
	const testRecipe = [
		{
			_id: '662fe7ba9456a39cfc3460ec',
			name: 'Test Recipe Final',
			ingredients: [
				{
					ingredient: 't',
					amount: '1',
					unit: 'g',
				},
				{
					ingredient: 's',
					amount: '2',
					unit: 'lb',
				},
				{
					ingredient: 'r',
					amount: '3',
					unit: 'cup',
				},
			],
			instructions: ['instruction 1', 'instruction 2', 'instruction 3'],
			calories: 500,
			user: {
				_id: '6629aeab18fb7183f6fe23d8',
				username: 'testUser2',
			},
			reviews: [],
			__v: 0,
		},
	];
	return (
		<div className="card-container">
			<div className="img-card">
				<div className="favorite-button">
					<FaRegStar />
				</div>
				<img src={burger} alt="burger" />
			</div>
			<h1>{testRecipe[0].name}</h1>
			<p>By: {testRecipe[0].user.username}</p>
			<img src="http://localhost:3001/uploads/image-1714443178086.jpg" alt="" />
		</div>
	);
};

export default RecipeCard;
