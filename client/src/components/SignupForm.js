import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import { Button, Input } from "@nextui-org/react";
import { Navigate } from "react-router-dom";

const SignupForm = () => {
  const [formState, setFormState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    zip: "",
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
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
      }, 3000); // Adjust the time as needed (measured in milliseconds)

      return;
    }
    try {
      const mutationResponse = await addUser({
        variables: {
          firstName: formState.firstName,
          lastName: formState.lastName,
          email: formState.email,
          password: formState.password,
          zip: formState.zip,
        },
      });
      if (!mutationResponse.data.signUp) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
        }, 3000); // Adjust the time as needed (measured in milliseconds)
        return;
      }

      const token = mutationResponse.data.signUp.token;

      Auth.login(token);
      <Navigate to="/Home" />;
    } catch (e) {
      console.error(e);
      setShowAlert(true);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "password") {
      // Check password validity as it changes
      setPasswordValid(isPasswordValid(value));
    }
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex-wrap my-1">
      <form onSubmit={handleFormSubmit}>
        <div className="flex-row my-1 w-80 ">
          <Input
            isRequired
            name="firstName"
            type="firstName"
            label="First Name:"
            placeholder="John"
            id="firstName"
            className="min-w-full shadow-lg"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2">
          <Input
            isRequired
            name="lastName"
            type="lastName"
            label="Last Name:"
            placeholder="Doe"
            id="lastName"
            className="max-w-xs shadow-lg min-w-max"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row my-2">
          <Input
            isRequired
            name="email"
            type="email"
            label="Email:"
            placeholder="john.doe@gmail.com"
            id="email"
            className="max-w-xs shadow-lg min-w-max"
            onChange={handleChange}
          />
        </div>
        <div className="flex-row  my-2">
          <Input
            isRequired
            placeholder="******"
            name="password"
            type="password"
            label="Password:"
            id="pwd"
            className="max-w-xs shadow-lg min-w-max"
            errorMessage={
              passwordValid
                ? ""
                : "Please enter a password with at least 8 characters."
            }
            isInvalid={passwordValid ? "invalid" : "valid"}
            onChange={handleChange}
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="flex-row  my-2">
          <Input
            placeholder="12345"
            name="zip"
            type="zipcode"
            label="Zip Code:"
            id="zipcode"
            className="max-w-xs shadow-lg"
            onChange={handleChange}
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="flex-row   ">
          <Button
            type="submit"
            className="w-full max-w-xs bg-gradient-to-tr from-teal-600 to-zinc-800 text-white shadow-lg"
          >
            Create Account
          </Button>
        </div>
        <div className="flex-row  space-x-3 my-2">
          <p className=" flex-0 font-medium text-gary">
            Already have an account?{" "}
          </p>
          <Link
            className=" flex-auto font-semibold text-gary underline hover:text-white"
            to="/login"
          >
            Log in
          </Link>
        </div>
        <div className="flex-row flex-end">
          {showAlert && (
            <div className="alert">Signup Failed. Please try again.</div>
          )}
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
