const express = require('express');
const cors = require("cors");
const app = express();
require("./config/db");
const userRouter = require("./routes/users.route");
const blogRouter = require("./routes/blog.route");
const commentRouter = require("./routes/comment.route");

app.use(cors());
app.use(express.urlencoded({ extended: true}));
app.use(express.json())



app.get("/", (req,res)=>{

    res.sendFile( __dirname +"/./views/index.html");
})

// app.use("/api/users",userRouter);
app.use("/api/blogs",blogRouter);
app.use("/api/comments",commentRouter);

app.use((req, res, next)=>{
    res.status(404).json({ message: "route not found."})
})

// server error handler
app.use(( err, req, res, next)=>{
    res.status(500).json({ message: "something is broke."})
})

module.exports = app;