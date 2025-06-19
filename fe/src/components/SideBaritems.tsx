import React from 'react';
import { 
  Home, 
  User, 
  Video, 
  FileText, 
  Image, 
  Headphones, 
  Twitter,
  Settings,
  Bell
} from 'lucide-react';

export const Sidebarcontent = () => {
  const menuItems = [
    { icon: Home, label: 'Home', active: true },
    { icon: User, label: 'Profile' },
    { icon: Video, label: 'Videos' },
    { icon: FileText, label: 'Articles' },
    { icon: Image, label: 'Images' },
    { icon: Headphones, label: 'Audio' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Bell, label: 'Notifications' },
    { icon: Settings, label: 'Settings' }
  ];

  return (
    <div className="h-full w-full text-white flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center font-bold text-lg">
            S
          </div>
          <div>
            <h1 className="text-xl text-white font-semibold">
              sweernest.og
            </h1>
            <p className="text-xs text-white-400">Content Creator</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
             <li key={index}>
                <a
                  href={`/${item.label.toLowerCase()}`}
                  className={`flex items-center space-x-3 px-3 py-2 rounded-lg transition-all duration-300 hover:bg-white/10 hover:translate-x-1 group ${
                  item.active 
                    ? 'bg-white/20 shadow-lg backdrop-blur-sm' 
                    : 'hover:shadow-md'
                  }`}
                >
                  <IconComponent 
                  size={18} 
                  className={`transition-transform duration-300 group-hover:scale-110 ${
                    item.active ? 'text-white' : 'text-white/80'
                  }`}
                  />
                  <span className={`font-medium text-sm ${
                  item.active ? 'text-white' : 'text-white/80'
                  }`}>
                  {item.label}
                  </span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-white/20 mt-auto">
        <div className="flex items-center justify-between text-xs text-white/60">
          <span>© 2025 sweernest.og</span>
          <div className="flex space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Online</span>
          </div>
        </div>
      </div>
    </div>
  );
};