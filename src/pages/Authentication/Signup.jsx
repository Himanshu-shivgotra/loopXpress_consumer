import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../common/axiosInstance";

const SignUp = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [address, setAddress] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            const response = await axiosInstance.post("/api/consumers/signup", {
                name,
                email,
                password,
                phoneNumber,
                address,
                dateOfBirth
            });

            const { token } = response.data;
            if (!token) {
                throw new Error("No token received from the server.");
            }

            localStorage.setItem("authToken", token);

            navigate("/auth/signin");
        } catch (error) {
            console.error("Error signing up:", error);
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
                        Sign Up
                    </h2>

                    {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Name</label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                value={name}
                                onChange={(e) => {
                                    setName(e.target.value);
                                    setErrorMessage(""); // Clear error when typing
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                disabled={isSubmitting} // Disable while submitting
                            />
                        </div>

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

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Phone Number</label>
                            <input
                                type="text"
                                placeholder="Enter your phone number"
                                value={phoneNumber}
                                onChange={(e) => {
                                    setPhoneNumber(e.target.value);
                                    setErrorMessage(""); // Clear error when typing
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                disabled={isSubmitting} // Disable while submitting
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Address</label>
                            <input
                                type="text"
                                placeholder="Enter your address"
                                value={address}
                                onChange={(e) => {
                                    setAddress(e.target.value);
                                    setErrorMessage(""); // Clear error when typing
                                }}
                                className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                                disabled={isSubmitting} // Disable while submitting
                            />
                        </div>

                        <div className="mb-4">
                            <label className="mb-2.5 block font-medium text-gray-900 text-sm sm:text-base">Date of Birth</label>
                            <input
                                type="date"
                                value={dateOfBirth}
                                onChange={(e) => {
                                    setDateOfBirth(e.target.value);
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
                                    placeholder="Create a password"
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
                                    {showPassword ? "Hide" : "Show"}
                                </button>
                            </div>
                        </div>

                        <div className="mb-5">
                            <button
                                type="submit"
                                className="w-full cursor-pointer rounded-lg border border-gray-900 bg-gray-900 p-3 sm:p-4 text-white transition hover:bg-gray-800"
                                disabled={isSubmitting} // Disable while submitting
                            >
                                {isSubmitting ? "Signing Up..." : "Sign Up"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
