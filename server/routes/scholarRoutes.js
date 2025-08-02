const express = require("express");
const router = express.Router();
const fileUpload = require("express-fileupload");
const {
    getAllScholars,
    addScholar,
    editScholar,
    deleteScholar
} = require("../controllers/scholarController");
const authenticate = require('../middleware/authMiddleware'); // Import the middleware

// Routes
router.get("/", getAllScholars);

// Add this later when needed to authenticate the user
// router.post("/add", authenticate, fileUpload(), addScholar);
// router.put("/edit/:id", authenticate, fileUpload(), editScholar);
// router.delete("/delete/:id", authenticate, deleteScholar);

router.post("/add",  fileUpload(), addScholar);
router.put("/edit/:id", fileUpload(), editScholar);
router.delete("/delete/:id", deleteScholar);

module.exports = router;
