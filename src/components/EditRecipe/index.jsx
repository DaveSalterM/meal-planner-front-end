import convert from 'convert-units';
import fracty from 'fracty';
import { numericQuantity } from 'numeric-quantity';
import { useEffect, useState } from 'react';
import 'react-dropdown/style.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../../../utils/API';
import ProfileLayout from '../ProfileLayout';

import './styles.css';

const EditRecipe = ({ token }) => {
	const navigate = useNavigate();
	const { recipeId } = useParams();
	// const token = props.token;
	// console.log('Create Recipe: ', props.user);

	useEffect(() => {
		// console.log(recipeId);
		API.getSingleRecipe(recipeId)
			.then((response) => {
				setIngredients(response.ingredients);
				setInstructions(response.instructions);
				setRecipeName(response.name);
				setImage(response.imgUrl);
				setCalories(response.calories);
				setServings(response.servings);
			})
			.then(() => setIsLoading(false));
	}, [recipeId]);

	const regex =
		/^(\d*)(\s{0,1}(\d{0,1})(\/?)(\d{0,1})|(\.\d{0,2})|\/(\d{0,1}))$/;
	const [recipeName, setRecipeName] = useState('');
	const [ingredients, setIngredients] = useState([
		{ ingredient: '', amount: '', unit: 'Select' },
	]);
	const [instructions, setInstructions] = useState(['']);
	const [calories, setCalories] = useState('');
	const [servings, setServings] = useState('');
	const [image, setImage] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleClickIngredient = (e) => {
		e.preventDefault();
		setIngredients([
			...ingredients,
			{ ingredient: '', amount: '', unit: 'Select' },
		]);
	};

	const handleClickInstruction = (e) => {
		e.preventDefault();
		setInstructions([...instructions, '']);
	};

	const handleRecipeChange = (e) => {
		const { value } = e.target;
		setRecipeName(value);
	};

	const handleIngredientChange = (e, i) => {
		const { name, value } = e.target;
		const onchangeVal = [...ingredients];
		onchangeVal[i][name] = value;
		setIngredients(onchangeVal);
	};

	const handleAmountChange = (e, i) => {
		const { name, value } = e.target;
		const onchangeVal = [...ingredients];
		if (regex.test(value)) {
			onchangeVal[i][name] = value;
		}
		setIngredients(onchangeVal);
	};

	const handleUnitChange = (e, i) => {
		let { value } = e.target;
		const onchangeVal = [...ingredients];
		// Check if they haven't changed yet
		if (!onchangeVal[i]['unit']) {
			// Gets the associated amount in the row that was changed
			onchangeVal[i]['unit'] = value;
			setIngredients(onchangeVal);
		} else {
			// Get "previous" unit
			let unit = onchangeVal[i]['unit'];
			// Check if Tbs is tbsp
			if (unit === 'tbsp') {
				unit = 'Tbs';
			}
			// Get the number amount
			const amount = onchangeVal[i]['amount'];
			if (
				['g', 'oz', 'lb'].includes(unit) &&
				['g', 'oz', 'lb'].includes(value)
			) {
				// let convertNum = numericQuantity(amount, { round: false });
				let convertNum = numericQuantity(amount);
				console.log('convert', convertNum);
				let unitConv = convert(convertNum).from(unit).to(value);
				// unitConv = unitConv.toFixed(2);
				onchangeVal[i]['unit'] = value;
				onchangeVal[i]['amount'] = `${unitConv}`;
				setIngredients(onchangeVal);
			} else if (
				['fl-oz', 'cup', 'tsp', 'Tbs', 'gal'].includes(unit) &&
				['fl-oz', 'cup', 'tsp', 'Tbs', 'gal'].includes(value)
			) {
				let convertNum = numericQuantity(amount, { round: false });
				let unitConv = convert(convertNum).from(unit).to(value);
				let fractionNum = fracty(unitConv);
				if (value === 'Tbs') {
					value = 'tbsp';
				}
				onchangeVal[i]['unit'] = value;
				onchangeVal[i]['amount'] = fractionNum;
				setIngredients(onchangeVal);
			} else {
				if (value === 'Tbs') {
					value = 'tbsp';
				}
				onchangeVal[i]['unit'] = value;
			}
		}
	};

	const handleInstructionChange = (e, i) => {
		const { value } = e.target;
		const onchangeVal = [...instructions];
		onchangeVal[i] = value;
		setInstructions(onchangeVal);
	};

	const handleImageChange = (e) => {
		setImage(e.target.files[0]);
	};

	const handleCaloriesChange = (e) => {
		setCalories(e.target.value);
	};

	const handleServingsChange = (e) => {
		const { value } = e.target;
		setServings(value);
	};

	const handleDeleteInstruction = (i) => {
		const deleteVal = [...instructions];
		deleteVal.splice(i, 1);
		setInstructions(deleteVal);
	};

	const handleDeleteIngredient = (i) => {
		const deleteVal = [...ingredients];
		deleteVal.splice(i, 1);
		setIngredients(deleteVal);
	};

	const submitHandler = async (e) => {
		e.preventDefault();
		const formData = new FormData();
		formData.append('image', image);
		const { imageUrl } = await API.uploadImage(formData);

		try {
			e.preventDefault();
			const updatedRecipe = await API.updateRecipe(
				recipeId,
				{
					name: recipeName,
					ingredients: ingredients,
					instructions: instructions,
					calories: calories,
					servings: servings,
					imgUrl: imageUrl,
				},
				token
			).then(() => {
				navigate('/profile/editrecipes');
			});
		} catch (error) {
			console.log(error);
		}

		// try {
		// 	e.preventDefault();
		// 	const newRecipe = await API.createRecipe(
		// 		{
		// 			name: recipeName,
		// 			ingredients: ingredients,
		// 			instructions: instructions,
		// 			calories: calories,
		// 			imgUrl: imageUrl,
		// 		},
		// 		token
		// 	);
		// 	// console.log('IT WORKS!!!');
		// } catch (error) {
		// 	console.log(error);
		// }
	};

	return (
		<div className="edit-recipe-layout">
			<ProfileLayout />
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<div className="recipe-page">
					<div className="recipe-form">
						<form className="recipe" onSubmit={submitHandler}>
							<h1 className="header-create-recipe">Edit Your Recipe!</h1>

							<h2 className="header-names">Recipe Name</h2>
							<input
								className="recipe-field"
								name="recipe"
								value={recipeName}
								onChange={handleRecipeChange}
							/>
							<div className="recipe-border"></div>
							<h2 className="header-names">Ingredients</h2>
							{ingredients.map((val, i) => (
								<div key={i}>
									<div className="ingredient-field">
										<div>
											<h3>Ingredient {i + 1}</h3>
											<input
												name="ingredient"
												value={val.ingredient}
												onChange={(e) => handleIngredientChange(e, i)}
												className="ingredient-name"
											/>
										</div>
										<div>
											<h3>Amount</h3>
											<input
												name="amount"
												value={val.amount}
												onChange={(e) => handleAmountChange(e, i)}
												className="amount-input"
											/>
										</div>
										<div className="dropdown-menu">
											<h3>Units</h3>

											<select
												// defaultValue=""
												defaultValue={val.unit}
												onChange={(e) => handleUnitChange(e, i)}
											>
												<option value="" disabled hidden>
													Select
												</option>
												<option value="g">g</option>
												<option value="oz">oz</option>
												<option value="lb">lb</option>
												<option value="fl-oz">fl-oz</option>
												<option value="cup">cup</option>
												<option value="tsp">tsp</option>
												<option value="Tbs">tbsp</option>
												<option value="gal">gal</option>
											</select>
										</div>

										{i !== 0 ? (
											<div
												className="delete-button"
												onClick={() => handleDeleteIngredient(i)}
											>
												<FaTrashAlt id="trash-button" />
											</div>
										) : null}
									</div>
								</div>
							))}
							<button
								className="button-create"
								type="button"
								onClick={handleClickIngredient}
							>
								+ Add More
							</button>
							<div className="recipe-border"></div>
							<h2 className="header-names">Instructions</h2>
							{instructions.map((val, i) => (
								<div key={i}>
									<div className="instruction-field">
										<div>
											<h3>Instruction {i + 1}</h3>
											<input
												name="instruction"
												// value={val.instruction}
												value={val}
												onChange={(e) => handleInstructionChange(e, i)}
												className="instruction-input"
											/>
										</div>

										{i !== 0 ? (
											<div
												className="delete-button"
												onClick={() => handleDeleteInstruction(i)}
											>
												<FaTrashAlt id="trash-button" />
											</div>
										) : null}
									</div>
								</div>
							))}

							<button
								className="button-create"
								type="button"
								onClick={handleClickInstruction}
							>
								+ Add More
							</button>
							<div className="recipe-border"></div>
							<div>
								<div>
									<h2 className="header-names">Calories</h2>
									<input
										name="calories"
										value={calories}
										onChange={handleCaloriesChange}
										className="calorie-input"
									/>
								</div>
								{/* <input
									placeholder="Enter your review"
									// type="text"
									// value={calories}
									// onChange={handleCaloriesChange}
								/> */}
								<div>
									<h2 className="header-names">Servings</h2>
									<input
										name="servings"
										value={servings}
										onChange={handleServingsChange}
										className="calorie-input"
									/>
								</div>
							</div>
							<div className="recipe-border"></div>
							<h2 className="header-names">Upload</h2>
							<div className="upload-form">
								<label>Upload an image of the food:</label>
								<input
									className="upload-image"
									type="file"
									onChange={handleImageChange}
								/>
							</div>
							<div className="submit-btn">
								<button>Submit</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
};

export default EditRecipe;
