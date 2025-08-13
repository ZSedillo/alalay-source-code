// userController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const userModel = require('./user.model');
const { v4 } = require("uuid");
const { putObjectScholar } = require("../util/putObjectScholar");
const { deleteObjectScholar } = require("../util/deleteObjectScholar");
const dotenv = require('dotenv');

dotenv.config();

// Authentication Controllers
const login = async (req, res) => {
  const { username, password } = req.body;

  // 🔍 Check for missing inputs
  if (!username && !password) {
    return res.status(400).json({ error: "Please enter username and password" });
  }
  if (!username) {
    return res.status(400).json({ error: "Please enter username" });
  }
  if (!password) {
    return res.status(400).json({ error: "Please enter password" });
  }

  try {
    const user = await userModel.findOne({ username })
      .populate('friends', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');

    // ❌ Username not found
    if (!user) {
      return res.status(400).json({ error: "Incorrect Credentials" });
    }

    // ❌ Password mismatch
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Incorrect Credentials" });
    }

    // ✅ Create JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // 🍪 Send token in HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'Lax',
      maxAge: 60 * 60 * 1000 // 1 hour
    });

    // ✅ Success response with user info
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        scholarInfo: user.scholarInfo,
        friends: user.friends
      }
    });

  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};


const logout = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Lax',
  });
  res.status(200).json({ message: "Logged out successfully" });
};

