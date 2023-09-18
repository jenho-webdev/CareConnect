import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import Auth from "../utils/auth";
import { Button, Input } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [login, { error, data }] = useMutation(LOGIN_USER);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook

  //handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const mutationRes = await login({
        variables: {
          email: formData.email,
          password: formData.password,
        },
      });
      if (!mutationRes.data.login) {
        setShowAlert(true);
        setAlertMessage("Login Failed. Please check your credentials.");
        setTimeout(() => {
          setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
          setAlertMessage(""); // Reset the message to an empty string
        }, 3000); // Adjust the time as needed (measured in milliseconds)

        return;
      }

      const token = mutationRes.data.login.token;
      setShowAlert(false);
      Auth.login(token);
      // Redirect to the dashboard
      navigate("/dashboard");

      
    } catch (e) {
      console.error("An error occurred during login: ", e.message);
      setShowAlert(true);
      setAlertMessage(`{e.message}`);
      setTimeout(() => {
        setShowAlert(false); // Hide the alert after a certain time (e.g., 3000ms or 3 seconds)
        setAlertMessage(""); // Reset the message to an empty string
      }, 3000); // Adjust the time as needed (measured in milliseconds)
    }
  };

  return (
    <div className=" flex-wrap my-1">
      {data ? (
        <p>Success! Redirecting to dashboard.</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="flex-row space-between my-2">
            <h2 className="text-2xl font-bold">Sign In</h2>
          </div>
          <div className="flex-row space-between my-2">
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
          <div className="flex-row flex-start">
            <Button
              type="submit"
              className="m-3 bg-gradient-to-tr from-teal-600 to-zinc-800 text-white shadow-lg"
            >
              Submit
            </Button>
            <Button className=" m-3 text-black shadow-lg">
              <Link to="/signup">← Create an account</Link>
            </Button>
          </div>
          <div className="flex-row flex-end" role="alert">
            {(showAlert || error) && (
              <>
                <div className=" alert text-white ext-sm font-bold px-4 py-4">
                  <p className="text-m font-bold text-red-400">
                    {error.message}!
                  </p>
                </div>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  );
}
