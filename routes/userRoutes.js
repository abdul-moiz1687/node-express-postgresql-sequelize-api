const express = require('express')
const {getAllUsers,createUser,updateUser,deleteUser } = require('../controllers/userController')

const routes = express.Router()

routes.get("/", (req, res) => {
  res.render("index");
});


routes.get('/users',getAllUsers)
routes.post('/users',createUser)
routes.put('/users/:id',updateUser)
routes.delete('/users/:id',deleteUser)


module.exports = routes