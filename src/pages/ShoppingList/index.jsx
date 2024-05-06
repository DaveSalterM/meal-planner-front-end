/* eslint-disable react-hooks/exhaustive-deps */
import convert from 'convert-units';
import { useCallback, useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { Link, useBeforeUnload } from 'react-router-dom';
import API from '../../../utils/API';
import './styles.css';

const ShoppingList = (props) => {
	const [userRecipes, setRecipes] = useState([]);
	const [shoppingList, setShoppingList] = useState([]);

	// Stores user recipes from props
	// Also used as a boolean to check if props have loaded
	let getList = props.user.shopping_list;

	// IF props have loaded AND userRecipes state is empty
	if (getList && userRecipes.length === 0) {
		// Populate an auxilary array with the recipes and initialize their quantities
		let aux = getList.map((recipe) =>
			// [Recipe, quantity]
			[recipe, 1]
		);

		// Get the user's shopping list from local storage
		const localList = JSON.parse(localStorage.getItem('userList'));

		// Check IF there is a shopping list in local storage
		// ELSE create a new list in local storage
		if (localList !== null) {
			// Check IF user has an entry in the shopping list under their user ID
			// ELSE create a new entry in the shopping list under their user ID
			if (props.userId in localList) {
				// Loop through the auxilary array and update the quantities of the recipes
				for (let i = 0; i < aux.length; i++) {
					// IF recipe does not have a tied quantity, initialize it to 1
					// ELSE set the quantity to the stored quantity
					if (localList[props.userId][aux[i][0]._id] === undefined) {
						aux[i][1] = 1;
					} else {
						aux[i][1] = localList[props.userId][aux[i][0]._id];
					}
				}

				// Set the userRecipes state to the updated auxilary array
				// Gets caught in an infinite loop without the if statement
				if (aux.length !== 0) setRecipes(aux);
			} else {
				//ELSE create a new entry in the shopping list under their user ID
				// Also initializes quantities for each recipe to 1
				localList[props.userId] = {};
				aux.forEach((recipe) => {
					localList[props.userId][recipe[0]._id] = 1;
				});
			}

			// Update the local storage with the updated quantities
			localStorage.setItem('userList', JSON.stringify(localList));
		} else {
			// ELSE create a new list in local storage
			let newList = {};
			newList[props.userId] = {};
			localStorage.setItem('userList', JSON.stringify(newList));
		}

		// Set the userRecipes state to the updated auxilary array
		// Gets caught in an infinite loop without the if statement
		if (aux.length !== 0) setRecipes(aux);
	}

	// Updates the quantities of the recipes into local storage
	const updateLocalStorage = () => {
		let localList = JSON.parse(localStorage.getItem('userList'));

		// Two if statements to check if the user has a shopping list and if the user has a local storage
		if (localList !== null) {
			if (localList[props.userId] !== undefined) {
				// Updates the quantities of the recipes in the local storage to match the userRecipes state
				let storedRecipes = {};
				userRecipes.forEach((recipe) => {
					storedRecipes[recipe[0]._id] = recipe[1];
				});

				// Stores updated quantities under the user's ID in the local storage
				localList[props.userId] = storedRecipes;
				localStorage.setItem('userList', JSON.stringify(localList));
			}
		}
	};

	// Function converts all unit measurements in shopping list to appropriate display units
	// Called in getShoppingList after the for loops
	const convertUnits = (shoppingList) => {
		// Initialize
		let convertedAmount = {
			val: 0,
			unit: '',
		};

		for (let ingredient in shoppingList) {
			// If the ingredient is in grams and the amount is greater than 1 oz and less than 16 oz
			// Convert to oz
			if (shoppingList[ingredient].unit === 'g') {
				convertedAmount = convert(shoppingList[ingredient].amount)
					.from('g')
					.toBest({
						cutoffNumber: 2,
						exclude: [
							'in3',
							'ft3',
							'yd3',
							'tsp',
							'tbsp',
							'cups',
							'fl-oz',
							'gal',
							'qt',
							'pnt',
							't',
						],
					});
				shoppingList[ingredient] = {
					amount: convertedAmount.val,
					unit: convertedAmount.unit,
				};

				// If ingredient is more than 16 oz OR more than 453.592 grams
				// Distinction is made incase grams are used for large quantities
			} else if (
				(shoppingList[ingredient].unit === 'oz' &&
					shoppingList[ingredient].amount > 16) ||
				(shoppingList[ingredient].unit === 'g' &&
					shoppingList[ingredient].amount > 453.592)
			) {
				convertedAmount.val = convert(shoppingList[ingredient].amount)
					.from('oz')
					.to('lb');
				convertedAmount.unit = 'lb';
				shoppingList[ingredient] = {
					amount: convertedAmount.val,
					unit: convertedAmount.unit,
				};

				// Just converts 'tbsp' to 'Tbs' for the conversion
				// Then converts to best unit
			} else if (shoppingList[ingredient].unit === 'tbsp') {
				convertedAmount = convert(shoppingList[ingredient].amount)
					.from('Tbs')
					.toBest({
						cutoffNumber: 2,
						exclude: ['in3', 'ft3', 'yd3', 'qt', 'pnt', 'oz', 'lb', 't'],
					});
				if (convertedAmount.unit === 'Tbs') convertedAmount.unit = 'tbsp';
				shoppingList[ingredient] = {
					amount: convertedAmount.val,
					unit: convertedAmount.unit,
				};

				// Converts all other units to best unit
			} else if (
				shoppingList[ingredient].unit !== 'lb' &&
				shoppingList[ingredient].unit !== 'oz'
			) {
				convertedAmount = convert(shoppingList[ingredient].amount)
					.from(shoppingList[ingredient].unit)
					.toBest({
						exclude: ['in3', 'ft3', 'yd3', 'qt', 'pnt', 'oz', 'lb', 't'],
					});
				shoppingList[ingredient] = {
					amount: convertedAmount.val,
					unit: convertedAmount.unit,
				};
			}
			// Rounds the amount to 2 decimal places
			shoppingList[ingredient].amount =
				Math.round(shoppingList[ingredient].amount * 100) / 100;
		}
		return shoppingList;
	};

	// Function to update local storage when the user navigates away from the page
	useBeforeUnload(
		useCallback(() => {
			let localList = JSON.parse(localStorage.getItem('userList'));
			let storedRecipes = {};
			userRecipes.forEach((recipe) => {
				storedRecipes[recipe[0]._id] = recipe[1];
			});

			localList[props.userId] = storedRecipes;
			localStorage.setItem('userList', JSON.stringify(localList));
		}, [userRecipes])
	);

	//Use effect that renders the shopping list when the userRecipes array is updated
	useEffect(() => {
		if (getList) renderShoppingList();
		if (getList) updateLocalStorage();
	}, [userRecipes]);

	// Update the quantity of a recipe in the userRecipes array
	const getRecipes = (recipeIndex, newQuantity) => {
		setRecipes(
			userRecipes.map((recipe, i) =>
				recipeIndex == i ? [recipe[0], newQuantity] : recipe
			)
		);
	};

	// Remove a recipe from shopping list
	const handleDeleteRecipe = (recipe) => {
		API.removeFromShoppingList(
			props.user._id,
			{ recipeId: recipe[0]._id },
			props.token
		).then(() => {
			window.location.reload();
		});
	};

	const renderShoppingList = () => {
		// Consolidate ingredients into one array of objects
		// Each object is keyed with the ingredient name and has a value of the total amount and unit
		let shoppingList = {};
		// Loop through each recipe
		for (let i = 0; i < userRecipes.length; i++) {
			// Loop through each ingredient in the recipe
			for (let j = 0; j < userRecipes[i][0].ingredients.length; j++) {
				// Passes if the recipe quantity is greater than zero
				// Quantity is stored in the second element of the userRecipes array
				if (userRecipes[i][1] > 0) {
					// IF the ingredient is not already in the shopping list, add it
					// ELSE add the amount to the existing amount
					if (!shoppingList[userRecipes[i][0].ingredients[j].ingredient]) {
						//Create amount by multiplying the ingredient amount by the recipe quantity
						let newAmount =
							parseFloat(userRecipes[i][0].ingredients[j].amount) *
							userRecipes[i][1];

						shoppingList[userRecipes[i][0].ingredients[j].ingredient] = {
							amount: newAmount,
							unit: userRecipes[i][0].ingredients[j].unit,
						};
					} else {
						//Create amount by multiplying the ingredient amount by the recipe quantity
						let newAmount =
							parseInt(userRecipes[i][0].ingredients[j].amount) *
							userRecipes[i][1];
						shoppingList[userRecipes[i][0].ingredients[j].ingredient].amount +=
							newAmount;
					}
				}
			}
		} //End of for loop

		// Convert the units of items in the shopping list
		shoppingList = convertUnits(shoppingList);

		// Convert the shopping list object into an array of JSX elements
		const shoppingListArray = Object.entries(shoppingList).map(
			([ingredient, { amount, unit }]) => (
				<li className="shop-li" key={ingredient}>
					{`${ingredient}: ${amount} ${unit}`}
				</li>
			)
		);

		setShoppingList(shoppingListArray);
	};

	return (
		<>
			<div id="shop-container">
				<div className="shop-card">
					<div className="shop-header">
						<div className="shop-title">Recipes</div>
						<div className="shop-body">
							<ul className="shop-ul">
								{' '}
								{userRecipes.map((recipe, index) => (
									<li className="shop-li" key={recipe[0]._id}>
										<Link
											to={'/recipes/recipedish/' + recipe[0]._id}
											key={index}
											className="shop-link"
										>
											{`${recipe[0].name}`}
										</Link>
										<FaTrashAlt
											className="shop-delete"
											onClick={() => handleDeleteRecipe(recipe)}
										/>
										<input
											type="number"
											value={userRecipes[index][1]}
											onChange={(e) =>
												getRecipes(index, parseInt(e.target.value))
											}
											//onChange={(e) => {setRecipes(userRecipes.map((recipe, i => index == i ? [recipe[0], e.target.value] : recipe )  ))}}
											min={0}
										/>
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="shop-card">
					<div className="shop-header">
						<div className="shop-title">Shopping List</div>
						<div className="shop-body">
							{/* <ul className="shop-ul"> {getShoppingList()} </ul> */}
							<ul className="shop-ul"> {shoppingList} </ul>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};
export default ShoppingList;
