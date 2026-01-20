"use client";

import LogOut from "./LogOutBtn";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl font-bold text-gray-900">
                Student Management System
              </h1>
            </div>
          </div>
          <div className="flex items-center">
            <LogOut />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
