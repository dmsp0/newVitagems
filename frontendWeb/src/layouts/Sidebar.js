// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import vitagemsLogo from '../assets/img/VITAGEMS_logo-removebg-preview.png';

const Sidebar = ({ authority }) => {
  console.log('Authority:', authority);  // authority 값 콘솔 출력
  return (
    <aside className="min-h-screen w-64 bg-vitagems-navy text-white p-6">
      <div className='mb-9'>
        <Link to="/">
          <img src={vitagemsLogo} alt="home button logo" />
        </Link>
      </div>

      <nav>
        {authority === '관리자' ? (
          <>
          {/*관리자용 메뉴*/}
          <ul className="space-y-4 mb-8">
              <p className="border-t border-b border-white">인사관리</p>
            <li>
              <Link to="/EmployeeRegistration" className="block py-2 px-4 rounded hover:bg-blue-600">
                사원 등록
              </Link>
            </li>
            <li>
              <Link to="/EmployeeManagement" className="block py-2 px-4 rounded hover:bg-blue-600">
                사원 정보 관리
              </Link>
            </li>
            <li>
              <Link to="/AttendanceManagement" className="block py-2 px-4 rounded hover:bg-blue-600">
                근태 정보 관리
              </Link>
            </li>
            <li>
              <Link to="/CompanyAttendanceSetting" className="block py-2 px-4 rounded hover:bg-blue-600">
                회사 근태 정보 설정
              </Link>
            </li>
          </ul>
        </>
        ) : (
          <>
          {/*사원용 메뉴*/}
          <ul className="space-y-4 mb-8">
              <p className="border-t border-b border-white">내 정보</p>
              <li>
                <Link to="/Profile" className="block py-2 px-4 rounded hover:bg-blue-600">
                  정보 수정
                </Link>
              </li>
              <li>
                <Link to="/AttendanceView" className="block py-2 px-4 rounded hover:bg-blue-600">
                  근태 조회
                </Link>
              </li>
            </ul>
          </>
        )}
        
        {/* 공통 메뉴 (사내 공지) */}
        <ul className="space-y-4 mb-8">
          <p className="border-t border-b border-white">회사정보</p>
          <li>
            <Link to="/InternalNotice" className="block py-2 px-4 rounded hover:bg-blue-600">
              사내 공지
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
