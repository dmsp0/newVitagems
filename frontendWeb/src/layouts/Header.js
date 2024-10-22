// Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ userName, authority }) => {
  return (
    <header className="bg-white shadow p-4 w-full">
        <nav className="flex space-x-4 justify-end">
          <span className="text-gray-600">환영합니다, {userName} {authority}님!</span>
          <Link to="/profile" className="text-gray-600 hover:text-gray-800">프로필</Link>
          <Link to="/settings" className="text-gray-600 hover:text-gray-800">설정</Link>
          <Link to="/logout" className="text-gray-600 hover:text-gray-800">로그아웃</Link>
        </nav>
    </header>
  );
};

export default Header;
