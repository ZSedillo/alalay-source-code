import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft, FaShareAlt, FaDonate, FaMapMarkerAlt, FaCalendarAlt, FaGraduationCap, FaUniversity, FaHeart, FaComment, FaBookmark, FaEllipsisV, FaShare, FaCheck } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import DonationModal from "../_components/DonationModal";
import InternImage from "../assets/images/internship.jpeg";
import BootcampImage from "../assets/images/bootcamp.jpeg";

function ScholarProfile() {
  const { scholarId } = useParams();
  const navigate = useNavigate();

  const [scholarProfile, setScholarProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [semester] = useState("2nd Sem AY 2024-2025");

const grades = [
   { subject: 'Data Structures', grade: 1.25 },
   { subject: 'Algorithms',       grade: 1.50 },
   { subject: 'Web Programming',  grade: 1.75 },
   { subject: 'Calculus 3',       grade: 2.00 },
];
  // Dummy scholars list with more complete data
const sampleScholars = [
  {
    _id: "1",
    fullName: "Juan Dela Cruz",
    username: "juancruz",
    profileImage: null,
    userLevel: "Incoming 4th Year College",
    bio: "Passionate about technology and education…",
    donationProgress: 65,
    gwa: 1.75,
    status: "Active",
    course: "Computer Science",
    university: "BPI University",
    location: "Quezon City, Metro Manila, PH",
    joinedDate: "2023-08-15",
    totalFunding: 15000,
    targetFunding: 30000,
    activities: [
      "Attended scholarship orientation",
      "Submitted enrollment form",
      "Received book allowance",
      "Completed mid-term examinations",
      "Participated in coding bootcamp"
    ],
    followers: 120,
    following: 45,
    scholarships: 3,
  },
  {
    _id: "2",
    fullName: "Maria Santos",
    username: "marias",
    profileImage: null,
    userLevel: "3rd Year High School",
    bio: "Loves science and math…",
    donationProgress: 45,
    gwa: 1.90,
    status: "Active",
    course: "STEM Track",
    university: "Manila Science High School",
    location: "Manila, Metro Manila, PH",
    joinedDate: "2023-06-01",
    totalFunding: 8000,
    targetFunding: 18000,
    activities: [
      "Won 2nd place in Science Fair",
      "Attended tutorial program",
      "Completed STEM research project"
    ],
    followers: 80,
    following: 30,
    scholarships: 1,
  },
  {
    _id: "3",
    fullName: "Pedro Reyes",
    username: "pedroreyes",
    profileImage: null,
    userLevel: "2nd Year College",
    bio: "Future teacher with a passion for literature…",
    donationProgress: 80,
    gwa: 1.65,
    status: "Active",
    course: "Bachelor of Secondary Education",
    university: "Philippine Normal University",
    location: "Taguig, Metro Manila, PH",
    joinedDate: "2022-09-12",
    totalFunding: 24000,
    targetFunding: 30000,
    activities: [
      "Submitted thesis proposal",
      "Presented in class debate",
      "Completed teaching internship"
    ],
    followers: 60,
    following: 22,
    scholarships: 2,
  },
  {
    _id: "4",
    fullName: "Anna Lim",
    username: "annalim",
    profileImage: null,
    userLevel: "1st Year College",
    bio: "Engineering student eager to innovate.",
    donationProgress: 30,
    gwa: 1.60,
    status: "Active",
    course: "Engineering",
    university: "UP Diliman",
    location: "Quezon City, Metro Manila, PH",
    joinedDate: "2024-01-10",
    totalFunding: 10000,
    targetFunding: 25000,
    activities: [
      "Joined engineering club",
      "Completed CAD training"
    ],
    followers: 55,
    following: 20,
    scholarships: 1,
  },
  {
    _id: "5",
    fullName: "Carlos Mendez",
    username: "carlosmendez",
    profileImage: null,
    userLevel: "4th Year High School",
    bio: "Humanities lover aiming to become a lawyer.",
    donationProgress: 50,
    gwa: 1.70,
    status: "Active",
    course: "HUMSS Track",
    university: "Ateneo High School",
    location: "Makati, Metro Manila, PH",
    joinedDate: "2023-11-05",
    totalFunding: 12000,
    targetFunding: 20000,
    activities: [
      "Won debate championship",
      "Published school paper article"
    ],
    followers: 90,
    following: 35,
    scholarships: 2,
  },
  {
    _id: "6",
    fullName: "Sophia Tan",
    username: "sophiatan",
    profileImage: null,
    userLevel: "3rd Year College",
    bio: "Future doctor committed to serving rural communities.",
    donationProgress: 75,
    gwa: 1.40,
    status: "Active",
    course: "Medicine",
    university: "UST Faculty of Medicine",
    location: "Manila, Metro Manila, PH",
    joinedDate: "2021-06-20",
    totalFunding: 50000,
    targetFunding: 60000,
    activities: [
      "Completed clinical rotation",
      "Volunteered in medical mission"
    ],
    followers: 200,
    following: 60,
    scholarships: 3,
  },
];

  // Dummy posts for the scholar
  const samplePosts = [
    {
      _id: "sp1",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
      },
      description: "Thank you to everyone who supported my coding bootcamp journey! I learned so much about React and web development. 🚀",
      visibility: "public",
      createdAt: "2025-01-22T08:15:00.000Z",
      images: [
        {
          url: BootcampImage
        }
      ],
      tags: ["coding", "bootcamp", "react"],
      fundingGoal: null,
      isFundingEnabled: false,
      isActive: true,
      likes: ["user1", "user2"],
      comments: [
        {
          _id: "c1",
          user: {
            _id: "user1",
            fullName: "Maria Santos",
            profileImage: null,
            isAnonymous: false
          },
          text: "Congrats Juan! Keep it up!",
          donation: null,
          createdAt: "2025-01-22T10:30:00.000Z"
        }
      ],
      fundings: [],
      totalDonations: 0,
    },
    {
      _id: "sp2",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
      },
      description: "I'm raising funds for my final year project on AI for education. Any support would be greatly appreciated! 🙏",
      visibility: "public",
      createdAt: "2025-01-20T12:45:00.000Z",
      images: [],
      tags: ["funding", "AI", "education"],
      fundingTitle: "AI for Education Project",
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
      totalDonations: 5000, // 3000 + 2000
    },
    {
      _id: "sp3",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
      },
      description: "I need help funding my thesis printing and binding. Every little bit counts. Thank you for your support! 📚",
      visibility: "public",
      createdAt: "2025-01-18T14:00:00.000Z",
      images: [],
      tags: ["thesis", "printing", "support"],
      fundingGoal: 8000,
      fundingTitle: "Thesis Printing and Binding",
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
      _id: "sp4",
      author: {
        _id: "1",
        fullName: "Juan Dela Cruz",
        username: "juancruz",
        userType: "student",
        profilePicture: null,
        isVerified: false,
      },
      description: "Just finished my internship! Sharing some highlights and learnings from the experience.",
      visibility: "public",
      createdAt: "2025-01-15T10:00:00.000Z",
      images: [
        {
          url: InternImage
        }
      ],
      tags: ["internship", "career", "learning"],
      fundingTitle: "Internship Allowance",
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
      totalDonations: 5000, // 4000 + 1000
    }
  ];

