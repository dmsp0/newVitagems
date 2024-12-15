import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import vitagemsLogo from '../assets/img/VITAGEMS_logo-removebg-preview.png';

const Home = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [idError, setIdError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(''); // 성공 메시지 상태 추가
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();

    setError('');
    setSuccessMessage(''); // 성공 메시지를 초기화

    let isValid = true;

    if (!id) {
      setIdError(true);
      isValid = false;
    } else {
      setIdError(false);
    }

    if (!password) {
      setPasswordError(true);
      isValid = false;
    } else {
      setPasswordError(false);
    }

    if (isValid) {
      try {
        const response = await fetch("http://localhost:8080/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            employeeCode: id,
            employeePassword: password 
          }),
        });
        const data = await response.json();
        if (response.ok) {
          const { employeeName, authorityDisplayName, employeeCode, token } = data;
          setSuccessMessage(`환영합니다, ${employeeName}님!`); // 성공 메시지 설정
          localStorage.setItem('token', token);
          localStorage.setItem('userName', employeeName);
          localStorage.setItem('authority', authorityDisplayName);
          localStorage.setItem('employeeCode', employeeCode);
          setTimeout(() => navigate('/Main'), 2000); // 2초 후 페이지 이동
        } else {
          setError(data.message || "Login failed");
        }
      } catch (error) {
        setError("An error occurred during login.");
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-vitagems-navy">
      <section className="p-8 w-full max-w-sm">
        <h1 className="text-center mb-10">
          <img src={vitagemsLogo} alt="VITAGEMS Logo" className="mx-auto w-50 mb-4" />
          <p className="text-white text-lg">choongang company</p>
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative flex flex-col">
            <input
              type="text"
              name="id"
              id="id"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className={`px-4 mb-3 py-4 text-white placeholder-transparent bg-transparent border-b focus:outline-none transition-all duration-200 ${
                idError ? 'border-red-500' : id ? 'border-green-500' : 'border-gray-400'
              }`}
              placeholder="EMPLOYEE CODE"
            />
            <label
              htmlFor="id"
              className={`absolute left-4 top-2 transition-all duration-300 pointer-events-none ${
                id ? 'text-s -top-6' : 'text-sm'
              } ${idError ? 'text-red-500' : id ? 'text-green-500' : 'text-gray-400'}`}
            >
              EMPLOYEE CODE
            </label>
            {idError && <p className="text-red-500 text-xs mt-1">이 입력란을 작성하세요.</p>}
          </div>

          <div className="relative flex flex-col">
            <input
              type="password"
              name="pw"
              id="pw"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`px-4 py-4 text-white placeholder-transparent bg-transparent border-b focus:outline-none transition-all duration-200 ${
                passwordError ? 'border-red-500' : password ? 'border-green-500' : 'border-gray-400'
              }`}
              placeholder="PASSWORD"
            />
            <label
              htmlFor="pw"
              className={`absolute left-4 top-2 transition-all duration-200 pointer-events-none ${
                password ? 'text-s -top-6' : 'text-sm'
              } ${passwordError ? 'text-red-500' : password ? 'text-green-500' : 'text-gray-400'}`}
            >
              PASSWORD
            </label>
            {passwordError && <p className="text-red-500 text-xs mt-1">이 입력란을 작성하세요.</p>}
          </div>

          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-blue-600 text-white text-lg font-semibold px-6 py-2 rounded-full w-full hover:bg-blue-500 transition duration-200"
            >
              LOGIN
            </button>
          </div>

          {/* 에러 메시지 표시 */}
          {error && <p className="text-red-500 text-center mt-4">{error}</p>}

          {/* 성공 메시지 표시 */}
          {successMessage && <p className="text-green-500 text-center mt-4">{successMessage}</p>}

        </form>

        <div className="mt-6 text-center">
          <a href="/" className="text-sm text-gray-400 hover:text-white transition duration-200">
            Forgot Password?
          </a>
        </div>
      </section>
    </div>
  );
};

export default Home;
