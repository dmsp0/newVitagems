import React, { useEffect, useState } from 'react';

const CompanySettingsPage = () => {
    const [companySettings, setCompanySettings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); // 수정 모드 전환을 위한 상태

    // 로컬 스토리지에서 employeeCode 가져오기
    const employeeCode = localStorage.getItem('employeeCode');

    // 서버에서 데이터 가져오기
    useEffect(() => {
        const fetchCompanySettings = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/company-settings');
                if (response.ok) {
                    const data = await response.json();
                    setCompanySettings(data);  // 데이터가 있으면 설정 값을 저장
                } else {
                    setError('Failed to fetch company settings');
                }
            } catch (err) {
                setError('Error fetching data');
            }
            setLoading(false);
        };

        fetchCompanySettings();
    }, []);

    if (loading) {
        return <div className="flex justify-center items-center h-screen text-lg text-gray-600">Loading...</div>;
    }

    if (error) {
        return <div className="flex justify-center items-center h-screen text-red-500">{error}</div>;
    }

    const handleSave = async () => {
        const updatedSettings = {
            ...companySettings,
            employeeCode: employeeCode || null, // 로그인된 사원의 사원 코드
        };

        try {
            const response = await fetch('http://localhost:8080/api/company-settings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedSettings),
            });
            if (response.ok) {
                alert('Company settings updated successfully');
                setIsEditing(false);  // 저장 후 폼을 닫음
            } else {
                alert('Failed to update company settings');
            }
        } catch (err) {
            console.error('Error saving data:', err);
            alert('Error saving data');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCompanySettings((prevSettings) => ({
            ...prevSettings,
            [name]: value,
        }));
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-gray-100 py-10 px-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
                <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">근태 시간 및 위치 정보</h1>
                {isEditing ? (
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-600">회사명</label>
                            <input
                                type="text"
                                name="companyName"
                                value={companySettings?.companyName || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md bg-gray-100 text-gray-600 focus:ring focus:ring-indigo-300 focus:border-indigo-500 cursor-not-allowed"
                                disabled  // 수정 불가
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">출근 시각</label>
                            <input
                                type="time"
                                name="checkInTime"
                                value={companySettings?.checkInTime || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">퇴근 시각</label>
                            <input
                                type="time"
                                name="checkOutTime"
                                value={companySettings?.checkOutTime || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">회사 위도</label>
                            <input
                                type="number"
                                name="locationLatitude"
                                value={companySettings?.locationLatitude || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">회사 경도</label>
                            <input
                                type="number"
                                name="locationLongitude"
                                value={companySettings?.locationLongitude || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-600">유효 범위 시간 (분)</label>
                            <input
                                type="number"
                                name="validTimeRangeInMinutes"
                                value={companySettings?.validTimeRangeInMinutes || ''}
                                onChange={handleChange}
                                className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring focus:ring-indigo-300 focus:border-indigo-500"
                            />
                        </div>

                        <div className="text-center">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                ) : (
                    <div className="space-y-4">
                        <p className="text-sm"><span className="font-semibold">회사명:</span> {companySettings.companyName}</p>
                        <p className="text-sm"><span className="font-semibold">출근 시각:</span> {companySettings.checkInTime}</p>
                        <p className="text-sm"><span className="font-semibold">퇴근 시각:</span> {companySettings.checkOutTime}</p>
                        <p className="text-sm"><span className="font-semibold">회사 위도:</span> {companySettings.locationLatitude}</p>
                        <p className="text-sm"><span className="font-semibold">회사 경도:</span> {companySettings.locationLongitude}</p>
                        <p className="text-sm"><span className="font-semibold">유효 범위 시간 (분):</span> {companySettings.validTimeRangeInMinutes}</p>
                        <div className="text-center">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 focus:outline-none focus:ring focus:ring-indigo-300"
                            >
                                Edit
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CompanySettingsPage;