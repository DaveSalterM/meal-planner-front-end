// import React from 'react';
import { useEffect, useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';

import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../utils/API';
import ReviewCard from '../../components/ReviewCard';
import CustomToast from '../../components/Toast';
import './styles.css';

// toast.configure();

const SingleRecipePage = ({ user, userId, token }) => {
	const { recipeId } = useParams();
	const navigate = useNavigate();

	const [recipeData, setRecipeData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [recipeReviews, setRecipeReviews] = useState([]);
	const [userFavorites, setUserFavorites] = useState([]);
	const [showReview, setShowReview] = useState(false);
	const [reviewContent, setReviewContent] = useState('');
	// const [refresh, setRefresh] = useState(true);

	useEffect(() => {
		// console.log(recipeId);
		API.getSingleRecipe(recipeId)
			.then((response) => {
				// console.log(userId);
				setRecipeData(response);
				// console.log(response.reviews);
				setRecipeReviews(response.reviews);
			})
			.then(() => {
				if (userId !== 0) {
					API.getUserFavorites(userId).then((data) => {
						setUserFavorites(data);
					});
				}

				// setIsLoading(false);
			})
			.then(() => setIsLoading(false));
	}, [recipeId, userId]);

	const handleShoppingList = () => {
		// console.log(recipeId);
		API.addToShoppingList(userId, { recipeId: recipeId }, token).then(() =>
			console.log('SUBMITTED', user),
			window.location.reload()
		);
	};

	const handleMealPlan = () => {
		if (userId === 0) {
			navigate('/login');
		} else {
			toast(
				<CustomToast
					// key={toastKey}
					userId={userId}
					recipeId={recipeId}
					token={token}
				/>
			);
		}
	};

	const handleLike = () => {
		if (userId === 0) {
			navigate('/login');
		} else {
			API.likeRecipe(userId, { recipeId: recipeData._id }, token).then(() => {
				setUserFavorites([...userFavorites, recipeData._id]);
			});
		}
	};

	const handleUnlike = () => {
		if (userId === 0) {
			navigate('/login');
		} else {
			API.unlikeRecipe(userId, { recipeId: recipeData._id }, token).then(() => {
				setUserFavorites(
					userFavorites.filter((recipeId) => {
						recipeId !== recipeData._id;
					})
				);
			});
		}
	};

	const handleShowReview = () => {
		if (userId === 0) {
			navigate('/login');
		} else {
			setShowReview(true);
		}
	};

	const handleReviewChange = (e) => {
		const content = e.target.value;
		// console.log(content);
		setReviewContent(content);
	};

	const handleReviewSubmit = (e) => {
		e.preventDefault();
		API.createReview(
			{ content: reviewContent, recipeId: recipeId },
			token
		).then(() => {
			setRecipeReviews([
				{
					content: reviewContent,
					user: user,
				},
				...recipeReviews,
			]);
			setReviewContent('');
			setShowReview(false);
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
							<p>-{recipeData.user.username}</p>
						</div>
						<div className="serv-cal-star">
							<p>{recipeData.servings} serving</p>
							<p>{recipeData.calories} calories</p>
							{userFavorites.includes(recipeData._id) ? (
								<AiFillHeart className="likes-button" onClick={handleUnlike} />
							) : (
								<AiOutlineHeart onClick={handleLike} className="likes-button" />
							)}
							{/* <AiOutlineHeart onClick={handleLike} className="likes-button" /> */}
						</div>
					</div>
					<div className="recipe-data-container">
						<div>
							<div className="image-buttons">
								<img src={recipeData.imgUrl} alt="" />
								<div>
									<button type="button" onClick={handleShoppingList}>
										Add to shopping list
									</button>
									<button type="button" onClick={handleMealPlan}>
										Add to meal plan
									</button>
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
									value={reviewContent}
									onChange={handleReviewChange}
								/>
								<button>Submit</button>
							</form>
							<div>
								{recipeReviews.map((review, i) => (
									<div key={review._id || i} className="review-card">
										<ReviewCard
											content={review.content}
											user={review.user.username}
										/>
									</div>
								))}
							</div>
						</div>
					</div>
					<ToastContainer
						position="bottom-center"
						autoClose={false}
						limit={1}
						newestOnTop={false}
						closeOnClick={false}
						rtl={false}
						pauseOnFocusLoss
						draggable={false}
						theme="light"
						transition:Bounce
					/>
				</>
			)}
		</div>
	);
};

export default SingleRecipePage;
