import React from 'react';

// Components
import SignupForm from '../components/SignupForm';

const Settings = () => {
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