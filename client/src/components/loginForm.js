import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  //handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(formData);
    try {
      const { data } = await login({
        variables: { ...formData },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormData({
      email: '',
      password: '',
    });

  };

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold text-black">Sign-In</h2>
        <div className="mt-8 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-black">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 px-2 py-1 w-full border border-gray-300 rounded focus:outline-none focus:border-blue"
              />
            </div>
            <div>
              <label htmlFor="password" className="text-gray-700 block">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="mt-1 px-2 py-1 w-full border border-gray-300 rounded focus:outline-none focus:border-blue"
              />
              <div className="mt-4 flex-center-x">
                <Link
                  to="/forgotpassword"
                  className="text-black font-semibold underline text-sm"
                >
                  Forgot Password?
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-4 flex-center-x">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
          <div className="mt-4">
            <p>
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-500 hover:text-blue-600 font-semibold"
              >
                Sign up here.
              </Link>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
