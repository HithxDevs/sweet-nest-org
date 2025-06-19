import { useState, useEffect } from 'react';
import { Sidebarcontent } from './SideBaritems';
import { ChevronLeft, Menu } from 'lucide-react';

interface SidebarProps {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (open: boolean) => void;
}
export const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }: SidebarProps) => {
    const [isMobile, setIsMobile] = useState(false);

    // Check if mobile screen and set initial sidebar state
    useEffect(() => {
        const checkScreenSize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
        };

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);

        return () => window.removeEventListener('resize', checkScreenSize);
    }, []);

    // Set initial sidebar state based on screen size (only on mount)
    useEffect(() => {
        const mobile = window.innerWidth < 768;
        if (!mobile) {
            setIsSidebarOpen(true); // Default open on desktop
        } else {
            setIsSidebarOpen(false); // Default closed on mobile
        }
    }, [setIsSidebarOpen]); // Empty dependency array - only run once on mount

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            {/* Hamburger Menu Button */}
            <button
                onClick={toggleSidebar}
                className={`fixed top-4 left-4 z-50 p-2 rounded-md transition-all duration-300 shadow-lg ${
                    !isMobile && isSidebarOpen ? 'ml-78 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300  ' : 'ml-0 bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 '
                }`}
            >
                {isSidebarOpen ? <ChevronLeft size={20} /> : <Menu size={20} />}
            </button>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`fixed left-0 top-0 h-full bg-gradient-to-b from-purple-600 to-blue-600 shadow-xl transition-all duration-300 z-40 ${
                    isMobile
                        ? isSidebarOpen
                            ? 'w-98 translate-x-0'
                            : 'w-98 -translate-x-full'
                        : isSidebarOpen
                        ? 'w-98 translate-x-0'
                        : 'w-98 -translate-x-full'
                }`}
            >
                {/* Sidebar Content */}
                <div className="h-full pt-16">
                    <Sidebarcontent />
                </div>
            </div>
        </>
    );
};