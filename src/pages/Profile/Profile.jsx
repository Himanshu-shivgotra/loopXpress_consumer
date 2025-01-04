import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../common/axiosInstance';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Fetch profile data
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axiosInstance.get('/api/consumers/profile');
                setProfile(response.data);
                setIsLoading(false); // Stop loading after fetching data
            } catch (error) {
                console.error('Error fetching profile:', error.response?.data || error.message);

                // Handle specific HTTP errors
                if (error.response?.status === 401) {
                    setError('Session expired. Please log in again.');
                } else {
                    setError(error.response?.data?.message || 'Failed to fetch profile. Please try again.');
                }

                setIsLoading(false);
            }
        };

        fetchProfile();
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove token from local storage
        navigate('/auth/signin'); // Redirect to sign-in page
    };

    // Render error message
    if (error) {
        return <div className="text-red-500 text-center mt-4">{error}</div>;
    }

    // Render loading state
    if (isLoading) {
        return <div className="text-blue-500 text-center mt-4">Loading profile...</div>;
    }

    // Render profile
    return (
        <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
            <h2 className="text-2xl text-center text-gray-800 font-semibold mb-6">Welcome, {profile?.name || 'User'}</h2>

            <div className="text-gray-600 mb-4">
                <p><strong className="font-medium">Email:</strong> {profile?.email || 'N/A'}</p>
                <p><strong className="font-medium">Phone:</strong> {profile?.phoneNumber || 'N/A'}</p>
                <p><strong className="font-medium">Address:</strong> {profile?.address || 'N/A'}</p>
                <p><strong className="font-medium">Date of Birth:</strong> {profile?.dateOfBirth
                    ? new Date(profile.dateOfBirth).toLocaleDateString()
                    : 'N/A'}</p>
            </div>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200">
                Logout
            </button>
        </div>
    );
};

export default Profile;
