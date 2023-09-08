import React from 'react';

// Components
import LoginForm from '../components/LoginForm';

const Login = () => {
    useEffect(() => {
        document.title = 'CareConnect | Login';
    }, []);

    return (
        <div>
            <LoginForm />
        </div>
    );
};

export default Login;