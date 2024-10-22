// MainPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const MainPage = () => {
  // 로컬 스토리지에서 userName과 authority 가져오기
  const userName = localStorage.getItem('userName') || 'Guest';
  const authority = localStorage.getItem('authority') || 'none';

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-4">환영합니다, {userName} {authority}님!</h1>
      <p>메인입니다. 이곳에서 회사 시스템을 관리할 수 있습니다.</p>
    </div>
  );
};

export default MainPage;
