// postRoutes.js - Fixed version
const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const authenticate = require('../middleware/authMiddleware');
const {
    getAllPosts,
    getUserFeed,
    createPost,
    editPost,
    deletePost,
    toggleLike,
    addComment,
    deletePostImage
} = require("../controllers/postController");

// Public routes
router.get("/", getAllPosts); // Get all public posts

// // Protected routes (require authentication)
// router.get("/feed", authenticate, getUserFeed); // Get user's personalized feed
// router.post("/create", authenticate, fileUpload(), createPost); // Create new post

// // Post management routes - Fixed parameter syntax
// router.put("/edit/:id", authenticate, fileUpload(), editPost); // Edit post
// router.delete("/delete/:id", authenticate, deletePost); // Delete post

// // Interaction routes - Fixed parameter syntax
// router.post("/like/:id", authenticate, toggleLike); // Like/unlike post
// router.post("/comment/:id", authenticate, addComment); // Add comment

// // Image management - Fixed parameter syntax
// router.delete("/:id/image/:imageId", authenticate, deletePostImage); // Delete specific image

// Protected routes (without authentication <DEBUGGING>)
router.get("/feed", getUserFeed); // Get user's personalized feed
router.post("/create", fileUpload(), createPost); // Create new post
router.put("/edit/:id", fileUpload(), editPost); // Edit post
router.delete("/delete/:id", deletePost); // Delete post
router.post("/like/:id", toggleLike); // Like/unlike post
router.post("/comment/:id", addComment); // Add comment
router.delete("/:id/image/:imageId", deletePostImage); // Delete specific image

module.exports = router;