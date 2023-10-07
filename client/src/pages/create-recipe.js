import { useState } from "react";

const CreateRecipe = () => {
  //
  const [recipe, setRecipe] = useState({
    name: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: 0,
  });
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

  console.log(recipe, "recipe");
  //
  return (
    <div className="create-recipe">
      <h2>Create Recipe</h2>

      <form>
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
