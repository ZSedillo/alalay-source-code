// userRoutes.js
const express = require('express');
const router = express.Router();
const fileUpload = require("express-fileupload");
const authenticate = require('../middleware/authMiddleware');
const {
    // Authentication
    login, 
    register, 
    forgotPassword, 
    resetPassword, 
    editPassword,
    // User Management
    logout,
    updateUserInfo, 
    updateScholarInfo,
    deleteAccount, 
    getCurrentUser,
    // Friend Management
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    // Scholar browsing
    getAllScholars
} = require('./user.controller');

// Authentication routes
router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/edit-password', authenticate, editPassword);

// User management routes
router.post('/logout', authenticate, logout);
router.post('/update-user-info', authenticate, updateUserInfo);
router.post('/update-scholar-info', authenticate, fileUpload(), updateScholarInfo);
router.delete('/delete-account', authenticate, deleteAccount);
router.get('/current-user', authenticate, getCurrentUser);

// Friend management routes
router.post('/send-friend-request', authenticate, sendFriendRequest);
router.post('/accept-friend-request', authenticate, acceptFriendRequest);
router.post('/remove-friend', authenticate, removeFriend);

// Scholar browsing routes
router.get('/scholars', getAllScholars); // Public route for browsing scholars

module.exports = router;