import { FaHeart, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../_actions/user.actions";
// import { getUserFeed } from "../_actions/feed.actions";
import Sidebar from "../_components/Sidebar";
import NewPostModal from "../_components/NewPostModal";
// import PaymentError from "../_components/PaymentFailure";

// const API = "http://localhost:3000";

function Feed() {
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const { posts, loading, error, totalPages, currentPage } = useSelector(
  //   (state) => state.feed
  // );
  // const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Dummy logged-in user
  const user = {
    _id: "12345",
    scholarInfo: {
      firstName: "Zandro",
      lastName: "Sedillo",
      profileImage: "/default-avatar.png",
    },
  };

  // Dummy JSON posts
  const [posts, setPosts] = useState([
    {
      _id: "p1",
      author: {
        scholarInfo: {
          firstName: "Maria",
          lastName: "Santos",
          profileImage: "/default-avatar.png",
        },
      },
      description: "Excited to start the new semester!",
      visibility: "public",
      createdAt: new Date().toISOString(),
      images: [],
      likes: [],
    },
    {
      _id: "p2",
      author: {
        scholarInfo: {
          firstName: "Juan",
          lastName: "Cruz",
          profileImage: "/default-avatar.png",
        },
      },
      description: "Thanks to my sponsor, I was able to buy new books 📚",
      visibility: "sponsor",
      createdAt: new Date().toISOString(),
      images: [
        {
          url: "https://via.placeholder.com/400x200.png?text=Sample+Image",
        },
      ],
      likes: [{ user: { _id: "12345" } }],
    },
  ]);

  // Pagination placeholders
  const totalPages = 1;
  const currentPage = 1;

  // useEffect(() => {
  //   dispatch(getUserFeed(1));
  // }, [dispatch]);

  const handleLike = (postId) => {
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              likes: post.likes.some((like) => like.user._id === user._id)
                ? post.likes.filter((like) => like.user._id !== user._id) // unlike
                : [...post.likes, { user: { _id: user._id } }], // like
            }
          : post
      )
    );
  };

  const handleLogout = () => {
    // await dispatch(logout());
    // navigate("/Login"); // Disabled redirect for now
  };

  const handleNewPost = ({ description, visibility }) => {
    const newPost = {
      _id: Date.now().toString(),
      author: user,
      description,
      visibility,
      createdAt: new Date().toISOString(),
      images: [],
      likes: [],
    };

    setPosts((prev) => [newPost, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-[#F8F9FA] bg-opacity-95 relative min-h-screen">
      <Sidebar />

      <div className="ml-64 h-screen flex flex-col">
        <header className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
          >
            Logout
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 py-6">
          {/* {loading && <p className="text-gray-500">Loading feed...</p>}
          {error && <p className="text-red-500">{error}</p>} */}

          <div className="w-full max-w-md mx-auto space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    <img
                      src={
                        post.author?.scholarInfo?.profileImage ||
                        "/default-avatar.png"
                      }
                      alt="author"
                      className="w-10 h-10 rounded-full object-cover bg-gray-300"
                    />
                    <div>
                      <span className="font-semibold text-gray-700 block">
                        {post.author?.scholarInfo?.firstName}{" "}
                        {post.author?.scholarInfo?.lastName}
                      </span>
                      <span className="text-gray-500 text-sm">
                        {new Date(post.createdAt).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      post.visibility === "public"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                    }`}
                  >
                    {post.visibility === "public"
                      ? "Public"
                      : "Sponsors Only"}
                  </span>
                </div>

                <p className="text-gray-700 mb-3">{post.description}</p>

                {post.images && post.images.length > 0 ? (
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img
                      src={post.images[0].url}
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-3">
                    [ No Image ]
                  </div>
                )}

                {/* Like Button */}
                <button
                  onClick={() => handleLike(post._id)}
                  className={`flex items-center space-x-1 transition ${
                    post.likes?.some((like) => like.user._id === user._id)
                      ? "text-red-500"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  <FaHeart />
                  <span>{post.likes?.length || 0}</span>
                </button>
              </div>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  // onClick={() => dispatch(getUserFeed(idx + 1))}
                  className={`px-3 py-1 rounded ${
                    currentPage === idx + 1
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          )}
        </main>
      </div>

      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#D5B527] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition"
      >
        <FaPlus size={20} />
      </button>

      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={handleNewPost}
      />
    </div>
  );
}

export default Feed;
