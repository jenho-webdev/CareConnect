import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Input } from "@nextui-org/react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  //handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationRes = await login({
        variables: { email: formData.email, password: formData.password },
      });
      const token = mutationRes.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className=" flex-wrap my-1">
      <form onSubmit={handleSubmit}>
        <div className="flex-row space-between my-2">
          <div className="flex-row space-between my-2">
            <h2 className="text-2xl font-bold">Sign In</h2>
          </div>
          <Input
            isRequired
            name="email"
            type="email"
            label="Email"
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
            label="Password"
            id="pwd"
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
          <Button className=" text-black shadow-lg">
            <Link to="/signup">← Create an account</Link>
          </Button>
        </div>
      </form>
    </div>
    );
}
