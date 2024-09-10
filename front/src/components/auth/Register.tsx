import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { register } from "../../services/auth/register/register";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Register: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [company, setCompany] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

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

    if (username.length < 3) {
      notifyError("Username must be at least 3 characters long");
      return;
    }

    if (company.length < 3) {
      notifyError("Company name must be at least 3 characters long");
      return;
    }

    if (!validateEmail(email)) {
      notifyError("Please enter a valid email address");
      return;
    }

    if (password.length < 5) {
      notifyError("Password must be at least 5 characters long");
      return;
    }

    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("company", company);
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response: any = await register(formData);  // Axios response
      if (response.status === 201) {
        notifySuccess("Registration successful!");
        navigate("/login");
      } else {
        notifyError("Registration failed. Please try again.");
        console.log(response.data); // Log the actual response data if registration fails
      }
    } catch (error) {
      notifyError("An error occurred. Please try again later.");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 shape_bg px-4 md:px-0">
      <div className="bg-white py-12 px-6 md:px-8 rounded-lg shadow-lg max-w-[100%] md:max-w-[40%]  w-full flex items-center flex-col gap-6">
        <div className="flex items-center flex-col gap-3">
          <h2 className="text-2xl font-bold text-gray-800 text-center">
            Create an Account
          </h2>
          <p className="text-sm text-black font-normal text-center">
            Create a account to continue
          </p>
        </div>
        <form onSubmit={handleSubmit} className="w-full space-y-6">
          <div className="w-full flex gap-4 flex-col md:flex-row">
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
                Company name
              </label>
              <input
                id="company"
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="mt-1 py-2 px-4 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
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
          <div className="flex items-center flex-col gap-4">
            <button
              type="submit"
              className="w-full py-2.5 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Register
            </button>
            <div className="flex items-center flex-col gap-3">
              <p className="text-sm text-black font-normal text-center">
                Already have an account?{" "}
                <NavLink
                  to={"/login"}
                  className="text-blue-500 tex-medium underline"
                >
                  Login
                </NavLink>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
