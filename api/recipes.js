let recipes = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    cuisine: "Italian",
    minutes: 25,
    servings: 4,
    vegetarian: false,
  },
  {
    id: 2,
    title: "Chana Masala",
    cuisine: "Indian",
    minutes: 35,
    servings: 4,
    vegetarian: true,
  },
  {
    id: 3,
    title: "Fish Tacos",
    cuisine: "Mexican",
    minutes: 20,
    servings: 3,
    vegetarian: false,
  },
  {
    id: 4,
    title: "Margherita Pizza",
    cuisine: "Italian",
    minutes: 40,
    servings: 2,
    vegetarian: true,
  },
  {
    id: 5,
    title: "Pad Thai",
    cuisine: "Thai",
    minutes: 30,
    servings: 2,
    vegetarian: false,
  },
];

let nextId = 6;


const router = require("express").Router();

function checkTitleAndCuisine(req, res, next) {
//   console.log("checkTitleAndCuisine middleware", req);
  const { title, cuisine } = req.body;
  title && cuisine
    ? console.log("Title and Cuisine are here!")
    : res.status(400).send("Error: Must provide BOTH Title and Cuisine");
  next();
}

router.get("/", (req, res) => {
  console.log("testing");
  res.json(recipes);
});

router.get("/:id", (req, res, next) => {
  try {
    const recipe = recipes.find(({ id }) => id === Number(req.params.id));
    if (recipe) {
      res.json(recipe);
    } 
  } catch (err) {
    next(err);
  }
});

router.post("/", checkTitleAndCuisine, (req, res, next) => {
  //console.log("ROUTER POST", req.body);
  try {
    const { title, cuisine, minutes, servings, vegetarian } = req.body;

    const newRecipe = {
      id: nextId,
      title,
      cuisine,
      minutes,
      servings,
      vegetarian,
    };
    nextId++;
    recipes.push(newRecipe);
    res.status(201).json(newRecipe);

  } catch (err) {
    next(err);
  }
});

router.patch("/:id", (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const recipeToUpdate = recipes.find((recipe) => recipe.id === recipeId);

    if (recipeToUpdate)
      Object.assign(recipeToUpdate, req.body) &&
        res.status(200).send(recipeToUpdate)
    //: res.status(404).send("Recipe not found!");

    throw new Error("Invalid ID: can't patch");
  } catch (err) {
    next(err);
  }
});

router.delete("/:id", (req, res, next) => {
  try {
    const recipeId = Number(req.params.id);
    const recipePosition = recipes.find((recipe) => recipe.id === recipeId);

    if (recipePosition){
      recipes.splice(recipePosition.id - 1, 1) && res.sendStatus(204); //: res.status(404).send("Recipe not found!");
    //                 the position id - 1 because index starts at 0, then it will delete 1 index after it;
  }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
