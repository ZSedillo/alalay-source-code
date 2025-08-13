import { FaHeart, FaPlus } from "react-icons/fa";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../_actions/user.actions";
import { getUserFeed } from "../_actions/feed.actions";
import Sidebar from "../_components/Sidebar";
import NewPostModal from "../_components/NewPostModal";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux state
  const { posts, loading, error, totalPages, currentPage } = useSelector(
    (state) => state.feed
  );

  const { user } = useSelector((state) => state.user);

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Load feed on mount
  useEffect(() => {
    dispatch(getUserFeed(1)); // no limit param → all posts
  }, [dispatch]);

  const handleLike = (postId) => {
    // TODO: Call backend /posts/like/:id
    console.log("Like clicked for post", postId);
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  const handleNewPost = (description) => {
    // TODO: Call backend /posts/create
    console.log("New post description:", description);
  };

  return (
    <div className="bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 h-screen flex flex-col">
        {/* Heading */}
        <header className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:opacity-90"
          >
            Logout
          </button>
        </header>

        {/* Scrollable posts */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          {loading && <p className="text-gray-500">Loading feed...</p>}
          {error && <p className="text-red-500">{error}</p>}

          <div className="w-full max-w-md mx-auto space-y-6">
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-xl shadow-md">
                {/* Top bar with avatar, username, timestamp, audience tag */}
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

                {/* Post description */}
                <p className="text-gray-700 mb-3">{post.description}</p>

                {/* Images */}
                {post.images && post.images.length > 0 ? (
                  <div className="w-full h-48 bg-gray-200 rounded-lg overflow-hidden mb-3">
                    <img
                      src={post.images[0]}
                      alt="post"
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-3">
                    [ No Image ]
                  </div>
                )}

                {/* Like button */}
                <button
                  onClick={() => handleLike(post._id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition"
                >
                  <FaHeart /> <span>{post.likes?.length || 0}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-6">
              {Array.from({ length: totalPages }, (_, idx) => (
                <button
                  key={idx}
                  onClick={() => dispatch(getUserFeed(idx + 1))}
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

      {/* Floating Add Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-6 right-6 bg-[#D5B527] text-white p-4 rounded-full shadow-lg hover:opacity-90 transition"
      >
        <FaPlus size={20} />
      </button>

      {/* New Post Modal */}
      <NewPostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewPost}
      />
    </div>
  );
}

export default Feed;
