import { FaHeart, FaPlus, FaComment, FaShare, FaBookmark, FaEllipsisV, FaDonate, FaUserCircle } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../_components/Sidebar";
import NewPostModal from "../_components/NewPostModal";
import DonationModal from "../_components/DonationModal";

function Feed() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedPostForDonation, setSelectedPostForDonation] = useState(null);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, students, sponsors, funding

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
        }
      ],
      fundings: [],
      totalDonations: 3500, // Sum of all donations received
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
      totalDonations: 18000, // Sum of all donations received
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
        }
      ],
      fundings: [],
      totalDonations: 0,
    },
    // --- Additional sample posts from ScholarProfile reference ---
    {
      _id: "p4",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Juan",
          lastName: "Dela Cruz",
          profileImage: null,
        },
      },
      description: "I'm raising funds for my final year project on AI for education. Any support would be greatly appreciated! 🙏",
      visibility: "public",
      createdAt: "2025-01-20T12:45:00.000Z",
      updatedAt: "2025-01-20T12:45:00.000Z",
      images: [],
      tags: ["funding", "AI", "education"],
      fundingGoal: 20000,
      isFundingEnabled: true,
      isActive: true,
      likes: ["user3"],
      comments: [
        {
          _id: "c2",
          user: {
            _id: "user2",
            fullName: "Anonymous Supporter",
            profileImage: null,
            isAnonymous: true
          },
          text: "Good luck on your project!",
          donation: {
            amount: 3000,
            isAnonymous: true
          },
          createdAt: "2025-01-21T09:00:00.000Z"
        },
        {
          _id: "c3",
          user: {
            _id: "user4",
            fullName: "Dr. Smith",
            profileImage: null,
            isAnonymous: false
          },
          text: "Proud of your initiative!",
          donation: {
            amount: 2000,
            isAnonymous: false
          },
          createdAt: "2025-01-21T10:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 5000,
    },
    {
      _id: "p5",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Juan",
          lastName: "Dela Cruz",
          profileImage: null,
        },
      },
      description: "I need help funding my thesis printing and binding. Every little bit counts. Thank you for your support! 📚",
      visibility: "public",
      createdAt: "2025-01-18T14:00:00.000Z",
      updatedAt: "2025-01-18T14:00:00.000Z",
      images: [],
      tags: ["thesis", "printing", "support"],
      fundingGoal: 8000,
      isFundingEnabled: true,
      isActive: true,
      likes: ["user5", "user6"],
      comments: [
        {
          _id: "c4",
          user: {
            _id: "user7",
            fullName: "Sponsor Org",
            profileImage: null,
            isAnonymous: false
          },
          text: "Here's some help for your thesis!",
          donation: {
            amount: 2500,
            isAnonymous: false
          },
          createdAt: "2025-01-18T15:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 2500,
    },
    {
      _id: "p6",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Juan",
          lastName: "Dela Cruz",
          profileImage: null,
        },
      },
      description: "Just finished my internship! Sharing some highlights and learnings from the experience.",
      visibility: "public",
      createdAt: "2025-01-15T10:00:00.000Z",
      updatedAt: "2025-01-15T10:00:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x300.png?text=Internship+Highlights"
        }
      ],
      tags: ["internship", "career", "learning"],
      fundingGoal: 12000,
      isFundingEnabled: true,
      isActive: true,
      likes: ["user8"],
      comments: [
        {
          _id: "c5",
          user: {
            _id: "user9",
            fullName: "Alumni Donor",
            profileImage: null,
            isAnonymous: false
          },
          text: "Congrats! Here's a little for your journey.",
          donation: {
            amount: 4000,
            isAnonymous: false
          },
          createdAt: "2025-01-15T12:00:00.000Z"
        },
        {
          _id: "c6",
          user: {
            _id: "user10",
            fullName: "Anonymous",
            profileImage: null,
            isAnonymous: true
          },
          text: "Keep going!",
          donation: {
            amount: 1000,
            isAnonymous: true
          },
          createdAt: "2025-01-15T13:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 5000,
    },
    {
      _id: "p7",
      author: {
        _id: "2",
        fullName: "Maria Santos",
        username: "marias",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Maria",
          lastName: "Santos",
          profileImage: null,
        },
      },
      description: "Participated in the National Science Fair and won 2nd place! Thank you for all the support. 🏅",
      visibility: "public",
      createdAt: "2025-01-10T09:00:00.000Z",
      updatedAt: "2025-01-10T09:00:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x300.png?text=Science+Fair+Award"
        }
      ],
      tags: ["science", "award", "fair"],
      fundingGoal: null,
      isFundingEnabled: false,
      isActive: true,
      likes: ["user11", "user12", "user13"],
      comments: [
        {
          _id: "c7",
          user: {
            _id: "user14",
            fullName: "Coach Lee",
            profileImage: null,
            isAnonymous: false
          },
          text: "Proud of you Maria!",
          donation: null,
          createdAt: "2025-01-10T10:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 0,
    },
    {
      _id: "p8",
      author: {
        _id: "3",
        fullName: "Pedro Reyes",
        username: "pedroreyes",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Pedro",
          lastName: "Reyes",
          profileImage: null,
        },
      },
      description: "Submitted my thesis proposal! Hoping to get approval and start my research soon.",
      visibility: "public",
      createdAt: "2025-01-08T11:30:00.000Z",
      updatedAt: "2025-01-08T11:30:00.000Z",
      images: [],
      tags: ["thesis", "proposal", "research"],
      fundingGoal: 10000,
      isFundingEnabled: true,
      isActive: true,
      likes: ["user15"],
      comments: [
        {
          _id: "c8",
          user: {
            _id: "user16",
            fullName: "Prof. Cruz",
            profileImage: null,
            isAnonymous: false
          },
          text: "Best of luck on your thesis journey!",
          donation: {
            amount: 2000,
            isAnonymous: false
          },
          createdAt: "2025-01-08T12:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 2000,
    },
    {
      _id: "p9",
      author: {
        _id: "2",
        fullName: "Maria Santos",
        username: "marias",
        userType: "student",
        profilePicture: null,
        isVerified: false,
        scholarInfo: {
          firstName: "Maria",
          lastName: "Santos",
          profileImage: null,
        },
      },
      description: "Attended a coding bootcamp and learned a lot about React and web development. 🚀",
      visibility: "public",
      createdAt: "2025-01-05T15:00:00.000Z",
      updatedAt: "2025-01-05T15:00:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x300.png?text=Coding+Bootcamp"
        }
      ],
      tags: ["coding", "bootcamp", "react"],
      fundingGoal: null,
      isFundingEnabled: false,
      isActive: true,
      likes: ["user17", "user18"],
      comments: [
        {
          _id: "c9",
          user: {
            _id: "user19",
            fullName: "Mentor Ana",
            profileImage: null,
            isAnonymous: false
          },
          text: "Great job Maria! Keep learning.",
          donation: null,
          createdAt: "2025-01-05T16:00:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 0,
    }
  ]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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
                ? post.likes.filter(id => id !== user._id)
                : [...post.likes, user._id],
            }
          : post
      )
    );
  };

  const handleDonateClick = (post) => {
    // Only allow donations to student posts or posts with funding enabled
    if (post.author.userType === 'student' || post.isFundingEnabled) {
      setSelectedPostForDonation(post);
      setIsDonationModalOpen(true);
    }
  };

  const handleDonationSuccess = (donationData) => {
    // Update the post with the new donation
    setPosts(prev => prev.map(post => {
      if (post._id === selectedPostForDonation._id) {
        const newComment = {
          _id: Date.now().toString(),
          user: {
            _id: donationData.isAnonymous ? 'anonymous' : user._id,
            fullName: donationData.isAnonymous ? 'Anonymous Supporter' : user.fullName,
            profileImage: donationData.isAnonymous ? null : user.profilePicture,
            isAnonymous: donationData.isAnonymous
          },
          text: donationData.message || `Thank you for your support! 💖`,
          donation: {
            amount: donationData.amount,
            isAnonymous: donationData.isAnonymous
          },
          createdAt: new Date().toISOString()
        };

        return {
          ...post,
          comments: [...post.comments, newComment],
          totalDonations: (post.totalDonations || 0) + donationData.amount
        };
      }
      return post;
    }));

    setIsDonationModalOpen(false);
    setSelectedPostForDonation(null);
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
      totalDonations: 0,
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

  const getFilteredPosts = () => {
    switch (filter) {
      case 'students':
        return posts.filter(post => post.author.userType === 'student');
      case 'sponsors':
        return posts.filter(post => post.author.userType === 'sponsor');
      case 'funding':
        return posts.filter(post => post.isFundingEnabled);
      default:
        return posts;
    }
  };

  const canReceiveDonations = (post) => {
    return post.author.userType === 'student' || post.isFundingEnabled;
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
            <div className="w-8 h-8 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center flex-shrink-0">
              {comment.user.profileImage ? (
                <img 
                  src={comment.user.profileImage} 
                  alt="Profile" 
                  className="w-full h-full rounded-full object-cover" 
                />
              ) : (
                <span className="text-xs font-semibold text-white">
                  {comment.user.isAnonymous ? '?' : comment.user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </div>
            
            <div className="flex-1">
              <div className="bg-gray-50 rounded-2xl px-4 py-3">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-semibold text-gray-800">
                      {comment.user.isAnonymous ? 'Anonymous' : comment.user.fullName}
                    </span>
                    {comment.donation && (
                      <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium">
                        💰 {formatCurrency(comment.donation.amount)}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">
                    {formatDate(comment.createdAt)}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{comment.text}</p>
              </div>
            </div>
          </div>
        ))}
        
        {hasMoreComments && (
          <button
            onClick={() => toggleComments(post._id)}
            className="text-sm text-[#8A1A1C] hover:text-[#5C1213] font-medium ml-11 transition-colors"
          >
            {showExpanded ? 'Show less' : `View ${comments.length - 2} more comments`}
          </button>
        )}

        <div className="flex items-center space-x-3 mt-4">
          <div className="w-8 h-8 bg-gradient-to-br from-[#8A1A1C] to-[#5C1213] rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-xs font-semibold text-white">
              {user.fullName.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div className="flex-1 flex space-x-2">
            <input
              type="text"
              placeholder="Write a comment..."
              value={newComment[post._id] || ''}
              onChange={(e) => setNewComment(prev => ({ ...prev, [post._id]: e.target.value }))}
              className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#8A1A1C] focus:border-transparent transition-all"
              onKeyPress={(e) => e.key === 'Enter' && handleAddComment(post._id)}
            />
            <button
              onClick={() => handleAddComment(post._id)}
              disabled={!newComment[post._id]?.trim()}
              className="bg-[#8A1A1C] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#5C1213] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleProfileClick = (post) => {
    if (post.author.userType === "student") {
      // Go to ScholarProfile with scholarId (use author._id)
      navigate(`/scholars/${post.author._id}`);
    } else if (post.author.userType === "sponsor") {
      // Go to SponsorProfile with sponsorId (use author._id)
      navigate(`/sponsors/${post.author._id}`);
    }
  };

  const renderPosts = () => {
    const filteredPosts = getFilteredPosts();

    if (filteredPosts.length === 0) {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
          <div className="text-6xl mb-4">📝</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-6">
            {filter === 'all' ? 'Be the first to share something with the community!' : `No ${filter} posts available at the moment.`}
          </p>
          {filter === 'all' && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <FaPlus size={16} />
              <span>Create Your First Post</span>
            </button>
          )}
        </div>
      );
    }

    return (
      <div className="space-y-6">
        {filteredPosts.map((post) => (
          <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
            {/* Post Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                {/* Make user area clickable */}
                <div
                  className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 rounded-lg px-1 py-1 transition"
                  onClick={() => handleProfileClick(post)}
                  title={`View ${post.author.userType === "student" ? "Scholar" : "Sponsor"} Profile`}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                    {post.author.profilePicture ? (
                      <img src={post.author.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <span className="text-sm font-semibold text-white">
                        {post.author.fullName.split(' ').map(n => n[0]).join('')}
                      </span>
                    )}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-800">{post.author.fullName}</h3>
                      {post.author.isVerified && (
                        <span className="bg-blue-500 text-white p-1 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </span>
                      )}
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        post.author.userType === 'student' 
                          ? 'bg-blue-50 text-blue-700' 
                          : 'bg-orange-50 text-orange-700'
                      }`}>
                        {post.author.userType === 'student' ? '🎓 Student' : '🏢 Sponsor'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      <span>@{post.author.username}</span>
                      <span>•</span>
                      <span>{formatDate(post.createdAt)}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {post.isFundingEnabled && (
                    <div className="bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-medium border border-emerald-200">
                      💰 Goal: {formatCurrency(post.fundingGoal)}
                    </div>
                  )}
                  <span
                    className={`px-3 py-1 text-xs rounded-full font-medium border ${
                      post.visibility === "public"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    {post.visibility === "public" ? "🌍 Public" : "🔒 Private"}
                  </span>
                  <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                    <FaEllipsisV size={14} />
                  </button>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4 leading-relaxed">{post.description}</p>
              
              {post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-gray-200 transition-colors cursor-pointer">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Donation Progress Bar for Funding Posts */}
              {post.isFundingEnabled && (
                <div className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700">
                      {formatCurrency(post.totalDonations || 0)} raised
                    </span>
                    <span className="text-sm text-gray-500">
                      of {formatCurrency(post.fundingGoal)}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${Math.min(((post.totalDonations || 0) / post.fundingGoal) * 100, 100)}%` 
                      }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {Math.round(((post.totalDonations || 0) / post.fundingGoal) * 100)}% funded
                  </div>
                </div>
              )}
            </div>

            {/* Image Section */}
            {post.images && post.images.length > 0 ? (
              <div className="relative">
                <img
                  src={post.images[0].url}
                  alt="Post content"
                  className="w-full h-80 object-cover"
                />
              </div>
            ) : post.isFundingEnabled ? (
              <div className="mx-6 mb-4 h-32 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-700">
                <div className="text-center">
                  <div className="text-2xl mb-2">💰</div>
                  <div className="font-medium">Funding Goal: {formatCurrency(post.fundingGoal)}</div>
                  <div className="text-sm text-emerald-600">
                    {formatCurrency(post.fundings.reduce((sum, funding) => sum + funding.amount, 0))} raised
                  </div>
                </div>
              </div>
            ) : null}
            
            {/* Action Bar */}
            <div className="p-6 pt-4 border-t border-gray-50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-6">
                  <button 
                    onClick={() => handleLike(post._id)}
                    className={`flex items-center space-x-2 transition-colors group ${
                      post.likes.includes(user._id)
                        ? "text-red-500"
                        : "text-gray-500 hover:text-red-500"
                    }`}
                  >
                    <FaHeart className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{post.likes.length}</span>
                  </button>
                  
                  <button 
                    onClick={() => toggleComments(post._id)}
                    className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group"
                  >
                    <FaComment className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">{post.comments.length}</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-green-500 transition-colors group">
                    <FaShare className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Share</span>
                  </button>
                  
                  <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors group">
                    <FaBookmark className="group-hover:scale-110 transition-transform" />
                    <span className="text-sm font-medium">Save</span>
                  </button>

                  {/* Donate Button - Only show for students or funding-enabled posts */}
                  {canReceiveDonations(post) && post.author._id !== user._id && (
                    <button 
                      onClick={() => handleDonateClick(post)}
                      className="flex items-center space-x-2 text-gray-500 hover:text-emerald-500 transition-colors group bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-full border border-emerald-200"
                    >
                      <FaDonate className="group-hover:scale-110 transition-transform" />
                      <span className="text-sm font-medium">Donate</span>
                    </button>
                  )}
                </div>
                
                <div className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
              </div>
              
              {/* Total Donations Display */}
              {(post.totalDonations > 0) && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-emerald-800">
                      💰 Total donations received: {formatCurrency(post.totalDonations)}
                    </span>
                    <span className="text-xs text-emerald-600">
                      Thank you to all supporters! 🙏
                    </span>
                  </div>
                </div>
              )}
              
              {/* Comments Section */}
              {(post.comments && post.comments.length > 0) || expandedComments[post._id] ? (
                renderComments(post)
              ) : null}
            </div>
          </article>
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="md:ml-64">
          <div className="h-16 md:h-0" />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading your feed...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />
        
        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-[52px] md:top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Feed</h1>
                <p className="text-gray-600 mt-1">Stay connected with the BPI Alalay community</p>
              </div>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-6 py-3 rounded-xl font-medium transition-colors duration-200 flex items-center justify-center space-x-2 shadow-sm"
              >
                <FaPlus size={16} />
                <span>Create Post</span>
              </button>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-1 mt-6 bg-gray-100 rounded-xl p-1">
              {[
                { key: 'all', label: 'All Posts' },
                { key: 'students', label: 'Students' },
                { key: 'sponsors', label: 'Sponsors' },
                { key: 'funding', label: 'Funding' }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilter(tab.key)}
                  className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filter === tab.key
                      ? 'bg-white text-[#8A1A1C] shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-[#8A1A1C] mb-1">{posts.length}</div>
              <div className="text-sm text-gray-600">Total Posts</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-[#8A1A1C] mb-1">
                {posts.filter(p => p.author.userType === 'student').length}
              </div>
              <div className="text-sm text-gray-600">From Students</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <div className="text-2xl font-bold text-[#8A1A1C] mb-1">
                {posts.filter(p => p.isFundingEnabled).length}
              </div>
              <div className="text-sm text-gray-600">Funding Requests</div>
            </div>
          </div>

          {/* Posts */}
          {renderPosts()}
        </main>
      </div>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handleNewPost}
      />

      {/* Donation Modal */}
      <DonationModal
        isOpen={isDonationModalOpen}
        onClose={() => {
          setIsDonationModalOpen(false);
          setSelectedPostForDonation(null);
        }}
        post={selectedPostForDonation}
        onDonationSuccess={handleDonationSuccess}
      />
    </div>
  );
}

export default Feed;