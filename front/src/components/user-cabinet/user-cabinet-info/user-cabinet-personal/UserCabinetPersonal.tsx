import React, { useState } from "react";
import { IGetMe } from "../../../../services/auth/getMe/getMe.interface";

interface Props {
  userData: IGetMe;
}

const UserCabinetPersonal: React.FC<Props> = ({ userData }) => {
  const [username, setUsername] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="w-full flex justify-between flex-col md:flex-row gap-6 mt-4">
      <form className="w-[100%] md:w-[50%] flex flex-col gap-4">
        <div className="w-full">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={userData.name}
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
            Company name
          </label>
          <input
            id="company"
            type="text"
            placeholder="Company"
            value={userData.company}
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
            Email address:
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email"
            value={userData.email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Оновити дані
        </button>
      </form>
      <form className="w-[100%] md:w-[50%] flex flex-col gap-4">
        <div>
          <label
            htmlFor="oldpassword"
            className="block text-sm font-medium text-gray-700"
          >
            Old password
          </label>
          <input
            id="oldpassword"
            type="password"
            placeholder="Old password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label
            htmlFor="confirm-password"
            className="block text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            id="confirm-password"
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-green-500 text-white rounded-md hover:bg-green-600 block"
        >
          Оновити пароль
        </button>
      </form>
    </div>
  );
};

export default UserCabinetPersonal;
