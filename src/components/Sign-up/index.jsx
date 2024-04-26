import './styles.css';

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

function SignupForm ({setHaveAccount}) {
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
                        href="#sign-up"
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
    )
}

export default SignupForm;