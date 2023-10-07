import express from "express";
//mention .js -- or error happen when export
import { Recipe } from "../models/Recipes.js";
import { User } from "../models/Users.js";
import { verifyToken } from "./users.js";
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
router.post("/", verifyToken, async (req, res) => {
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
    console.log(createdRecipe, "createdRecipe");

    res.json({
      message: "recipes created",
      newRecipe: createdRecipe.toObject(),
    });
  } catch (err) {
    res.json(err);
  }
});
//
// update
router.put("/", verifyToken, async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.body.recipeId);
    const user = await User.findById(req.body.userId);
    //
    console.log(recipe, "recipe");

    user.savedRecipes.push(recipe);
    const savedRecipesArr = await user.save();

    // console.log(savedRecipesArr, "savedRecipesArr");

    //
    return res.status(201).json({
      savedRecipes: user.savedRecipes,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get id of saved recipes
router.get("/savedRecipes/ids/:userId", async (req, res) => {
  try {
    console.log(req.params, "req.params from savedRecipes/ids ");
    const user = await User.findById(req.params.userId);

    res.json({ savedRecipes: user?.savedRecipes });
  } catch (err) {
    res.json(err);
  }
});
// Get saved recipes
router.get("/savedRecipes/:userId", verifyToken, async (req, res) => {
  try {
    console.log(req.params, "req.params from savedRecipes");
    const user = await User.findById(req.params.userId);
    const savedRecipes = await Recipe.find({ _id: { $in: user.savedRecipes } });
    res.json({ savedRecipes: savedRecipes });
  } catch (err) {
    res.json(err);
  }
});

//
export { router as recipeRouter };
