// import React from 'react';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../../utils/API';
import './styles.css';

const CustomToast = ({ userId, recipeId, token }) => {
	const [selectedDay, setSelectedDay] = useState(null);
	const [showError, setShowError] = useState('none');

	const handleChange = (e) => {
		setSelectedDay(e.target.value);
	};

	const handleSubmit = () => {
		if (!selectedDay) {
			setShowError('');
		} else {
			API.addToMealPlan(
				userId,
				{ recipeId: recipeId, dayOfWeek: selectedDay },
				token
			).then(() => toast.dismiss());
			window.location.reload();
		}
	};

	return (
		<div>
			<h3 className="toast-header">Days of week</h3>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Sunday"
					value="Sunday"
					checked={selectedDay === 'Sunday'}
					onChange={handleChange}
				/>
				<label htmlFor="Sunday">Sunday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Monday"
					value="Monday"
					checked={selectedDay === 'Monday'}
					onChange={handleChange}
				/>
				<label htmlFor="Monday">Monday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Tuesday"
					value="Tuesday"
					checked={selectedDay === 'Tuesday'}
					onChange={handleChange}
				/>
				<label htmlFor="Tuesday">Tuesday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Wednesday"
					value="Wednesday"
					checked={selectedDay === 'Wednesday'}
					onChange={handleChange}
				/>
				<label htmlFor="Wednesday">Wednesday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Thursday"
					value="Thursday"
					checked={selectedDay === 'Thursday'}
					onChange={handleChange}
				/>
				<label htmlFor="Thursday">Thursday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Friday"
					value="Friday"
					checked={selectedDay === 'Friday'}
					onChange={handleChange}
				/>
				<label htmlFor="Friday">Friday</label>
			</div>
			<div className="day-radio-btn">
				<input
					type="radio"
					name="day"
					id="Saturday"
					value="Saturday"
					checked={selectedDay === 'Saturday'}
					onChange={handleChange}
				/>
				<label htmlFor="Saturday">Saturday</label>
			</div>
			{/* {daysOfWeek.map((day, index) => (
				<div key={index}>
					<input
						type="radio"
						id={day}
						name="day"
						value={day}
						checked={selectedDay === day}
						onChange={() => handleChange(day)}
					/>
					<label htmlFor={day}>{day}</label>
				</div>
			))} */}
			<div className="button-and-error">
				<button className="toast-add-button" onClick={handleSubmit}>
					Add
				</button>
				<p id="error" style={{ display: showError }}>
					Choose a day!
				</p>
			</div>
		</div>
	);
};

export default CustomToast;
