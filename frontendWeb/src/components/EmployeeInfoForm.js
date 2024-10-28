import React from 'react';
import InputField from '../components/InputField';
import RadioGroup from '../components/RadioGroup';
import SelectField from '../components/SelectField';

const EmployeeInfoForm = ({ 
    employee, 
    tempPhoto, 
    isEditable, 
    isSelf, 
    onChange, 
    onPhotoSelection, 
    onSave, 
    onCancel, 
    onEditToggle 
}) => (
    <div className="max-w-7xl mx-auto p-10 rounded-xl shadow-lg bg-white mt-12 border border-gray-300 flex gap-8">
        <div className="w-1/2 bg-gray-50 p-6 rounded-lg flex flex-col items-center shadow-inner">
            <div className="mb-10">
                <img
                    src={tempPhoto || `${employee.employeePhoto}?t=${new Date().getTime()}` || 'http://localhost:8080/images/default-profile.png'}
                    alt="Profile"
                    className="w-48 h-48 rounded-full object-cover border-4 border-indigo-100"
                />
                {isSelf && isEditable && (
                    <input
                        type="file"
                        onChange={onPhotoSelection}
                        className="mt-4"
                        accept="image/*"
                    />
                )}
            </div>

            <InputField label="사원번호" type="text" value={employee.employeeCode} disabled placeholder="사원번호" />
            <div className="flex">
                <SelectField
                    label="부서"
                    name="department"
                    value={employee.department}
                    options={[
                        { label: '개발', value: '개발' },
                        { label: '마케팅', value: '마케팅' },
                        { label: '인사', value: '인사' },
                    ]}
                    onChange={onChange}
                    disabled={!isEditable || isSelf}
                />
                <SelectField
                    label="직급"
                    name="employeeRank"
                    value={employee.employeeRank}
                    options={[
                        { label: '사원', value: '사원' },
                        { label: '대리', value: '대리' },
                        { label: '과장', value: '과장' },
                        { label: '차장', value: '차장' },
                        { label: '부장', value: '부장' },
                    ]}
                    onChange={onChange}
                    disabled={!isEditable || isSelf}
                />
            </div>

            <SelectField
                label="은행"
                name="bank"
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
                onChange={onChange}
                disabled={!isEditable || !isSelf}
            />
            <InputField
                label="계좌번호"
                type="text"
                name="bankAccountNum"
                value={employee.bankAccountNum || ''}
                onChange={onChange}
                disabled={!isEditable || !isSelf}
                placeholder="계좌번호"
            />
        </div>

        <div className="w-2/3">
            <h2 className="text-2xl font-semibold text-indigo-700 mb-8 text-center">{employee.employeeName} 상세 정보</h2>

            <div className="space-y-4">
                <InputField label="이름" type="text" name="employeeName" value={employee.employeeName} onChange={onChange} disabled={!isEditable || !isSelf} placeholder="사원이름" />
                <InputField label="생년월일" type="date" name="birthday" value={employee.birthday} onChange={onChange} disabled placeholder="생년월일" />
                <RadioGroup
                    label="성별"
                    name="gender"
                    options={['남자', '여자']}
                    selectedValue={employee.gender === '남' ? '남자' : '여자'}
                    onChange={(e) => onChange({ target: { name: 'gender', value: e.target.value === '남자' ? '남' : '여' } })}
                    disabled
                />
                <InputField label="이메일" type="email" name="email" value={employee.email || ''} onChange={onChange} disabled={!isEditable || !isSelf} placeholder="--------" />
                <InputField label="전화번호" type="text" name="phoneNum" value={employee.phoneNum} onChange={onChange} disabled={!isEditable} placeholder="전화번호" />
                <InputField label="주소" type="text" name="address" value={employee.address || ''} onChange={onChange} disabled={!isEditable} placeholder="--------" />
                <RadioGroup
                    label="계정 권한"
                    name="authority"
                    options={['관리자', '사원', '마스터']}
                    selectedValue={employee.authority === 'admin' ? '관리자' : employee.authority === 'user' ? '사원' : '마스터'}
                    onChange={(e) => onChange({ target: { name: 'authority', value: e.target.value === '관리자' ? 'admin' : e.target.value === '사원' ? 'user' : 'master' } })}
                    disabled={!isEditable || isSelf}
                />
            </div>

            <div className="text-center mt-8">
                {isEditable ? (
                    <>
                        <button
                            onClick={onSave}
                            className="w-32 py-2 mx-2 rounded-full bg-indigo-600 text-white font-semibold hover:bg-indigo-500"
                        >
                            저장
                        </button>
                        <button
                            onClick={onCancel}
                            className="w-32 py-2 mx-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-300"
                        >
                            취소
                        </button>
                    </>
                ) : (
                    <button
                        onClick={onEditToggle}
                        className="w-32 py-2 rounded-full bg-gray-400 text-white font-semibold hover:bg-gray-300"
                    >
                        수정하기
                    </button>
                )}
            </div>
        </div>
    </div>
);

export default EmployeeInfoForm;