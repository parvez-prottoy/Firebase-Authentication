import { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import validateForm from "../utils/validateForm";
import AuthContext from "../context/AuthContext";
import toast from "react-hot-toast";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa6";

export default function Register() {
  const { registerUser, googleSignIn, facebookSignIn } = use(AuthContext);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setErrors({});
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setIsLoading(true);
    setErrors({});
    // Simulate registration process
    const user = await registerUser(
      formData.username,
      formData.email,
      formData.password
    );
    if (user instanceof Error) {
      setErrors({
        general: `Registration failed. ${user.message}`,
      });
      setIsLoading(false);
      return;
    }
    if (user) {
      toast.success("User registered successfully!");
      navigate("/");
    }
    setIsLoading(false);
  };
  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    const user = await googleSignIn();
    if (user instanceof Error) {
      setErrors({
        general: `Google Sign In failed. ${user.message}`,
      });
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
      setErrors({
        general: `Facebook Sign In failed. ${user.message}`,
      });
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
      <h1 className="text-2xl font-bold text-center">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {errors.general && (
          <p className="text-red-500 text-xs text-center">{errors.general}</p>
        )}
        <div className="space-y-1 text-sm">
          <label htmlFor="username" className="block dark:text-gray-600">
            Username
          </label>
          <input
            type="text"
            name="username"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username}</p>
          )}
        </div>
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
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email}</p>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="password" className="block dark:text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password}</p>
          )}
        </div>
        <div className="space-y-1 text-sm">
          <label htmlFor="confirmPassword" className="block dark:text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-xs">{errors.confirmPassword}</p>
          )}
        </div>
        {/* Upload Image */}
        {/* <div className="space-y-1 text-sm">
          <label htmlFor="image" className="block dark:text-gray-600">
            Profile Image
          </label>
          <input
            type="file"
            name="image"
            id="image"
            className="w-full px-4 py-3 rounded-md dark:border-gray-300 dark:bg-gray-50 dark:text-gray-800 focus:dark:border-violet-600"
          />
        </div> */}
        <button
          disabled={isLoading}
          type="submit"
          className="block w-full p-3 text-center rounded-sm dark:text-gray-50 dark:bg-violet-600"
        >
          {isLoading ? "Loading..." : "Register User"}
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
        All ready have an account?{" "}
        <Link
          rel="noopener noreferrer"
          to="/signin"
          className="underline dark:text-gray-800"
        >
          Sign in
        </Link>
      </p>
    </div>
  );
}
