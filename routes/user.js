const { Router } = require("express");

const Users = require("../models/User");
const Favorites = require("../models/Favorites");
const { generateToken } = require("../config/tokens");
const { validateAuth } = require("../middleware/auth");
const { passwordValidator } = require("../middleware/validateStrongPw");

const router = Router();

router.get("/favorites/:id", validateAuth, async (req, res) => {
  const { id } = req.params;
  try {
    const favorites = await Favorites.findAll({
      where: {
        UserId: id,
      },
    });
    res.status(200).send(favorites);
  } catch (error) {
    res.status(422).send({
      error: "Unprocessable Entity",
      message: "There was a problem find the Favorites List",
      details: error.message,
    });
  }
});

router.post("/addFavorites/:Userid", validateAuth, async (req, res) => {
  const { Userid } = req.params;
  const { id, type } = req.body;
  try {
    const newUser = await Users.findOne({
      where: {
        id: Userid,
      },
    });
    const addFavorites = await Favorites.create({
      UserId: newUser.id,
      movieId: id,
      movieType: type,
    });
    res.status(200).send(addFavorites);
  } catch (error) {
    res.status(422).send({
      error: "Unprocessable Entity",
      message: "There was a problem creating the Favorites",
      details: error.message,
    });
  }
});

router.post("/register", passwordValidator, async (req, res) => {
  const { name, lastName, email, password } = req.body;
  try {
    const newUser = await Users.create({ name, lastName, email, password });
    res.status(201).send(newUser);
  } catch (error) {
    res.status(422).send({
      error: "Unprocessable Entity",
      message: "There was a problem creating the user",
      details: error.message,
    });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findOne({ where: { email: email } });
    if (!user)
      return res.status(401).send({
        error: "Unauthorized",
        message: "Invalid user",
      });
    const validate = await user.validatePassword(password);
    if (!validate)
      return res.status(401).send({
        error: "Unauthorized",
        message: "Invalid password",
      });

    const payload = {
      id: user.id,
      name: user.name,
      lastName: user.lastName,
      password: user.password,
      email: user.email,
    };
    const token = generateToken(payload);
    res.cookie("token", token).send(payload);
  } catch (error) {
    res.status(422).send({
      error: "Unprocessable Entity",
      message: "There was a problem login the user",
      details: error.message,
    });
  }
});

router.post("/logout", (req, res) => {
  try {
    res.clearCookie();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;
