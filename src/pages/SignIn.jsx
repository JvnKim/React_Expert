import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = () => {
    console.log(id, password);
  };

  return (
    <>
      <div>
        <label htmlFor="id">ID</label>
        <input
          type="text"
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <button onClick={handleSignIn}>Log In </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Register{" "}
      </button>
    </>
  );
};

export default SignIn;
