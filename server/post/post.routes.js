// postRoutes.js - Updated with funding endpoints
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
    deletePostImage,
    // 🆕 New funding functions
    fundPost,
    getPostFunding,
    getUserFundingHistory,
    getFundingStats,
    togglePostFunding
} = require("./post.controller");

// Public routes
router.get("/", getAllPosts); // Get all public posts

// // Protected routes (require authentication) - PRODUCTION VERSION
// router.get("/feed", authenticate, getUserFeed); // Get user's personalized feed
// router.post("/create", authenticate, fileUpload(), createPost); // Create new post

// // Post management routes
// router.put("/edit/:id", authenticate, fileUpload(), editPost); // Edit post
// router.delete("/delete/:id", authenticate, deletePost); // Delete post

// // Interaction routes
// router.post("/like/:id", authenticate, toggleLike); // Like/unlike post
// router.post("/comment/:id", authenticate, addComment); // Add comment

// // Image management
// router.delete("/:id/image/:imageId", authenticate, deletePostImage); // Delete specific image

// // 🆕 Funding routes - PRODUCTION VERSION
// router.post("/fund/:id", authenticate, fundPost); // Fund a post
// router.get("/funding/:id", authenticate, getPostFunding); // Get funding details for a post
// router.get("/funding-history", authenticate, getUserFundingHistory); // Get user's funding history
// router.get("/funding-stats", authenticate, getFundingStats); // Get funding statistics
// router.put("/toggle-funding/:id", authenticate, togglePostFunding); // Enable/disable funding for a post

// 🚧 Protected routes (without authentication for DEBUGGING - remove in production)
router.get("/feed", getUserFeed); // Get user's personalized feed
router.post("/create", fileUpload(), createPost); // Create new post
router.put("/edit/:id", fileUpload(), editPost); // Edit post
router.delete("/delete/:id", deletePost); // Delete post
router.post("/like/:id", toggleLike); // Like/unlike post
router.post("/comment/:id", addComment); // Add comment
router.delete("/:id/image/:imageId", deletePostImage); // Delete specific image

// 🆕 Funding routes - DEBUGGING VERSION (remove authentication for testing)
router.post("/fund/:id", fundPost); // Fund a post
router.get("/funding/:id", getPostFunding); // Get funding details for a post
router.get("/funding-history", getUserFundingHistory); // Get user's funding history
router.get("/funding-stats", getFundingStats); // Get funding statistics
router.put("/toggle-funding/:id", togglePostFunding); // Enable/disable funding for a post

module.exports = router;