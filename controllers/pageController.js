const User = require("../models/User");

const showHomePage = async (req, res) => {
  try {
    const users = await User.findAll();

    res.render("index", {
  users,
  error: null,
  formData: {
    name: "",
    email: "",
  },
});
  } catch (error) {
    res.status(500).send("Something went wrong");
  }
};

const createUserFromForm = async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !name.trim()) {
      const users = await User.findAll();

      return res.status(400).render("index", {
        users,
        error: "Name is required",
        formData: {
          name,
          email,
        },
      });
    }

    if (!email || !email.trim()) {
      const users = await User.findAll();

      return res.status(400).render("index", {
        users,
        error: "Email is required",
        formData: {
          name,
          email,
        },
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      const users = await User.findAll();

      return res.status(400).render("index", {
        users,
        error: "Please enter a valid email",
        formData: {
          name,
          email,
        },
      });
    }

    await User.create({
      name: name.trim(),
      email: email.trim(),
    });

    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      const users = await User.findAll();

      return res.status(400).render("index", {
        users,
        error: "This email is already registered",
        formData: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }

    console.error(error);

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
      error: null,
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

    if (!name || !name.trim()) {
      return res.status(400).render("edit", {
        user: {
          id,
          name,
          email,
        },
        error: "Name is required",
      });
    }

    if (!email || !email.trim()) {
      return res.status(400).render("edit", {
        user: {
          id,
          name,
          email,
        },
        error: "Email is required",
      });
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailPattern.test(email)) {
      return res.status(400).render("edit", {
        user: {
          id,
          name,
          email,
        },
        error: "Please enter a valid email",
      });
    }

    user.name = name.trim();
    user.email = email.trim();

    await user.save();

    res.redirect("/");
  } catch (error) {
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).render("edit", {
        user: {
          id: req.params.id,
          name: req.body.name,
          email: req.body.email,
        },
        error: "This email is already registered",
      });
    }

    console.error(error);

    res.status(500).send("Something went wrong");
  }
};

const deleteUserFromForm = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).send("User not found");
    }

    await user.destroy();

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
    deleteUserFromForm,

};