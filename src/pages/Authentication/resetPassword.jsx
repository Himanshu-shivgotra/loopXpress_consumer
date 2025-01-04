import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axiosInstance from "../../common/axiosInstance";

const ResetPassword = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState("");
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isValidToken, setIsValidToken] = useState(true);

    const { token } = useParams(); // Extract the token from URL
    const navigate = useNavigate();

    useEffect(() => {
        // Verify token validity
        const verifyToken = async () => {
            try {
                await axiosInstance.get(`/api/users/reset-password/${token}`);
            } catch (error) {
                setIsValidToken(false);
                setMessage("Invalid or expired reset token");
            }
        };
        if (token) {
            verifyToken();
        }
    }, [token]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage("Passwords do not match");
            return;
        }

        if (password.length < 8) {
            setMessage("Password must be at least 8 characters long");
            return;
        }

        try {
            setIsSubmitting(true);
            setMessage("");

            await axiosInstance.post(`/api/users/reset-password/${token}`, {
                newPassword: password,
            });

            setIsSuccess(true);
            setMessage("Password has been reset successfully");
            setTimeout(() => {
                navigate("/auth/signin");
            }, 3000);
        } catch (error) {
            setIsSuccess(false);
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Something went wrong. Please try again.");
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isValidToken) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-900">
                <div className="px-4 py-8 rounded-lg border flex items-center justify-center w-full max-w-lg bg-white shadow-lg">
                    <div className="w-full sm:p-8 xl:p-10 text-center">
                        <h2 className="mb-4 text-2xl font-bold text-red-500">Invalid Reset Link</h2>
                        <p className="mb-6 text-gray-900 dark:text-gray-300">
                            This password reset link is invalid or has expired.
                        </p>
                        <Link to="/auth/forgot-password" className="text-primary hover:underline">
                            Request a new password reset
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
            <div className="px-4 py-8 rounded-lg border flex items-center justify-center w-full max-w-lg bg-white shadow-lg">
                <div className="w-full sm:p-8 xl:p-10">
                    <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-2xl">
                        Reset Password
                    </h2>

                    {message && (
                        <div className={`mb-4 p-4 rounded ${isSuccess ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2.5 block font-medium text-gray-900">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                    disabled={isSubmitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2"
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg border border-gray-900 bg-gray-900 p-3 sm:p-4 text-white transition hover:bg-gray-800"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? "Resetting Password..." : "Reset Password"}
                            </button>
                        </div>

                        <div className="mt-6 text-center">
                            <p className="text-sm sm:text-base text-gray-900">
                                Remember your password?{" "}
                                <Link to="/auth/signin" className="text-gray-900 underline hover:text-gray-700">
                                    Sign In
                                </Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
