// postController.js - Updated with funding functionality
const postModel = require('./post.model');
const userModel = require('../user/user.model');
const { v4 } = require("uuid");
const { putObjectScholar } = require("../util/putObjectScholar");
const { deleteObjectScholar } = require("../util/deleteObjectScholar");

// 📌 Get all posts (with pagination and filtering)
const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, authorId, fundingEnabled } = req.query;
        const userId = req.user?.id;

        let query = { isActive: true };

        // Get the logged-in user (if any)
        let currentUser = null;
        if (userId) {
            currentUser = await userModel.findById(userId);
        }

        // Filter by author if specified
        if (authorId) {
            query.author = authorId;
        }

        // Filter by funding enabled posts
        if (fundingEnabled === 'true') {
            query.isFundingEnabled = true;
        }

        // Visibility handling
        if (currentUser) {
            if (req.query.visibility === 'friends') {
                // Friends filter
                const friendIds = currentUser.friends;
                query.$or = [
                    { author: { $in: friendIds }, visibility: { $in: ['public', 'friends'] } },
                    { author: userId } // user can see their own posts
                ];
            } else if (currentUser.role === 'sponsor') {
                // Sponsors see public + sponsor posts
                query.visibility = { $in: ['public', 'sponsor'] };
            } else {
                // Default for logged in non-sponsor users → public only
                query.visibility = 'public';
            }
        } else {
            // Not logged in → public only
            query.visibility = 'public';
        }

        const posts = await postModel.find(query)
            .populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('likes.user', 'username scholarInfo.firstName scholarInfo.lastName')
            .populate('comments.user', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('fundings.funder', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .limit(Number(limit))
            .skip((Number(page) - 1) * Number(limit))
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments(query);

        res.json({ 
            posts, 
            totalPages: Math.ceil(total / limit),
            currentPage: Number(page),
            total
        });
    } catch (error) {
        console.error("Error fetching posts:", error);
        res.status(500).json({ error: "Failed to fetch posts" });
    }
};


// 📌 Get user's feed (posts from friends)
const getUserFeed = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const userId = req.user.id;

        const user = await userModel.findById(userId);
        const friendIds = [...user.friends, userId]; // Include user's own posts

        const posts = await postModel.find({
            author: { $in: friendIds },
            isActive: true,
            visibility: { $in: ['public', 'friends'] }
        })
            .populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('likes.user', 'username scholarInfo.firstName scholarInfo.lastName')
            .populate('comments.user', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('fundings.funder', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments({
            author: { $in: friendIds },
            isActive: true,
            visibility: { $in: ['public', 'friends'] }
        });

        res.json({ 
            posts, 
            totalPages: Math.ceil(total / limit),
            currentPage: page,
            total
        });
    } catch (error) {
        console.error("Error fetching user feed:", error);
        res.status(500).json({ error: "Failed to fetch user feed" });
    }
};

// 📌 Create a new post
const createPost = async (req, res) => {
    try {
        const { 
            description, 
            visibility = 'public', 
            tags, 
            isFundingEnabled = false,
            fundingGoal 
        } = req.body;
        
        // const userId = req.user.id; // Original Code Use this later
        // Debugging Code Replace Later
        const userId = req.user?.id || req.body.userId; // This handles both cases

        if (!description || description.trim().length === 0) {
            return res.status(400).json({ error: "Description is required" });
        }

        const images = [];

        // Handle multiple image uploads
        if (req.files) {
            const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
            
            for (const file of files) {
                if (file) {
                    const fileName = `posts/${v4()}`;
                    const { url, key } = await putObjectScholar(file.data, fileName);

                    if (url && key) {
                        images.push({
                            url: url,
                            caption: '', // You can add caption support later
                        });
                    }
                }
            }
        }

        // Prepare funding goal if provided
        let parsedFundingGoal = null;
        if (isFundingEnabled === 'true' || isFundingEnabled === true) {
            if (fundingGoal) {
                try {
                    const goalData = typeof fundingGoal === 'string' ? JSON.parse(fundingGoal) : fundingGoal;
                    parsedFundingGoal = {
                        amount: parseFloat(goalData.amount) || null,
                        description: goalData.description || '',
                        deadline: goalData.deadline ? new Date(goalData.deadline) : null
                    };
                } catch (err) {
                    console.error("Error parsing funding goal:", err);
                }
            }
        }

        const newPost = new postModel({
            author: userId,
            description: description.trim(),
            images,
            visibility,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : [],
            isFundingEnabled: isFundingEnabled === 'true' || isFundingEnabled === true,
            fundingGoal: parsedFundingGoal
        });

        await newPost.save();

        const populatedPost = await postModel.findById(newPost._id)
            .populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');

        res.status(201).json({ 
            message: "Post created successfully", 
            post: populatedPost 
        });
    } catch (error) {
        console.error("Error creating post:", error);
        res.status(500).json({ error: "Failed to create post" });
    }
};

