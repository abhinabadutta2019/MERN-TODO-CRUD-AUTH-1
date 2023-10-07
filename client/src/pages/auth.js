import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

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
  const [_, setCookies] = useCookies(["access_token"]);
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //

  //for redirection
  const navigate = useNavigate();

  //
  // console.log(username, "username Login");
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3009/auth/login", {
        username: username,
        password: password,
      });
      console.log(response, "response");

      if (response.status !== 201) {
        alert("Login failed");
      } else {
        setCookies("access_token", response.data.token);
        // loacal storage
        window.localStorage.setItem("userID", response.data.userID);
        //redirect to home after login
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      alert("An error occurred while logging in.");
    }
  };
  //
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      label="Login"
      // handleSubmit={handleSubmit}
      onSubmit={handleSubmit}
    />
  );
};

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3009/auth/register", {
        username: username,
        password: password,
      });

      //
      if (response.status !== 201) {
        alert("Login failed");
      } else {
        alert("Registration Completed! Now login.");
        // setCookies("access_token", response.data.token);
        // // loacal storage
        // window.localStorage.setItem("userID", response.data.userID);
        // //redirect to home after login
        // navigate("/");
      }
      //
    } catch (error) {
      console.error(error);
      alert("Regestration not successful");
    }
  };

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
const Form = ({
  username,
  setUsername,
  password,
  setPassword,
  label,
  onSubmit,
}) => {
  return (
    <div className="auth-container">
      {/* error happening for - not -- adding onSubmit={onSubmit} */}
      <form onSubmit={onSubmit}>
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
