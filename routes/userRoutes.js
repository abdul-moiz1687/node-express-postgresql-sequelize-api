const express = require('express')
const {getAllUsers,createUser,updateUser } = require('../controllers/userController')

const routes = express.Router()

routes.get('/users',getAllUsers)
routes.post('/users',createUser)
routes.put('/users/:id',updateUser)
module.exports = routes