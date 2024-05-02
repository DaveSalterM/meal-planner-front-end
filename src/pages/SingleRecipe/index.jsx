// import React from 'react';
import { useEffect, useState } from 'react';
import { FaRegStar } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';
import API from '../../../utils/API';

import ReviewCard from '../../components/ReviewCard';
import './styles.css';

const SingleRecipePage = ({ token }) => {
	const { recipeId } = useParams();

	const [recipeData, setRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [showReview, setShowReview] = useState(false);
	const [reviewContent, setReviewContent] = useState('');
	const [refresh, setRefresh] = useState(true);

	useEffect(() => {
		// console.log(recipeId);
		API.getSingleRecipe(recipeId)
			.then((response) => {
				setRecipeData(response);
				// console.log(response);
			})
			.then(() => setIsLoading(false));
	}, [recipeId, refresh]);

	const handleClick = () => {
		console.log(recipeData.reviews);
	};

	const handleShowReview = () => {
		setShowReview(true);
	};

	const handleReviewChange = (e) => {
		const content = e.target.value;
		// console.log(content);
		setReviewContent(content);
		console.log(token);
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		API.createReview(
			{ content: reviewContent, recipeId: recipeId },
			token
		).then((data) => {
			setReviewContent('');
			setShowReview(false);
			setRefresh(!refresh);
			console.log(data);
		});
	};

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
									<button type="button" onClick={handleClick}>
										Add to shopping list
									</button>
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
					<div className="review-section">
						<div className="review-container">
							<div className="review-header">
								<h2>Reviews</h2>
								<button type="button" onClick={handleShowReview}>
									Write a review
								</button>
							</div>
							<form
								onSubmit={handleReviewSubmit}
								className={showReview ? 'review-form-visible' : 'review-form'}
							>
								<input
									placeholder="Enter your review"
									type="text"
									onChange={handleReviewChange}
								/>
								<button>Submit</button>
							</form>
							<div>
								{recipeData.reviews.map((review) => (
									<div key={review._id} className="review-card">
										<ReviewCard
											content={review.content}
											user={review.user.username}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
};

export default SingleRecipePage;
