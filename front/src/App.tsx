import { useEffect, useState } from "react";
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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [editingSiteId, setEditingSiteId] = useState<number | null>(null);

  const handleLogin = () => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleEditSite = (siteId: number) => {
    setEditingSiteId(siteId);
  };

  useEffect(() => {
    handleLogin();
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login onLogin={handleLogin} setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/profile" />}
        />
        <Route
          path="/profile"
          element={
            isLoggedIn ? (
              <UserSites
                onEditSite={handleEditSite}
                setIsLoggedIn={setIsLoggedIn}
              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/site/:id"
          element={isLoggedIn && <SiteConstructor />}
        />

        <Route path="/:siteName" element={<UserSite />} />

        <Route
          path="*"
          element={<Navigate to={isLoggedIn ? "/profile" : "/login"} />}
        />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
