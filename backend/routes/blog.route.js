const express = require("express");

const router = express.Router();
const { getBlogs, getOneBlog, createBlog, updateBlog, deleteBlog} = require("../controller/blogs.controller");

// api/blogs : GET
router.get("/", getBlogs);
// api/blog/:id GET
router.get("/:id", getOneBlog);
// api/blogs CREATE
router.post("/", createBlog);

// api/blog/:id UPDATE
router.patch("/:id", updateBlog);
// api/blog/:id DELETE
router.delete("/:id", deleteBlog);


module.exports = router;