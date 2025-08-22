import { FaHeart, FaPlus, FaComment, FaShare } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";
import NewPostModal from "../_components/NewPostModal";

function Feed() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);

  // Enhanced dummy logged-in user
  const user = {
    _id: "12345",
    fullName: "Zandro Sedillo",
    username: "zandro_s",
    profilePicture: null,
    userType: "student",
    scholarInfo: {
      firstName: "Zandro",
      lastName: "Sedillo",
      profileImage: null,
    },
  };

  // Enhanced dummy posts with more comprehensive data
  const [posts, setPosts] = useState([
    {
      _id: "p1",
      author: {
        _id: "689889e827f976dd2c673d4c",
        fullName: "Maria Santos",
        username: "maria_santos",
        userType: "student",
        profilePicture: null,
        isVerified: true,
        scholarInfo: {
          firstName: "Maria",
          lastName: "Santos",
          profileImage: null,
        },
      },
      description: "Excited to start the new semester! Just received my new books thanks to my sponsor. Ready to dive deep into Machine Learning algorithms! 📚🤖 #ComputerScience #MachineLearning",
      visibility: "public",
      createdAt: "2025-01-22T08:15:00.000Z",
      updatedAt: "2025-01-22T08:15:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x300.png?text=Machine+Learning+Books"
        }
      ],
      tags: ["study", "machinelearning", "semester"],
      fundingGoal: null,
      isFundingEnabled: false,
      isActive: true,
      likes: ["user1", "user2", "user3"],
      comments: [
        {
          _id: "c1",
          user: {
            _id: "user1",
            fullName: "Dr. Sarah Johnson",
            profileImage: null,
            isAnonymous: false
          },
          text: "Good luck with your studies! Machine Learning is such an exciting field.",
          donation: {
            amount: 2000,
            isAnonymous: false
          },
          createdAt: "2025-01-22T10:30:00.000Z"
        },
        {
          _id: "c2",
          user: {
            _id: "user2",
            fullName: "Anonymous Supporter",
            profileImage: null,
            isAnonymous: true
          },
          text: "Keep up the great work! Education is the key to success.",
          donation: {
            amount: 1500,
            isAnonymous: true
          },
          createdAt: "2025-01-22T11:15:00.000Z"
        },
        {
          _id: "c3",
          user: {
            _id: "user3",
            fullName: "Mark Chen",
            profileImage: null,
            isAnonymous: false
          },
          text: "I studied Computer Science too! Feel free to reach out if you need any guidance.",
          donation: null,
          createdAt: "2025-01-22T12:00:00.000Z"
        },
        {
          _id: "c4",
          user: {
            _id: "user4",
            fullName: "Tech Mentor",
            profileImage: null,
            isAnonymous: false
          },
          text: "ML algorithms can be challenging at first, but you've got this!",
          donation: {
            amount: 500,
            isAnonymous: false
          },
          createdAt: "2025-01-22T13:30:00.000Z"
        }
      ],
      fundings: [],
    },
    {
      _id: "p2",
      author: {
        _id: "689889e827f976dd2c673d4d",
        fullName: "Juan Cruz",
        username: "juan_cruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Juan",
          lastName: "Cruz",
          profileImage: null,
        },
      },
      description: "Looking for support for my final year project on AI-powered healthcare solutions. Any guidance or funding would be greatly appreciated! 🏥💡",
      visibility: "public",
      createdAt: "2025-01-20T12:45:00.000Z",
      updatedAt: "2025-01-20T14:20:00.000Z",
      images: [],
      tags: ["funding", "healthcare", "ai", "project"],
      fundingGoal: 25000,
      isFundingEnabled: true,
      isActive: true,
      likes: ["user3", "user4", "user5"],
      comments: [
        {
          _id: "c5",
          user: {
            _id: "sponsor1",
            fullName: "HealthTech Foundation",
            profileImage: null,
            isAnonymous: false
          },
          text: "This sounds like a promising project! We'd love to support healthcare innovation.",
          donation: {
            amount: 10000,
            isAnonymous: false
          },
          createdAt: "2025-01-20T15:00:00.000Z"
        },
        {
          _id: "c6",
          user: {
            _id: "user7",
            fullName: "Anonymous",
            profileImage: null,
            isAnonymous: true
          },
          text: "Healthcare AI is the future. Best of luck!",
          donation: {
            amount: 3000,
            isAnonymous: true
          },
          createdAt: "2025-01-20T16:30:00.000Z"
        },
        {
          _id: "c7",
          user: {
            _id: "user8",
            fullName: "Dr. Rodriguez",
            profileImage: null,
            isAnonymous: false
          },
          text: "I work in healthcare tech. Would love to mentor you on this project. Send me a message!",
          donation: null,
          createdAt: "2025-01-20T17:15:00.000Z"
        }
      ],
      fundings: [
        {
          sponsor: "sponsor1",
          amount: 5000,
          message: "Great project idea! Keep it up!",
          createdAt: "2025-01-20T14:20:00.000Z"
        }
      ],
    },
    {
      _id: "p3",
      author: {
        _id: "tech_corp_ph",
        fullName: "TechCorp Philippines",
        username: "tech_corp_ph",
        userType: "sponsor",
        profilePicture: null,
        isVerified: true,
        scholarInfo: null,
      },
      description: "We're proud to announce our new scholarship program for STEM students! Applications are now open for the 2025 academic year. We believe in investing in the future of Filipino innovation. 🇵🇭✨",
      visibility: "public",
      createdAt: "2025-01-19T09:30:00.000Z",
      updatedAt: "2025-01-19T09:30:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x400.png?text=Scholarship+Program+2025"
        }
      ],
      tags: ["scholarship", "stem", "opportunity"],
      fundingGoal: null,
      isFundingEnabled: false,
      isActive: true,
      likes: ["user5", "user6", "user7", "user8", "user9"],
      comments: [
        {
          _id: "c8",
          user: {
            _id: "user5",
            fullName: "Anna Reyes",
            profileImage: null,
            isAnonymous: false
          },
          text: "This is amazing! Thank you for supporting Filipino students. 🙏",
          donation: null,
          createdAt: "2025-01-19T11:15:00.000Z"
        },
        {
          _id: "c9",
          user: {
            _id: "user9",
            fullName: "Carlos Mendoza",
            profileImage: null,
            isAnonymous: false
          },
          text: "When is the application deadline? I'm currently studying Engineering at UP Diliman.",
          donation: null,
          createdAt: "2025-01-19T12:30:00.000Z"
        },
        {
          _id: "c10",
          user: {
            _id: "user10",
            fullName: "Student Parent",
            profileImage: null,
            isAnonymous: false
          },
          text: "My daughter is interested in Computer Science. This would be perfect for her!",
          donation: null,
          createdAt: "2025-01-19T14:45:00.000Z"
        }
      ],
      fundings: [],
    }
  ]);

  const totalPages = 1;
  const currentPage = 1;

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes(user._id)
                ? post.likes.filter(id => id !== user._id) // unlike
                : [...post.likes, user._id], // like
            }
          : post
      )
    );
  };

  const handleLogout = () => {
    // Logout logic here
    console.log("Logout clicked");
  };

  const handleNewPost = (postData) => {
    const newPost = {
      _id: Date.now().toString(),
      author: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        userType: user.userType,
        profilePicture: user.profilePicture,
        isVerified: false,
        scholarInfo: user.scholarInfo,
      },
      description: postData.description,
      visibility: postData.visibility,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      images: postData.images || [],
      tags: postData.tags || [],
      fundingGoal: postData.fundingGoal,
      isFundingEnabled: postData.isFundingEnabled,
      isActive: postData.isActive,
      likes: [],
      comments: [],
      fundings: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsModalOpen(false);
  };

  const handleAddComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;

    const comment = {
      _id: Date.now().toString(),
      user: {
        _id: user._id,
        fullName: user.fullName,
        profileImage: user.profilePicture,
        isAnonymous: false
      },
      text: commentText,
      donation: null,
      createdAt: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => 
      post._id === postId 
        ? { ...post, comments: [...post.comments, comment] }
        : post
    ));

    setNewComment(prev => ({ ...prev, [postId]: '' }));
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const renderComments = (post) => {
    const comments = post.comments || [];
    const showExpanded = expandedComments[post._id];
    const displayComments = showExpanded ? comments : comments.slice(0, 2);
    const hasMoreComments = comments.length > 2;

    return (
      <div className="mt-4 space-y-3">
        {displayComments.map((comment) => (
          <div key={comment._id} className="flex items-start space-x-3">
            {/* Profile Image */}
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
              {comment.user.profileImage ? (
                <img 
                  src={comment.user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                <span className="text-xs font-medium text-gray-600">
                  {comment.user.isAnonymous ? '?' : comment.user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            
            {/* Comment Content */}
            <div className="flex-1 bg-gray-50 rounded-lg p-3">
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium text-gray-800">
                    {comment.user.isAnonymous ? 'Anonymous' : comment.user.fullName}
                  </span>
                  {comment.donation && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium">
                      {comment.donation.isAnonymous 
                        ? `💰 ${formatCurrency(comment.donation.amount)}` 
                        : `💰 Donated ${formatCurrency(comment.donation.amount)}`
                      }
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700">{comment.text}</p>
            </div>
          </div>
        ))}
        
        {hasMoreComments && (
          <button
            onClick={() => toggleComments(post._id)}
            className="text-sm text-blue-600 hover:text-blue-800 font-medium ml-11"
          >
            {showExpanded ? 'Show less' : `Show ${comments.length - 2} more comments`}
          </button>
        )}

        {/* Add Comment Input */}
        <div className="flex items-center space-x-3 mt-3">
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-medium text-gray-600">
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 flex space-x-2">
            <input
              type="text"
              placeholder="Add a comment..."
              value={newComment[post._id] || ''}
              onChange={(e) => setNewComment(prev => ({ ...prev, [post._id]: e.target.value }))}
              className="flex-1 bg-gray-50 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post._id)}
            />
            <button
              onClick={() => handleAddComment(post._id)}
              className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-600 transition-colors"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderPosts = () => (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post._id} className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                  {post.author.profilePicture ? (
                    <img src={post.author.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-medium text-gray-600">
                      {post.author.fullName.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <p className="font-semibold text-gray-800">{post.author.fullName}</p>
                    {post.author.isVerified && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                        ✓
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      post.author.userType === 'student' 
                        ? 'bg-blue-100 text-blue-800' 
                        : 'bg-orange-100 text-orange-800'
                    }`}>
                      {post.author.userType === 'student' ? '🎓 Student' : '🏢 Sponsor'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">@{post.author.username} • {formatDate(post.createdAt)}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {post.isFundingEnabled && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                    💰 Goal: {formatCurrency(post.fundingGoal)}
                  </div>
                )}
                <span
                  className={`px-3 py-1 text-xs rounded-full font-medium ${
                    post.visibility === "public"
                      ? "bg-green-100 text-green-700"
                      : "bg-purple-100 text-purple-700"
                  }`}
                >
                  {post.visibility === "public" ? "🌍 Public" : "🔒 Sponsors Only"}
                </span>
              </div>
            </div>
            
            <p className="text-gray-700 mb-4 leading-relaxed">{post.description}</p>
            
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-sm">
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image Section */}
          {post.images && post.images.length > 0 ? (
            <div className="w-full h-64 bg-gray-200 overflow-hidden">
              <img
                src={post.images[0].url}
                alt="post"
                className="w-full h-full object-cover"
              />
            </div>
          ) : post.images.length === 0 && post.isFundingEnabled ? (
            <div className="w-full h-48 bg-gradient-to-r from-green-50 to-blue-50 flex items-center justify-center text-gray-500 text-sm">
              💰 Funding Request • Goal: {formatCurrency(post.fundingGoal)}
            </div>
          ) : null}
          
          {/* Action Bar */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center space-x-2 transition-colors ${
                    post.likes.includes(user._id)
                      ? "text-red-500"
                      : "text-gray-600 hover:text-red-500"
                  }`}
                >
                  <FaHeart />
                  <span className="text-sm font-medium">{post.likes.length}</span>
                </button>
                
                <button 
                  onClick={() => toggleComments(post._id)}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
                >
                  <FaComment />
                  <span className="text-sm font-medium">{post.comments.length}</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600 transition-colors">
                  <FaShare />
                  <span className="text-sm font-medium">Share</span>
                </button>
                
                {post.isFundingEnabled && (
                  <div className="flex items-center space-x-2 text-green-600">
                    <span>💰</span>
                    <span className="text-sm font-medium">
                      {formatCurrency(post.fundings.reduce((sum, funding) => sum + funding.amount, 0))} raised
                    </span>
                  </div>
                )}
              </div>
              
              <div className="text-xs text-gray-500">
                {new Date(post.createdAt).toLocaleTimeString()}
              </div>
            </div>
            
            {/* Comments Section */}
            {(post.comments && post.comments.length > 0) || expandedComments[post._id] ? (
              renderComments(post)
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="ml-64 flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading feed...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <div className="ml-64 h-screen flex flex-col">
        {/* Header */}
        <header className="bg-white shadow-sm px-8 py-6 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
            <p className="text-gray-600 mt-1">Stay updated with the latest from students and sponsors</p>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-2 rounded-lg transition-colors duration-200 flex items-center space-x-2"
            >
              <FaPlus size={16} />
              <span>Create Post</span>
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors duration-200"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto px-8 py-6">
          <div className="max-w-2xl mx-auto">
            {/* Quick Stats Card */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-[#8A1A1C]">{posts.length}</div>
                  <div className="text-sm text-gray-600">Posts Today</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#8A1A1C]">
                    {posts.filter(p => p.author.userType === 'student').length}
                  </div>
                  <div className="text-sm text-gray-600">From Students</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-[#8A1A1C]">
                    {posts.filter(p => p.isFundingEnabled).length}
                  </div>
                  <div className="text-sm text-gray-600">Funding Requests</div>
                </div>
              </div>
            </div>

            {/* Posts */}
            {renderPosts()}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2 mt-8">
                {Array.from({ length: totalPages }, (_, idx) => (
                  <button
                    key={idx}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      currentPage === idx + 1
                        ? "bg-[#8A1A1C] text-white"
                        : "bg-white text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            )}

            {/* Empty State */}
            {posts.length === 0 && (
              <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                <div className="text-6xl mb-4">📝</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts yet</h3>
                <p className="text-gray-600 mb-6">Be the first to share something with the community!</p>
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-3 rounded-lg transition-colors duration-200 inline-flex items-center space-x-2"
                >
                  <FaPlus size={16} />
                  <span>Create Your First Post</span>
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handleNewPost}
      />
    </div>
  );
}

export default Feed;