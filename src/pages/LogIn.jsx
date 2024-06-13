import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../lib/api/auth";
import useStore from "../zustand/store";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const setUser = useStore((state) => state.setUser); // Correct way to access setUser from Zustand
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const { userId, nickname, avatar } = await login({
        id: id,
        password: password,
      });
      alert("Success Log In");
      setUser({ userId, nickname, avatar });
      navigate("/");
    } catch (error) {
      console.error("Login error:", error);
      // Handle login error here, e.g., show an error message to the user
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <div className="mb-4">
        <label htmlFor="id" className="block text-gray-700 font-bold mb-2">
          ID
        </label>
        <input
          id="id"
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={handleSignIn}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      >
        Log In
      </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
        className="mt-2 w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-gray-200"
      >
        Register
      </button>
    </div>
  );
};

export default SignIn;
