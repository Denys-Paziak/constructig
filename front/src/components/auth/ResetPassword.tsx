import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {useParams} from "react-router-dom";
import {reset} from "../../services/auth/reset/reset.ts";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmNewPassword, setConfirmNewPassword] = useState<string>("");
  const { key, email } = useParams<{key: string, email: string}>();

  const token = localStorage.getItem("token");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword.length === 0 && confirmNewPassword.length === 0) {
      notifyError("Password cannot be empty");
      return;
    }

    const formData = new FormData();
    formData.append("newPassword", newPassword);
    formData.append("confirmNewPassword", confirmNewPassword);

    formData.append("email", email);
    formData.append("key", key);

    try {
        const data: any = await reset( formData);
        console.log(data);

        if (data.status === 200) {
          notifySuccess("Reset password successful!");
        }else {
          notifySuccess("Reset password error!");
        }

    } catch (error) {
      notifyError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center shape_bg px-4 md:px-4">
      <div className="bg-white py-12 px-6 md:px-8 rounded-lg shadow-lg max-w-md w-full flex items-center flex-col gap-6">
        <div className="flex items-center flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Reset your password
          </h2>
          <p className="text-sm text-black font-normal text-center">
            Please enter your new password and confirm password to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label
              htmlFor="newPassword"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="confirmNewPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm New Password
            </label>
            <input
              id="confirmNewPassword"
              type="password"
              placeholder="Confirm New Password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Reset password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
