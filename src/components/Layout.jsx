import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";
import useStore from "../zustand/store";

export default function Layout() {
  const { user, setUser } = useStore();
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo().then((res) => {
      if (res) {
        setUser({
          userId: res.id,
          nickname: res.nickname,
          avatar: res.avatar,
        });
      } else {
        handleLogout();
      }
    });
  }, []);

  const handleLogout = () => {
    setUser(null);
    navigate("/login");
    localStorage.clear();
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="bg-gray-800 text-white p-4">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <Link to="/" className="text-white hover:text-gray-300">
              Home
            </Link>
            <Link to="/profile" className="text-white hover:text-gray-300">
              Profile
            </Link>
          </div>
          {user && (
            <div className="flex gap-4 items-center">
              <img
                src={user.avatar}
                alt="User Avatar"
                className="rounded-full h-8 w-8"
              />
              <div>{user.nickname}</div>
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                onClick={handleLogout}
              >
                Log Out
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex-grow p-4">
        <Outlet />
      </div>
    </div>
  );
}
