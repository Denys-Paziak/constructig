import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import UserSites from "./components/user-cabinet/UserSites";
import SiteConstructor from "./components/SiteConstructor";
import UserSite from "./components/user-site/UserSite";
import { ToastContainer } from "react-toastify";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [editingSiteId, setEditingSiteId] = useState<number | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleEditSite = (siteId: number) => {
    setEditingSiteId(siteId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/sites" />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <UserSites onEditSite={handleEditSite} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/site/:id"
          element={isLoggedIn ? <SiteConstructor /> : <Navigate to="/login" />}
        />
        <Route path="/:siteName" element={<UserSite />} />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/sites" : "/login"} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
