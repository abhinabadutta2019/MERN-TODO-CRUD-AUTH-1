//
import { Link } from "react-router-dom";
//

const Navbar = () => {
  return (
    <div className="navbar">
      <Link to="/">Home</Link>
      <Link to="/auth">Auth</Link>
      <Link to="/create-recipe">Create Recipe</Link>
      <Link to="/saved-recipe">Saved Recipe</Link>
    </div>
  );
};

export default Navbar;
