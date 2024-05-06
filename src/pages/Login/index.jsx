import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.css';

// Main Function
const Login = (props) => {
	//Bool to toggle between login and signup
	// TRUE: will show login form on page load
	// FALSE: will show signup form on page load
	const [haveAccount, setHaveAccount] = useState(true);

	//IF user id exists (logged in) redirect to home page
	const navigate = useNavigate();
	useEffect(() => {
		if (props.userId) {
			navigate('/');
		}
	}, [props.userId]);

	const passToast = () => {
		toast.error('Invalid credentials!');
	};

	// Login Handler
	const loginHandler = async (e) => {
		e.preventDefault();

		try {
			const username = e.target.username.value;
			const password = e.target.password.value;
			const result = await props.handleLogin(e, { username, password });

			if (!result) {
				passToast();
			} else {
				navigate('/');
			}
		} catch (error) {
			console.log(error);
		}
	};

	// Sign Up Handler
	const signUpHandler = (e) => {
		e.preventDefault();
		const username = e.target.username.value;
		const email = e.target.email.value;
		const password = e.target.password.value;
		const confirm = e.target.confirm.value;

		console.log('Sign Up: ' + username, email, password);
		if (password !== confirm) {
			console.log('Passwords do not match');
		} else {
			console.log('Passwords match');
		}
		props.handleSignup({ username, email, password });
		navigate('/');
	};

	if (haveAccount) {
		return (
			<>
				<div className="split left">
					<div className="left centered">
						<form onSubmit={loginHandler} className="user-form">
							<h2>Login</h2>
							<label htmlFor="username">Username</label>
							<input type="text" id="loginUsername" name="username" />
							<br />

							<label htmlFor="password">Password</label>
							<input type="password" id="loginPassword" name="password" />
							<br />

							<input type="submit" value="Log In" />
							<p>
								Don't have an account?
								<a href="#sign-up" onClick={() => setHaveAccount(false)}>
									Sign up
								</a>
							</p>
						</form>
					</div>
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
				<div className="split right" />
			</>
		);
	} else {
		return (
			<>
				<div className="split left">
					<div className="left centered">
						<form onSubmit={signUpHandler} className="user-form">
							<h2>Sign Up</h2>
							<label htmlFor="username">Username</label>
							<input type="text" id="signupUsername" name="username" />
							<br />

							<label htmlFor="email">E-mail</label>
							<input type="email" id="email" name="email" />
							<br />

							<label htmlFor="password">Password</label>
							<input type="password" id="signupPassword" name="password" />
							<br />

							<label htmlFor="confirm">Confirm Password</label>
							<input type="password" id="confirm" name="confirm" />
							<br />

							<input type="submit" value="Sign Up" />
							<p>
								Already have an account?
								<a href="#login" onClick={() => setHaveAccount(true)}>
									Log in
								</a>
							</p>
						</form>
					</div>
				</div>

				<div className="split right" />
			</>
		);
	}
};

export default Login;
