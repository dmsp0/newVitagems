import React, { useState, useEffect } from 'react';
import { FaRedo } from 'react-icons/fa';
import Table from '../components/Table';
import SelectField from '../components/SelectField';
import SearchField from '../components/SearchField';
import { useNavigate } from 'react-router-dom';

const EmployeeManagementPage = () => {
    const [employees, setEmployees] = useState([]);
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const [message, setMessage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [employeesPerPage, setEmployeesPerPage] = useState(10);
    const [sortOrder, setSortOrder] = useState('asc');
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [rankFilter, setRankFilter] = useState('');
    const [searchName, setSearchName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/employee/all');
                if (response.ok) {
                    const data = await response.json();
                    setEmployees(data.employees || []);
                    setMessage(data.message);
                } else {
                    console.error('Failed to fetch employees');
                    setMessage("사원 정보를 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error('Error fetching employees:', error);
                setMessage("사원 정보를 가져오는 데 오류가 발생했습니다.");
            }
        };

        fetchEmployees();
    }, []);

    useEffect(() => {
        let updatedEmployees = [...employees];

        if (searchName) {
            updatedEmployees = updatedEmployees.filter(employee =>
                employee.employeeName.includes(searchName)
            );
        }

        if (departmentFilter) {
            updatedEmployees = updatedEmployees.filter(employee =>
                employee.department === departmentFilter
            );
        }

        if (rankFilter) {
            updatedEmployees = updatedEmployees.filter(employee =>
                employee.employeeRank === rankFilter
            );
        }

        updatedEmployees.sort((a, b) => {
            const aValue = sortOrder === 'asc' ? a.joinDate : b.joinDate;
            const bValue = sortOrder === 'asc' ? b.joinDate : a.joinDate;

            return new Date(aValue) - new Date(bValue);
        });

        setFilteredEmployees(updatedEmployees);
    }, [employees, departmentFilter, rankFilter, searchName, sortOrder]);

    const indexOfLastEmployee = currentPage * employeesPerPage;
    const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
    const currentEmployees = filteredEmployees.slice(indexOfFirstEmployee, indexOfLastEmployee);

        // 페이지 변경 핸들러
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);

    const headers = ["부서", "이름", "직급", "전화번호", "생년월일", "입사일", "사원코드"];

    const handleResetFilters = () => {
        setDepartmentFilter('');
        setRankFilter('');
        setSearchName('');
        setFilteredEmployees(employees);
    };

    return (
        <div className="max-w-7xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">사원 정보</h1>
            {message && <p className={employees.length === 0 ? "text-red-500" : "text-green-500"}>{message}</p>}

            <div className='flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0'>
                <div className="flex items-center space-x-3">
                    <SelectField
                        label="부서"
                        value={departmentFilter}
                        options={[
                            { label: '전체', value: '' },
                            { label: '개발', value: '개발' },
                            { label: '마케팅', value: '마케팅' },
                            { label: '인사', value: '인사' },
                        ]}
                        onChange={(e) => setDepartmentFilter(e.target.value)}
                    />

                    <SelectField
                        label="직급"
                        value={rankFilter}
                        options={[
                            { label: '전체', value: '' },
                            { label: '사원', value: '사원' },
                            { label: '대리', value: '대리' },
                            { label: '과장', value: '과장' },
                            { label: '차장', value: '차장' },
                            { label: '부장', value: '부장' },
                        ]}
                        onChange={(e) => setRankFilter(e.target.value)}
                    />

                    <SearchField 
                        value={searchName} 
                        onChange={(e) => setSearchName(e.target.value)} 
                        searchTitle="이름" 
                        searchPlaceholder="이름을 입력하세요"
                    />
                </div>
                
                <button onClick={handleResetFilters} className="text-gray-500 hover:text-gray-700 flex items-center">
                    검색 초기화 <FaRedo className="ml-1" />
                </button>

                <span className="text-gray-700">총 {filteredEmployees.length}명</span>
                <SelectField
                    label="페이지당 수"
                    value={employeesPerPage}
                    options={[
                        { label: 5, value: 5 },
                        { label: 10, value: 10 },
                        { label: 20, value: 20 },
                        { label: 30, value: 30 },
                    ]}
                    onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
                />
            </div>
    
            <Table tableName="사원 목록" headers={headers} data={currentEmployees} firstPath="DetailEmployeeInformation" clickableField="employeeCode" />
    
            <div className="flex justify-between mt-4">
                <button
                    className="bg-vitagems-navy text-white py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : currentPage)}
                    disabled={currentPage === 1}
                >
                    이전
                </button>
                <span className="self-center">
                    페이지 {currentPage} / {totalPages}
                </span>
                <button
                    className="bg-vitagems-navy text-white py-2 px-4 rounded disabled:opacity-50"
                    onClick={() => handlePageChange(currentPage < totalPages ? currentPage + 1 : currentPage)}
                    disabled={currentPage === totalPages}
                >
                    다음
                </button>
            </div>
        </div>
    );
};

export default EmployeeManagementPage;
