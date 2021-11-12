const express = require("express");
const Examination = require("../models/examination");
const router = new express.Router();
const auth = require("../middleware/auth");
var cors = require("cors");

router.options("/examinations", cors());
router.options("/examinations/:id", cors());

router.get("/test", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.send({ name: "Aris", lastname: "Vang" });
});

router.delete("/examinations/:id", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const id = req.params.id;
  try {
    const examination = await Examination.findOneAndDelete({
      _id: id,
      owner: req.user._id,
    });

    if (!examination) {
      return res.status(404).send({
        error: "Invalid examination",
      });
    }

    res.status(200).send(examination);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.patch("/examinations/:id", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const updates = Object.keys(req.body);
  console.log("updates:", updates);
  const allowedUpdates = ["description", "completed"];

  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid input",
    });
  }

  try {
    const examination = await Examination.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    console.log("examinations:", examination);

    if (!examination) {
      return res.status(404).send();
    }

    updates.forEach((update) => (examination[update] = req.body[updates]));

    await examination.save();
    res.send(examination);
  } catch (e) {
    res.status(500).send(e);
  }
});

//GET /examinations?completed = true
//GET /examinations?limit = 10&skip=20
//GET /examinations?sortBy = createdAt:desc
router.get("/examinations", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const match = {};
  const sort = {};

  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const parts = req.query.sortBy.split(":");

    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    // const task = await Task.find({ owner: req.user._id });
    await req.user
      .populate({
        path: "myExaminations",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();

    res.status(200).send(req.user.myExaminations);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.get("/examinations/:id", auth, async (req, res) => {
  const _id = req.params.id;

  try {
    const examination = await Examination.findOne({
      _id,
      owner: req.user._id,
    });

    if (!examination) {
      return res.status(404).send();
    }

    res.status(200).send(examination);
  } catch (e) {
    res.status(500).send(e);
  }
});

router.post("/examinations", auth, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  const examination = new Examination({
    ...req.body,
    owner: req.user._id,
  });

  try {
    await examination.save();
    res.status(201).send(examination);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
