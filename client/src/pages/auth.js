import { useState } from "react";
import axios from "axios";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

//
const Login = () => {
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //
  // console.log(username, "username Login");
  //
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      // handleSubmit={handleSubmit}
    />
  );
};

const Register = () => {
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //
  // console.log(username, "username Register");
  //
  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("Hi");
    try {
      await axios.post("http://localhost:3009/auth/register", {
        username,
        password,
      });
      alert("regestration completed");
    } catch (err) {
      console.log(err);
    }
  };
  //
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Register"
      onSubmit={handleSubmit}
    />
  );
};

//
const Form = ({ username, setUsername, password, setPassword, label }) => {
  return (
    <div className="auth-container">
      <form>
        <h2>{label}</h2>
        {/*  */}
        <div className="form-group">
          <label htmlFor="username"> Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        {/*  */}
        <div className="form-group">
          <label htmlFor="password"> Password</label>
          <input
            type="text"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {/*  */}
        <button type="submit">{label}</button>
      </form>
    </div>
  );
};
//
export default Auth;
