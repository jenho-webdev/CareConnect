import { useState } from "react";

export default function LoginForm() {
  const [formData, setFormData] = useState({ username: "", password: "" });

  //handle input field changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
     //handle form submit login goes here

  };

  return (
    <div className="py-12">
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold">Sign-In</h2>
        <div className="mt-8 max-w-md mx-auto">
          <div className="space-y-4">
            <div>
              <label htmlFor="username" className="text-gray-700 block">
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                className="mt-1 px-2 py-1 w-full border border-gray-300 rounded focus:outline-none focus:border-black"
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
                className="mt-1 px-2 py-1 w-full border border-gray-300 rounded focus:outline-none focus:border-black"
              />
            </div>
          </div>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
