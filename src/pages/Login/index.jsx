import './styles.css';
import { useState } from 'react';
import LoginForm from '../../components/Login/index.jsx';
import SignupForm from '../../components/Sign-up/index.jsx';

const Login = () => {
    const [haveAccount, setHaveAccount] = useState(false);

    if (haveAccount) {
        return (
            <LoginForm setHaveAccount={setHaveAccount}/>
        );
    } else {
        return (
            <SignupForm setHaveAccount={setHaveAccount}/>
        );
    }
};

export default Login;