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
import UserCabinetCategoryUpdate from "./components/user-cabinet/user-cabinet-info/components/user-cabinet-category/components/user-cabinet-category-update/UserCabinetCategoryUpdate";
import UserCabinetNewsUpdate from "./components/user-cabinet/user-cabinet-info/components/user-cabinet-news/components/user-cabinet-news-update/UserCabinetNewsUpdate";
import UserCabinetProductsUpdate
  from "./components/user-cabinet/user-cabinet-info/components/user-cabinet-products/components/user-cabinet-products-update/UserCabinetCategoryUpdate.tsx";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [editingSiteId, setEditingSiteId] = useState<number | null>(null);

  const handleLogin = (): void => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsLoggedIn(true);
    }
  };

  // const handleEditSite = (siteId: number): void => {
  //   setEditingSiteId(siteId);
  // };

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
                    <Login  setIsLoggedIn={setIsLoggedIn} />
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
                        // onEditSite={handleEditSite}
                        setIsLoggedIn={setIsLoggedIn}
                    />
                ) : (
                    <Navigate to="/login" />
                )
              }
          />

          <Route path="/site/:id" element={isLoggedIn ? <SiteConstructor /> : <Navigate to="/login" />} />
          <Route path="/:siteName" element={<UserSite />} />
          <Route
              path="/category-update/:id"
              element={<UserCabinetCategoryUpdate />}
          />
          <Route path="/new-update/:id" element={<UserCabinetNewsUpdate />} />
          <Route
              path="/product-update/:id"
              element={<UserCabinetProductsUpdate />}
          />

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