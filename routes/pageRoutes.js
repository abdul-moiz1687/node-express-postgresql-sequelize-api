const express = require("express");

const { showHomePage,createUserFromForm, showEditPage,
  updateUserFromForm,} = require("../controllers/pageController");

const router = express.Router();

router.get("/", showHomePage);
router.post("/users", createUserFromForm);
router.get("/users/:id/edit", showEditPage);
router.put("/users/:id", updateUserFromForm);

module.exports = router;