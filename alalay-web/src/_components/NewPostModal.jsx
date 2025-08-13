import React, { useState } from "react";

function NewPostModal({ isOpen, onClose, onSubmit }) {
  const [caption, setCaption] = useState("");
  const [audience, setAudience] = useState("public");
  const [photo, setPhoto] = useState(null); // Placeholder for upload

  const currentUser = "Mark Josh Rodriguez"; // Replace with actual logged-in username

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      caption,
      audience,
      photo,
    });
    setCaption("");
    setAudience("public");
    setPhoto(null);
    onClose();
  };

  const handlePhotoUpload = () => {
    // Placeholder action for now
    alert("Photo upload feature coming soon!");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      {/* Modal container */}
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        {/* Close button */}
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Title */}
        <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>

        {/* Username + Audience Dropdown */}
        <div className="flex items-center gap-3 mt-2 mb-4">
          <span className="font-medium text-gray-700">{currentUser}</span>
          <select
            value={audience}
            onChange={(e) => setAudience(e.target.value)}
            className="border border-gray-300 rounded-md p-1 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="public">Public</option>
            <option value="sponsors">Sponsors Only</option>
          </select>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Caption */}
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-28 overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

          {/* Upload Photo */}
          <button
            type="button"
            onClick={handlePhotoUpload}
            className="w-full border border-gray-300 rounded-md py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          >
            Upload Photo
          </button>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-[#D5B527] text-white font-medium py-2 px-4 rounded-md hover:opacity-90 transition"
          >
            Post
          </button>
        </form>
      </div>
    </div>
  );
}

export default NewPostModal;
