import React, { useState, useEffect } from 'react';
import InputField from '../components/InputField';

function PasswordResetModal({ onClose, employeeCode }) {
  const [email, setEmail] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordMatchMessage, setPasswordMatchMessage] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);

  // 비밀번호 유효성 정규식: 영문, 숫자, 특수문자를 포함한 8자리 이상
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

  // 비밀번호 일치 여부를 실시간으로 확인
  useEffect(() => {
    if (confirmPassword) {
      if (newPassword !== confirmPassword) {
        setPasswordMatchMessage('비밀번호가 일치하지 않습니다.');
        setPasswordMatch(false);
      } else {
        setPasswordMatchMessage('비밀번호가 일치합니다.');
        setPasswordMatch(true);
      }
    } else {
      setPasswordMatchMessage('');
      setPasswordMatch(false);
    }
  }, [newPassword, confirmPassword]);

  // 이메일 확인 요청 함수
  const verifyEmail = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/employee/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ employeeCode, email }),
      });

      const result = await response.json();
      if (response.ok) {
        if (result.exists) {
          setIsEmailVerified(true);
          setEmailError('');
        } else {
          setEmailError('이메일이 등록되지 않았습니다.');
        }
      } else {
        setEmailError('서버 오류가 발생했습니다.');
      }
    } catch (error) {
      setEmailError('네트워크 오류가 발생했습니다.');
    }
  };

  // 비밀번호 재설정 함수
  const handlePasswordReset = async (e) => {
    e.preventDefault();

    if (!passwordRegex.test(newPassword)) {
      setPasswordError('비밀번호는 영문, 숫자, 특수문자를 포함한 8자리 이상이어야 합니다.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPasswordMatchMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/api/employee/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({ employeeCode, newPassword }),
      });

      if (response.ok) {
        alert('비밀번호가 성공적으로 변경되었습니다.');
        onClose();
      } else {
        alert('비밀번호 변경에 실패했습니다.');
      }
    } catch (error) {
      alert('네트워크 오류가 발생했습니다.');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-1/3">
        <h2 className="text-2xl font-semibold text-center mb-6">비밀번호 재설정</h2>

        {/* 이메일 확인 섹션 */}
        {!isEmailVerified && (
          <div className="space-y-4">
            <InputField
              label="이메일"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일을 입력하세요"
            />
            {emailError && <p className="text-red-600">{emailError}</p>}
            <button
              onClick={verifyEmail}
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
            >
              이메일 확인
            </button>
          </div>
        )}

        {/* 비밀번호 재설정 섹션 */}
        {isEmailVerified && (
          <form onSubmit={handlePasswordReset} className="space-y-4 mt-6">
            <InputField
              label="새 비밀번호"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="영문, 숫자, 특수문자 포함 8자리 이상"
            />
            {newPassword && !passwordRegex.test(newPassword) && (
              <p className="text-red-600">영문, 숫자, 특수문자 포함 8자리 이상이어야 합니다.</p>
            )}

            <InputField
              label="비밀번호 확인"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="새 비밀번호 확인"
            />
            
            {/* 비밀번호 일치 여부 메시지 */}
            {passwordMatchMessage && (
              <p className={newPassword === confirmPassword ? 'text-green-500' : 'text-red-600'}>
                {passwordMatchMessage}
              </p>
            )}

            <div className="flex justify-between mt-6">
              {passwordMatch &&
                <button
                  type="submit"
                  className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700"
                >
                  비밀번호 재설정
                </button>
              }
              <button
                type="button"
                onClick={onClose}
                className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500"
              >
                닫기
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default PasswordResetModal;
