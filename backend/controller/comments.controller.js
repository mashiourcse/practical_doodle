const Comment = require("../models/comment.model");
const {v4: uuidv4} = require("uuid");

// api/comments : GET
const getblogsComments = async(req,res)=>{
    try {
        
        const comments = await Comment.find(req.body.blogId);
        
        if(comments){
            res.status(201).json( { 
                message: "get all comments",
                data: comments
            })
        }else{
            res.status(404).json({
                message: "comments not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/Comment/:id : GET
const getOneComment = async(req,res)=>{
    try {
        
        const Comment = await Comment.find({id: req.params.id});
        
        if(comments){
            res.status(201).json( { 
                message: "get single Comment",
                data: Comment
            })
        }else{
            res.status(404).json({
                message: "Comment not found"
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

// api/comments : POST
const createComment = async (req, res) => {
    try {
        const newComment = new Comment({
            blogId: parseInt(req.params.blogId),
            id: parseInt(uuidv4()),
            name: req.body.name, // Assuming 'name' is the correct field in your schema
            email: req.body.email,
            body: req.body.body,
        });
        await newComment.save();

        res.status(201).json({
            message: "Comment created successfully",
            data: newComment,
        });
    } catch (error) {
        res.status(500).json({
            message: error.message,
        });
    }
};

// api/comments/:id PATCH
const updateComment = async(req, res)=>{
    try {
     const updateComment = await Comment.updateOne( 
        {id: req.params.id}, 
        { $set: {name: req.body.name, email: req.body.email, body: req.body.body}});
 
     if(updateComment){
         const afterUpdateComment = await Comment.find({id: req.params.id});
         res.status(201).json( {
             message: "Comment data updated",
             data: afterUpdateComment
         })
     }else{
         res.status(404).json( {
             message: "Comment not found"
         })
     }
     
    } catch (error) {
     res.status(500).json({
         message: error.message
     })
    }
 }

 // api/comments/:id PATCH
 const deleteComment = async(req, res)=>{
    try {
        const deleteComment = await Comment.deleteOne({ id: req.params.id});
        if(deleteComment){
        const updatedComments = await Comment.find();
            res.status(201).json({
                message: "Comment deleted",
                data: updatedComments
            })
        }
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
}

module.exports = {getblogsComments, getOneComment, createComment, updateComment, deleteComment};