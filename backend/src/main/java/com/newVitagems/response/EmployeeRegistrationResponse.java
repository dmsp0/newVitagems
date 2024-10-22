package com.newVitagems.response;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRegistrationResponse {
    private String message;       // 응답 메시지 (예: 사원 등록 성공 또는 실패)
    private String employeeCode;  // 생성된 사원 코드 (자동 생성)
}
