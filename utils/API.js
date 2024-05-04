const URL_PREFIX = 'http://localhost:3001';
//const URL_PREFIX = 'https://meal-planner-ij2h.onrender.com';

const API = {
	// Signup
	signup: (userObj) => {
		//TODO: Verify backend route
		return fetch(`${URL_PREFIX}/api/users`, {
			method: 'POST',
			body: JSON.stringify(userObj),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
	},

	// Login
	// userobj = {username: "username", password: "password"}
	// fetch sent to backend :
	login: (userObj) => {
		console.log('Logging in with credentials ');
		console.log('API.jsx userObj: ', userObj);
		return fetch(`${URL_PREFIX}/api/users/login`, {
			method: 'POST',
			body: JSON.stringify(userObj),
			headers: {
				'Content-Type': 'application/json',
			},
		}).then((res) => res.json());
	},

	//Check Token
	checkToken: (token) => {
		return fetch(`${URL_PREFIX}/api/checkToken`, {
			headers: {
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
	uploadImage: (imgObj) => {
		return fetch(`${URL_PREFIX}/api/upload`, {
			method: 'POST',
			body: imgObj,
		}).then((res) => res.json());
	},

	// Get one user
	getOneUser: (userId) => {
		return fetch(`${URL_PREFIX}/api/users/${userId}`).then((res) => res.json());
	},

	// Create a recipe
	createRecipe: (userObj, token) => {
		return fetch(`${URL_PREFIX}/api/recipes`, {
			method: 'POST',
			body: JSON.stringify(userObj),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
	getSearchedRecipe: (search) => {
		return fetch(`${URL_PREFIX}/api/recipes/${search}`).then((res) =>
			res.json()
		);
	},
	// Get Single Recipe
	getSingleRecipe: (recipeId) => {
		return fetch(`${URL_PREFIX}/api/recipes/recipe/${recipeId}`).then((res) =>
			res.json()
		);
	},
	// Create a review
	createReview: (reviewData, token) => {
		return fetch(`${URL_PREFIX}/api/reviews`, {
			method: 'POST',
			body: JSON.stringify(reviewData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
	// Like a recipe
	likeRecipe: (userId, recipeId, token) => {
		return fetch(`${URL_PREFIX}/api/users/${userId}/favorites`, {
			method: 'PUT',
			body: JSON.stringify(recipeId),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
	// Unlike recipe
	unlikeRecipe: (userId, recipeId, token) => {
		return fetch(`${URL_PREFIX}/api/users/${userId}/favorites`, {
			method: 'DELETE',
			body: JSON.stringify(recipeId),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
	// Add to meal plan
	addToMealPlan: (userId, mealPlanData, token) => {
		return fetch(`${URL_PREFIX}/api/users/${userId}/mealplan`, {
			method: 'POST',
			body: JSON.stringify(mealPlanData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},

	// Remove from meal plan
	removeFromMealPlan: (userId, mealPlanData, token) => {
		console.log('mealPlanData:', mealPlanData);
		return fetch(`${URL_PREFIX}/api/users/${userId}/mealplan`, {
			method: 'DELETE',
			body: JSON.stringify(mealPlanData),
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		}).then((res) => res.json());
	},
};

export default API;
