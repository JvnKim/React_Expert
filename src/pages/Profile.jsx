import { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";
import useStore from "../zustand/store";

const Profile = () => {
  const { user, setUser } = useStore();
  const [nickname, setNickname] = useState("");
  const [avatar, setAvatar] = useState(null);
  const navigate = useNavigate();

  const handleUpdateProfile = async () => {
    const formData = new FormData();
    formData.append("nickname", nickname);
    formData.append("avatar", avatar);
    const response = await updateProfile(formData);

    if (response.success) {
      setUser({
        ...user,
        nickname: response.nickname,
        avatar: response.avatar,
      });
      navigate("/");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <div className="mb-4">
        <label
          htmlFor="nickname"
          className="block text-gray-700 font-bold mb-2"
        >
          Nickname
        </label>
        <input
          id="nickname"
          type="text"
          placeholder="Nickname"
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="avatar" className="block text-gray-700 font-bold mb-2">
          Avatar
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          className="w-full px-3 py-2 placeholder-gray-300 border rounded-md focus:outline-none focus:ring focus:ring-blue-200"
        />
      </div>
      <button
        onClick={handleUpdateProfile}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
      >
        Update Profile
      </button>
    </div>
  );
};

export default Profile;
