import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaUserCircle, FaArrowLeft, FaMapMarkerAlt, FaCalendarAlt, FaCheck, FaHeart, FaComment, FaBookmark, FaEllipsisV, FaShare } from "react-icons/fa";
import Sidebar from "../_components/Sidebar";

function SponsorProfile() {
  const { sponsorId } = useParams();
  const navigate = useNavigate();

  const [sponsorProfile, setSponsorProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error] = useState(null);

  // Dummy sponsors list
  const sampleSponsors = [
    {
      _id: "tech_corp_ph",
      fullName: "TechCorp Philippines",
      username: "tech_corp_ph",
      profileImage: null,
      isVerified: true,
      bio: "Leading technology company in the Philippines. We believe in investing in the next generation of Filipino innovators and tech leaders. Supporting students in STEM fields since 2010. 🇵🇭",
      location: "Makati City, Metro Manila, PH",
      joinedDate: "2024-10-01T09:00:00.000Z",
      companyName: "TechCorp Philippines",
      industry: "Information Technology",
      companySize: "500-1000 employees",
      website: "https://techcorp.ph",
      established: "2010",
      focusAreas: ["STEM", "Computer Science", "Engineering"],
      totalDonated: 250000,
      studentsSupported: 15,
      followers: 128,
      following: 67,
      sponsorships: 15,
      posts: 2,
    },
    // ...add more sponsors as needed...
  ];

  // Dummy sponsor posts (simulate what you have in Profile.jsx)
  const sampleSponsorPosts = [
    {
      _id: "spost1",
      author: {
        _id: "tech_corp_ph",
        fullName: "TechCorp Philippines",
        username: "tech_corp_ph",
        userType: "sponsor",
        profilePicture: null,
        isVerified: true,
      },
      description: "We're proud to announce our new scholarship program for STEM students! Applications are now open for the 2025 academic year. We believe in investing in the future of Filipino innovation. 🇵🇭✨",
      visibility: "public",
      createdAt: "2025-01-19T09:30:00.000Z",
      images: [
        {
          url: "https://via.placeholder.com/600x400.png?text=Scholarship+Program+2025"
        }
      ],
      tags: ["scholarship", "stem", "opportunity"],
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
    },
    {
      _id: "spost2",
      author: {
        _id: "tech_corp_ph",
        fullName: "TechCorp Philippines",
        username: "tech_corp_ph",
        userType: "sponsor",
        profilePicture: null,
        isVerified: true,
      },
      description: "Congratulations to all our sponsored scholars for their outstanding achievements this year! 🎉",
      visibility: "public",
      createdAt: "2025-01-10T10:00:00.000Z",
      images: [],
      tags: ["scholars", "achievement", "support"],
      isFundingEnabled: false,
      isActive: true,
      likes: ["user10", "user11"],
      comments: [],
    }
  ];

  useEffect(() => {
    const sponsor = sampleSponsors.find((s) => s._id === sponsorId);
    setTimeout(() => {
      setSponsorProfile(sponsor || sampleSponsors[0]);
      setLoading(false);
    }, 600);
  }, [sponsorId]);

  // --- Follow state and handler with animation ---
  const [isFollowed, setIsFollowed] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [plusOne, setPlusOne] = useState(false);
  const plusOneTimeout = useRef(null);

  useEffect(() => {
    if (sponsorProfile) {
      setFollowerCount(sponsorProfile.followers || 0);
      setIsFollowed(false); // reset follow state on profile change
      setPlusOne(false);
      if (plusOneTimeout.current) clearTimeout(plusOneTimeout.current);
    }
  }, [sponsorProfile]);

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

  const handleBack = () => navigate("/scholars");

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

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-PH', {
      style: 'currency',
      currency: 'PHP'
    }).format(amount);
  };

  // --- Sponsor Posts ---
  const renderSponsorPosts = () => (
    <div className="space-y-6">
      {sampleSponsorPosts.map((post) => (
        <article key={post._id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-200">
          <div className="p-4 sm:p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-gray-300 to-gray-400 rounded-full flex items-center justify-center">
                  {sponsorProfile.profileImage ? (
                    <img src={sponsorProfile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span className="text-sm font-semibold text-white">
                      {sponsorProfile.fullName.split(' ').map(n => n[0]).join('')}
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h3 className="font-semibold text-gray-800">{sponsorProfile.fullName}</h3>
                    {sponsorProfile.isVerified && (
                      <span className="bg-blue-500 text-white p-1 rounded-full">
                        <FaCheck size={12} />
                      </span>
                    )}
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700">
                      🏢 Sponsor
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>@{sponsorProfile.username}</span>
                    <span>•</span>
                    <span>{formatDate(post.createdAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <span
                  className="px-3 py-1 text-xs rounded-full font-medium border bg-green-50 text-green-700 border-green-200"
                >
                  🌍 Public
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
          {post.images && post.images.length > 0 && (
            <div className="relative">
              <img
                src={post.images[0].url}
                alt="Post content"
                className="w-full h-60 sm:h-80 object-cover"
              />
            </div>
          )}
          <div className="p-4 sm:p-6 pt-4 border-t border-gray-50">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-6">
                <button className="flex items-center space-x-2 text-gray-500 hover:text-red-500 transition-colors group">
                  <FaHeart className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">{post.likes.length}</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-500 hover:text-blue-500 transition-colors group">
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
                {new Date(post.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
            {/* Comments Section */}
            {post.comments && post.comments.length > 0 && (
              <div className="mt-4 space-y-3">
                {post.comments.map((comment) => (
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
              </div>
            )}
          </div>
        </article>
      ))}
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
          <p className="font-medium text-gray-800">{sponsorProfile.companyName}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Industry</span>
          <p className="font-medium text-gray-800">{sponsorProfile.industry}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Company Size</span>
          <p className="font-medium text-gray-800">{sponsorProfile.companySize}</p>
        </div>
        <div className="p-3 bg-gray-50 rounded-xl">
          <span className="text-xs sm:text-sm text-gray-600 block mb-1">Established</span>
          <p className="font-medium text-gray-800">{sponsorProfile.established}</p>
        </div>
        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200">
          <span className="text-xs sm:text-sm text-emerald-600 block mb-1">Total Donated</span>
          <p className="font-medium text-emerald-700">{formatCurrency(sponsorProfile.totalDonated)}</p>
        </div>
        <div className="p-3 bg-blue-50 rounded-xl border border-blue-200">
          <span className="text-xs sm:text-sm text-blue-600 block mb-1">Students Supported</span>
          <p className="font-medium text-blue-700">{sponsorProfile.studentsSupported}</p>
        </div>
      </div>
      <div>
        <span className="text-xs sm:text-sm text-gray-600 block mb-2">Focus Areas</span>
        <div className="flex flex-wrap gap-2">
          {sponsorProfile.focusAreas.map((area, index) => (
            <span key={index} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-200">
              {area}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4">
        <span className="text-xs sm:text-sm text-gray-600 block mb-1">Website</span>
        <a href={sponsorProfile.website} target="_blank" rel="noopener noreferrer" className="text-[#8A1A1C] hover:underline">
          {sponsorProfile.website}
        </a>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="md:ml-64">
        {/* Mobile header spacing */}
        <div className="h-16 md:h-0" />

        {/* Header Section */}
        <div className="bg-white border-b border-gray-200 sticky top-[52px] md:top-0 z-30">
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
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900">Sponsor Profile</h1>
                  <p className="text-gray-600 mt-1 text-sm sm:text-base hidden sm:block">View sponsor organization details</p>
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
                <p className="text-gray-600 font-medium">Loading sponsor profile...</p>
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

          {/* Sponsor Profile */}
          {!loading && !error && sponsorProfile && (
            <div className="space-y-6">
              {/* Profile Header */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Cover Photo */}
                <div className="h-32 sm:h-48 bg-gradient-to-r from-[#8A1A1C] to-[#5C1213] relative">
                  {/* Profile Picture */}
                  <div className="absolute -bottom-12 left-4 sm:left-6">
                    <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                      {sponsorProfile.profileImage ? (
                        <img src={sponsorProfile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
                      ) : (
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
                          <span className="text-lg sm:text-2xl font-bold text-white">
                            {sponsorProfile.fullName.split(' ').map(n => n[0]).join('')}
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
                  <div className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center flex-wrap gap-2 mb-2">
                          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{sponsorProfile.fullName}</h1>
                          {sponsorProfile.isVerified && (
                            <span className="bg-blue-500 text-white p-1 rounded-full">
                              <FaCheck size={12} />
                            </span>
                          )}
                          <span className="bg-orange-50 text-orange-700 px-2 py-1 rounded-full text-xs font-medium border border-orange-200">
                            🏢 Sponsor
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600 mb-3">
                          <span>@{sponsorProfile.username}</span>
                          <div className="flex items-center space-x-1">
                            <FaMapMarkerAlt size={12} />
                            <span>{sponsorProfile.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <FaCalendarAlt size={12} />
                            <span>Joined {formatDateLong(sponsorProfile.joinedDate)}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 leading-relaxed text-sm sm:text-base">{sponsorProfile.bio}</p>
                      </div>
                    </div>
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{sponsorProfile.posts}</div>
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
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{sponsorProfile.following}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Following</div>
                      </div>
                      <div className="text-center p-3 bg-gray-50 rounded-xl">
                        <div className="text-xl sm:text-2xl font-bold text-[#8A1A1C]">{sponsorProfile.sponsorships}</div>
                        <div className="text-xs sm:text-sm text-gray-600">Sponsored</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Organization Info */}
              {renderSponsorInfo()}

              {/* Sponsor Posts */}
              <div>
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 flex items-center mt-8">
                  📝 Sponsor Posts
                </h2>
                {renderSponsorPosts()}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default SponsorProfile;
