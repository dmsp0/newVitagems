import { lazy } from "react";
import Layout from "../layouts/Layout";


// Lazy load 페이지 컴포넌트
const Home = lazy(() => import("../pages/HomePage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const EmployeeRegistrationPage = lazy(() => import("../pages/EmployeeRegistrationPage"));
const EmployeeManagementPage = lazy(() => import("../pages/EmployeeManagementPage"));
const EmployeeInfoDetailPage = lazy(() => import("../pages/EmployeeInfoDetailPage"));
const AttendanceManagementPage = lazy(() => import("../pages/AttendanceManagementPage"));
const CompanySettingsPage = lazy(() => import("../pages/CompanySettingsPage"));
const MyPage = lazy(() =>  import("../pages/MyPage"));

const routes = [
  {
    path: "/",  // 홈 경로는 Layout 없이
    element: <Home />
  },
  {
    path: "/",  // 다른 페이지는 Layout 안에서 관리
    element: <Layout />,
    children: [
      {
        path: "Main",  
        element: <MainPage />
      },
      {
        path: "EmployeeRegistration",  
        element: <EmployeeRegistrationPage />
      },
      {
        path: "EmployeeManagement",  // Main 경로 추가
        element: <EmployeeManagementPage />
      },
      {
        path: "DetailEmployeeInformation/:employeeCode",  // 사원 상세 정보 경로
        element: <EmployeeInfoDetailPage />
      },
      {
        path: "AttendanceManagement",
        element: <AttendanceManagementPage/>
      },
      {
        path: "CompanyAttendanceSetting",
        element: <CompanySettingsPage/>
      },
      {
        path: "MyPage",
        element: <MyPage/>
      },
      // 추가적인 경로들을 여기에 추가 가능
    ]
  }
];

export default routes;
