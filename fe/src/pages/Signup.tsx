import React, { useState } from 'react';
import { Lock, User, Mail, Bird, UserPlus, Check } from 'lucide-react';
import { Button } from '../components/Button';
import { useRef } from 'react';
import axios from 'axios';
import { API_BASE_URL } from '../api';
import { Link } from 'react-router-dom';


export const Signup = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [agreeToTerms, setAgreeToTerms] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const usernameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleSignUp() {
        const username = usernameRef.current?.value;
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!username || !email || !password) {
            alert("Please fill in all fields.");
            return;
        }

        if (!agreeToTerms) {
            alert("You must agree to the terms and conditions.");
            return;
        }

        setIsLoading(true);

       
            // Fixed: Remove extra braces and body wrapper
            const response = await axios.post(`${API_BASE_URL}/api/v1/signup`, {
                username,
                email,
                password,
            });

            if (response.status === 201) {
                alert("Account created successfully!");
                window.location.href = "/signin";
            } else {
                alert("Error creating account");
                console.error("Signup failed:", response.data);
                alert( "An error occurred. Please try again.");
            }
       
            setIsLoading(false);
        
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
            {/* Left Side - Background */}
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
                        Join the community,
                    </h2>
                    <h1 className="text-4xl lg:text-6xl font-extrabold mb-2 lg:mb-4 bg-gradient-to-r from-purple-200 to-blue-300 bg-clip-text text-transparent">
                        SweetNest.io
                    </h1>
                    <p className="text-sm md:text-lg lg:text-xl text-blue-100 leading-relaxed max-w-md mx-auto">
                        Create your account and start sharing with the world today.
                    </p>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center lg:w-2/5 p-4 lg:p-8 flex-1">
                <div className="bg-white rounded-3xl shadow-2xl p-6 sm:p-8 lg:p-10 w-full max-w-md transform hover:scale-105 transition-all duration-300 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-6 lg:mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl mb-4 shadow-lg">
                            <UserPlus className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                            Sign Up
                        </h1>
                        <p className="text-gray-500 text-sm sm:text-base">Create your account to get started</p>
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
                                    className="w-full border-2 border-gray-200 pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                                    placeholder="Enter your username"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        {/* Email Field */}
                        <div className="group">
                            <label className="block text-gray-700 mb-2 font-medium text-sm sm:text-base">Email</label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 sm:w-5 sm:h-5 group-focus-within:text-purple-500 transition-colors" />
                                <input
                                    type="email"
                                    ref={emailRef}
                                    className="w-full border-2 border-gray-200 pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                                    placeholder="Enter your email"
                                    disabled={isLoading}
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
                                    className="w-full border-2 border-gray-200 pl-10 sm:pl-12 pr-10 sm:pr-12 py-2.5 sm:py-3 rounded-xl focus:outline-none focus:border-purple-500 focus:ring-4 focus:ring-purple-100 transition-all duration-300 hover:border-gray-300 text-sm sm:text-base"
                                    placeholder="Enter your password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-purple-500 transition-colors"
                                    disabled={isLoading}
                                >
                                    {/* Add eye icon here if needed */}
                                </button>
                            </div>
                        </div>

                        {/* Terms & Conditions */}
                        <div className="flex items-start text-xs sm:text-sm">
                            <label className="flex items-start cursor-pointer" onClick={() => !isLoading && setAgreeToTerms(!agreeToTerms)}>
                                <div className="relative mt-0.5">
                                    <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded border-2 transition-all duration-300 ${
                                        agreeToTerms 
                                            ? 'bg-purple-600 border-purple-600' 
                                            : 'bg-gray-200 border-gray-300 hover:border-purple-400'
                                    }`}>
                                        {agreeToTerms && (
                                            <Check className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white absolute top-0.5 left-0.5" strokeWidth={3} />
                                        )}
                                    </div>
                                </div>
                                <span className="ml-2 text-gray-600 leading-relaxed">
                                    I agree to the{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline" onClick={(e) => e.stopPropagation()}>
                                        Terms & Conditions
                                    </a>
                                    {' '}and{' '}
                                    <a href="#" className="text-purple-600 hover:text-purple-800 hover:underline" onClick={(e) => e.stopPropagation()}>
                                        Privacy Policy
                                    </a>
                                </span>
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <Button 
                            variant="primary" 
                            size="md" 
                            text={isLoading ? "Creating Account..." : "Create Account"}
                            disabled={!agreeToTerms || isLoading}
                            onClick={handleSignUp}
                        />

                        {/* Divider */}
                        <div className="relative flex items-center justify-center my-4 sm:my-6">
                            <div className="border-t border-gray-200 w-full"></div>
                        </div>

                        {/* Sign In Link */}
                        <p className="text-center text-gray-600 mt-4 sm:mt-6 text-xs sm:text-sm">
                            Already have an account?{' '}
                            <Link to="/signin" className="text-purple-600 hover:text-purple-800 font-semibold hover:underline transition-colors">
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;