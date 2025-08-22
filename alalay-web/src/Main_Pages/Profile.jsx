import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";

function Profile() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('posts');
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample user data - in real app this would come from API/database
  const sampleUserData = {
    "_id": "689889e827f976dd2c673d4c",
    "username": "maria_santos",
    "email": "maria.santos@student.bpi.edu",
    "fullName": "Maria Santos",
    "userType": "student", // or "sponsor"
    "profilePicture": null,
    "bio": "Computer Science student at BPI University. Passionate about AI and machine learning. Looking for opportunities to advance my education and contribute to innovative technology solutions.",
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
      "gpa": "3.8",
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
    "bio": "Leading technology company in the Philippines. We believe in investing in the next generation of Filipino innovators and tech leaders. Supporting students in STEM fields.",
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
        },
        {
          "_id": "c4",
          "user": {
            "_id": "user4",
            "fullName": "Tech Mentor",
            "profileImage": null,
            "isAnonymous": false
          },
          "text": "ML algorithms can be challenging at first, but you've got this!",
          "donation": {
            "amount": 500,
            "isAnonymous": false
          },
          "createdAt": "2025-01-22T13:30:00.000Z"
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
        },
        {
          "_id": "c6",
          "user": {
            "_id": "user7",
            "fullName": "Anonymous",
            "profileImage": null,
            "isAnonymous": true
          },
          "text": "Healthcare AI is the future. Best of luck!",
          "donation": {
            "amount": 3000,
            "isAnonymous": true
          },
          "createdAt": "2025-01-20T16:30:00.000Z"
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

  const renderProfileHeader = () => (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Cover Photo */}
      <div className="h-48 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] relative">
        <div className="absolute bottom-4 left-6 flex items-end space-x-4">
          {/* Profile Picture */}
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
            {user.profilePicture ? (
              <img src={user.profilePicture} alt="Profile" className="w-full h-full rounded-full object-cover" />
            ) : (
              <div className="w-full h-full rounded-full bg-gray-300 flex items-center justify-center">
                <span className="text-2xl font-bold text-gray-600">
                  {user.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
            )}
          </div>
          
          {/* Basic Info */}
          <div className="text-white mb-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold">{user.fullName}</h1>
              {user.isVerified && (
                <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  ✓ Verified
                </span>
              )}
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.userType === 'student' 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-orange-500 text-white'
              }`}>
                {user.userType === 'student' ? '🎓 Student' : '🏢 Sponsor'}
              </span>
            </div>
            <p className="text-white/80">@{user.username}</p>
            <p className="text-white/70 text-sm flex items-center">
              📍 {user.location}
            </p>
          </div>
        </div>
        
        {/* Edit Profile Button */}
        <div className="absolute bottom-4 right-6">
          <button 
            onClick={() => navigate('/settings')}
            className="bg-[#D5B527] hover:bg-[#bfa021] text-white px-4 py-2 rounded-lg transition-colors duration-200"
          >
            Edit Profile
          </button>
        </div>
      </div>
      
      {/* Profile Info */}
      <div className="p-6">
        <div className="mb-4">
          <p className="text-gray-700 leading-relaxed">{user.bio}</p>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.stats.totalPosts}</div>
            <div className="text-sm text-gray-600">Posts</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.stats.followers}</div>
            <div className="text-sm text-gray-600">Followers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">{user.stats.following}</div>
            <div className="text-sm text-gray-600">Following</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-800">
              {user.userType === 'student' ? user.stats.scholarshipsReceived : user.stats.sponsorships}
            </div>
            <div className="text-sm text-gray-600">
              {user.userType === 'student' ? 'Scholarships' : 'Sponsored'}
            </div>
          </div>
        </div>
        
        {/* Additional Info */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>📅 Joined {formatDate(user.joinedDate)}</div>
            {user.privacy.showContactInfo && (
              <>
                <div>📧 {user.email}</div>
                <div>📱 {user.phone}</div>
              </>
            )}
            {user.userType === 'student' && user.academicInfo && (
              <div>🎓 {user.academicInfo.university}</div>
            )}
            {user.userType === 'sponsor' && user.sponsorInfo && (
              <div>🌐 {user.sponsorInfo.website}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStudentInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🎓 Academic Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">Field of Study</span>
          <p className="font-medium text-gray-800">{user.academicInfo.fieldOfStudy}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Academic Level</span>
          <p className="font-medium text-gray-800">{user.academicInfo.level} - {user.academicInfo.year}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">University</span>
          <p className="font-medium text-gray-800">{user.academicInfo.university}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">GPA</span>
          <p className="font-medium text-gray-800">{user.academicInfo.gpa}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Expected Graduation</span>
          <p className="font-medium text-gray-800">{formatDate(user.academicInfo.expectedGraduation)}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Total Funding Received</span>
          <p className="font-medium text-green-600">{formatCurrency(user.stats.totalFunding)}</p>
        </div>
      </div>
    </div>
  );

  const renderSponsorInfo = () => (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
        🏢 Organization Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <span className="text-sm text-gray-600">Company</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.companyName}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Industry</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.industry}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Company Size</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.companySize}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Established</span>
          <p className="font-medium text-gray-800">{user.sponsorInfo.established}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Total Donated</span>
          <p className="font-medium text-green-600">{formatCurrency(user.sponsorInfo.totalDonated)}</p>
        </div>
        <div>
          <span className="text-sm text-gray-600">Students Supported</span>
          <p className="font-medium text-blue-600">{user.sponsorInfo.studentsSupported}</p>
        </div>
      </div>
      
      <div className="mt-4">
        <span className="text-sm text-gray-600">Focus Areas</span>
        <div className="flex flex-wrap gap-2 mt-2">
          {user.sponsorInfo.focusAreas.map((area, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const [expandedComments, setExpandedComments] = useState({});
  const [newComment, setNewComment] = useState({});

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post._id === postId 
        ? {
            ...post,
            likes: post.likes.includes(user._id)
              ? post.likes.filter(id => id !== user._id) // unlike
              : [...post.likes, user._id] // like
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

  const renderComments = (post) => {
    const comments = post.comments || [];
    const showExpanded = expandedComments[post._id];
    const displayComments = showExpanded ? comments : comments.slice(0, 3);
    const hasMoreComments = comments.length > 3;

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
            {showExpanded ? 'Show less' : `Show ${comments.length - 3} more comments`}
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
                  <span className="text-sm font-medium text-gray-600">
                    {user.fullName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <p className="font-semibold text-gray-800">{user.fullName}</p>
                  <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
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
          ) : (
            <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400 text-sm">
              [ No Image ]
            </div>
          )}
          
          {/* Action Bar */}
          <div className="p-6 border-t bg-gray-50">
            <div className="flex items-center justify-between">
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
                
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
                  </svg>
                  <span className="text-sm font-medium">{post.comments.length}</span>
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
            {post.comments && post.comments.length > 0 && (
              <div className="px-6 pb-4">
                {renderComments(post)}
              </div>
            )}
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
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-64 p-8">
        <div className="max-w-4xl mx-auto">
          {/* Profile Header */}
          {renderProfileHeader()}
          
          {/* Academic/Company Info */}
          <div className="mt-6">
            {user.userType === 'student' && user.academicInfo && renderStudentInfo()}
            {user.userType === 'sponsor' && user.sponsorInfo && renderSponsorInfo()}
          </div>
          
          {/* Tab Navigation */}
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8">
                {[
                  { id: 'posts', name: 'Posts', icon: '📝' },
                  { id: 'activity', name: 'Activity', icon: '📊' },
                  { id: 'achievements', name: 'Achievements', icon: '🏆' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
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
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <span className="text-4xl">📊</span>
                <h3 className="text-lg font-medium text-gray-800 mt-4">Activity Timeline</h3>
                <p className="text-gray-600">Recent activities and interactions will appear here.</p>
              </div>
            )}
            {activeTab === 'achievements' && (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <span className="text-4xl">🏆</span>
                <h3 className="text-lg font-medium text-gray-800 mt-4">Achievements & Milestones</h3>
                <p className="text-gray-600">Academic achievements and recognition will be displayed here.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;