import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import EmployeeInfoForm from '../components/EmployeeInfoForm';

const EmployeeInfoDetailPage = () => {
    const { employeeCode } = useParams();
    const userEmployeeCode = localStorage.getItem('employeeCode');
    const userAuthority = localStorage.getItem('authority');
    const [employee, setEmployee] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [tempPhoto, setTempPhoto] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({});

    const fetchEmployeeDetails = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/employee/${employeeCode}`,{
            method: 'GET',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
            });
        if (response.ok) {
            const data = await response.json();
            setEmployee(data);
        }
    };

    useEffect(() => {
        fetchEmployeeDetails();
    }, [employeeCode]);

    const handleEditToggle = () => {
        if (userAuthority === '관리자' || userAuthority === '마스터' || userEmployeeCode === employeeCode) {
            setIsEditable((prev) => !prev);
        } else {
            alert("수정 권한이 없습니다.");
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmployee((prev) => ({
            ...prev,
            [name]: value,
        }));
        setUpdatedFields((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handlePhotoSelection = (e) => {
        const file = e.target.files[0];
        if (file) setTempPhoto(URL.createObjectURL(file));
    };

    const handleSave = async () => {
        const token = localStorage.getItem('token');


    // updatedFields에 변환된 authority 값 추가
    const updatedData = {
        ...updatedFields,
    };

        const profileResponse = await fetch(`http://localhost:8080/api/employee/${employeeCode}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedData),
        });
    
        // 2. 프로필 정보가 성공적으로 업데이트된 경우
        if (profileResponse.ok) {
            alert('프로필 정보가 수정되었습니다.');
            setIsEditable(false);
        }else {
            const errorMessage = await profileResponse.text();
            console.error('프로필 수정 실패:', errorMessage);
            alert('프로필 수정에 실패했습니다.');
        }
};

    const handleCancel = () => {
        setTempPhoto(null);
        setIsEditable(false);
    };

    return employee && (
        <EmployeeInfoForm 
            employee={employee}
            tempPhoto={tempPhoto}
            isEditable={isEditable}
            isSelf={userEmployeeCode === employeeCode}
            onChange={handleChange}
            onPhotoSelection={handlePhotoSelection}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditToggle={handleEditToggle}
        />
    );
};

export default EmployeeInfoDetailPage;