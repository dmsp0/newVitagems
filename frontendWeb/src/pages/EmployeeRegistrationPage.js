import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// 컴포넌트 임포트
import InputField from '../components/InputField';
import RadioGroup from '../components/RadioGroup';
import SelectField from '../components/SelectField';

const EmployeeRegistration = () => {
  const [employeeName, setEmployeeName] = useState('');
  const [birthday, setBirthday] = useState('');
  const [gender, setGender] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [department, setDepartment] = useState('개발');
  const [employeeRank, setEmployeeRank] = useState('사원');
  const [authority, setAuthority] = useState('');
  const [joinDate, setJoinDate] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const navigate = useNavigate();

  // 폼 유효성 검사
  useEffect(() => {
    const isValid =
      employeeName &&
      birthday &&
      gender &&
      phoneNum.match(/^\d{3}-\d{4}-\d{4}$/) &&
      department &&
      employeeRank &&
      authority &&
      joinDate;
    setIsFormValid(isValid);
  }, [employeeName, birthday, gender, phoneNum, department, employeeRank, authority, joinDate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      employeeName,
      birthday,
      gender,
      phoneNum,
      department,
      employeeRank,
      authority,
      joinDate,
    };

    try {
      const response = await fetch('http://localhost:8080/api/employee/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(employeeData),
      });
  
      // 상태 코드가 200-299 이외일 경우 에러 처리
      if (!response.ok) {
        const errorData = await response.json(); // 백엔드에서 반환된 에러 메시지를 가져옴
        throw new Error(errorData.message);
      }
  
      alert('사원 등록 성공');
      navigate('/EmployeeManagement');
    } catch (error) {
      alert(error.message); // 에러 메시지를 사용자에게 알림
    }
  };

  // 전화번호 정규식 처리
  const handlePhoneNumChange = (e) => {
    const value = e.target.value;
    const formattedValue = value
      .replace(/[^0-9]/g, '')
      .replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    setPhoneNum(formattedValue);
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-gray-50 rounded-lg shadow-lg mt-12">
      <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">사원 등록</h2>
      <p className='text-red-500 text-left mb-4 pl-10'>※ 모든 정보 필수 입력 </p>
      <form onSubmit={handleSubmit} className="space-y-6">

        {/* 이름 입력 */}
        <InputField
          label="이름"
          type="text"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          placeholder="이름을 입력하세요"
        />

        {/* 생년월일 입력 */}
        <InputField
          label="생년월일"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />

        {/* 성별 라디오 버튼 */}
        <RadioGroup
          label="성별"
          options={['남자', '여자']}
          selectedValue={gender}
          onChange={(e) => setGender(e.target.value)}
        />

        {/* 전화번호 입력 */}
        <InputField
          label="전화번호"
          type="text"
          value={phoneNum}
          onChange={handlePhoneNumChange}
          placeholder="000-0000-0000"
        />

        {/* 부서와 직급 선택 */}
        <div className="flex space-x-4 justify-around">
          {/* 부서 선택 */}
          <SelectField
            label="부서"
            value={department}
            options={[
              { label: '개발', value: '개발' },
              { label: '인사', value: '인사' },
              { label: '마케팅', value: '마케팅' },
            ]}
            onChange={(e) => setDepartment(e.target.value)}
          />

          {/* 직급 선택 */}
          <SelectField
            label="직급"
            value={employeeRank}
            options={[
              { label: '사원', value: '사원' },
              { label: '대리', value: '대리' },
              { label: '과장', value: '과장' },
              { label: '차장', value: '차장' },
              { label: '부장', value: '부장' },
            ]}
            onChange={(e) => setEmployeeRank(e.target.value)}
          />
        </div>

        {/* 계정 권한 라디오 버튼 */}
        <RadioGroup
          label="계정 권한"
          options={['관리자', '사원', '마스터']}
          selectedValue={authority}
          onChange={(e) => setAuthority(e.target.value)}
        />

        {/* 입사일 입력 */}
        <InputField
          label="입사일"
          type="date"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
        />

        {/* 등록 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-2 px-4 rounded-md transition duration-200 ${
              isFormValid
                ? 'bg-indigo-600 text-white hover:bg-indigo-500'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            등록
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeRegistration;
