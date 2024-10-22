import React, { useState, useEffect } from 'react';
import Table from '../components/Table';

const AttendanceManagementPage = () => {
    const [attendance, setAttendance] = useState([]);
    const [message, setMessage] = useState([]);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/attendance/all');
                if (response.ok) {
                    const data = await response.json();
                    setAttendance(data.defaultAttendance || []);
                    setMessage(data.message);
                } else {
                    console.error('Failed to fetch attendance');
                    setMessage("근태 정보를 가져오는 데 실패했습니다.");
                }
            } catch (error) {
                console.error('Error fetching attendance:', error);
                setMessage("근태 정보를 가져오는 데 오류가 발생했습니다.");
            }
        };

        fetchAttendance();
    }, []);

    const headers = ["이름", "사원코드", "근무", "휴가", "지각", "조퇴", "결근"];


    return (
        <div>
            <Table tableName="근태 목록" headers={headers} data={attendance} firstPath="DetailAttendanceInformation" clickableField="employeeCode" />
        </div>
    )

};

export default AttendanceManagementPage;