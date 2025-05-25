import { Link, Navigate, useNavigate } from "react-router";
import { use, useState } from "react";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

export default function Login() {
  const { loginUser, googleSignIn, facebookSignIn } = use(AuthContext);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setError(null);
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    // Simulate login process
    const user = await loginUser(formData.email, formData.password);
    if (user instanceof Error) {
      setError(`Login failed. ${user.message}`);
      setIsLoading(false);
      return;
    }
    if (user) {
      toast.success("Login successful!");
      navigate("/");
    }
    setIsLoading(false);
  };
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const user = await googleSignIn();
    if (user instanceof Error) {
      setError(`Google sign-in failed. ${user.message}`);
      setIsLoading(false);
      return;
    }
    if (user) {
      toast.success("User signed in successfully!");
      navigate("/");
    }
    setIsLoading(false);
  };
  const handleFacebookSignIn = async () => {
    setIsLoading(true);
    const user = await facebookSignIn();
    if (user instanceof Error) {
      setError(`Facebook sign-in failed. ${user.message}`);
      setIsLoading(false);
      return;
    }
    if (user) {
      toast.success("User signed in successfully!");
      navigate("/");
    }
    setIsLoading(false);
  };
  return (
    <div className="w-full max-w-md p-8 space-y-3 rounded-xl dark:bg-gray-50 dark:text-gray-800 mx-auto">
      <h1 className="text-2xl font-bold text-center">Login</h1>
      {error && <p className="text-red-500 text-xs text-center">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-1 text-sm">
          <label htmlFor="email" className="block dark:text-gray-600">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          <div className="flex justify-end text-xs dark:text-gray-600">
            <a rel="noopener noreferrer" href="#">
              Forgot Password?
            </a>
          </div>
        </div>
        <button
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
        >
          {isLoading ? "Loading..." : "Login"}
        </button>
      </form>
      <div className="flex items-center pt-4 space-x-1">
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
        <p className="px-3 text-sm dark:text-gray-600">
          Login with social accounts
        </p>
        <div className="flex-1 h-px sm:w-16 dark:bg-gray-300"></div>
      </div>
      <div>
        {/* Social Login Buttons */}
        <button
          onClick={handleGoogleSignIn}
          className="bg-black text-white rounded-md py-2 px-4 flex items-center justify-center gap-[10px] text-[1rem] w-full cursor-pointer"
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <FaGoogle className="" />
              Continue with Google
            </>
          )}
        </button>
        <button
          onClick={handleFacebookSignIn}
          className="bg-blue-600 text-white rounded-md py-2 px-4 flex items-center justify-center gap-[10px] text-[1rem] w-full cursor-pointer mt-2"
        >
          {isLoading ? (
            "Loading..."
          ) : (
            <>
              <FaFacebook className="" />
              Continue with Facebook
            </>
          )}
        </button>
        <button className="bg-gray-800 text-white rounded-md py-2 px-4 flex items-center justify-center gap-[10px] text-[1rem] w-full cursor-pointer mt-2">
          <FaGithub className="" />
          Continue with Github
        </button>
      </div>
      <p className="text-xs text-center sm:px-6 dark:text-gray-600">
        Don't have an account?
        <Link
          rel="noopener noreferrer"
          to="/signup"
          className="underline dark:text-gray-800"
        >
          Sign up
        </Link>
      </p>
    </div>
  );
}
