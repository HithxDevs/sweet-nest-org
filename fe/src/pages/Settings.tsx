import { Bird } from "lucide-react"
import { Button } from "../components/Button";
import {  useNavigate } from "react-router-dom";

export const Settings = () => {
    const navigate = useNavigate();
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
                        Settings
                    </h2>
                    <p className="text-sm md:text-base lg:text-lg text-white-200 mb-6">
                        Manage your account settings and preferences.
                    </p>
                    <p className="text-xs md:text-sm lg:text-base text-white-300">
                        Here you can update your profile, change your password, and manage your account settings.
                    </p>
                </div>
            </div>
            <div className="flex items-center justify-center lg:w-2/5 p-4 lg:p-8 flex-1">
                <Button
                    variant="default"
                    size="md"
                    text="Logout"
                    onClick={() => {
                        localStorage.removeItem("token");
                        navigate("/signin");
                    }}
                    />
                </div> 
            </div>

            );
        }
