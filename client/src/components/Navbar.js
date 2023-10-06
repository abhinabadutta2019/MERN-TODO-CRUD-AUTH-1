//
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
//

const Navbar = () => {
  //
  const [cookies, setCookies] = useCookies(["access_token"]);
  //for redirection
  const navigate = useNavigate();

  //
  const logoutHandler = () => {
    //setting cookies empty or deleting
    setCookies("access_token", "");
    //emptying local storage
    window.localStorage.removeItem("userID");
    //redirect to home after login
    navigate("/auth");
  };
  //
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipe">Saved Recipe</Link>
      {!cookies.access_token ? (
        <Link to="/auth">Login/Register</Link>
      ) : (
        <button onClick={logoutHandler}>Logout</button>
      )}
    </div>
  );
};

export default Navbar;
