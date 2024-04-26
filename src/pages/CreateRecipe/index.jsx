import { useState } from 'react';
import './styles.css';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
const CreateRecipe = () => {
	const [recipeName, setRecipeName] = useState('');

	const [ingredients, setIngredients] = useState([{ ingredient: '' }]);
	// const [ingredients, setIngredients] = useState([]);

	const [instructions, setInstructions] = useState([{ instruction: '' }]);
	// const [instructions, setInstructions] = useState([]);
	const [selectedOption, setSelectedOption] = useState(null);

	const handleClickIngredient = (e) => {
		e.preventDefault();
		setIngredients([...ingredients, { ingredient: '' }]);
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
		console.log(ingredients);
		console.log('======================================');
		console.log(instructions);
	};
	const dropdownHandler = (e) => {
		setSelectedOption(e.value)
	}
	const options = [
		'g', 'lbs', 'cups', 'tsp', 'tbsp', 'gal'
	]
	// const options = [
	// 	{ value: 'g', label: 'g' },
	// 	{ value: 'lbs', label: 'lbs' },
	// 	{ value: 'cups', label: 'cups' },
	// 	{ value: 'tsp', label: 'tsp' },
	// 	{ value: 'tbsp', label: 'tbsp' },
	// 	{ value: 'gal', label: 'gal' },
	// ];
	return (
		<>
			<h1>Create Your Recipe!</h1>
			<div className="recipe-form">
				<form onSubmit={submitHandler}>
					<h2>Recipe Name</h2>
					<input
						name="recipe"
						value={recipeName}
						onChange={handleRecipeChange}
					/>

					<h2>Ingredients</h2>
					{ingredients.map((val, i) => (
						<div key={i}>
							<div className="ingredient-field">
								<input
									name="ingredient"
									value={val.ingredient}
									onChange={(e) => handleIngredientChange(e, i)}
								/>
								<Dropdown className="dropdown-menu" menuClassName='myMenuClassName' arrowClassName='myArrowClassName' controlClassName='myControlClassName' options={options} onChange={dropdownHandler} placeholder='Select' />
							</div>
							{i !== 0 ? (
								<button type="button" onClick={() => handleDeleteIngredient(i)}>
									Delete
								</button>
							) : null}
							{/* <button onClick={() => handleDeleteIngredient(i)}>Delete</button> */}
						</div>
					))}
					<button type="button" onClick={handleClickIngredient}>
						Add More
					</button>

					<h2>Instructions</h2>
					{instructions.map((val, i) => (
						<div key={i}>
							<input
								name="instruction"
								value={val.instruction}
								onChange={(e) => handleInstructionChange(e, i)}
							/>
							{i !== 0 ? (
								<button
									type="button"
									onClick={() => handleDeleteInstruction(i)}
								>
									Delete
								</button>
							) : null}
							{/* <button onClick={() => handleDeleteInstruction(i)}>Delete</button> */}
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
			{/* <div>
				<Dropdown className="dropdown-menu" menuClassName='myMenuClassName' arrowClassName='myArrowClassName' controlClassName='myControlClassName' options={options} onChange={dropdownHandler} placeholder="Select an option" />
			</div> */}
		</>

	);
};

export default CreateRecipe;




