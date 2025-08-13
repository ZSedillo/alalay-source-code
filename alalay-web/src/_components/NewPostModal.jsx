import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createPost } from "../_actions/post.actions";

function NewPostModal({ isOpen, onClose }) {
  const [caption, setCaption] = useState("");
  const [audience, setAudience] = useState("public");
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState(null);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // Log user ID whenever the component renders or user changes
  useEffect(() => {
    if (user) {
      console.log("Current User ID:", user._id);
    }
  }, [user]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log user ID when submitting the form
    console.log("Submitting post for User ID:", user._id);

    const formData = new FormData();
    formData.append("description", caption);
    formData.append("visibility", audience);
    
    // Add user ID to form data if needed for debugging
    if (user._id) {
      formData.append("userId", user._id);
    }
    
    if (photo) formData.append("images", photo);

    dispatch(createPost(formData, user?.token)); // Redux action

    setCaption("");
    setAudience("public");
    setPhoto(null);
    setPreview(null);
    onClose();
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 relative">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
          onClick={onClose}
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold text-gray-800">Create New Post</h2>

        <div className="flex items-center gap-3 mt-2 mb-4">
          <span className="font-medium text-gray-700">
            {user?.scholarInfo?.firstName} {user?.scholarInfo?.lastName}
          </span>
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
          <textarea
            className="w-full border border-gray-300 rounded-md p-2 h-28 overflow-y-auto resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="w-full border border-gray-300 rounded-md py-2 px-2 bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
          />

          {preview && (
            <div className="mt-2">
              <img src={preview} alt="Preview" className="rounded-md max-h-48 object-cover" />
            </div>
          )}

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