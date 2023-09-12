import React, { useEffect } from 'react';

// Components
import SignupForm from '../components/SignupForm';

const Signup = () => {
    useEffect(() => {
        document.title = 'CareConnect | Signup';
    }, []);

    return (
        <div>
            <SignupForm />
        </div>
    );
};

export default Signup;