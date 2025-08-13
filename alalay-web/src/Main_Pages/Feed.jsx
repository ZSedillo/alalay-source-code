import { FaHeart, FaPlus, FaUserCircle } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../_actions/user.actions";
import Sidebar from "../_components/Sidebar";
import NewPostModal from "../_components/NewPostModal";

function Feed() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [posts, setPosts] = useState([
    {
      id: 1,
      user: "Luise Andrei Cardino",
      content: "Just graduated! Lets go batch 2025!",
      likes: 3,
      time: "August 5 at 11:55 am",
      audience: "public"
    },
    {
      id: 2,
      user: "Rodolfo Thirdy Aniceto",
      content: "Attending my first hackathon! 🥳",
      likes: 6,
      time: "August 23 at 12:15 am",
      audience: "public"
    },
    {
      id: 3,
      user: "Sofia Marie Pauline Caldit",
      content: "First day at OJT! Wish me luck guys 😭",
      likes: 7,
      time: "August 2 at 9:00 am",
      audience: "sponsors"
    },
    {
      id: 4,
      user: "Zandro Miguel Sedillo",
      content: "Studying with my matcha :>",
      likes: 5,
      time: "July 10 at 2:55 pm",
      audience: "public"
    },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  const handleLogout = async () => {
    await dispatch(logout());
    navigate("/Login");
  };

  const handleNewPost = (content) => {
    const newPost = {
      id: posts.length + 1,
      user: "Current User", // You can replace with logged-in user
      content,
      likes: 0,
      time: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      }),
    };
    setPosts([newPost, ...posts]);
  };

  return (
    <div className="bg-gray-100 relative">
      {/* Sidebar */}
      <Sidebar />

      {/* Content */}
      <div className="ml-64 h-screen flex flex-col">
        {/* Heading */}
        <header className="px-6 py-4">
          <h1 className="text-3xl font-bold text-gray-800">Feed</h1>
        </header>

        {/* Scrollable posts */}
        <main className="flex-1 overflow-y-auto px-6 py-6">
          <div className="w-full max-w-md mx-auto space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-xl shadow-md">
                {/* Top bar with avatar, username, timestamp, audience tag */}
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center space-x-3">
                    {/* Placeholder profile picture */}
                    <FaUserCircle className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm" />
                    <div>
                      <span className="font-semibold text-gray-700 block">{post.user}</span>
                      <span className="text-gray-500 text-sm">{post.time}</span>
                    </div>
                  </div>
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${post.audience === "public"
                        ? "bg-green-100 text-green-700"
                        : "bg-purple-100 text-purple-700"
                      }`}
                  >
                    {post.audience === "public" ? "Public" : "Sponsors Only"}
                  </span>
                </div>

                {/* Post content */}
                <p className="text-gray-700 mb-3">{post.content}</p>

                {/* Image placeholder */}
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-3">
                  [ Image Placeholder ]
                </div>

                {/* Like button */}
                <button
                  onClick={() => handleLike(post.id)}
                  className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition"
                >
                  <FaHeart /> <span>{post.likes}</span>
                </button>
              </div>
            ))}
          </div>
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
