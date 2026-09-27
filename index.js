const express = require("express");
const sequelize = require("./db");
const userRoutes = require("./routes/userRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use('/api', userRoutes);

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