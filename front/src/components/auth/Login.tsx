import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { login } from "../../services/server";

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await login(email, password);

    if (data.token) {
      localStorage.setItem("token", data.token);
      onLogin();
      navigate("/sites");
    } else {
      alert("Невірний логін або пароль");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center shape_bg px-4 md:px-4">
      <div className="bg-white py-12 px-6 md:px-8 rounded-lg shadow-lg max-w-md w-full flex items-center flex-col gap-6">
        <div className="flex items-center flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Login to Account
          </h2>
          <p className="text-sm text-black font-normal text-center">
            Please enter your email and password to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Login
            </button>
          </div>
        </form>
        <div className="flex items-center flex-col gap-3">
          <p className="text-sm text-black font-normal text-center">
            Don’t have an account?{" "}
            <NavLink
              to={"/register"}
              className="text-blue-500 tex-medium underline"
            >
              Create Account
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
