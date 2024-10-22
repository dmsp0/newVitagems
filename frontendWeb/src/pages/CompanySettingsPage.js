import React, { useState, useEffect } from 'react';


const CompanySettingsPage  = () => {
    const [settings, setSettings] = useState(null);
    const [isInitialSetup, setIsInitialSetup] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchSettings = async () => {
        try{
            const response = await fetch('http://localhost:8080/api/company-settings');
            if(!response.ok) {
                throw new Error("Error fetching data");
            }
            const data = await response.json();
            if (data) {
                setSettings(data);
                setIsInitialSetup(false);
            } else {
              setIsInitialSetup(true);
            }
        } catch (error){
            console.error("Error fetching settings: ", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSettings();  // 컴포넌트가 마운트되면 설정 데이터 가져오기
    }, []);
    
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const SettingData = {
            checkInTime: e.target.checkInTime.value,
            checkOutTime: e.target.checkOutTime.value,
            validTimeRangeInMinutes: e.target.validTimeRangeInMinutes.value,
        };

        try {
            const requestOptions = {
                method: isInitialSetup ? 'POST' : 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(SettingData),
            };
    
            const response = await fetch('http://localhost:8080/api/company-settings', requestOptions);  // URL 수정 필요
            if (!response.ok) {
              throw new Error("Error saving settings");
            }
      
            const data = await response.json();
            setSettings(data);
      
            if (isInitialSetup) {
              setIsInitialSetup(false);  // 초기 설정 후 수정 모드로 변경
            }
      
          } catch (error) {
            console.error("Error saving settings:", error);
          }
        };
      
        if (loading) {
          return <div>로딩 중...</div>;
        }
      
        return (
          <div>
            {isInitialSetup ? (
              <h2>회사 근태 정보 초기 설정</h2>
            ) : (
              <h2>회사 근태 정보 설정 수정</h2>
            )}
      
            {/* 설정 폼 */}
            <form onSubmit={handleSubmit}>
              <label>출근 시간</label>
              <input type="time" name="checkInTime" defaultValue={settings?.checkInTime || ''} required />
              
              <label>퇴근 시간</label>
              <input type="time" name="checkOutTime" defaultValue={settings?.checkOutTime || ''} required />
              
              {/* 유효 범위 시간 */}
              <label>유효 범위 시간 (분)</label>
              <input type="number" name="validTimeRangeInMinutes" defaultValue={settings?.validTimeRangeInMinutes || 0} required />
      
              <button type="submit">{isInitialSetup ? '초기 설정 저장' : '수정 저장'}</button>
            </form>
          </div>
        );
      };

export default CompanySettingsPage;