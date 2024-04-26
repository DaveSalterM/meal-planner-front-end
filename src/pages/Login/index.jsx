import './styles.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



// Main Function
const Login = (props) => {
    //Bool to toggle between login and signup
    const [haveAccount, setHaveAccount] = useState(false);
    
    //IF user id exists (logged in) redirect to home page
    const navigate = useNavigate();
    useEffect(() => {
        if (props.userId) {
            navigate('/');
        }
    }, [props.userId] )

    // Login Handler
    const loginHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;
        
        props.handleLogin({username, password});
        navigate('/');
        //console.log('Login: ' + username, password);
    }

    // Sign Up Handler
    const signUpHandler = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const confirm = e.target.confirm.value;

        console.log('Sign Up: ' + username, email, password);
        if(password !== confirm) {
            console.log('Passwords do not match');
        } else {
            console.log('Passwords match');
        }
    }

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
                        <br/>

                        <label htmlFor="email">E-mail</label>
                        <input type="email" id="email" name="email" />
                        <br/>

                        <label htmlFor="password">Password</label>
                        <input type="password" id="signupPassword" name="password" />
                        <br/>

                        <label htmlFor="confirm">Confirm Password</label>
                        <input type="password" id="confirm" name="confirm" />
                        <br/>

                        <input type="submit" value="Sign Up" />
                    <p>
                        Already have an account? 
                        <a 
                            href="#login"
                            onClick={() => setHaveAccount(true)}
                        >
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