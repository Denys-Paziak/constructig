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
import AddSite from "./components/AddSite";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [editingSiteId, setEditingSiteId] = useState<number | null>(null);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

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
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} />
            ) : (
              <Navigate to="/sites" />
            )
          }
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/sites" />}
        />
        <Route
          path="/sites"
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
        <Route
          path="/add-site"
          element={isLoggedIn ? <AddSite /> : <Navigate to="/login" />}
        />
        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/sites" : "/login"} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
