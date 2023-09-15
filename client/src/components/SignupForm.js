import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Button, Input } from "@nextui-org/react";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zipcode: "",
  });
  const [showAlert, setShowAlert] = useState(false);
  const [passwordValid, setPasswordValid] = useState(true); // State variable for password validation
  const [addUser] = useMutation(ADD_USER);

  // Password validation function
  const isPasswordValid = (password) => {
    return password.length >= 8;
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (!isPasswordValid(formState.password)) {
      // Password is invalid, show an alert and return
      setShowAlert(true);
      return;
    }
    try {
      const mutationResponse = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
          zipcode: formState.zipcode,
        },
      });
      if (!mutationResponse.data.signUp) {
        setShowAlert(true);
        return;
      }

      const token = mutationResponse.data.signUp.token;

      Auth.login(token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
    if (name === "password") {
      // Check password validity as it changes
      setPasswordValid(isPasswordValid(value));
    }
  };

  return (
    <div className="container my-1">
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row space-between my-2">
          <Input
            isRequired
            name="firstName"
            type="firstName"
            label="First Name:"
            placeholder="John"
            id="firstName"
            className="max-w-xs shadow-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <Input
            isRequired
            name="lastName"
            type="lastName"
            label="Last Name:"
            placeholder="Doe"
            id="lastName"
            className="max-w-xs shadow-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <Input
            isRequired
            name="email"
            type="email"
            label="Email:"
            placeholder="john.doe@gmail.com"
            id="email"
            className="max-w-xs shadow-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row space-between my-2">
          <Input
            isRequired
            placeholder="******"
            name="password"
            type="password"
            label="Password:"
            id="pwd"
            className={`max-w-xs shadow-lg ${
              !passwordValid ? "border-red-500" : "" // Add a border when password is invalid
            }`}
            onChange={handleChange}
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="flex-row space-between my-2">
          <Input
            placeholder="12345"
            name="zipcode"
            type="zipcode"
            label="Zip Code:"
            id="zipcode"
            className="max-w-xs shadow-lg"
            onChange={handleChange}
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="flex-row flex-end">
          <Button
            type="submit"
            className="m-3 bg-gradient-to-tr from-teal-600 to-zinc-800 text-white shadow-lg"
          >
            Submit
          </Button>
          <Button className="m-3  text-black shadow-lg">
            <Link to="/login">← Go to Login</Link>
          </Button>
        </div>
        <div className="flex-row flex-end">
          {showAlert && (
            <div className="alert">
              Invalid username or password. Please try again.
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
