// import React from 'react'
import { useState } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import './styles.css';

const Searchbar = () => {
	const [search, setSearch] = useState('');
	const navigateTo = useNavigate();

	const handleSearch = (e) => {
		setSearch(e.target.value);
	};

	const submitForm = (e) => {
		e.preventDefault();
		console.log(search);
		navigateTo(`/recipes/${search}`);
	};

	return (
		<>
			<form onSubmit={submitForm} className="searchbar-form">
				<input
					name="searchbar"
					placeholder="Enter a recipe"
					value={search}
					onChange={handleSearch}
				/>
				<button>
					<FaMagnifyingGlass />
					Search
				</button>
			</form>
		</>
	);
};

export default Searchbar;
