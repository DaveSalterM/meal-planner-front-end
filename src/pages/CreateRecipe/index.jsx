import convert from 'convert-units';
import fracty from 'fracty';
import { numericQuantity } from 'numeric-quantity';
import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { FaTrashAlt } from 'react-icons/fa';
import API from '../../../utils/API';
import './styles.css';

const CreateRecipe = () => {
	const token =
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjlhZWFiMThmYjcxODNmNmZlMjNkOCIsInVzZXJuYW1lIjoidGVzdFVzZXIyIiwiaWF0IjoxNzE0NDE1MzgwLCJleHAiOjE3MTQ0MjI1ODB9.XqltrAe8mj8as9H2e-6zXcpun-wcDBWKunj6iH5tWcw';
	const regex =
		/^(\d*)(\s{0,1}(\d{0,1})(\/?)(\d{0,1})|(\.\d{0,2})|\/(\d{0,1}))$/;
	const [recipeName, setRecipeName] = useState('');
	const [ingredients, setIngredients] = useState([
		{ ingredient: '', amount: '', unit: null },
	]);
	// const [instructions, setInstructions] = useState([{ instruction: '' }]);
	const [instructions, setInstructions] = useState(['']);
	const [calories, setCalories] = useState('');
	// const [userObj, setUserObj] = useState({})

	// const options = ['g', 'lbs', 'cups', 'tsp', 'tbsp', 'gal'];
	const options = [
		{ value: 'g', label: 'g' },
		{ value: 'lb', label: 'lbs' },
		{ value: 'cup', label: 'cups' },
		{ value: 'tsp', label: 'tsp' },
		{ value: 'Tbs', label: 'tbsp' },
		{ value: 'gal', label: 'gal' },
	];

	const handleClickIngredient = (e) => {
		e.preventDefault();
		setIngredients([
			...ingredients,
			{ ingredient: '', amount: '', unit: null },
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
		// if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
		// 	console.log('is number');
		// 	onchangeVal[i][name] = value;
		// }
		// if (!value || value.match(/^\d{1,}(\s{0,1})?(\.\d{0,2})?(\/\d{0,2})?$/)) {
		// 	console.log('is number');
		// 	onchangeVal[i][name] = value;
		// }
		// if (!value || value.match(/^\d{1,}(\.\d{0,2})?(\/\d{0,2})?(\s)$/)) {
		// 	console.log('is number');
		// 	onchangeVal[i][name] = value;
		// }
		// if (!value || value.match(/^\d+(\s\d+\/\d+)?(\.\d+)?$/)) {
		// 	console.log('is number');
		// 	onchangeVal[i][name] = value;
		// }
		if (regex.test(value)) {
			onchangeVal[i][name] = value;
		}
		// console.log(onchangeVal);
		setIngredients(onchangeVal);
	};

	const handleUnitChange = (e, i) => {
		const { value } = e;
		const onchangeVal = [...ingredients];
		// Check if they haven't changed yet
		if (!onchangeVal[i]['unit']) {
			// Gets the associated amount in the row that was changed
			onchangeVal[i]['unit'] = value;
			setIngredients(onchangeVal);
		} else {
			// Get "previous" unit
			const unit = onchangeVal[i]['unit'];
			// Get the number amount
			const amount = onchangeVal[i]['amount'];
			if (
				// (unit === 'g' && value === 'lb') ||
				// (unit === 'lb' && value === 'g')
				['g', 'lb'].includes(unit) &&
				['g', 'lb'].includes(value)
			) {
				let convertNum = numericQuantity(amount, { round: false });
				let unitConv = convert(convertNum).from(unit).to(value);
				onchangeVal[i]['unit'] = value;
				onchangeVal[i]['amount'] = unitConv;
				setIngredients(onchangeVal);
			} else if (
				// unit === ('cup' || 'tsp' || 'Tbs' || 'gal') &&
				// value === ('cup' || 'tsp' || 'Tbs' || 'gal')
				['cup', 'tsp', 'Tbs', 'gal'].includes(unit) &&
				['cup', 'tsp', 'Tbs', 'gal'].includes(value)
			) {
				let convertNum = numericQuantity(amount, { round: false });
				let unitConv = convert(convertNum).from(unit).to(value);
				let fractionNum = fracty(unitConv);
				onchangeVal[i]['unit'] = value;
				onchangeVal[i]['amount'] = fractionNum;
				setIngredients(onchangeVal);
			} else {
				onchangeVal[i]['unit'] = value;
			}
		}
	};

	const handleInstructionChange = (e, i) => {
		const { value } = e.target;
		const onchangeVal = [...instructions];
		// onchangeVal[i][name] = value;
		onchangeVal[i] = value;
		// console.log(onchangeVal);
		setInstructions(onchangeVal);
	};

	const handleCaloriesChange = (e) => {
		const { value } = e.target;
		let onchangeVal = [...calories];
		onchangeVal = value;
		// console.log(onchangeVal);
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
		// e.preventDefault();
		// console.log(recipeName);
		// console.log('======================================');
		// console.log(...ingredients);
		// console.log('======================================');
		// console.log(...instructions);
		try {
			e.preventDefault();
			const newRecipe = await API.createRecipe(
				{
					name: recipeName,
					ingredients: ingredients,
					instructions: instructions,
					calories: calories,
				},
				token
			);
			console.log('IT WORKS!!!');
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
								<div>
									<h3>Units</h3>
									<Dropdown
										className="dropdown-menu"
										menuClassName="myMenuClassName"
										arrowClassName="myArrowClassName"
										controlClassName="myControlClassName"
										options={options}
										onChange={(e) => handleUnitChange(e, i)}
										placeholder="Select"
									/>
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

					<div className="submit-btn">
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRecipe;
