import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setMessage('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      setMessage('');

      const response = await axiosInstance.post('/api/users/forgot-password', {
        email,
      });

      setIsSuccess(true);
      setMessage('Password reset instructions have been sent to your email.');
    } catch (error) {
      setIsSuccess(false);
      if (error.response?.data?.message) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Something went wrong. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="px-4 py-8 rounded-lg border flex items-center justify-center w-full max-w-lg bg-white shadow-lg">
        <div className="w-full sm:p-8 xl:p-10">
          <h2 className="mb-4 text-2xl font-bold text-gray-900 sm:text-2xl">
            Forgot Password
          </h2>
          <p className="mb-6 text-gray-900 dark:text-gray-300">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          {message && (
            <div className={`mb-4 p-4 rounded ${isSuccess ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label className="mb-2.5 block font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setMessage('');
                }}
                className="w-full rounded-lg border border-gray-300 bg-gray-100 py-3 sm:py-4 pl-4 sm:pl-6 pr-8 sm:pr-10 text-gray-900 outline-none focus:border-gray-900 focus-visible:shadow-none"
                disabled={isSubmitting}
              />
            </div>

            <div className="mb-5">
              <button
                type="submit"
                className="w-full cursor-pointer rounded-lg border border-gray-900 bg-gray-900 p-3 sm:p-4 text-white transition hover:bg-gray-800"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Reset Instructions'}
              </button>
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm sm:text-base text-gray-900">
                Remember your password?{' '}
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

export default ForgotPassword;
