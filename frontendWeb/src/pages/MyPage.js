import React, { useEffect, useState } from 'react';
import EmployeeInfoForm from '../components/EmployeeInfoForm';

const MyPage = () => {
    const employeeCode = localStorage.getItem('employeeCode');
    const [employee, setEmployee] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [tempPhoto, setTempPhoto] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({});

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeCode}`);
            if (response.ok) {
                const data = await response.json();
                setEmployee(data);
            }
        };
        fetchEmployeeDetails();
    }, [employeeCode]);

    const handleEditToggle = () => setIsEditable((prev) => !prev);

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
        const response = await fetch(`http://localhost:8080/api/employee/${employeeCode}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedFields),
        });
        if (response.ok) {
            if (tempPhoto) {
                const fileInput = document.querySelector('input[type="file"]');
                const formData = new FormData();
                formData.append('photo', fileInput.files[0]);
                await fetch(`http://localhost:8080/api/employee/${employeeCode}/upload-photo`, {
                    method: 'POST',
                    body: formData,
                });
            }
            alert('프로필이 업데이트되었습니다.');
            setIsEditable(false);
        }
    };

    const handleCancel = () => setIsEditable(false);

    return employee && (
        <EmployeeInfoForm 
            employee={employee}
            tempPhoto={tempPhoto}
            isEditable={isEditable}
            isSelf={true}
            onChange={handleChange}
            onPhotoSelection={handlePhotoSelection}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditToggle={handleEditToggle}
        />
    );
};

export default MyPage;
