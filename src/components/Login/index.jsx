import './styles.css';

const loginHandler = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    
    console.log('Login: ' + username, password);
}

const Login = ({setHaveAccount}) => {
    return (
        <>   
        <div className="login-split">         
            <div className="login-form">
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
                <a 
                    href="#login"
                    onClick={() => setHaveAccount(false)}
                >
                    Sign up
                </a>
            </p>
            </form>
            </div>
        
            <div className="login-image">
                
            </div>
        </div>
        </>
    )
};

export default Login;