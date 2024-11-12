import React, { useEffect, useState} from 'react';
// import { useNavigate } from 'react-router-dom';
import EmployeeInfoForm from '../components/EmployeeInfoForm';
import PasswordResetModal from '../Modals/PasswordResetModal';

const MyPage = () => {
    //const navigate = useNavigate();
    const employeeCode = localStorage.getItem('employeeCode');
    const [employee, setEmployee] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isEmailEditable, setIsEmailEditable] = useState(false);
    const [tempPhoto, setTempPhoto] = useState(null);
    const [updatedFields, setUpdatedFields] = useState({});
    const [verificationCode, setVerificationCode] = useState('');
    const [enteredCode, setEnteredCode] = useState('');
    const [verificationTimeLeft, setVerificationTimeLeft] = useState(0);
    const [isTimerActive, setIsTimerActive] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchEmployeeDetails = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:8080/api/employee/${employeeCode}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            }
        });
    
        if (response.ok) {
            const data = await response.json();
            setEmployee(data);
        } else {
            console.error('프로필 데이터를 가져오는 데 실패했습니다.');
        }
    };
    
    // useEffect에서 함수 호출
    useEffect(() => {
        fetchEmployeeDetails();
    }, [employeeCode]);

    useEffect(() => {
        let timer;
        if (isTimerActive && verificationTimeLeft > 0) {
            timer = setInterval(() => {
                setVerificationTimeLeft((prevTime) => {
                    if (prevTime > 1) {
                        return prevTime - 1;
                    } else {
                        clearInterval(timer);
                        setIsTimerActive(false);
                        setVerificationCode('');
                        alert('인증 코드가 만료되었습니다. 다시 요청해주세요.');
                        return 0;
                    }
                });
            }, 1000);
        } else if (verificationTimeLeft === 0) {
            setIsTimerActive(false);
        }
    
        return () => clearInterval(timer);
    }, [isTimerActive, verificationTimeLeft]);
    
    

    const handleEditToggle = () => setIsEditable((prev) => !prev);

    const onEmailEditToggle = () => setIsEmailEditable(true);

    const onEmailEditCancel = () => {
        setIsEmailEditable(false);
        setIsTimerActive(false); // 타이머 중지
        setVerificationTimeLeft(0); // 남은 시간 초기화
        setVerificationCode(''); // 인증 코드 초기화
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

    const onSendVerificationCode = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch('http://localhost:8080/api/employee/send-code', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({
                    employeeCode: employeeCode,
                    email: employee.email,
                }),
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('Verification code sent:', data.message);
                setVerificationCode(data.code);
                const expirationMinutes = data.expirationMinutes;
                setVerificationTimeLeft(expirationMinutes * 60);
                setIsTimerActive(true); // 타이머 활성화
                alert(data.message);
            } else {
                const errorMessage = await response.text();
                console.error('Error response:', errorMessage);
                alert('인증 코드 발송에 실패했습니다.');
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
            alert('네트워크 오류가 발생했습니다.');
        }
    };
    
    

    const formatTime = (time) => {
        if (time <= 0) return '만료됨';
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    };
    

    const handleVerifyCode = async() => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/api/employee/verify-code',{
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'Authorization' : `Bearer ${token}`,
            },
            body: JSON.stringify({
                employeeCode: employeeCode,
                verificationCode: enteredCode
            })
        });

        const result = await response.text();

        if (response.ok){
            alert('인증이 완료되었습니다.');
            setIsEmailEditable(false);
            setIsTimerActive(false); // 타이머 중지
            setVerificationTimeLeft(0); // 타이머 초기화
        } else {
            alert(result);
        }
    };

    const handleSave = async () => {
        if (isEmailEditable && enteredCode !== verificationCode) {
            alert('이메일 인증이 완료되지 않았습니다.');
            return;
        }
    
        const token = localStorage.getItem('token');
    
        // 1. 프로필 상세 정보 수정 (PATCH 요청)
        const profileResponse = await fetch(`http://localhost:8080/api/employee/${employeeCode}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify(updatedFields),
        });
    
        // 2. 프로필 정보가 성공적으로 업데이트된 경우
        if (profileResponse.ok) {
            alert('프로필 정보가 수정되었습니다.');
            setIsEditable(false);
    
            // 3. 새로운 사진이 선택된 경우에만 사진 업로드 (POST 요청)
            const fileInput = document.querySelector('input[type="file"]');
            if (fileInput && fileInput.files[0]) {
                const formData = new FormData();
                formData.append('photo', fileInput.files[0]);
    
                const photoResponse = await fetch(`http://localhost:8080/api/employee/${employeeCode}/upload-photo`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                });
    
                if (photoResponse.ok) {
                    alert('사진이 업로드되었습니다.');
                    setTempPhoto(null); // 임시 사진 초기화
                } else {
                    const errorMessage = await photoResponse.text();
                    console.error('사진 업로드 실패:', errorMessage);
                    alert('사진 업로드에 실패했습니다.');
                }
            }
    
            // 최신 프로필 정보 다시 가져오기
            fetchEmployeeDetails();
        } else {
            const errorMessage = await profileResponse.text();
            console.error('프로필 수정 실패:', errorMessage);
            alert('프로필 수정에 실패했습니다.');
        }
    };
    

    const handleCancel = () => {
        setIsEditable(false);
        setIsEmailEditable(false);
        setTempPhoto(null);
        setVerificationTimeLeft(0);
        setVerificationCode('');
        setIsTimerActive(false);
    };

    // const handlePasswordReset = () => {
    //     // 모달 창을 열기 위해 해당 페이지로 이동
    //     navigate('/ResetPassword');
    // };

    const openResetPasswordModal = () => {
        setIsModalOpen(true);
        };
    
      // 모달 닫기 함수
    const closeResetPasswordModal = () => {
        setIsModalOpen(false);
        };
    

    return (
        <>
        {employee && (
        <EmployeeInfoForm 
            employee={employee}
            tempPhoto={tempPhoto}
            isEditable={isEditable}
            isSelf={true}
            isEmailEditable={isEmailEditable}
            onChange={handleChange}
            onPhotoSelection={handlePhotoSelection}
            onSave={handleSave}
            onCancel={handleCancel}
            onEditToggle={handleEditToggle}
            onEmailEditCancel={onEmailEditCancel}
            onEmailEditToggle={onEmailEditToggle}
            onSendVerificationCode={onSendVerificationCode}
            verificationCode={verificationCode}
            enteredCode={enteredCode}
            setEnteredCode={setEnteredCode}
            handleVerifyCode={handleVerifyCode}
            verificationTimeLeft={formatTime(verificationTimeLeft)}  // 남은 시간 프롭으로 전달
            isTimerActive={isTimerActive}
            //onClick={handlePasswordReset}
            openResetPasswordModal={openResetPasswordModal}
        />
        )}
            {isModalOpen && (
                <PasswordResetModal 
                    onClose={closeResetPasswordModal}
                    employeeCode={employeeCode}    
                />
            )}
    </>
    );
};

export default MyPage;