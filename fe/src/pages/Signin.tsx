import React, { useRef, useState } from 'react';
import { Eye, EyeOff, Lock, User, Bird } from 'lucide-react';
import axios from 'axios'; // Missing import!
import { API_BASE_URL } from '../api';

export const Signin = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    
    async function handleSignIn() {
        const username = usernameRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !password) {
            alert("Please fill in all fields.");
            return;
        }

        setIsLoading(true);

        try {
            // Fixed: Added missing slash and proper error handling
            const response = await axios.post(`${API_BASE_URL}/api/v1/signin`, {
                username,
                password,
            });

            if (response.status === 200) {
                alert("Signin successful!");
                localStorage.setItem("token", (response.data as { token: string }).token);
                window.location.href = "/dashboard";
            } else {
                alert("Error in Signin. Please try again.");
            }
        } catch (error) {
            console.error("Signin error:", error);
            

        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            {/* Left Side - Simplified Background */}
            <div className="relative bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-800 text-white flex items-center justify-center lg:w-3/5 h-64 lg:h-screen overflow-hidden">
                {/* Subtle Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-20 left-20 md:w-32 h-32 bg-white bg-opacity-5 rounded-full"></div>
                    <div className="absolute bottom-32 right-40 md:w-40 h-40 bg-white bg-opacity-5 rounded-full"></div>
                </div>
                
                {/* Content */}
                <div className="relative z-10 text-center px-6 lg:px-12">
                    <div className="mb-6">
                        <Bird className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4 text-white-300" />
                    </div>
                    <h2 className="text-xl md:text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                        Welcome to,
                    </h2>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-2 lg:mb-4 bg-gradient-to-r from-purple-200 to-blue-300 bg-clip-text text-transparent">
                        SweetNest.io
                    </h1>
                    <p className="text-sm md:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-md mx-auto">
                        Share with the world, connect with your community, and explore endless possibilities.
                    </p>
                </div>
            </div>

            {/* Right Side - Responsive Form */}
            <div className="flex items-center justify-center lg:w-2/5 p-4 lg:p-8 flex-1">
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-6 lg:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <User className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Sign In
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base">Enter your credentials to continue</p>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                        {/* Username Field */}
                        <div className="group">
                            <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Username</label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="text"
                                    ref={usernameRef}
                                    disabled={isLoading}
                                    className="w-full border-2 border-gray-200 pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your username"
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div className="group">
                            <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    ref={passwordRef}
                                    disabled={isLoading}
                                    className="w-full border-2 border-gray-200 pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                                    placeholder="Enter your password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    disabled={isLoading}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" /> : <Eye className="w-4 h-4 sm:w-5 sm:h-5" />}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs sm:text-sm">
                            <label className="flex items-center cursor-pointer">
                                <input type="checkbox" className="sr-only" />
                                <div className="relative">
                                    <div className="w-4 h-4 sm:w-5 sm:h-5 bg-gray-200 rounded border-2 border-gray-300 transition-all hover:border-purple-400"></div>
                                    <div className="absolute inset-0 w-4 h-4 sm:w-5 sm:h-5 bg-purple-600 rounded opacity-0 scale-0 transition-all duration-200"></div>
                                </div>
                                <span className="ml-2 text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        {/* Sign In Button */}
                        <button
                            type="submit"
                            onMouseEnter={() => !isLoading && setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                            disabled={isLoading}
                            onClick={handleSignIn}
                            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2.5 sm:py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10">
                                {isLoading ? "Signing In..." : "Sign In"}
                            </span>
                            <div className={`absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 transition-opacity duration-300 ${isHovered && !isLoading ? 'opacity-100' : 'opacity-0'}`}></div>
                        </button>

                        {/* Divider */}
                        <div className="relative flex items-center justify-center my-4 sm:my-6">
                            <div className="border-t border-gray-200 w-full"></div>
                        </div>

                        {/* Sign Up Link */}
                        <p className="text-center text-gray-600 mt-4 sm:mt-6 text-xs sm:text-sm">
                            Don't have an account?{' '}
                            <a href="/signup" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors">
                                Create Account
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Signin;