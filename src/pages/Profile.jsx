import { useState } from "react";
import { updateProfile } from "../lib/api/auth";
import { useNavigate } from "react-router-dom";

const Profile = ({ user, setUser }) => {
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
    <div>
      <h2>Edit Profile</h2>
      <div>
        <label htmlFor="nickname">Nickname</label>
        <input
          type="text"
          placeholder="Nickname"
          minLength="1"
          maxLength="10"
          onChange={(e) => setNickname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="avatar">Avatar</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
        />
      </div>
      <button onClick={handleUpdateProfile}>Update Profile</button>
    </div>
  );
};

export default Profile;