const register = async (req, res) => {
    const { username, email, password, firstName, middleInitial, lastName, gwa, userLevel } = req.body;
    try {
        if (await userModel.findOne({ username })) return res.status(400).json({ error: "Username already exists" });
        if (await userModel.findOne({ email })) return res.status(400).json({ error: "Email already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new userModel({ 
            username, 
            email, 
            password: hashedPassword,
            scholarInfo: {
                firstName,
                middleInitial,
                lastName,
                gwa,
                userLevel
            }
        });
        
        await newUser.save();

        res.json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const forgotPassword = async (req, res) => {
    const { username } = req.body;
    try {
        const user = await userModel.findOne({ email: username });
        if (!user) return res.status(404).json({ error: "No account found with that email" });

        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: "User verified successfully", resetToken, userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const resetPassword = async (req, res) => {
    const { password, token } = req.body;
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;

        const hashedPassword = await bcrypt.hash(password, 10);
        await userModel.findByIdAndUpdate(userId, { password: hashedPassword });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const editPassword = async (req, res) => {
    const { password, targetUserId } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const updatedUser = await userModel.findByIdAndUpdate(targetUserId, { password: hashedPassword });

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Sponsor Information Controllers
const updateSponsorInfo = async (req, res) => {
    try {
        const { firstName, middleInitial, lastName } = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        let profileImage = user.sponsorInfo?.profileImage || null;

        // Handle image upload
        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = `sponsors/${v4()}`;
            const { url, key } = await putObjectSponsor(file.data, fileName); // Assuming you have a sponsor S3 bucket method

            if (!url || !key) {
                return res.status(400).json({ message: "Image upload failed" });
            }

            // Delete old image if exists
            if (profileImage) {
                const oldKey = profileImage.split("https://alalay-sponsor.s3.ap-southeast-1.amazonaws.com/")[1];
                if (oldKey) await deleteObjectSponsor(oldKey);
            }

            profileImage = url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'sponsorInfo.firstName': firstName,
                    'sponsorInfo.middleInitial': middleInitial,
                    'sponsorInfo.lastName': lastName,
                    'sponsorInfo.profileImage': profileImage
                }
            },
            { new: true, select: '-password' }
        );

        res.status(200).json({
            message: "Sponsor information updated successfully",
            user: updatedUser
        });
    } catch (error) {
        console.error("Error updating sponsor info:", error);
        res.status(500).json({ error: "Failed to update sponsor information" });
    }
};

// Scholar Information Controllers
const updateScholarInfo = async (req, res) => {
    try {
        const { firstName, middleInitial, lastName, gwa, userLevel } = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        let profileImage = user.scholarInfo.profileImage;

        // Handle image upload
        if (req.files && req.files.image) {
            const file = req.files.image;
            const fileName = `scholars/${v4()}`;
            const { url, key } = await putObjectScholar(file.data, fileName);

            if (!url || !key) {
                return res.status(400).json({ message: "Image upload failed" });
            }

            // Delete old image if exists
            if (profileImage) {
                const oldKey = profileImage.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com/")[1];
                if (oldKey) await deleteObjectScholar(oldKey);
            }

            profileImage = url;
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: {
                    'scholarInfo.firstName': firstName,
                    'scholarInfo.middleInitial': middleInitial,
                    'scholarInfo.lastName': lastName,
                    'scholarInfo.gwa': gwa,
                    'scholarInfo.userLevel': userLevel,
                    'scholarInfo.profileImage': profileImage
                }
            },
            { new: true, select: '-password' }
        );

        res.status(200).json({ 
            message: "Scholar information updated successfully", 
            user: updatedUser 
        });
    } catch (error) {
        console.error("Error updating scholar info:", error);
        res.status(500).json({ error: "Failed to update scholar information" });
    }
};

const updateUserInfo = async (req, res) => {
    const { targetUserId, username, email, password } = req.body;
    try {
        const updateData = {};
        if (username && !(await userModel.findOne({ username }))) updateData.username = username;
        if (email && !(await userModel.findOne({ email }))) updateData.email = email;
        if (password) updateData.password = await bcrypt.hash(password, 10);

        const updatedUser = await userModel.findByIdAndUpdate(targetUserId, { $set: updateData }, { new: true, select: '-password' });

        if (!updatedUser) return res.status(404).json({ error: 'User not found' });

        res.status(200).json({ message: "User information updated successfully", user: updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteAccount = async (req, res) => {
    const { targetUserId } = req.body;
    try {
        const user = await userModel.findById(targetUserId);
        if (!user) return res.status(404).json({ error: "User not found" });

        // Delete profile image from S3 if it exists
        if (user.scholarInfo.profileImage) {
            const key = user.scholarInfo.profileImage.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com/")[1];
            if (key) await deleteObjectScholar(key);
        }

        const currentUser = await userModel.findById(req.user.id);
        if (currentUser.role === 'admin') {
            const adminCount = await userModel.countDocuments({ role: 'admin' });
            if (adminCount <= 1 && currentUser._id.toString() === targetUserId) {
                return res.status(400).json({ error: 'Cannot delete the last admin account' });
            }
        }

        await userModel.findByIdAndDelete(targetUserId);

        res.status(200).json({ message: "Account deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getCurrentUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id) // or req.user.id
      .select('-password')
      .populate('friends', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');
    
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


// Friend Management Controllers
const sendFriendRequest = async (req, res) => {
    try {
        const { targetUserId } = req.body;
        const userId = req.user.id;

        if (userId === targetUserId) {
            return res.status(400).json({ error: "Cannot send friend request to yourself" });
        }

        const user = await userModel.findById(userId);
        const targetUser = await userModel.findById(targetUserId);

        if (!targetUser) return res.status(404).json({ error: "User not found" });

        // Check if already friends
        if (user.friends.includes(targetUserId)) {
            return res.status(400).json({ error: "Already friends" });
        }

        // Check if request already sent
        if (user.friendRequests.sent.includes(targetUserId)) {
            return res.status(400).json({ error: "Friend request already sent" });
        }

        // Add to sent and received lists
        user.friendRequests.sent.push(targetUserId);
        targetUser.friendRequests.received.push(userId);

        await user.save();
        await targetUser.save();

        res.status(200).json({ message: "Friend request sent successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const acceptFriendRequest = async (req, res) => {
    try {
        const { requesterId } = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        const requester = await userModel.findById(requesterId);

        if (!requester) return res.status(404).json({ error: "User not found" });

        // Check if request exists
        if (!user.friendRequests.received.includes(requesterId)) {
            return res.status(400).json({ error: "No friend request found" });
        }

        // Add to friends lists
        await user.addFriend(requesterId);
        await requester.addFriend(userId);

        // Remove from friend requests
        user.friendRequests.received = user.friendRequests.received.filter(id => !id.equals(requesterId));
        requester.friendRequests.sent = requester.friendRequests.sent.filter(id => !id.equals(userId));

        await user.save();
        await requester.save();

        res.status(200).json({ message: "Friend request accepted" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const removeFriend = async (req, res) => {
    try {
        const { friendId } = req.body;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        const friend = await userModel.findById(friendId);

        if (!friend) return res.status(404).json({ error: "User not found" });

        await user.removeFriend(friendId);
        await friend.removeFriend(userId);

        res.status(200).json({ message: "Friend removed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

const getScholars = async (req, res) => {
  try {
    // Find all users, but only return the fields we want
    const scholars = await userModel.find({}, {
      username: 1,
      'scholarInfo.gwa': 1,
      'scholarInfo.userLevel': 1,
      'scholarInfo.profileImage': 1
    });

    res.status(200).json(scholars);
  } catch (error) {
    console.error("Get Scholars Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getScholarProfile = async (req, res) => {
  try {
    const { scholarId } = req.params;

    // Find the specific scholar and only return name, GWA, and bio
    const scholar = await userModel.findById(scholarId, {
      username: 1,
      'scholarInfo.firstName': 1,
      'scholarInfo.middleInitial': 1,
      'scholarInfo.lastName': 1,
      'scholarInfo.gwa': 1,
      'scholarInfo.bio': 1,
      'scholarInfo.profileImage': 1,
      'scholarInfo.userLevel': 1
    });

    if (!scholar) {
      return res.status(404).json({ error: "Scholar not found" });
    }

    // Transform the data to include full name
    const scholarProfile = {
      _id: scholar._id,
      username: scholar.username,
      fullName: scholar.scholarInfo.fullName, // Uses the virtual
      gwa: scholar.scholarInfo.gwa,
      bio: scholar.scholarInfo.bio || "No bio available",
      profileImage: scholar.scholarInfo.profileImage,
      userLevel: scholar.scholarInfo.userLevel
    };

    res.status(200).json(scholarProfile);
  } catch (error) {
    console.error("Get Scholar Profile Error:", error);
    
    // Handle invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(400).json({ error: "Invalid scholar ID format" });
    }
    
    res.status(500).json({ error: "Server error" });
  }
};


module.exports = {
    // Authentication
    login, 
    register, 
    forgotPassword, 
    resetPassword, 
    editPassword,
    // User Management
    logout,
    updateUserInfo, 
    updateSponsorInfo,
    updateScholarInfo,
    deleteAccount, 
    getCurrentUser,
    // Friend Management
    sendFriendRequest,
    acceptFriendRequest,
    removeFriend,
    // Scholar browsing
    getScholars,
    getScholarProfile
};