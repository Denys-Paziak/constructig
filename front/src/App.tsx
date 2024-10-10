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
import UserCabinetProductsUpdate from "./components/user-cabinet/user-cabinet-info/components/user-cabinet-products/components/user-cabinet-products-update/UserCabinetCategoryUpdate.tsx";
import ResetPassword from "./components/auth/ResetPassword.tsx";
import ResetPasswordSend from "./components/auth/ResetPasswordSend.tsx";
import NewsDisplay from "./components/NewsDisplay.tsx";
import Home from "./pages/home/Home.tsx";
import { useTranslation } from "react-i18next";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const [editingSiteId, setEditingSiteId] = useState<number | null>(null);
  const { i18n } = useTranslation();

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

  useEffect(() => {
    localStorage.setItem("language", i18n.language);
  }, [i18n.language]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            !isLoggedIn ? (
              <Login setIsLoggedIn={setIsLoggedIn} />
            ) : (
              <Navigate to="/profile" />
            )
          }
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/profile" />}
        />
        <Route path="/resetSend" element={<ResetPassword />} />
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

        <Route
          path="/site/:id"
          element={<SiteConstructor />}
        />

        <Route path="/:lang/:siteName/:company" element={<UserSite />} />
        <Route path="/:siteName/:company/news" element={<NewsDisplay />} />
        <Route
          path="/category-update/:id"
          element={<UserCabinetCategoryUpdate />}
        />
        <Route path="/new-update/:id" element={<UserCabinetNewsUpdate />} />
        <Route
          path="/product-update/:id"
          element={<UserCabinetProductsUpdate />}
        />

        <Route path="/reset" element={<ResetPasswordSend />} />

        <Route path="/reset/:key/:email" element={<ResetPassword />} />

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
