const User = require('../models/User');

// Controller methods for user operations

const getAllUsers = async (req,res)=>{
    try{
const user = await User.findAll();
    res.json(user);
    }
    catch(error){
        res.status(500).json({
            message: "Error retrieving users",
            error: error.message
        })

    }
    
}

const createUser = async (req,res)=>{
     const {name,email} = req.body;
     try{
        const newUser = await User.create({
            name,
            email
        });
        res.status(201).json(newUser);
     }
     catch(error){
        res.status(500).json({
            message: "Error creating user",
            error: error.message
        })
     }
}

const updateUser = async (req,res)=>{
    const {id} = req.params;
    const {name,email} = req.body;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
         await user.save();

    res.json({
      message: "User updated successfully",
      user,
    });
    }
    catch(error){
        res.status(500).json({
            message: "Error updating user",
            error: error.message
        })
    }
}

const deleteUser = async (req,res)=>{
    const {id} = req.params;
    try{
        const user = await User.findByPk(id);
        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }
        await user.destroy();
        res.json({
            message: "User deleted successfully"
        });
    }
    catch(error){
        res.status(500).json({
            message: "Error deleting user",
            error: error.message
        })
    }
}

module.exports= {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}