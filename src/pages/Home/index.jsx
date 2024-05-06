// import React from 'react';
import { useEffect, useState } from 'react';
import API from '../../../utils/API';
import RecipeCard from '../../components/RecipeCard';
import Searchbar from '../../components/Searchbar';

import { Link } from 'react-router-dom';
import './styles.css';

const Home = ({ user, userId, token }) => {
	const [bestRecipes, setBestRecipes] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		API.getSortedRecipes()
			.then((response) => {
				setBestRecipes(response);
				console.log(response);
			})
			.then(() => setIsLoading(false));
	}, []);

	return (
		<div>
			{isLoading ? (
				<h1>Loading</h1>
			) : (
				<>
					<Searchbar />
					<div>
						<h1 className="home-title">Featured Recipes</h1>
					</div>
					<div className="best-recipe-container">
						{bestRecipes.map((data) => (
							<div key={data._id} className="recipe-card-container">
								<div>
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
							</div>
						))}
					</div>
				</>
			)}
		</div>
	);
};

export default Home;
