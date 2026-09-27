const express = require("express");

const {
  showHomePage,
  createUserFromForm,
  showEditPage,
  updateUserFromForm,
  deleteUserFromForm,
} = require("../controllers/pageController");

const router = express.Router();

router.get("/", showHomePage);

router.post("/", createUserFromForm);

router.get("/users/:id/edit", showEditPage);

router.put("/users/:id", updateUserFromForm);

router.delete("/users/:id", deleteUserFromForm);

module.exports = router;