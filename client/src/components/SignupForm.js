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
  });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        firstName: formState.firstName,
        lastName: formState.lastName,
        email: formState.email,
        password: formState.password,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
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
            className="max-w-xs shadow-lg"
            onChange={handleChange}
            onClear={() => console.log("input cleared")}
          />
        </div>
        <div className="flex-row space-between my-2">
          <Input
            placeholder="12345"
            name="zipCode"
            type="zipCode"
            label="Zip Code:"
            id="zipCode"
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
      </form>
    </div>
  );
};

export default SignupForm;