// 📌 Edit a post
const editPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { description, visibility, tags, isFundingEnabled, fundingGoal } = req.body;
        const userId = req.user.id;

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if user owns the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to edit this post" });
        }

        const updateData = {};
        if (description) updateData.description = description.trim();
        if (visibility) updateData.visibility = visibility;
        if (tags) updateData.tags = tags.split(',').map(tag => tag.trim());
        if (isFundingEnabled !== undefined) updateData.isFundingEnabled = isFundingEnabled === 'true' || isFundingEnabled === true;

        // Handle funding goal update
        if (fundingGoal) {
            try {
                const goalData = typeof fundingGoal === 'string' ? JSON.parse(fundingGoal) : fundingGoal;
                updateData.fundingGoal = {
                    amount: parseFloat(goalData.amount) || null,
                    description: goalData.description || '',
                    deadline: goalData.deadline ? new Date(goalData.deadline) : null
                };
            } catch (err) {
                console.error("Error parsing funding goal:", err);
            }
        }

        // Handle new image uploads (this will add to existing images)
        if (req.files && req.files.images) {
            const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];
            const newImages = [];
            
            for (const file of files) {
                if (file) {
                    const fileName = `posts/${v4()}`;
                    const { url, key } = await putObjectScholar(file.data, fileName);

                    if (url && key) {
                        newImages.push({
                            url: url,
                            caption: '',
                        });
                    }
                }
            }
            
            updateData.$push = { images: { $each: newImages } };
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');

        res.status(200).json({ 
            message: "Post updated successfully", 
            post: updatedPost 
        });
    } catch (error) {
        console.error("Error updating post:", error);
        res.status(500).json({ error: "Failed to update post" });
    }
};

// 📌 Delete a post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if user owns the post or is admin
        const user = await userModel.findById(userId);
        if (post.author.toString() !== userId && user.role !== 'admin') {
            return res.status(403).json({ error: "Not authorized to delete this post" });
        }

        // Delete images from S3
        for (const image of post.images) {
            if (image.url) {
                const key = image.url.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com/")[1];
                if (key) await deleteObjectScholar(key);
            }
        }

        await postModel.findByIdAndDelete(id);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error("Error deleting post:", error);
        res.status(500).json({ error: "Failed to delete post" });
    }
};

// 📌 Like/Unlike a post
const toggleLike = async (req, res) => {
    try {
        const { id } = req.params;

        // Temporary hardcoded user for testing
        const userId = "689889e827f976dd2c673d4c"; 

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isLiked = post.isLikedBy(userId);

        if (isLiked) {
            await post.removeLike(userId);
            res.status(200).json({
                message: "Post unliked",
                liked: false,
                likeCount: post.likeCount
            });
        } else {
            await post.addLike(userId);
            res.status(200).json({
                message: "Post liked",
                liked: true,
                likeCount: post.likeCount
            });
        }
    } catch (error) {
        console.error("Error toggling like:", error);
        res.status(500).json({ error: "Failed to toggle like" });
    }
};

// 📌 Add a comment
const addComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const userId = req.user.id;

        if (!content || content.trim().length === 0) {
            return res.status(400).json({ error: "Comment content is required" });
        }

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await post.addComment(userId, content.trim());

        const updatedPost = await postModel.findById(id)
            .populate('comments.user', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');

        res.status(201).json({ 
            message: "Comment added successfully", 
            comments: updatedPost.comments 
        });
    } catch (error) {
        console.error("Error adding comment:", error);
        res.status(500).json({ error: "Failed to add comment" });
    }
};

// 📌 Delete image from post
const deletePostImage = async (req, res) => {
    try {
        const { id, imageId } = req.params;
        const userId = req.user.id;

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if user owns the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to edit this post" });
        }

        const image = post.images.id(imageId);
        if (!image) {
            return res.status(404).json({ error: "Image not found" });
        }

        // Delete from S3
        const key = image.url.split("https://alalay-scholar.s3.ap-southeast-1.amazonaws.com/")[1];
        if (key) await deleteObjectScholar(key);

        // Remove from post
        post.images.pull(imageId);
        await post.save();

        res.status(200).json({ message: "Image deleted successfully" });
    } catch (error) {
        console.error("Error deleting image:", error);
        res.status(500).json({ error: "Failed to delete image" });
    }
};

///////////////////////////////////////
// Funding functionalities
///////////////////////////////////////

