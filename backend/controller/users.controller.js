const User = require("../models/user.model");
const {v4: uuidv4} = require("uuid");

// api/users : GET
const getAllUsers = async(req,res)=>{
    try {
        
        const users = await User.find();
        
        if(users){
            res.status(201).json( { 
                message: "get all users",
                data: users
            })
        }else{
            res.status(404).json({
                message: "users not found"
            })
        }
        

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/users/:id : GET
const getOneUser = async(req, res)=>{
    try {
        
        const user = await User.find({id: req.params.id});
        
        if(user){
            res.status(201).json( { 
                message: "get one users",
                data: user
            })
        }else{
            res.status(404).json({
                message: "user not found"
            })
        }
        

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/users/ :POST
const createUser = async(req, res)=>{

    try {
        const newUser = new User({
            id: uuidv4(),
            name: req.body.name,
            age: Number(req.body.age)
        });
        await newUser.save();
    
        res.status(201).json( { 
            message: "create user",
            data: newUser
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/users/:id PATCH
const updateUser = async(req, res)=>{
   try {
    const updateOneUser = await User.updateOne( {id: req.params.id}, { $set: {name: req.body.name, age: req.body.age}});

    if(updateOneUser){
        const afterUpdateUser = await User.find({id: req.params.id});
        res.status(201).json( {
            message: "User data updated",
            data: afterUpdateUser
        })
    }else{
        res.status(404).json( {
            message: "User not found"
        })
    }
    
   } catch (error) {
    res.status(500).json({
        message: error.message
    })
   }
}

// api/users/:id DELETE
const deleteUser = async(req, res)=>{
    try {
        const deleteUser = await User.deleteOne({ id: req.params.id});
        if(deleteUser){
        const updatedUsers = await User.find();
            res.status(201).json({
                message: "User deleted",
                data: updatedUsers
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}
module.exports = {getAllUsers, getOneUser, createUser, updateUser, deleteUser};