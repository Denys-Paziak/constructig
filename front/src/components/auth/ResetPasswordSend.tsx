import React, { useState } from "react";
import { resetSend } from "../../services/auth/resetSend/resetSend.ts";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ResetPasswordSend = () => {
  const [email, setEmail] = useState<string>("");
  const navigate = useNavigate();

  const notifySuccess = (message: string) => {
    toast.success(message, {
      autoClose: 4000,
    });
  };

  const notifyError = (message: string) => {
    toast.error(message, {
      autoClose: 4000,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email", email);

    try {
      const data: any = await resetSend(formData);

      if (data.status === 200) {
        notifySuccess("The password reset email has been sent!");
        navigate("/login");
      } else {
        notifyError("Something went wrong, try again later!");
      }
    } catch (error) {
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
            Please enter your email address to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              New Password
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordSend;
