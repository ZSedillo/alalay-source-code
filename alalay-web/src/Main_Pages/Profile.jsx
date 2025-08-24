import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaComment, FaShare, FaBookmark, FaEllipsisV, FaEdit, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});

  // Sample user data - in real app this would come from API/database
  const sampleUserData = {
    "_id": "689889e827f976dd2c673d4c",
    "username": "maria_santos",
    "email": "maria.santos@student.bpi.edu",
    "fullName": "Maria Santos",
    "userType": "student", // or "sponsor"
    "profilePicture": null,
    "bio": "Computer Science student at BPI University. Passionate about AI and machine learning. Looking for opportunities to advance my education and contribute to innovative technology solutions. 🚀",
    "location": "Quezon City, Metro Manila, PH",
    "phone": "+63 917 123 4567",
    "isVerified": true,
    "joinedDate": "2024-12-15T08:30:00.000Z",
    
    // Student-specific fields
    "academicInfo": {
      "level": "undergraduate",
      "year": "3rd Year",
      "fieldOfStudy": "Computer Science",
      "university": "BPI University",
      "gwa": "3.8",
      "expectedGraduation": "2026-05-15"
    },
    
    // Sponsor-specific fields (would be null for students)
    "sponsorInfo": null,
    
    // Profile stats
    "stats": {
      "totalPosts": 12,
      "totalFunding": 15000,
      "scholarshipsReceived": 2,
      "sponsorships": 0,
      "followers": 45,
      "following": 23
    },
    
    // Privacy settings
    "privacy": {
      "profileVisibility": "public",
      "showContactInfo": false,
      "allowMessages": true
    },
    
    "createdAt": "2024-12-15T08:30:00.000Z",
    "updatedAt": "2025-01-20T14:22:00.000Z"
  };

  // Sample sponsor data
  const sampleSponsorData = {
    "_id": "689889e827f976dd2c673d4d",
    "username": "tech_corp_ph",
    "email": "partnerships@techcorp.ph",
    "fullName": "TechCorp Philippines",
    "userType": "sponsor",
    "profilePicture": null,
    "bio": "Leading technology company in the Philippines. We believe in investing in the next generation of Filipino innovators and tech leaders. Supporting students in STEM fields since 2010. 🇵🇭",
    "location": "Makati City, Metro Manila, PH",
    "phone": "+63 2 8123 4567",
    "isVerified": true,
    "joinedDate": "2024-10-01T09:00:00.000Z",
    
    // Student-specific fields (would be null for sponsors)
    "academicInfo": null,
    
    // Sponsor-specific fields
    "sponsorInfo": {
      "companyName": "TechCorp Philippines",
      "industry": "Information Technology",
      "companySize": "500-1000 employees",
      "website": "https://techcorp.ph",
      "established": "2010",
      "focusAreas": ["STEM", "Computer Science", "Engineering"],
      "totalDonated": 250000,
      "studentsSupported": 15
    },
    
    // Profile stats
    "stats": {
      "totalPosts": 8,
      "totalFunding": 0,
      "scholarshipsReceived": 0,
      "sponsorships": 15,
      "followers": 128,
      "following": 67
    },
    
    // Privacy settings
    "privacy": {
      "profileVisibility": "public",
      "showContactInfo": true,
      "allowMessages": true
    },
    
    "createdAt": "2024-10-01T09:00:00.000Z",
    "updatedAt": "2025-01-20T16:45:00.000Z"
  };

  // Sample posts data
  const samplePosts = [
    {
      "_id": "689bfdbf9d759a527a926de8",
      "author": "689889e827f976dd2c673d4c",
      "description": "Excited to start the new semester! Just received my new books thanks to my sponsor. Ready to dive deep into Machine Learning algorithms! 📚🤖 #ComputerScience #MachineLearning",
      "images": [
        {
          "url": "https://via.placeholder.com/600x300.png?text=Machine+Learning+Books"
        }
      ],
      "fundingGoal": null,
      "visibility": "public",
      "tags": ["study", "machinelearning", "semester"],
      "isActive": true,
      "isFundingEnabled": false,
      "likes": ["user1", "user2", "user3"],
      "comments": [
        {
          "_id": "c1",
          "user": {
            "_id": "user1",
            "fullName": "Dr. Sarah Johnson",
            "profileImage": null,
            "isAnonymous": false
          },
          "text": "Good luck with your studies! Machine Learning is such an exciting field.",
          "donation": {
            "amount": 2000,
            "isAnonymous": false
          },
          "createdAt": "2025-01-22T10:30:00.000Z"
        },
        {
          "_id": "c2",
          "user": {
            "_id": "user2",
            "fullName": "Anonymous Supporter",
            "profileImage": null,
            "isAnonymous": true
          },
          "text": "Keep up the great work! Education is the key to success.",
          "donation": {
            "amount": 1500,
            "isAnonymous": true
          },
          "createdAt": "2025-01-22T11:15:00.000Z"
        },
        {
          "_id": "c3",
          "user": {
            "_id": "user3",
            "fullName": "Mark Chen",
            "profileImage": null,
            "isAnonymous": false
          },
          "text": "I studied Computer Science too! Feel free to reach out if you need any guidance.",
          "donation": null,
          "createdAt": "2025-01-22T12:00:00.000Z"
        }
      ],
      "fundings": [],
      "createdAt": "2025-01-22T08:15:00.000Z",
      "updatedAt": "2025-01-22T08:15:00.000Z"
    },
    {
      "_id": "689bfdbf9d759a527a926de9",
      "author": "689889e827f976dd2c673d4c",
      "description": "Looking for support for my final year project on AI-powered healthcare solutions. Any guidance or funding would be greatly appreciated! 🏥💡",
      "images": [],
      "fundingGoal": 25000,
      "visibility": "public",
      "tags": ["funding", "healthcare", "ai", "project"],
      "isActive": true,
      "isFundingEnabled": true,
      "likes": ["user4", "user5"],
      "comments": [
        {
          "_id": "c5",
          "user": {
            "_id": "sponsor1",
            "fullName": "HealthTech Foundation",
            "profileImage": null,
            "isAnonymous": false
          },
          "text": "This sounds like a promising project! We'd love to support healthcare innovation.",
          "donation": {
            "amount": 10000,
            "isAnonymous": false
          },
          "createdAt": "2025-01-20T15:00:00.000Z"
        }
      ],
      "fundings": [
        {
          "sponsor": "sponsor1",
          "amount": 5000,
          "message": "Great project idea! Keep it up!",
          "createdAt": "2025-01-20T14:20:00.000Z"
        }
      ],
      "createdAt": "2025-01-20T12:45:00.000Z",
      "updatedAt": "2025-01-20T14:20:00.000Z"
    },
    {
      "_id": "689bfdbf9d759a527a926dea",
      "author": "689889e827f976dd2c673d4c",
      "description": "Grateful for all the support I've received this academic year. Here's my progress report and achievements so far! 🎓✨",
      "images": [
        {
          "url": "https://via.placeholder.com/600x400.png?text=Academic+Progress+Report"
        }
      ],
      "fundingGoal": null,
      "visibility": "sponsor",
      "tags": ["progress", "grateful", "achievement"],
      "isActive": true,
      "isFundingEnabled": false,
      "likes": ["user6", "user7", "user8", "user9"],
      "comments": [
        {
          "_id": "c7",
          "user": {
            "_id": "user8",
            "fullName": "Professor Martinez",
            "profileImage": null,
            "isAnonymous": false
          },
          "text": "Amazing progress! Your dedication really shows.",
          "donation": null,
          "createdAt": "2025-01-18T16:15:00.000Z"
        }
      ],
      "fundings": [],
      "createdAt": "2025-01-18T14:30:00.000Z",
      "updatedAt": "2025-01-18T14:30:00.000Z"
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      // For demo, randomly choose between student and sponsor
      const isStudent = Math.random() > 0.5;
      setUser(isStudent ? sampleUserData : sampleSponsorData);
      setPosts(samplePosts);
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

  const formatDateLong = (dateString) => {
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
    setPosts(prev => prev.map(post => 
      post._id === postId 
        ? {
            ...post,
            likes: post.likes.includes(user._id)
              ? post.likes.filter(id => id !== user._id)
              : [...post.likes, user._id]
          }
        : post
    ));
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

  const renderProfileHeader = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Cover Photo */}
      <div className="h-32 sm:h-48 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] relative">
        {/* Profile Picture */}
        <div className="absolute -bottom-12 left-4 sm:left-6">
          <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                <span className="text-lg sm:text-2xl font-bold text-white">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <div className="absolute top-4 right-4 sm:bottom-4 sm:top-auto sm:right-6">
          <button 
            onClick={() => navigate('/settings')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-4 py-2 rounded-xl font-medium transition-colors duration-200 flex items-center space-x-2 shadow-sm"
          >
            <FaEdit size={14} />
            <span className="hidden sm:inline">Edit Profile</span>
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
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.fullName}</h1>
                {user.isVerified && (
                  <span className="bg-blue-500 text-white p-1 rounded-full">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </span>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  user.userType === 'student' 
                    ? 'bg-blue-50 text-blue-700' 
                    : 'bg-orange-50 text-orange-700'
                }`}>
                  {user.userType === 'student' ? '🎓 Student' : '🏢 Sponsor'}
                </span>
              </div>
              
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                <span>@{user.username}</span>
                <div className="flex items-center space-x-1">
                  <FaMapMarkerAlt size={12} />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <FaCalendarAlt size={12} />
                  <span>Joined {formatDateLong(user.joinedDate)}</span>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{user.bio}</p>
            </div>
          </div>
          
          {/* Contact Info */}
          {user.privacy.showContactInfo && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600 mb-4 p-3 bg-gray-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <span>📧</span>
                <span>{user.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span>📱</span>
                <span>{user.phone}</span>
              </div>
              {user.userType === 'sponsor' && user.sponsorInfo?.website && (
                <div className="flex items-center space-x-2 sm:col-span-2">
                  <span>🌐</span>
                  <a href={user.sponsorInfo.website} target="_blank" rel="noopener noreferrer" className="text-[#8A1A1C] hover:underline">
                    {user.sponsorInfo.website}
                  </a>
                </div>
              )}
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{user.stats.totalPosts}</div>
              <div className="text-xs sm:text-sm text-gray-600">Posts</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{user.stats.followers}</div>
              <div className="text-xs sm:text-sm text-gray-600">Followers</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{user.stats.following}</div>
              <div className="text-xs sm:text-sm text-gray-600">Following</div>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-xl">
              <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">
                {user.userType === 'student' ? user.stats.scholarshipsReceived : user.stats.sponsorships}
              </div>
              <div className="text-xs sm:text-sm text-gray-600">
                {user.userType === 'student' ? 'Scholarships' : 'Sponsored'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentInfo = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🎓 Academic Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Field of Study</span>
          <p className="font-medium text-gray-800">{user.academicInfo.fieldOfStudy}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Academic Level</span>
          <p className="font-medium text-gray-800">{user.academicInfo.level} - {user.academicInfo.year}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">University</span>
          <p className="font-medium text-gray-800">{user.academicInfo.university}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">GWA</span>
          <p className="font-medium text-gray-800">{user.academicInfo.gwa}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Expected Graduation</span>
          <p className="font-medium text-gray-800">{formatDateLong(user.academicInfo.expectedGraduation)}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="text-xs sm:text-sm text-emerald-600 block mb-1">Total Funding Received</span>
          <p className="font-medium text-emerald-700">{formatCurrency(user.stats.totalFunding)}</p>
        </div>
      </div>
    </div>
  );

  const renderSponsorInfo = () => (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🏢 Organization Information
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Company</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.companyName}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Industry</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.industry}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Company Size</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.companySize}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Established</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.established}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="text-xs sm:text-sm text-emerald-600 block mb-1">Total Donated</span>
          <p className="font-medium text-emerald-700">{formatCurrency(user.sponsorInfo.totalDonated)}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
          <span className="text-xs sm:text-sm text-blue-600 block mb-1">Students Supported</span>
          <p className="font-medium text-blue-700">{user.sponsorInfo.studentsSupported}</p>
        </div>
      </div>
      
      <div>
        <span className="text-xs sm:text-sm text-gray-600 block mb-2">Focus Areas</span>
        <div className="flex flex-wrap gap-2">
          {user.sponsorInfo.focusAreas.map((area, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

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

  const renderPosts = () => (
    <div className="space-y-6">
      {posts.map((post) => (
        <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          {/* Post Header */}
          <div className="p-4 sm:p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  {user.profilePicture ? (
                    <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {user.fullName.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                    {user.isVerified && (
                      <span className="bg-blue-500 text-white p-1 rounded-full">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      user.userType === 'student' 
                        ? 'bg-blue-50 text-blue-700' 
                        : 'bg-orange-50 text-orange-700'
                    }`}>
                      {user.userType === 'student' ? '🎓 Student' : '🏢 Sponsor'}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>@{user.username}</span>
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
          </div>

          {/* Image Section */}
          {post.images && post.images.length > 0 ? (
            <div className="relative">
              <img
                src={post.images[0].url}
                alt="Post content"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
          ) : post.isFundingEnabled ? (
            <div className="mx-4 sm:mx-6 mb-4 h-32 bg-gradient-to-r from-emerald-50 to-blue-50 border border-emerald-200 rounded-xl flex items-center justify-center text-emerald-700">
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
          <div className="p-4 sm:p-6 pt-4 border-t border-gray-50">
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
                  <span className="text-sm font-medium hidden sm:inline">Share</span>
                </button>
                
                <button className="flex items-center space-x-2 text-gray-500 hover:text-yellow-500 transition-colors group">
                  <FaBookmark className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium hidden sm:inline">Save</span>
                </button>
              </div>
              
              <div className="text-xs text-gray-400">
                {new Date(post.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </div>
            </div>
            
            {/* Comments Section */}
            {(post.comments && post.comments.length > 0) || expandedComments[post._id] ? (
              renderComments(post)
            ) : null}
          </div>
        </article>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="md:ml-64">
          <div className="h-16 md:h-0" />
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#8A1A1C] mx-auto mb-4"></div>
              <p className="text-gray-600 font-medium">Loading profile...</p>
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
        <div className="bg-white border-b border-gray-200 top-[52px] md:top-0 z-30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Profile</h1>
                <p className="text-gray-600 mt-1 text-sm sm:text-base">Manage your account and showcase your journey</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {/* Profile Header */}
          {renderProfileHeader()}
          
          {/* Academic/Company Info */}
          <div className="mt-6">
            {user.userType === 'student' && user.academicInfo && renderStudentInfo()}
            {/* Removed sponsor info card here */}
            {/* {user.userType === 'sponsor' && user.sponsorInfo && renderSponsorInfo()} */}
          </div>
          
          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-1 sm:space-x-8 overflow-x-auto">
                {[
                  { id: 'posts', name: 'Posts', icon: '📝' },
                  { id: 'activity', name: 'Activity', icon: '📊' },
                  { id: 'achievements', name: 'Achievements', icon: '🏆' }
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
          </div>
          
          {/* Tab Content */}
          <div className="mt-6">
            {activeTab === 'posts' && renderPosts()}
            {activeTab === 'activity' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <span className="text-4xl mb-4 block">📊</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Activity Timeline</h3>
                <p className="text-gray-600">Recent activities and interactions will appear here.</p>
              </div>
            )}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
                <span className="text-4xl mb-4 block">🏆</span>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Achievements & Milestones</h3>
                <p className="text-gray-600">Academic achievements and recognition will be displayed here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default Profile;