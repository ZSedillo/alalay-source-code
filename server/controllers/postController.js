// postController.js
const postModel = require('../models/Post');
const userModel = require('../models/User');
const { v4 } = require("uuid");
const { putObjectScholar } = require("../util/putObjectScholar");
const { deleteObjectScholar } = require("../util/deleteObjectScholar");

// 📌 Get all posts (with pagination and filtering)
const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, visibility = 'public', authorId } = req.query;
        const userId = req.user?.id;

        let query = { isActive: true };

        // Filter by author if specified
        if (authorId) {
            query.author = authorId;
        }

        // Handle visibility filtering
        if (visibility === 'friends' && userId) {
            const user = await userModel.findById(userId);
            const friendIds = user.friends;
            query.$or = [
                { author: { $in: friendIds }, visibility: { $in: ['public', 'friends'] } },
                { author: userId } // User can see their own posts
            ];
        } else if (visibility === 'public') {
            query.visibility = 'public';
        }

        const posts = await postModel.find(query)
            .populate('author', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .populate('likes.user', 'username scholarInfo.firstName scholarInfo.lastName')
            .populate('comments.user', 'username scholarInfo.firstName scholarInfo.lastName scholarInfo.profileImage')
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .sort({ createdAt: -1 });

        const total = await postModel.countDocuments(query);

        res.json({ 
            posts, 
            totalPages: Math.ceil(total / limit),
            currentPage: page,
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
        const { description, visibility = 'public', tags } = req.body;
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

        const newPost = new postModel({
            author: userId,
            description: description.trim(),
            images,
            visibility,
            tags: tags ? tags.split(',').map(tag => tag.trim()) : []
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
        const { description, visibility, tags } = req.body;
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
        const userId = req.user.id;

        const post = await postModel.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const isLiked = post.isLikedBy(userId);

        if (isLiked) {
            await post.removeLike(userId);
            res.status(200).json({ message: "Post unliked", liked: false, likeCount: post.likeCount });
        } else {
            await post.addLike(userId);
            res.status(200).json({ message: "Post liked", liked: true, likeCount: post.likeCount });
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

module.exports = {
    getAllPosts,
    getUserFeed,
    createPost,
    editPost,
    deletePost,
    toggleLike,
    addComment,
    deletePostImage
};