import axios from "axios";
import { useEffect, useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId";

const SavedRecipes = () => {
  //
  const [savedRecipes, setSavedRecipes] = useState([]);

  //
  const userId = useGetUserId();
  //
  useEffect(() => {
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

    fetchSavedRecipes();
  }, []);
  //

  //
  return (
    <div>
      <h1>Saved Recipes</h1>
      <ul>
        {savedRecipes.map((recipe, index) => {
          return (
            <li key={recipe._id}>
              {/* {savedRecipes.includes(recipe._id) && <h2>Already saved</h2>} */}
              {/*  <li key={index}> */}
              <div>
                <h2>{recipe.name}</h2>
                {/*  */}
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

export default SavedRecipes;