useEffect(() => {
  const scholar = sampleScholars.find((s) => String(s._id) === String(scholarId));
  // If we have a match, use it; otherwise keep loading=false and scholarProfile=null
  if (scholar) {
    setScholarProfile(scholar);
  }
  setLoading(false);
}, [scholarId]);

  // --- Posts state and donation modal logic ---
  const [posts, setPosts] = useState([]);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});
  const [isDonationModalOpen, setIsDonationModalOpen] = useState(false);
  const [selectedPostForDonation, setSelectedPostForDonation] = useState(null);

  // Tabs
  const [activeTab, setActiveTab] = useState("posts");
  // Follow state
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [plusOne, setPlusOne] = useState(false);
  const plusOneTimeout = useRef(null);

  useEffect(() => {
    if (scholarProfile) {
      setFollowerCount(scholarProfile.followers || 0);
      setIsFollowed(false); // reset follow state on profile change
      setPlusOne(false);
      if (plusOneTimeout.current) clearTimeout(plusOneTimeout.current);
    }
  }, [scholarProfile]);

  const handleFollow = () => {
    if (!isFollowed) {
      setIsFollowed(true);
      setFollowerCount((count) => count + 1);
      setPlusOne(true);
      if (plusOneTimeout.current) clearTimeout(plusOneTimeout.current);
      plusOneTimeout.current = setTimeout(() => setPlusOne(false), 800);
    } else {
      setIsFollowed(false);
      setFollowerCount((count) => (count > 0 ? count - 1 : 0));
      setPlusOne(false);
      if (plusOneTimeout.current) clearTimeout(plusOneTimeout.current);
    }
  };

  useEffect(() => {
    setPosts(samplePosts);
  }, [scholarId]);

  const handleBack = () => navigate("/scholars");

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  const formatDateLong = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

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

  const handleLike = (postId) => {
    setPosts(prev =>
      prev.map(post =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.includes("viewer")
                ? post.likes.filter(id => id !== "viewer")
                : [...post.likes, "viewer"]
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setExpandedComments(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const handleAddComment = (postId) => {
    const commentText = newComment[postId];
    if (!commentText?.trim()) return;
    const comment = {
      _id: Date.now().toString(),
      user: {
        _id: "viewer",
        fullName: "You",
        profileImage: null,
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

  const handleDonateClick = (post) => {
    setSelectedPostForDonation(post);
    setIsDonationModalOpen(true);
  };

  const handleDonationSuccess = (donationData) => {
    setPosts(prev => prev.map(post => {
      if (post._id === selectedPostForDonation._id) {
        const newComment = {
          _id: Date.now().toString(),
          user: {
            _id: donationData.isAnonymous ? 'anonymous' : "viewer",
            fullName: donationData.isAnonymous ? 'Anonymous Supporter' : "You",
            profileImage: null,
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
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1 gap-1">
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
              {"Maria Santos".split(' ').map(n => n[0]).join('')}
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

  const renderPosts = () => (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          {/* Post Header */}
          <div className="p-4 sm:p-6 pb-4">
            {/* ---------- Author row ---------- */}
            <div className="flex items-start justify-between gap-3">

              {/* Left: avatar + name */}
              <div
                className="flex items-center gap-3 cursor-pointer hover:bg-gray-50 rounded-lg px-2 py-1 transition min-w-0"
                onClick={() => handleProfileClick(post)}
                title={`View ${post.author.userType === "student" ? "Scholar" : "Sponsor"} Profile`}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex-shrink-0 flex items-center justify-center">
                  {post.author.profilePicture ? (
                    <img
                      src={post.author.profilePicture}
                      alt="Profile"
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {post.author.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </span>
                  )}
                </div>

          <div className="min-w-0">
            {/* just name + verified check */}
            <div className="flex items-center gap-1.5">
              <h3 className="font-semibold text-gray-800 text-sm sm:text-base truncate">
                {post.author.fullName}
              </h3>

              {post.author.isVerified && (
                <span className="bg-blue-500 text-white p-0.5 rounded-full">
                  <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              )}
            </div>

            {/* @handle & date */}
            <div className="text-xs text-gray-500 mt-0.5">
              @{post.author.username} · {formatDate(post.createdAt)}
            </div>

            {/* badge now under @handle & date */}
            <span
              className={`inline-block mt-0.5 px-1.5 py-0.5 rounded-full text-xs font-medium ${
                post.author.userType === "student"
                  ? "bg-blue-50 text-blue-700"
                  : "bg-orange-50 text-orange-700"
              }`}
            >
              {post.author.userType === "student" ? "🎓 Student" : "🏢 Sponsor"}
            </span>
          </div>

              </div>

              {/* Right: goal + visibility (stacks vertically on small screens) */}
              <div className="relative flex flex-col items-end gap-1.5 flex-shrink-0 text-right pr-7 pt-1">
                {/* 3-dot pinned to the absolute top-right */}
                <button className="absolute top-0 right-0 p-1 text-gray-400 hover:text-gray-600">
                  <FaEllipsisV size={14} />
                </button>

                {post.isFundingEnabled && (
                  <div className="bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full text-xs font-medium border border-emerald-200">
                    Goal: {formatCurrency(post.fundingGoal)}
                  </div>
                )}

                <span
                  className={`px-2 py-0.5 text-xs rounded-full font-medium border ${
                    post.visibility === "public"
                      ? "bg-green-50 text-green-700 border-green-200"
                      : "bg-purple-50 text-purple-700 border-purple-200"
                  }`}
                >
                  {post.visibility === "public" ? "🌍 Public" : "🔒 Private"}
                </span>
              </div>
            </div>

            {/* ---------- Post body ---------- */}
            <p className="text-gray-700 mt-3 mb-3 text-sm sm:text-base leading-relaxed">
              {post.description}
            </p>

            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {post.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full text-xs sm:text-sm font-medium"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          {/* Image Section */}
          {post.images && post.images.length > 0 ? (
            <div className="relative">
              <img
                src={post.images[0].url}
                alt="Post content"
                className="w-full h-200 object-cover"
              />
            </div>
            ) : post.isFundingEnabled ? (
              <div className="mx-6 mb-4 h-32 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <div className="text-2xl font-bold text-emerald-700 tracking-tight">
                    {post.fundingTitle || "Support My Goal"}
                  </div>
                  <div className="text-sm text-emerald-600 mt-1">
                    Goal: {formatCurrency(post.fundingGoal)} ·
                    {formatCurrency(post.fundings.reduce((sum, f) => sum + f.amount, 2500))} raised
                  </div>
                </div>
              </div>
            ) : null}
          {/* Action Bar */}
          <div className="p-4 sm:p-6 pt-4 border-t border-gray-50">
            <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 mb-4">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center space-x-2 transition-colors group ${
                    post.likes.includes("viewer")
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
                {/* Donate Button */}
                {(post.isFundingEnabled || post.author.userType === 'student') && (
                    <button 
                      onClick={() => handleDonateClick(post)}
                      className="flex items-center space-x-1 sm:space-x-2 text-gray-500 hover:text-emerald-500
                                transition-colors group bg-emerald-50 hover:bg-emerald-100
                                px-2 sm:px-3 py-1.5 rounded-full border border-emerald-200"
                    >
                      <FaDonate className="group-hover:scale-110 transition-transform" />
                      <span className="text-xs sm:text-sm font-medium hidden sm:inline">Donate</span>
                    </button>
                )}
              </div>
                <div className="text-xs text-gray-400">
                  {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                </div>
            </div>
            {/* Total Donations Display */}
            {(post.totalDonations > 0) && (
                <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 sm:flex sm:items-center sm:justify-between gap-2">
                   <p className="text-sm font-semibold text-emerald-800">
                     💰 {formatCurrency(post.totalDonations)} raised
                   </p>
                   <p className="text-xs text-emerald-600 mt-1 sm:mt-0">
                    Thanks to all supporters 🙏
                   </p>
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

  // --- Profile Header (like Profile.jsx) ---
  const renderProfileHeader = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 sm:h-48 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] relative">
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-4 sm:left-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            {scholarProfile.profileImage ? (
              <img src={scholarProfile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-white">
                  {scholarProfile.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>
        {/* Follow Button */}
        <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto sm:right-6">
          <button
            onClick={handleFollow}
            className={`px-5 py-2 rounded-xl font-medium flex items-center space-x-2 shadow-sm transition-colors duration-200 ${
              isFollowed
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-[#D5B527] text-white hover:bg-[#bfa021]"
            }`}
          >
            {isFollowed ? <FaCheck size={14} /> : <FaUserCircle size={14} />}
            <span>{isFollowed ? "Followed" : "Follow"}</span>
          </button>
        </div>
      </div>
      {/* Profile Info */}
      <div className="p-4 sm:p-6 pt-18 sm:pt-16">
        {/* Basic Info */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center flex-wrap gap-2 mb-2">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{scholarProfile.fullName}</h1>
                <span className="bg-blue-50 text-blue-700 px-2 py-1 rounded-full text-xs font-medium border border-blue-200">
                  📚 Scholar
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                <span>@{scholarProfile.username}</span>
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt size={12} />
                  <span>{scholarProfile.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt size={12} />
                  <span>Joined {formatDateLong(scholarProfile.joinedDate)}</span>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{scholarProfile.bio}</p>
            </div>
          </div>
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{posts.length}</div>
              <div className="text-xs sm:text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl relative">
              <div
                className={`text-xl sm:text-2xl font-bold text-[#8A1A1C] transition-transform duration-300`}
                style={plusOne ? { color: "#e11d48" } : undefined}
              >
                {followerCount}
                {plusOne && (
                  <span
                    className="absolute left-1/2 -translate-x-1/2 font-bold text-base sm:text-lg animate-follower-plus"
                    style={{
                      top: '-1.5rem',
                      color: "#e11d48",
                      pointerEvents: 'none',
                      transition: 'all 0.6s cubic-bezier(.4,2,.6,1)'
                    }}
                  >
                    +1
                  </span>
                )}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">Followers</div>
              <style>
                {`
                  .animate-follower-plus {
                    animation: followerPlusAnim 0.8s cubic-bezier(.4,2,.6,1);
                  }
                  @keyframes followerPlusAnim {
                    0% {
                      opacity: 0;
                      transform: translate(-50%, 0) scale(0.7);
                    }
                    40% {
                      opacity: 1;
                      transform: translate(-50%, -10px) scale(1.2);
                    }
                    80% {
                      opacity: 1;
                      transform: translate(-50%, -20px) scale(1);
                    }
                    100% {
                      opacity: 0;
                      transform: translate(-50%, -30px) scale(0.8);
                    }
                  }
                `}
              </style>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{scholarProfile.following || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{scholarProfile.scholarships || 0}</div>
              <div className="text-xs sm:text-sm text-gray-600">Scholarships</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // --- Academic Info Card (like Profile.jsx) ---
  const renderAcademicInfo = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🎓 Academic Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Course</span>
          <p className="font-medium text-gray-800">{scholarProfile.course}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Academic Level</span>
          <p className="font-medium text-gray-800">{scholarProfile.userLevel}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">University</span>
          <p className="font-medium text-gray-800">{scholarProfile.university}</p>
        </div>


<div className="p-3 bg-gray-50 rounded-xl flex items-center justify-between">
  <div>
    <span className="text-xs sm:text-sm text-gray-600 block mb-1">GWA</span>
    <p className="text-xl font-bold text-gray-800">{scholarProfile.gwa}</p>
  </div>
  <button
    onClick={() => setShowGradeModal(true)}
    className="bg-[#8A1A1C] text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#5C1213] transition"
  >
    View Grade
  </button>
</div>
{showGradeModal && (
  <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md mx-auto overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800">Grade Report</h3>
        <button
          onClick={() => setShowGradeModal(false)}
          className="text-gray-400 hover:text-gray-600 text-2xl leading-none"
        >
          &times;
        </button>
      </div>

      {/* Semester + Verified bubble */}
      <div className="px-6 pt-4 flex items-center gap-3">
        <span className="text-sm font-medium text-gray-700">2nd Sem AY 2024-2025</span>
        <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full text-xs font-semibold">
          ✓ Grades verified
        </span>
      </div>

      {/* Last-updated */}
      <div className="px-6 pb-4 text-xs text-gray-500">
        Last updated:{" "}
        {new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </div>

      {/* Grades list */}
      <ul className="px-6 pb-4 space-y-3 max-h-80 overflow-y-auto">
        {grades.map(({ subject, grade }) => (
          <li
            key={subject}
            className="flex justify-between items-center py-3 border-b border-gray-100 last:border-0"
          >
            <span className="text-sm text-gray-800">{subject}</span>
            <span className="font-semibold text-sm text-[#8A1A1C]">{grade}</span>
          </li>
        ))}
      </ul>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50">
        <button
          onClick={() => setShowGradeModal(false)}
          className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm font-medium py-2 rounded-lg transition"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}
       
      </div>
    </div>
  );

  // --- Tab Navigation ---
  const renderTabs = () => (
    <div className="border-b border-gray-200 mt-8">
      <nav className="flex space-x-1 sm:space-x-8 overflow-x-auto">
        {[
          {
            id: 'posts',
            name: 'Posts',
            icon: '📝'
          },
          {
            id: 'activity',
            name: 'Activity',
            icon: '📊'
          },
          {
            id: 'achievements',
            name: 'Achievements',
            icon: '🏆'
          }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`py-3 px-3 sm:px-1 border-b-2 font-medium text-sm flex items-center space-x-2 whitespace-nowrap ${
              activeTab === tab.id
                ? 'border-[#D5B527] text-[#8A1A1C]'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.name}</span>
          </button>
        ))}
      </nav>
    </div>
  );

  // --- Tab Content ---
  const renderTabContent = () => {
    if (activeTab === "posts") return renderPosts();
    if (activeTab === "activity") {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <span className="text-4xl mb-4 block">📊</span>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Activity Timeline</h3>
          <p className="text-gray-600">Recent activities and interactions will appear here.</p>
        </div>
      );
    }
    if (activeTab === "achievements") {
      return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
          <span className="text-4xl mb-4 block">🏆</span>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievements & Milestones</h3>
          <p className="text-gray-600">Academic achievements and recognition will be displayed here.</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />

        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 top-[52px] md:top-0 z-30">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleBack}
                  className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <FaArrowLeft size={18} />
                </button>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Scholar Profile</h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">View detailed scholar information</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center h-96">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
                <p className="text-gray-600 font-medium">Loading scholar profile...</p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center justify-center h-96">
              <div className="bg-red-50 border border-red-200 rounded-2xl p-8 text-center max-w-md">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
                <button
                  onClick={handleBack}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition-colors"
                >
                  Back to Scholars
                </button>
              </div>
            </div>
          )}

          {/* Scholar Profile */}
          {!loading && !error && scholarProfile && (
            <div className="space-y-6">
              {/* Profile Header */}
              {renderProfileHeader()}

              {/* Academic Info */}
              {renderAcademicInfo()}

              {/* Tab Navigation */}
              {renderTabs()}

              {/* Tab Content */}
              <div className="mt-6">
                {renderTabContent()}
              </div>
            </div>
          )}
        </main>
      </div>
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

export default ScholarProfile;