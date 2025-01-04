import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../common/axiosInstance";

const SignIn = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setErrorMessage("");

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Please fill in all fields.");
            setIsSubmitting(false);
            return;
        }

        try {
            const response = await axiosInstance.post("/api/consumers/login", {
                email,
                password,
            });

            const { token } = response.data;
            if (!token) {
                throw new Error("No token received from the server.");
            }

            localStorage.setItem("authToken", token);

            // Redirect to Product List page after successful sign-in
            navigate("/products");
        } catch (error) {
            console.error("Error signing in:", error);
            if (error.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="px-4 py-8 rounded-lg border flex items-center justify-center w-full max-w-lg bg-white shadow-lg">
                <div className="w-full p-4 sm:p-8 xl:p-10">
                    <h2 className="mb-4 text-xl font-bold text-gray-900 sm:text-2xl">
                        Sign In
                    </h2>

                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Email</label>
                            <input
                                type="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setErrorMessage(""); // Clear error when typing
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                disabled={isSubmitting} // Disable while submitting
                            />
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Password</label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setErrorMessage(""); // Clear error when typing
                                    }}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                    disabled={isSubmitting} // Disable while submitting
                                />
                                <button
                                    type="button"
                                    onClick={handleTogglePassword}
                                    className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            <div className="mt-2 text-right">
                                <Link to="/auth/forgot-password" className="text-sm sm:text-base text-gray-900">
                                    Forgot Password?
                                </Link>
                            </div>
                        </div>

                        <div className="mb-5">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg border border-gray-900 bg-gray-900 p-3 sm:p-4 text-white transition hover:bg-gray-800"
                                disabled={isSubmitting} // Disable while submitting
                            >
                                {isSubmitting ? "Signing In..." : "Sign In"}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm sm:text-base text-gray-900">
                                Don’t have an account?{" "}
                                <Link to="/auth/signup" className="text-gray-900 underline hover:text-gray-700">
                                    Sign Up
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
