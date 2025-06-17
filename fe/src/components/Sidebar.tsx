import {Sidebarcontent } from './SideBaritems';

export const Sidebar = () => {
    return (
        <div className="w-98 h-screen bg-gradient-to-r from-blue-500 to-indigo-500 p-4 fixed hidden md:block">
            <Sidebarcontent />
        </div>
    )
} 