// 🆕 📌 Fund a post
const fundPost = async (req, res) => {
    try {
        const { id } = req.params;
        const { amount, message, paymentMethod = 'card', transactionId } = req.body;
        const userId = req.user?.id || req.body.userId; // Debugging code

        // Validate required fields
        if (!amount || parseFloat(amount) <= 0) {
            return res.status(400).json({ error: "Valid funding amount is required" });
        }

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if funding is enabled for this post
        if (!post.isFundingEnabled) {
            return res.status(400).json({ error: "Funding is not enabled for this post" });
        }

        // Check if user is trying to fund their own post
        if (post.author.toString() === userId) {
            return res.status(400).json({ error: "You cannot fund your own post" });
        }

        // Add funding to the post
        await post.addFunding(
            userId, 
            parseFloat(amount), 
            message || '', 
            transactionId || '', 
            paymentMethod
        );

        // Get updated post with populated funding data
        const updatedPost = await postModel.findById(id)
            .populate('fundings.funder', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('author', 'username scholarInfo.firstName scholarInfo.lastName');

        res.status(201).json({ 
            message: "Post funded successfully", 
            post: updatedPost,
            fundingDetails: {
                amount: parseFloat(amount),
                totalFunded: updatedPost.totalFundingAmount,
                fundingCount: updatedPost.fundingCount,
                fundingProgress: updatedPost.fundingProgress
            }
        });
    } catch (error) {
        console.error("Error funding post:", error);
        res.status(500).json({ error: error.message || "Failed to fund post" });
    }
};

// 🆕 📌 Get funding details for a post
const getPostFunding = async (req, res) => {
    try {
        const { id } = req.params;
        const { page = 1, limit = 10 } = req.query;

        const post = await postModel.findById(id)
            .populate({
                path: 'fundings.funder',
                select: 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage',
                options: {
                    sort: { 'fundings.fundedAt': -1 },
                    skip: (page - 1) * limit,
                    limit: limit * 1
                }
            });

        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Get completed fundings only
        const completedFundings = post.fundings.filter(funding => funding.status === 'completed');
        
        // Pagination for fundings
        const startIndex = (page - 1) * limit;
        const endIndex = startIndex + (limit * 1);
        const paginatedFundings = completedFundings.slice(startIndex, endIndex);

        const fundingStats = {
            totalAmount: post.totalFundingAmount,
            fundingCount: post.fundingCount,
            goal: post.fundingGoal,
            progress: post.fundingProgress,
            topFunders: post.getTopFunders(5),
            recentFundings: paginatedFundings,
            pagination: {
                currentPage: parseInt(page),
                totalPages: Math.ceil(completedFundings.length / limit),
                total: completedFundings.length,
                hasNext: endIndex < completedFundings.length,
                hasPrev: startIndex > 0
            }
        };

        res.json(fundingStats);
    } catch (error) {
        console.error("Error fetching post funding:", error);
        res.status(500).json({ error: "Failed to fetch funding details" });
    }
};

// 🆕 📌 Get user's funding history
const getUserFundingHistory = async (req, res) => {
    try {
        const { page = 1, limit = 10, type = 'funded' } = req.query; // type: 'funded' or 'received'
        const userId = req.user?.id || req.body.userId; // Debugging code

        let query;
        let populateOptions;

        if (type === 'funded') {
            // Posts the user has funded
            query = { 
                'fundings.funder': userId, 
                'fundings.status': 'completed',
                isActive: true 
            };
            populateOptions = [
                { path: 'author', select: 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage' },
                { path: 'fundings.funder', select: 'username scholarInfo.firstName scholarInfo.lastName' }
            ];
        } else {
            // Posts created by the user that received funding
            query = { 
                author: userId, 
                'fundings.0': { $exists: true },
                isActive: true 
            };
            populateOptions = [
                { path: 'author', select: 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage' },
                { path: 'fundings.funder', select: 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage' }
            ];
        }

        const posts = await postModel.find(query)
            .populate(populateOptions)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ 'fundings.fundedAt': -1 });

        const total = await postModel.countDocuments(query);

        // Process the results based on type
        let result;
        if (type === 'funded') {
            result = posts.map(post => {
                const userFundings = post.getFundingByUser(userId);
                const userTotalFunded = post.getTotalFundingByUser(userId);
                return {
                    post: {
                        _id: post._id,
                        description: post.description,
                        author: post.author,
                        createdAt: post.createdAt,
                        totalFundingAmount: post.totalFundingAmount,
                        fundingCount: post.fundingCount
                    },
                    userFundings,
                    userTotalFunded
                };
            });
        } else {
            result = posts.map(post => ({
                post: {
                    _id: post._id,
                    description: post.description,
                    author: post.author,
                    createdAt: post.createdAt,
                    totalFundingAmount: post.totalFundingAmount,
                    fundingCount: post.fundingCount,
                    fundingGoal: post.fundingGoal,
                    fundingProgress: post.fundingProgress
                },
                recentFunders: post.fundings
                    .filter(funding => funding.status === 'completed')
                    .sort((a, b) => new Date(b.fundedAt) - new Date(a.fundedAt))
                    .slice(0, 5)
            }));
        }

        res.json({
            [type === 'funded' ? 'fundedPosts' : 'receivedFunding']: result,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            total,
            type
        });
    } catch (error) {
        console.error("Error fetching user funding history:", error);
        res.status(500).json({ error: "Failed to fetch funding history" });
    }
};

// 🆕 📌 Get funding statistics
const getFundingStats = async (req, res) => {
    try {
        const userId = req.user?.id || req.body.userId; // Debugging code

        // Total amount funded by user
        const fundedPosts = await postModel.find({ 
            'fundings.funder': userId,
            'fundings.status': 'completed'
        });

        let totalAmountFunded = 0;
        let totalPostsFunded = 0;
        fundedPosts.forEach(post => {
            const userFundings = post.getFundingByUser(userId);
            totalAmountFunded += userFundings.reduce((sum, funding) => sum + funding.amount, 0);
            if (userFundings.length > 0) totalPostsFunded++;
        });

        // Total amount received by user's posts
        const userPosts = await postModel.find({ 
            author: userId,
            'fundings.0': { $exists: true }
        });

        let totalAmountReceived = 0;
        let totalPostsReceived = 0;
        let totalFundersCount = 0;
        userPosts.forEach(post => {
            totalAmountReceived += post.totalFundingAmount;
            if (post.fundingCount > 0) {
                totalPostsReceived++;
                totalFundersCount += post.fundingCount;
            }
        });

        // Recent activity
        const recentFundedPosts = await postModel.find({
            'fundings.funder': userId,
            'fundings.status': 'completed'
        })
        .populate('author', 'username scholarInfo.firstName scholarInfo.lastName')
        .sort({ 'fundings.fundedAt': -1 })
        .limit(5);

        const recentReceivedFunding = await postModel.find({
            author: userId,
            'fundings.0': { $exists: true }
        })
        .populate('fundings.funder', 'username scholarInfo.firstName scholarInfo.lastName')
        .sort({ 'fundings.fundedAt': -1 })
        .limit(5);

        const stats = {
            funded: {
                totalAmount: totalAmountFunded,
                totalPosts: totalPostsFunded,
                recentActivity: recentFundedPosts.map(post => {
                    const userFundings = post.getFundingByUser(userId);
                    return {
                        post: {
                            _id: post._id,
                            description: post.description.substring(0, 100) + '...',
                            author: post.author
                        },
                        amount: userFundings.reduce((sum, f) => sum + f.amount, 0),
                        lastFunded: userFundings[userFundings.length - 1]?.fundedAt
                    };
                })
            },
            received: {
                totalAmount: totalAmountReceived,
                totalPosts: totalPostsReceived,
                totalFunders: totalFundersCount,
                recentActivity: recentReceivedFunding.map(post => ({
                    post: {
                        _id: post._id,
                        description: post.description.substring(0, 100) + '...',
                        totalFunded: post.totalFundingAmount,
                        fundingCount: post.fundingCount
                    },
                    lastFunding: post.fundings
                        .filter(f => f.status === 'completed')
                        .sort((a, b) => new Date(b.fundedAt) - new Date(a.fundedAt))[0]
                }))
            }
        };

        res.json(stats);
    } catch (error) {
        console.error("Error fetching funding stats:", error);
        res.status(500).json({ error: "Failed to fetch funding statistics" });
    }
};

// 🆕 📌 Toggle funding for a post (enable/disable)
const togglePostFunding = async (req, res) => {
    try {
        const { id } = req.params;
        const { isFundingEnabled, fundingGoal } = req.body;
        const userId = req.user?.id || req.body.userId; // Debugging code

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Check if user owns the post
        if (post.author.toString() !== userId) {
            return res.status(403).json({ error: "Not authorized to modify this post" });
        }

        const updateData = {};
        
        if (isFundingEnabled !== undefined) {
            updateData.isFundingEnabled = isFundingEnabled;
        }

        if (fundingGoal) {
            try {
                const goalData = typeof fundingGoal === 'string' ? JSON.parse(fundingGoal) : fundingGoal;
                updateData.fundingGoal = {
                    amount: parseFloat(goalData.amount) || null,
                    description: goalData.description || '',
                    deadline: goalData.deadline ? new Date(goalData.deadline) : null
                };
            } catch (err) {
                return res.status(400).json({ error: "Invalid funding goal format" });
            }
        }

        const updatedPost = await postModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        ).populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage');

        res.json({ 
            message: `Funding ${updatedPost.isFundingEnabled ? 'enabled' : 'disabled'} for post`,
            post: updatedPost 
        });
    } catch (error) {
        console.error("Error toggling post funding:", error);
        res.status(500).json({ error: "Failed to toggle funding" });
    }
};

module.exports = {
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
};