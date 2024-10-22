package com.newVitagems.service;

import com.newVitagems.entity.Employee;
import com.newVitagems.repository.EmployeeRepository;
import com.newVitagems.request.LoginRequest;
import com.newVitagems.response.LoginResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public LoginResponse login(LoginRequest loginRequest) {
        // 사원 코드로 사원 존재 여부 확인
        Optional<Employee> optionalEmployee = employeeRepository.findExistByEmployeeCode(loginRequest.getEmployeeCode());

        // 사원 코드가 존재하지 않는 경우
        if (!optionalEmployee.isPresent()) {
            return new LoginResponse("존재하지 않는 사원코드입니다.", null, null);
        }

        Employee employee = optionalEmployee.get();

        // 암호화된 비밀번호 비교
        if (!passwordEncoder.matches(loginRequest.getEmployeePassword(), employee.getEmployeePassword())){
            return new LoginResponse("사원코드 또는 비밀번호를 확인하세요.", null, null);
        }

        // Authority 값이 enum 타입으로 설정된 경우, 한글로 변환
        String authorityDisplayName;
        switch (employee.getAuthority()) {
            case admin:
                authorityDisplayName = "관리자";
                break;
            case user:
                authorityDisplayName = "사원";
                break;
            default:
                authorityDisplayName = "알 수 없는 권한";
                break;
        }

        // 성공 시 메시지 반환
        return new LoginResponse("로그인 성공!", employee.getEmployeeName(), authorityDisplayName);
    }
}
