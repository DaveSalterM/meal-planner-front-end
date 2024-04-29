import { useState } from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import './styles.css';
const CreateRecipe = () => {
	const [recipeName, setRecipeName] = useState('');
	const [ingredients, setIngredients] = useState([
		{ ingredient: '', amount: 0, unit: null },
	]);
	const [instructions, setInstructions] = useState([{ instruction: '' }]);

	const options = ['g', 'lbs', 'cups', 'tsp', 'tbsp', 'gal'];

	const handleClickIngredient = (e) => {
		e.preventDefault();
		setIngredients([...ingredients, { ingredient: '', amount: 0, unit: null }]);
	};

	const handleClickInstruction = (e) => {
		e.preventDefault();
		setInstructions([...instructions, { instruction: '' }]);
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

	const handleUnitChange = (e, i) => {
		const { value } = e;
		const onchangeVal = [...ingredients];
		onchangeVal[i]['unit'] = value;
		setIngredients(onchangeVal);
	};

	const handleInstructionChange = (e, i) => {
		const { name, value } = e.target;
		const onchangeVal = [...instructions];
		onchangeVal[i][name] = value;
		setInstructions(onchangeVal);
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

	const submitHandler = (e) => {
		e.preventDefault();
		console.log(recipeName);
		console.log('======================================');
		console.log(...ingredients);
		console.log('======================================');
		console.log(instructions);
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
										// value={val.ingredient}
										onChange={(e) => handleIngredientChange(e, i)}
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
									<button
										type="button"
										onClick={() => handleDeleteIngredient(i)}
									>
										Delete
									</button>
								) : null}
							</div>
						</div>
					))}
					<button type="button" onClick={handleClickIngredient}>
						Add More
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
									<button
										type="button"
										onClick={() => handleDeleteInstruction(i)}
									>
										Delete
									</button>
								) : null}
							</div>
						</div>
					))}

					<button type="button" onClick={handleClickInstruction}>
						Add More
					</button>

					<div className="submit-btn">
						<button>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default CreateRecipe;
