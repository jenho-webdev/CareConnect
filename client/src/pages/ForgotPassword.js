import React, { useEffect } from 'react';

// Components
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPassword = () => {
    useEffect(() => {
        document.title = 'CareConnect | Forgot Password';
    }, []);

    return (
        <div>
            <ForgotPasswordForm />
        </div>
    );
};

export default ForgotPassword;
