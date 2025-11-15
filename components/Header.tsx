
import React, { useState } from 'react';
import { SearchIcon, BellIcon, ColumnsIcon } from './icons';

export const Header: React.FC = () => {
  const [view, setView] = useState('board');

  return (
    <header className="bg-[#0D1117] border-b border-gray-700 p-4 flex flex-wrap items-center justify-between gap-4">
      <h1 className="text-2xl font-bold text-white">Tender Tasks</h1>
      
      <div className="flex items-center gap-2 md:gap-4 flex-grow md:flex-grow-0 order-3 md:order-2 w-full md:w-auto">
        <div className="flex items-center bg-[#21262D] rounded-md px-2 border border-gray-600 flex-grow">
          <SearchIcon className="h-5 w-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search for Tenders"
            className="bg-transparent p-2 text-white placeholder-gray-500 focus:outline-none w-full"
          />
        </div>
        <button className="text-gray-400 hover:text-white p-2">
          <BellIcon className="h-6 w-6" />
        </button>
        <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
          S
        </div>
      </div>
      
      <div className="flex items-center gap-2 md:gap-4 order-2 md:order-3">
        <div className="bg-[#21262D] p-1 rounded-md flex">
          <button 
            onClick={() => setView('list')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${view === 'list' ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700'}`}
          >
            List View
          </button>
          <button
            onClick={() => setView('board')}
            className={`px-3 py-1 rounded-md text-sm transition-colors ${view === 'board' ? 'bg-black text-white' : 'text-gray-400 hover:bg-gray-700'}`}
          >
            Board View
          </button>
        </div>
        <button className="bg-[#21262D] p-2 rounded-md text-gray-400 hover:text-white border border-gray-600 hidden sm:flex items-center gap-2">
          <span className="text-sm">View Tender Details</span>
        </button>
        <button className="bg-[#21262D] p-2 rounded-md text-gray-400 hover:text-white border border-gray-600 flex items-center gap-2">
          <ColumnsIcon className="h-5 w-5" />
          <span className="text-sm hidden sm:inline">Columns</span>
        </button>
      </div>
    </header>
  );
};
