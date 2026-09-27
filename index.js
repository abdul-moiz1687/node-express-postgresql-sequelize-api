const express = require("express");
const sequelize = require("./db");
const userRoutes = require("./routes/userRoutes");
const pageRoutes = require("./routes/pageRoutes");
const methodOverride = require("method-override");
require("dotenv").config();

const app = express();

app.set("view engine", "ejs");

app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/api', userRoutes);
app.use("/", pageRoutes);

sequelize
  .authenticate()
  .then(() => {
    console.log("✅ PostgreSQL connected");
  })
  .catch((error) => {
    console.error("❌ Database connection failed:", error.message);
  });

sequelize
  .sync()
  .then(() => {
    console.log("✅ Database synced");
  })
  .catch((error) => {
    console.error("❌ Database sync failed:", error.message);
  });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});