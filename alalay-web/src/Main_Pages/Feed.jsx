import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Feed() {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([
    { id: 1, user: "john_doe", content: "Had a great day exploring!", likes: 3 },
    { id: 2, user: "jane_smith", content: "Check out this awesome view!", likes: 7 },
    { id: 3, user: "marklee", content: "Loving the new cafe I found today ☕", likes: 5 },
  ]);

  const handleLike = (id) => {
    setPosts(
      posts.map((post) =>
        post.id === id ? { ...post, likes: post.likes + 1 } : post
      )
    );
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white p-6 shadow-lg hidden md:block">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-800">Your Profile</h2>
          <p className="text-gray-600 mt-2">
            Username: <span className="font-medium">you</span>
          </p>
          <p className="text-gray-600">Posts: 3</p>
          <p className="text-gray-600">Likes: 15</p>
        </div>
        <nav>
          <ul className="space-y-2">
            <li className="text-blue-600 font-semibold">📃 Feed</li>
            <li
              className="text-gray-600 hover:text-blue-600 cursor-pointer"
              onClick={() => navigate("/scholars")}
            >
              🎓 Our Scholars
            </li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer">⚙️ Settings</li>
            <li className="text-gray-600 hover:text-blue-600 cursor-pointer">🚪 Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Feed */}
      <main className="flex-1 flex justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Feed</h1>
          <div className="space-y-6">
            {posts.map((post) => (
              <div key={post.id} className="bg-white p-4 rounded-xl shadow-md">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-gray-700">@{post.user}</span>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-1 text-gray-500 hover:text-red-500 transition"
                  >
                    ❤️ <span>{post.likes}</span>
                  </button>
                </div>
                <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center text-gray-400 text-sm mb-3">
                  [ Image Placeholder ]
                </div>
                <p className="text-gray-700">{post.content}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Feed;
