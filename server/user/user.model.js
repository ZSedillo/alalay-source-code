const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // Basic authentication fields
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  
  // Scholar information
  scholarInfo: {
    firstName: {
      type: String,
      required: true,
      trim: true
    },
    middleInitial: {
      type: String,
      trim: true,
      maxlength: 1
    },
    lastName: {
      type: String,
      required: true,
      trim: true
    },
    gwa: {
      type: Number,
      min: 0,
      max: 4.0,
      validate: {
        validator: function(v) {
          return v >= 0 && v <= 4.0;
        },
        message: 'GWA must be between 0 and 4.0'
      }
    },
    userLevel: {
      type: String,
      enum: ['freshman', 'sophomore', 'junior', 'senior', 'graduate'],
      required: true
    },
    profileImage: {
      type: String, // URL to profile image
      default: null
    },
    // ✅ NEW: Add bio field
    bio: {
      type: String,
      maxlength: 500, // Limit bio to 500 characters
      trim: true,
      default: ''
    }
  },
  
  // Friends list - stores references to other users
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  
  // Friend requests (optional - for pending friend requests)
  friendRequests: {
    sent: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    received: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }
}, {
  timestamps: true // This adds createdAt and updatedAt automatically
});

// Index for better query performance
userSchema.index({ 'scholarInfo.firstName': 1, 'scholarInfo.lastName': 1 });
userSchema.index({ 'scholarInfo.userLevel': 1 });
userSchema.index({ 'scholarInfo.gpa': 1 });

// Virtual for full name
userSchema.virtual('scholarInfo.fullName').get(function() {
  const { firstName, middleInitial, lastName } = this.scholarInfo;
  return middleInitial 
    ? `${firstName} ${middleInitial}. ${lastName}`
    : `${firstName} ${lastName}`;
});

// Method to add friend
userSchema.methods.addFriend = function(friendId) {
  if (!this.friends.includes(friendId)) {
    this.friends.push(friendId);
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove friend
userSchema.methods.removeFriend = function(friendId) {
  this.friends = this.friends.filter(friend => !friend.equals(friendId));
  return this.save();
};

const User = mongoose.model('User', userSchema);

module.exports = User;