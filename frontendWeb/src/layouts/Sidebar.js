import React from 'react';
import { Link } from 'react-router-dom';
import vitagemsLogo from '../assets/img/VITAGEMS_logo-removebg-preview.png';

const Sidebar = ({ authority }) => {
  console.log('Authority:', authority);  // authority 값 콘솔 출력
  return (
    <aside className="min-h-screen w-64 bg-vitagems-navy text-white p-6">
      <div className='mb-9'>
        <Link to="/Main">
          <img src={vitagemsLogo} alt="home button logo" />
        </Link>
      </div>

      <nav>
        {/* 공통 메뉴 (내 정보, 근태 조회, 출근/퇴근 체크) */}
        <ul className="space-y-4 mb-8">
          <p className="border-t border-b border-white">내 정보</p>
          <li>
            <Link to="/myPage" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
              마이페이지
            </Link>
          </li>
          <li>
            <Link to="/AttendanceView" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
              근태 조회
            </Link>
          </li>
          <li>
            <Link to="/check-in" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
              출근하기
            </Link>
          </li>
          <li>
            <Link to="/check-out" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
              퇴근하기
            </Link>
          </li>
        </ul>

        {/* 관리자 전용 메뉴 */}
        {authority === '관리자'|| '마스터' && (
          <ul className="space-y-4 mb-8">
            <p className="border-t border-b border-white">인사관리</p>
            <li>
              <Link to="/EmployeeRegistration" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
                사원 등록
              </Link>
            </li>
            <li>
              <Link to="/EmployeeManagement" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
                사원 정보 관리
              </Link>
            </li>
            <li>
              <Link to="/AttendanceManagement" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
                근태 정보 관리
              </Link>
            </li>
          </ul>
        )}

        {/* 마스터 전용 메뉴 */}
        {authority === '마스터' && (
          <ul className="space-y-4 mb-8">
            <p className="border-t border-b border-white">사내 정보 설정</p>
            <li>
              <Link to="/CompanyAttendanceSetting" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
                근태 시간 및 위치 정보
              </Link>
            </li>
          </ul>
        )}

        {/* 공통 메뉴 (회사정보) */}
        <ul className="space-y-4 mb-8">
          <p className="border-t border-b border-white">회사정보</p>
          <li>
            <Link to="/InternalNotice" className="block py-2 px-4 rounded hover:bg-white hover:text-vitagems-navy">
              사내 공지
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
