import axios from "axios";
import { useEffect, useState } from "react";

const Home = () => {
  //
  const [recipes, setRecipes] = useState([]);
  //
  useEffect(() => {
    //directly - not recomment to use async with useEffect
    const fetchRecipe = async () => {
      try {
        const response = await axios.get("http://localhost:3009/recipe");

        //
        setRecipes(response.data.recipes);
        console.log(response.data.recipes, "response.data");
      } catch (err) {
        console.log(err);
      }
    };
    //
    fetchRecipe();
  }, []);
  //

  //
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => {
          return (
            <li key={recipe._id}>
              {/*  <li key={index}> */}
              <div>
                <h2>{recipe.name}</h2>
              </div>
              <div className="instructions">
                <p>{recipe.instructions}</p>
              </div>
              <img src={recipe.imageUrl} alt={recipe.name} />
              <p> Cooking Time={recipe.cookingTime} </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Home;
