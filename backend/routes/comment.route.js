const express = require("express");

const router = express.Router();

const {getblogsComments, getOneComment, createComment, updateComment, deleteComment} = require("../controller/comments.controller");

// api/Comments : GET
router.get("/:blogId", getblogsComments);

// api/Comments/:id : GET
router.get("/:id", getOneComment);

// api/Comments/ :POST
router.post("/:blogId", createComment);

// api/Comments/:id PATCH
router.patch("/:id", updateComment);

// api/Comments/:id DELETE
router.delete("/:id", deleteComment);

module.exports = router;