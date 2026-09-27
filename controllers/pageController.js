const User = require("../models/User");

const showHomePage = async (req, res) => {
  try {
    const users = await User.findAll();

    res.render("index", {
      users,
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const createUserFromForm = async (req, res) => {
  try {
    const { name, email } = req.body;

    await User.create({
      name,
      email,
    });

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const showEditPage = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    res.render("edit", {
      user,
    });
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const updateUserFromForm = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.name = name;
    user.email = email;

    await user.save();

    res.redirect("/");
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  showHomePage,
  createUserFromForm,
  showEditPage,
  updateUserFromForm,
};