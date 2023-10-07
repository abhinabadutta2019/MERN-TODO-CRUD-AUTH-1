import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";

const Home = () => {
  //
  const [recipes, setRecipes] = useState([]);

  const [savedRecipes, setSavedRecipes] = useState([]);
  //
  const userId = useGetUserId();
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
    const fetchSavedRecipes = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3009/recipe/savedRecipes/${userId}`
        );

        //
        setSavedRecipes(response.data.savedRecipes);
        //
        console.log(response.data.savedRecipes, "response.data.savedRecipes");
      } catch (err) {
        console.log(err);
      }
    };
    // calling the functions--created inside useEffects
    fetchRecipe();
    fetchSavedRecipes();
  }, []);
  //
  const saveRecipe = async (recipeId) => {
    try {
      const response = await axios.put("http://localhost:3009/recipe", {
        recipeId: recipeId,
        userId: userId,
      });

      //
      //
      // setRecipes(response.data.recipes);
      console.log(response, "response");
    } catch (err) {
      console.log(err);
    }
  };

  //

  //
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe, index) => {
          return (
            <li key={recipe._id}>
              {savedRecipes.includes(recipe._id) && <h2>Already saved</h2>}
              {/*  <li key={index}> */}
              <div>
                <h2>{recipe.name}</h2>
                {/*  */}
                <button onClick={() => saveRecipe(recipe._id)}>Save</button>
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
