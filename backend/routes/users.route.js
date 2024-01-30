const express = require("express");

const router = express.Router();

const {getAllUsers, getOneUser, createUser, updateUser, deleteUser} = require("../controller/users.controller");

// api/users : GET
router.get("/", getAllUsers);

// api/users/:id : GET
router.get("/:id", getOneUser);

// api/users/ :POST
router.post("/", createUser);

// api/users/:id PATCH
router.patch("/:id", updateUser);

// api/users/:id DELETE
router.delete("/:id", deleteUser);

module.exports = router;