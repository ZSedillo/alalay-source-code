// Post.js - Updated with funding feature
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  // Reference to the user who created the post
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  
  // Post content
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 2000 // Limit post length
  },
  
  // Images for the post
  images: [{
    url: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      maxlength: 200
    },
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Likes system
  likes: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    likedAt: {
      type: Date,
      default: Date.now
    }
  }],
  
  // Comments on the post
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    content: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500
    },
    createdAt: {
      type: Date,
      default: Date.now
    },
    likes: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
      },
      likedAt: {
        type: Date,
        default: Date.now
      }
    }]
  }],
  
  // 🆕 Funding system
  fundings: [{
    funder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    amount: {
      type: Number,
      required: true,
      min: 0.01, // Minimum funding amount
      validate: {
        validator: function(v) {
          return v > 0;
        },
        message: 'Funding amount must be greater than 0'
      }
    },
    message: {
      type: String,
      trim: true,
      maxlength: 200 // Optional message from funder
    },
    fundedAt: {
      type: Date,
      default: Date.now
    },
    // Payment details (optional - for tracking transactions)
    transactionId: {
      type: String,
      trim: true
    },
    paymentMethod: {
      type: String,
      enum: ['card', 'paypal', 'bank_transfer', 'crypto', 'other'],
      default: 'card'
    },
    status: {
      type: String,
      enum: ['pending', 'completed', 'failed', 'refunded'],
      default: 'completed'
    }
  }],
  
  // Funding goal (optional)
  fundingGoal: {
    amount: {
      type: Number,
      min: 0,
      default: null
    },
    description: {
      type: String,
      trim: true,
      maxlength: 300
    },
    deadline: {
      type: Date,
      default: null
    }
  },
  
  // Post visibility
  visibility: {
    type: String,
    enum: ['public', 'friends', 'private'],
    default: 'public'
  },
  
  // Tags or categories
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  
  // Post status
  isActive: {
    type: Boolean,
    default: true
  },
  
  // 🆕 Funding status
  isFundingEnabled: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

// Indexes for better performance
postSchema.index({ author: 1, createdAt: -1 });
postSchema.index({ createdAt: -1 });
postSchema.index({ tags: 1 });
postSchema.index({ 'likes.user': 1 });
postSchema.index({ 'fundings.funder': 1 }); // 🆕 Index for funding queries
postSchema.index({ isFundingEnabled: 1 }); // 🆕 Index for funding-enabled posts

// Virtual for like count
postSchema.virtual('likeCount').get(function() {
  return this.likes.length;
});

// Virtual for comment count
postSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

// 🆕 Virtual for funding count
postSchema.virtual('fundingCount').get(function() {
  return this.fundings.filter(funding => funding.status === 'completed').length;
});

// 🆕 Virtual for total funding amount
postSchema.virtual('totalFundingAmount').get(function() {
  return this.fundings
    .filter(funding => funding.status === 'completed')
    .reduce((total, funding) => total + funding.amount, 0);
});

// 🆕 Virtual for funding progress (if goal is set)
postSchema.virtual('fundingProgress').get(function() {
  if (!this.fundingGoal?.amount) return null;
  const totalFunded = this.totalFundingAmount;
  return {
    current: totalFunded,
    goal: this.fundingGoal.amount,
    percentage: Math.min((totalFunded / this.fundingGoal.amount) * 100, 100)
  };
});

// Method to add like
postSchema.methods.addLike = function(userId) {
  const existingLike = this.likes.find(like => like.user.equals(userId));
  if (!existingLike) {
    this.likes.push({ user: userId });
    return this.save();
  }
  return Promise.resolve(this);
};

// Method to remove like
postSchema.methods.removeLike = function(userId) {
  this.likes = this.likes.filter(like => !like.user.equals(userId));
  return this.save();
};

// Method to add comment
postSchema.methods.addComment = function(userId, content) {
  this.comments.push({
    user: userId,
    content: content
  });
  return this.save();
};

// Method to check if user has liked the post
postSchema.methods.isLikedBy = function(userId) {
  return this.likes.some(like => like.user.equals(userId));
};

// 🆕 Method to add funding
postSchema.methods.addFunding = function(funderId, amount, message = '', transactionId = '', paymentMethod = 'card') {
  // Check if funding is enabled for this post
  if (!this.isFundingEnabled) {
    throw new Error('Funding is not enabled for this post');
  }
  
  // Validate amount
  if (!amount || amount <= 0) {
    throw new Error('Funding amount must be greater than 0');
  }
  
  this.fundings.push({
    funder: funderId,
    amount: parseFloat(amount),
    message: message.trim(),
    transactionId: transactionId,
    paymentMethod: paymentMethod,
    status: 'completed'
  });
  
  return this.save();
};

// 🆕 Method to get funding by user
postSchema.methods.getFundingByUser = function(userId) {
  return this.fundings.filter(funding => 
    funding.funder.equals(userId) && funding.status === 'completed'
  );
};

// 🆕 Method to get total funding by user
postSchema.methods.getTotalFundingByUser = function(userId) {
  return this.getFundingByUser(userId)
    .reduce((total, funding) => total + funding.amount, 0);
};

// 🆕 Method to check if funding goal is reached
postSchema.methods.isFundingGoalReached = function() {
  if (!this.fundingGoal?.amount) return false;
  return this.totalFundingAmount >= this.fundingGoal.amount;
};

// 🆕 Method to get top funders
postSchema.methods.getTopFunders = function(limit = 5) {
  const funderTotals = {};
  
  this.fundings
    .filter(funding => funding.status === 'completed')
    .forEach(funding => {
      const funderId = funding.funder.toString();
      if (!funderTotals[funderId]) {
        funderTotals[funderId] = {
          funder: funding.funder,
          totalAmount: 0,
          fundingCount: 0
        };
      }
      funderTotals[funderId].totalAmount += funding.amount;
      funderTotals[funderId].fundingCount += 1;
    });
  
  return Object.values(funderTotals)
    .sort((a, b) => b.totalAmount - a.totalAmount)
    .slice(0, limit);
};

// Ensure virtuals are included in JSON output
postSchema.set('toJSON', { virtuals: true });
postSchema.set('toObject', { virtuals: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;