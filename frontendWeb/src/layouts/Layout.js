import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const userName = localStorage.getItem('userName') || 'Guest';
  const authority = localStorage.getItem('authority') || 'none';

  return (
    <div className="flex min-h-screen">
      {/* 사이드바는 왼쪽에 고정 */}
      <Sidebar className="w-64" userName={userName} authority={authority} />

      {/* 나머지 영역: 헤더 + 본문 + 푸터 */}
      <div className="flex flex-col flex-1">
        {/* 헤더는 오른쪽 컨텐츠 전체에 고정 */}
        <Header userName={userName} authority={authority} />

        {/* 메인 콘텐츠와 푸터 */}
        <main className="flex-1 p-6 bg-gray-100">
          <Outlet context={{ userName, authority }} />
        </main>

        {/* 푸터 */}
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
