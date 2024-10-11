import React, { useState, useEffect } from "react";
import { updateUserData } from "../../../../../services/auth/update-data/updateData";
import { IGetMe } from "../../../../../services/auth/getMe/getMe.interface";
import { getMe } from "../../../../../services/auth/getMe/getMe";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import LanguageSelectorAdmin from "../../../../LanguageSelectorAdmin";

interface Props {
  userData: IGetMe;
  setUserData: (response: any) => void;
  setSites: (response: any) => void;
  fetchData: () => void;
  getSites: () => void;
}

const UserCabinetPersonal: React.FC<Props> = ({
  userData,
  setUserData,
  fetchData,
  getSites,
}) => {
  const [username, setUsername] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [oldPassword, setOldPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const { t } = useTranslation();

  const notifySuccess = (message: string) => {
    toast.success(message, {
      autoClose: 1000,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      autoClose: 2000,
    });
  };

  useEffect(() => {
    if (userData) {
      setUsername(userData.name || "");
      setCompany(userData.company || "");
      setEmail(userData.email || "");
    }
  }, [userData]);

  const getUserData = async (token: string) => {
    try {
      if (token) {
        const response = await getMe(token);
        setUserData(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitChangeData = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("company", company);
    formData.append("email", email);

    try {
      if (token) {
        const data = await updateUserData(formData, token);

        if (data && data.data.token) {
          notifySuccess(data.data.message);
          localStorage.setItem("token", data.data.token);
          await getUserData(data.data.token);
          getSites();
        } else {
          notifyError("Something went wrong...");
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Something went wrong...");
    }
  };

  const handleSubmitChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("oldPassword", oldPassword);
    formData.append("newPassword", newPassword);
    formData.append("confirmPassword", confirmNewPassword);

    if (newPassword !== confirmNewPassword) {
      notifyError("Passwords do not match");
      return;
    }

    try {
      if (token) {
        const { status, data } = await updateUserData(formData, token);
        console.log(status);
        console.log(data);

        if (status === 200) {
          notifySuccess(data.message);
          console.log(data);
          localStorage.setItem("token", data.token);
          await getUserData(data.token);
          setOldPassword("");
          setNewPassword("");
          setConfirmNewPassword("");
        } else {
          notifyError("Something went wrong...");
        }
      }
    } catch (error) {
      console.error(error);
      notifyError("Something went wrong...");
    }
  };

  return (
    <>
      <div className="language-block flex flex-col gap-2 mt-4">
        {t("admin.adminInterface.adminInterfaceLanguageAdmin")}
        <LanguageSelectorAdmin />
      </div>
      <div className="w-full flex justify-between flex-col md:flex-row gap-6 mt-4">
        <form
          onSubmit={handleSubmitChangeData}
          className="w-[100%] md:w-[50%] flex flex-col gap-4"
        >
          <div className="w-full">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel1")}
            </label>
            <input
              id="username"
              type="text"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel1"
              )}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel2")}
            </label>
            <input
              id="company"
              type="text"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel2"
              )}
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel3")}
            </label>
            <input
              id="email"
              type="email"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel3"
              )}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsButtonData")}
          </button>
        </form>
        <form
          onSubmit={handleSubmitChangePassword}
          className="w-[100%] md:w-[50%] flex flex-col gap-4"
        >
          <div>
            <label
              htmlFor="oldpassword"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel4")}
            </label>
            <input
              id="oldpassword"
              type="password"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel4"
              )}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel5")}
            </label>
            <input
              id="password"
              type="password"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel5"
              )}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirm-password"
              className="block text-sm font-medium text-gray-700"
            >
              {t("admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel6")}
            </label>
            <input
              id="confirm-password"
              type="password"
              placeholder={t(
                "admin.adminInfo.adminInfoSettings.adminInfoSettingsLabel6"
              )}
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2.5 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block"
          >
            {t(
              "admin.adminInfo.adminInfoSettings.adminInfoSettingsButtonPassword"
            )}
          </button>
        </form>
      </div>
    </>
  );
};

export default UserCabinetPersonal;
