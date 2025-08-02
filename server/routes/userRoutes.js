const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authMiddleware');
const {login, register, forgotPassword, resetPassword, editPassword, updateUserInfo, deleteAccount, getCurrentUser} = require('../controllers/userController');

// Authentication routes
router.post('/login', login);
router.post('/register', register);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
router.post('/edit-password', authenticate, editPassword);

// User management routes
router.post('/update-user-info', authenticate, updateUserInfo);
router.delete('/delete-account', authenticate, deleteAccount);
router.get('/current-user', authenticate, getCurrentUser);

module.exports = router;
