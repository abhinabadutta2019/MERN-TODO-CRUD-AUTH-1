import { useState } from "react";

const Auth = () => {
  return (
    <div className="auth">
      <Login />
      <Register />
    </div>
  );
};

//
const Login = () => <></>;

const Register = () => {
  //
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //
  return (
    <div className="auth-container">
      <form>
        <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
};
export default Auth;
