import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import InputField from '../components/InputField';
import RadioGroup from '../components/RadioGroup';
import SelectField from '../components/SelectField';

const EmployeeInfoDetailPage = () => {
    const { employeeCode } = useParams();
    const [employee, setEmployee] = useState(null);
    const [isEditable, setIsEditable] = useState(false);

    useEffect(() => {
        const fetchEmployeeDetails = async () => {
            const response = await fetch(`http://localhost:8080/api/employee/${employeeCode}`);
            if (response.ok) {
                const data = await response.json();
                setEmployee(data);
            } else {
                alert('사원 정보를 가져오는 데 실패했습니다.');
            }
        };

        fetchEmployeeDetails();
    }, [employeeCode]);

    const handleEditToggle = () => {
        setIsEditable((prev) => !prev);
    };

    if (!employee) return <p className="text-center text-gray-500 mt-12">Loading...</p>;

    return (
        <div className="max-w-7xl mx-auto p-10 rounded-xl shadow-lg bg-white mt-12 border border-gray-300 flex gap-8">
            {/* 왼쪽: 사진 및 회사 관련 정보 */}
            <div className="w-1/2 bg-gray-50 p-6 rounded-lg flex flex-col items-center shadow-inner">
                {/* 프로필 이미지 표시 */}
                <div className="mb-10">
                    <img
                        src={employee.photoUrl || 'http://localhost:8080/images/default-profile.png'}
                        alt="Profile"
                        className="w-48 h-48 rounded-full object-cover border-4 border-indigo-100"
                    />
                </div>

                <InputField label="사원번호" type="text" value={employee.employeeCode} disabled placeholder="사원번호" />
                <div className='flex'>
                <SelectField
                    label="부서"
                    value={employee.department}
                    options={[
                        { label: '개발', value: '개발' },
                        { label: '마케팅', value: '마케팅' },
                        { label: '인사', value: '인사' },
                    ]}
                    disabled
                />
                <SelectField
                    label="직급"
                    value={employee.employeeRank}
                    options={[
                        { label: '사원', value: '사원' },
                        { label: '대리', value: '대리' },
                        { label: '과장', value: '과장' },
                        { label: '차장', value: '차장' },
                        { label: '부장', value: '부장' },
                    ]}
                    disabled
                />
                </div>

                
                <SelectField
                    label="은행"
                    value={employee.bank}
                    options={[
                        { label: '----', value: '' },
                        { label: 'KB국민', value: 'KB국민' },
                        { label: '신한', value: '신한' },
                        { label: '우리', value: '우리' },
                        { label: '하나', value: '하나' },
                        { label: 'IBK기업', value: 'IBK기업' },
                        { label: '농협', value: '농협' },
                    ]}
                    disabled
                />
                <InputField
                    label="계좌번호"
                    type="text"
                    value={employee.bankAccountNum || '--------'}
                    disabled
                    placeholder="계좌번호"
                />
                
                
            </div>

            {/* 오른쪽: 개인 상세 정보 */}
            <div className="w-2/3">
                <h2 className="text-2xl font-semibold text-indigo-700 mb-8 text-center">사원 상세 정보</h2>

                <div className="space-y-4">
                    <InputField label="이름" type="text" value={employee.employeeName} disabled placeholder="사원이름" />
                    <InputField label="생년월일" type="date" value={employee.birthday} disabled placeholder="생년월일" />
                    <RadioGroup
                        label="성별"
                        options={['남자', '여자']}
                        selectedValue={employee.gender === '남' ? '남자' : '여자'}
                        disabled
                    />
                    <InputField label="이메일" type="email" value={employee.email || '--------'} disabled placeholder="--------" />
                    <InputField label="전화번호" type="text" value={employee.phoneNum} disabled placeholder="전화번호" />
                    <InputField label="주소" type="text" value={employee.address || '--------'} disabled placeholder="--------" />
                    <RadioGroup
                        label="계정 권한"
                        options={['관리자', '사원', '마스터']}
                        selectedValue={employee.authority === 'admin' ? '관리자' : employee.authority === 'user' ? '사원' : '마스터'}
                        disabled
                    />
                </div>

                <div className="text-center mt-8">
                    <button
                        onClick={handleEditToggle}
                        className={`w-32 py-2 rounded-full text-white font-semibold transition ${isEditable ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-gray-400 hover:bg-gray-300'}`}
                    >
                        {isEditable ? '저장' : '수정하기'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default EmployeeInfoDetailPage;
