import React from 'react';
import { MenuIcon, SearchIcon, BoardIcon, ChartIcon, PhoneIcon } from './icons';

// FIX: Export the Sidebar component to allow it to be imported in other files.
export const Sidebar: React.FC = () => {
  const navItems = [
    { icon: SearchIcon, label: 'Search' },
    { icon: BoardIcon, label: 'Board', active: true },
    { icon: ChartIcon, label: 'Analytics' },
    { icon: PhoneIcon, label: 'Contacts' },
  ];

  return (
    <aside className="bg-[#161B22] border-r border-gray-700 p-3 md:p-4 flex flex-col items-center space-y-8">
      <button className="text-gray-400 hover:text-white transition-colors">
        <MenuIcon className="h-6 w-6" />
      </button>
      <nav className="flex flex-col items-center space-y-6">
        {navItems.map((item, index) => (
          <button
            key={index}
            className={`p-2 rounded-lg transition-colors ${
              item.active
                ? 'bg-gray-700 text-white'
                : 'text-gray-500 hover:bg-gray-700 hover:text-white'
            }`}
            aria-label={item.label}
          >
            <item.icon className="h-6 w-6" />
          </button>
        ))}
      </nav>
    </aside>
  );
};