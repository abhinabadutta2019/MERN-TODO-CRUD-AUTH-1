import axios from "axios";
import { useState } from "react";
import { useGetUserId } from "../hooks/useGetUserId.js";

import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const CreateRecipe = () => {
  //

  const userID = useGetUserId();
  const [cookies, _] = useCookies(["access_token"]);
  //
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  //
  //for redirection
  const navigate = useNavigate();

  //
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };
  //
  const handleIngredientChange = (e, idx) => {
    const { value } = e.target;
    const ingredients = recipe.ingredients;
    ingredients[idx] = value;
    setRecipe({ ...recipe, ingredients: ingredients });
  };
  //
  const addIngredients = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };
  //"http://localhost:3009/recipe"
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://mern-recipe-backend.onrender.com/recipe",
        {
          ...recipe,
        },
        {
          headers: { authorization: cookies.access_token },
        }
      );
      alert("Recipe created");
      // console.log(response, "response");
      //redirect to home after login
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  // console.log(recipe, "recipe");

  //
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>

      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" onChange={handleChange} />
        {/*  */}
        {/* <label htmlFor="description">Description</label>
        <textarea name="description" id="description"></textarea> */}
        {/*  */}
        <label htmlFor="ingredients">Ingredients</label>
        {/* <input type="ingredients" name="ingredients" id="ingredients" /> */}

        {recipe.ingredients.map((ingredient, idx) => (
          <input
            key={idx}
            type="text"
            name="ingredients"
            value={ingredient}
            onChange={(event) => {
              handleIngredientChange(event, idx);
            }}
          />
        ))}
        {/*type="button"  helps to not reload */}
        <button onClick={addIngredients} type="button">
          Add Ingredients{" "}
        </button>

        {/*  */}
        <label htmlFor="instructions">Instructions</label>
        <textarea
          name="instructions"
          id="instructions"
          onChange={handleChange}
        ></textarea>
        {/*  */}
        <label htmlFor="imageUrl">Image Url</label>
        <input
          type="text"
          id="imageUrl"
          name="imageUrl"
          onChange={handleChange}
        />
        {/*  */}
        <label htmlFor="cookingTime">Cooking Time(Minutes)</label>
        <input
          type="number"
          id="cookingTime"
          name="cookingTime"
          onChange={handleChange}
        />
        {/*  */}
        <button type="submit">Create Recipe</button>
      </form>
    </div>
  );
};

export default CreateRecipe;
