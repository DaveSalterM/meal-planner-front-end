import convert from 'convert-units';
import fracty from 'fracty';
import { numericQuantity } from 'numeric-quantity';
import { useState } from 'react';
import 'react-dropdown/style.css';
import { FaTrashAlt } from 'react-icons/fa';
import API from '../../../utils/API';
import './styles.css';

const CreateRecipe = (props) => {
	const token = props.token;
	// console.log('Create Recipe: ', props.user);

	const regex =
		/^(\d*)(\s{0,1}(\d{0,1})(\/?)(\d{0,1})|(\.\d{0,2})|\/(\d{0,1}))$/;
	const [recipeName, setRecipeName] = useState('');
	const [ingredients, setIngredients] = useState([
		{ ingredient: '', amount: '', unit: 'Select' },
	]);
	// const [instructions, setInstructions] = useState([{ instruction: '' }]);
	const [instructions, setInstructions] = useState(['']);
	const [calories, setCalories] = useState('');
	const [image, setImage] = useState(null);
	// const [userObj, setUserObj] = useState({})

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
		// console.log(e.target);
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
		// console.log(onchangeVal);
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
			if (['g', 'lb'].includes(unit) && ['g', 'lb'].includes(value)) {
				// let convertNum = numericQuantity(amount, { round: false });
				let convertNum = numericQuantity(amount);
				console.log('convert', convertNum);
				let unitConv = convert(convertNum).from(unit).to(value);
				// unitConv = unitConv.toFixed(2);
				onchangeVal[i]['unit'] = value;
				onchangeVal[i]['amount'] = `${unitConv}`;
				setIngredients(onchangeVal);
			} else if (
				['cup', 'tsp', 'Tbs', 'gal'].includes(unit) &&
				['cup', 'tsp', 'Tbs', 'gal'].includes(value)
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
		// console.log(e.target.files);
		// console.log(e.target.files[0]);
		// const formData = new FormData();
		setImage(e.target.files[0]);

		// formData.append('image', file);
		// console.log(formData);
	};

	const handleCaloriesChange = (e) => {
		const { value } = e.target;
		let onchangeVal = [...calories];
		onchangeVal = value;
		setCalories(onchangeVal);
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
		// console.log(recipeName);
		// console.log('======================================');
		// console.log(...ingredients);
		// console.log('======================================');
		// console.log(...instructions);
		const formData = new FormData();
		formData.append('image', image);
		const { imageUrl } = await API.uploadImage(formData);

		try {
			e.preventDefault();
			const newRecipe = await API.createRecipe(
				{
					name: recipeName,
					ingredients: ingredients,
					instructions: instructions,
					calories: calories,
					imgUrl: imageUrl,
				},
				token
			);
			// console.log('IT WORKS!!!');
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className="recipe-page">
			<h1>Create Your Recipe!</h1>
			<div className="recipe-form">
				<form onSubmit={submitHandler}>
					<h2>Recipe Name</h2>
					<input
						className="recipe-field"
						name="recipe"
						value={recipeName}
						onChange={handleRecipeChange}
					/>

					<h2>Ingredients</h2>
					{ingredients.map((val, i) => (
						<div key={i}>
							{/* <h3>Ingredient {i + 1}</h3> */}
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
										// onChange={(e) => handleIngredientChange(e, i)}
										onChange={(e) => handleAmountChange(e, i)}
										className="amount-input"
									/>
								</div>
								<div className="dropdown-menu">
									<h3>Units</h3>

									<select
										defaultValue=""
										onChange={(e) => handleUnitChange(e, i)}
									>
										<option value="" disabled hidden>
											Select
										</option>
										<option value="g">g</option>
										<option value="lb">lb</option>
										<option value="cup">cup</option>
										<option value="tsp">tsp</option>
										<option value="Tbs">tbsp</option>
										<option value="gal">gal</option>
									</select>
								</div>

								{i !== 0 ? (
									<div
										// type="button"
										className="delete-button"
										onClick={() => handleDeleteIngredient(i)}
									>
										{/* <FaTrashAlt /> */}
										<FaTrashAlt id="trash-button" />
									</div>
								) : null}
							</div>
						</div>
					))}
					<button type="button" onClick={handleClickIngredient}>
						+ Add More
					</button>

					<h2>Instructions</h2>
					{instructions.map((val, i) => (
						<div key={i}>
							<div className="instruction-field">
								<div>
									<h3>Instruction {i + 1}</h3>
									<input
										name="instruction"
										value={val.instruction}
										onChange={(e) => handleInstructionChange(e, i)}
										className="instruction-input"
									/>
								</div>

								{i !== 0 ? (
									<div
										// type="button"
										className="delete-button"
										onClick={() => handleDeleteInstruction(i)}
									>
										{/* <FaTrashAlt /> */}
										<FaTrashAlt id="trash-button" />
									</div>
								) : null}
							</div>
						</div>
					))}

					<button type="button" onClick={handleClickInstruction}>
						+ Add More
					</button>

					<h2>Calories</h2>
					<input
						name="calories"
						value={calories}
						onChange={handleCaloriesChange}
					/>

					<h2>Upload</h2>
					<div className="upload-form">
						<label>Upload an image of the food:</label>
						<input type="file" onChange={handleImageChange} />
					</div>
					<div className="submit-btn">
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRecipe;
