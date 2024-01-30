const Blog = require("../models/blog.model");
const {v4: uuidv4} = require("uuid");

// api/blogs : GET
const getBlogs = async(req,res)=>{
    try {
        
        const blogs = await Blog.find();
        
        if(blogs){
            res.status(201).json( { 
                message: "get all blogs",
                data: blogs
            })
        }else{
            res.status(404).json({
                message: "blogs not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/blog/:id : GET
const getOneBlog = async(req,res)=>{
    try {
        
        const blog = await Blog.find({id: req.params.id});
        
        if(blog){
            res.status(201).json( { 
                message: "get single blog",
                data: blog
            })
        }else{
            res.status(404).json({
                message: "blog not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/blogs : POST
const createBlog = async(req, res)=>{

    try {
        const newBlog = new Blog({
            id: parseInt(uuidv4()),
            userId: parseInt(req.body.userId),
            title: req.body.title,
            body: req.body.body
        });
        await newBlog.save();
    
        res.status(201).json( { 
            message: "create Blog",
            data: newBlog
        })

    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/blog/:id PATCH
const updateBlog = async(req, res)=>{
    try {
     const updateBlog = await Blog.updateOne( 
        {id: req.params.id}, 
        { $set: {title: req.body.title, body: req.body.body}});
 
     if(updateBlog){
         const afterUpdateBlog = await Blog.find({id: req.params.id});
         res.status(201).json( {
             message: "Blog data updated",
             data: afterUpdateBlog
         })
     }else{
         res.status(404).json( {
             message: "Blog not found"
         })
     }
     
    } catch (error) {
     res.status(500).json({
         message: error.message
     })
    }
 }

 // api/blog/:id DELETE
 const deleteBlog = async(req, res)=>{
    try {
        const deleteBlog = await Blog.deleteOne({ id: req.params.id});
        if(deleteBlog){
        const updatedBlogs = await Blog.find();
            res.status(201).json({
                message: "Blog deleted",
                data: updatedBlogs
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {getBlogs, getOneBlog, createBlog, updateBlog, deleteBlog};