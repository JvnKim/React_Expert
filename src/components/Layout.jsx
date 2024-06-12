import { Outlet, useNavigate } from "react-router-dom";
import { getUserInfo } from "../lib/api/auth";
import { useEffect } from "react";

export default function Layout({ setUser }) {
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
        setUser(null);
        navigate("/login");
        localStorage.clear();
      }
    });
  }, []);
  return (
    <>
      <div>navigation</div>
      <Outlet />
    </>
  );
}
