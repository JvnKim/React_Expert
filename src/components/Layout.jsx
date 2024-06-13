import { Link, Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";

export default function Layout({ user, setUser }) {
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
    <>
      <div>
        navigation
        <div>
          <Link to="/">Home</Link>
          <Link to="/profile">Profile</Link>
        </div>
        <div>
          {user && (
            <>
              <div src={user.avatar} alt="User Avatar" />
              <div>{user.nickname}</div>
              <button onClick={handleLogout}>Log Out</button>
            </>
          )}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </>
  );
}
