import React from 'react';

const ForgotPasswordForm = () => {
    return (
        <div>
            <h1>Forgot Password</h1>
            <p>Please enter your email address below. We will send you an email with a link to reset your password.</p>
            <form>
                <label htmlFor="email">Email Address</label>
                <input type="email" name="email" id="email" />
                <button type="submit">Reset Password</button>
            </form>
        </div>
    );
};

export default ForgotPasswordForm;