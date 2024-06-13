import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Detail from "../pages/Detail";
import LogIn from "../pages/LogIn";
import Register from "../pages/Register";
import Profile from "../pages/Profile";
import Layout from "../components/Layout";

function Router({ user, setUser }) {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout user={user} setUser={setUser} />}>
          <Route index element={<Home user={user} />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route
            path="/profile"
            element={<Profile user={user} setUser={setUser} />}
          />
        </Route>
        <Route path="/login" element={<LogIn setUser={setUser} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
