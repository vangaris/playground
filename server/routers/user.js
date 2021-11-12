const auth = require("../middleware/auth");
const express = require("express");
const User = require("../models/user");
const router = new express.Router();
var cors = require("cors");

//after request opotion needed
router.options("/users", cors());
router.options("/users/login", cors());
router.options("/users/me", cors());

router.post("/users", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const user = await new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.get("/users", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/login", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.send({
      user,
      token,
    });
  } catch (e) {
    res.status(400).send(e);
  }
});

router.post("/users/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/users/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.status(200).send();
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/users/me", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");

  res.send(req.user);
});

router.get("/users/:id", async (req, res) => {
  const _id = req.params.id;

  try {
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).send();
    }

    await res.send(user);
  } catch (e) {
    res.status(500).send();
  }
});

router.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phone",
    "email",
    "age",
    "username",
    "password",
  ];

  const isValidaOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidaOperation) {
    res.status(404).send({
      error: "Inavalid update",
    });
  }

  try {
    updates.forEach((update) => {
      return (req.user[update] = req.body[update]);
    });

    await req.user.save();

    res.send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.delete("/users/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
