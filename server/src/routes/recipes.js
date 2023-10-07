import express from "express";
//mention .js -- or error happen when export
import { Recipe } from "../models/Recipes.js";
const router = express.Router();
//
//get all
router.get("/", async (req, res) => {
  try {
    const recipes = await Recipe.find({});

    if (recipes.length < 1) {
      return res.json({ message: "no recipe found" });
    }

    res.json({ message: "recipes found", recipes: recipes });
  } catch (err) {
    res.json(err);
  }
});

// create
router.post("/", async (req, res) => {
  try {
    const recipe = new Recipe({
      name: req.body.name,

      ingredients: req.body.ingredients,
      instructions: req.body.instructions,
      imageUrl: req.body.imageUrl,
      cookingTime: req.body.cookingTime,
      userOwner: req.body.userOwner,
    });
    //
    console.log(recipe);
    //
    const createdRecipe = await recipe.save();
    //
    res.json({
      message: "recipes created",
      newRecipe: createdRecipe.toObject(),
    });
  } catch (err) {
    res.json(err);
  }
});
//
export { router as recipeRouter };
