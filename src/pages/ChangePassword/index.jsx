// import React from 'react'

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import API from '../../../utils/API';
import ProfileLayout from '../../components/ProfileLayout';

import 'react-toastify/dist/ReactToastify.css';

import './styles.css';

const ChangePassword = ({ userId, logout }) => {
	const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(true);
	const [oldPassword, setOldPassword] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confPassword, setConfPassword] = useState('');

	useEffect(() => {
		if (userId !== 0) {
			setIsLoading(false);
		}
	}, [userId]);

	const handleOldPass = (e) => {
		setOldPassword(e.target.value);
	};
	const handleNewPass = (e) => {
		setNewPassword(e.target.value);
	};
	const handleConfPass = (e) => {
		setConfPassword(e.target.value);
	};

	const inputToast = () => {
		toast.error('Enter all input fields!');
	};

	const newPassToast = () => {
		toast.error('Your new passwords do not match!');
	};

	const oldPassToast = () => {
		toast.error('Your old password is incorrect!');
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (oldPassword && newPassword && confPassword) {
			if (newPassword === confPassword) {
				API.updatePassword(userId, {
					oldPassword: oldPassword,
					newPassword: newPassword,
				}).then((response) => {
					// console.log(response);
					if (response.ok) {
						// Navigate to homepage
						navigate('/');
						// console.log('response ok');
					} else {
						// Show toast saying old password is wrong
						// console.log('response dead');
						oldPassToast();
					}
				});
			} else {
				// Show toast saying new passwords don't match
				// console.log('new password not matching');
				newPassToast();
			}
		} else {
			// Show toast saying all input fields not filled out
			// console.log('failed');
			inputToast();
		}
	};

	return (
		<div className="change-password-layout">
			<ProfileLayout logout={logout} />
			{isLoading ? (
				<h1>Loading...</h1>
			) : (
				<>
					<div onSubmit={handleSubmit} className="password-container">
						<form action="" className="password-form">
							<h1>Change Password</h1>
							<h2>Current Password</h2>
							<input
								name="currentPassword"
								value={oldPassword}
								onChange={handleOldPass}
							/>
							<h2>New Password</h2>
							<input
								name="newPassword"
								value={newPassword}
								onChange={handleNewPass}
								autoComplete="off"
							/>
							<h2>Confirm New Password</h2>
							<input
								name="confirmPassword"
								type="password"
								value={confPassword}
								onChange={handleConfPass}
							/>
							<div className="password-button">
								<button>Submit</button>
							</div>
						</form>
					</div>
					<ToastContainer
						position="top-center"
						autoClose={3000}
						// autoClose={false}
						hideProgressBar={true}
						newestOnTop={false}
						closeOnClick
						rtl={false}
						pauseOnFocusLoss={false}
						draggable={false}
						pauseOnHover={false}
						theme="light"
						transition:Flip
					/>
				</>
			)}
		</div>
	);
};

export default ChangePassword;
