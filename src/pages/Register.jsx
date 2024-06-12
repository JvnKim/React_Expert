import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../lib/api/auth";

const Register = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (id.length <= 4 || id.length > 10) {
      alert("아이디가 4글자에서 10글자 이내로만 가능합니다.");
      return;
    }
    if (password.length <= 4 || password.length > 15) {
      alert("비밀번호가 4글자에서 15글자 이내로만 가능합니다.");
      return;
    }
    if (nickname.length <= 1 || nickname.length > 10) {
      alert("닉네임은 1글자에서 10글자 이내로만 가능합니다.");
      return;
    }

    const response = await register({
      id: id,
      password: password,
      nickname: nickname,
    });
    if (response) {
      navigate("/login");
    }
  };

  return (
    <div>
      <div>
        <label htmlFor="id">ID</label>
        <input
          type="text"
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="ID"
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div>
        <label htmlFor="nickname">NickName</label>
        <input
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="nickname"
        />
      </div>
      <button onClick={handleRegister}>Register</button>
      <button onClick={() => navigate("/login")}>Log in</button>
    </div>
  );
};

export default Register;
