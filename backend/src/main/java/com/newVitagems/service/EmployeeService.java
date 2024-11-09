package com.newVitagems.service;

import com.newVitagems.entity.EmailVerification;
import com.newVitagems.entity.Employee;
import com.newVitagems.enums.*;
import com.newVitagems.repository.EmailVerificationRepository;
import com.newVitagems.repository.EmployeeRepository;
import com.newVitagems.request.EmployeeRegistrationRequest;
import com.newVitagems.response.EmployeeDetailInformationResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.newVitagems.dto.EmployeeInfoDto;


import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepository employeeRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public String registerEmployee(EmployeeRegistrationRequest request) throws Exception {
        // String으로 넘어온 생년월일 및 입사일을 LocalDate로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        LocalDate birthday = LocalDate.parse(request.getBirthday(), formatter);
        LocalDate joinDate = LocalDate.parse(request.getJoinDate(), formatter);

        // 성별 변환 (남자 -> 남, 여자 -> 여)
        Gender gender = "남자".equals(request.getGender()) ? Gender.남 : Gender.여;

        // 부서 변환
        Department department = switch (request.getDepartment()) {
            case "개발" -> Department.DV; // "개발"을 DV로 매핑
            case "인사" -> Department.MN; // "인사"를 MN으로 매핑
            case "마케팅" -> Department.MK; // "마케팅"을 MK로 매핑
            default -> throw new IllegalArgumentException("Invalid department");
        };

        // 권한 변환
        Authority authority = switch (request.getAuthority()){
            case "사원" -> Authority.user;
            case "관리자" -> Authority.admin;
            case "마스터" -> Authority.master;
            default -> throw new IllegalArgumentException("Invalid department");
        };

        // 전화번호 중복 확인 후 예외 던지기
        if (employeeRepository.existsByPhoneNum(request.getPhoneNum())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "이미 등록된 전화번호입니다.");
        }

        // 사원 정보 저장 (트리거에 의해 평문 비밀번호 및 사원 코드가 자동 생성됨)
        Employee employee = new Employee(
                "TEMP_CODE", // employeeCode는 트리거로 생성
                request.getEmployeeName(),
                birthday,
                request.getPhoneNum(),
                department,
                EmployeeRank.valueOf(request.getEmployeeRank()), // 직급은 한글 그대로 저장
                joinDate,
                null, // 평문 비밀번호는 트리거로 생성됨
                gender,
                null, // 주소, 초기에 입력되지 않음
                null, //  은행
                null, // 은행 계좌 번호, 초기값 없음
                null, // 이메일
                null, // 이미지 경로, 이번에는 이미지가 없으므로 null로 설정
                authority
        );

        // 사원을 저장하여 트리거가 실행되도록 함
        employeeRepository.save(employee);

        // 트리거가 생성한 사원 정보를 다시 조회
        // employeeCode를 트리거로 생성하기 때문에 employeeCode를 null로 설정한 상태로 employeeRepository.save(employee) 호출 후 바로 조회할 수 없습니다.
        // 따라서, employeeRepository에서 employeeCode를 직접 조회하는 로직이 필요합니다.
        Employee savedEmployee = employeeRepository.findByEmployeeNameAndJoinDate(request.getEmployeeName(), joinDate)
                .orElseThrow(() -> new Exception("사원 정보 저장 후 조회 실패"));

        // 생성된 평문 비밀번호를 암호화
        String plainPassword = savedEmployee.getEmployeePassword(); // 트리거에서 생성된 평문 비밀번호
        String encryptedPassword = passwordEncoder.encode(plainPassword); // 비밀번호 암호화

        // 암호화된 비밀번호로 업데이트
        savedEmployee.setEmployeePassword(encryptedPassword);
        employeeRepository.save(savedEmployee);

        return savedEmployee.getEmployeeCode();  // 생성된 사원 코드를 반환
    }

    // 모든 사원 정보를 조회하는 메서드
    public List<EmployeeInfoDto> getAllEmployees() {
        List<Employee> employees = employeeRepository.findAll();
        return employees.stream()
                .map(employee -> new EmployeeInfoDto(
                        employee.getDepartment().toString(),
                        employee.getEmployeeName(),
                        employee.getEmployeeRank(),
                        employee.getPhoneNum(),
                        employee.getBirthday(),
                        employee.getJoinDate(),
                        employee.getEmployeeCode()
                ))
                .collect(Collectors.toList());
    }

    // 해당 사원의 상세 정보를 조회하는 메서드
    public EmployeeDetailInformationResponse getEmployeeDetails(String employeeCode) {
        Employee employee = employeeRepository.findDetailInfoByEmployeeCode(employeeCode);
        if (employee == null) {
            return employee != null ? convertToDto(employee) : null;
        }
        // Employee 엔티티를 DTO로 변환하여 반환
        return convertToDto(employee);
    }

    private EmployeeDetailInformationResponse convertToDto(Employee employee) {
        String serverUrl = "http://localhost:8080";  // 배포 시 실제 도메인으로 변경 필요
        String defaultPhotoPath = "/images/default-profile.png";

        // 이미지 경로를 URL로 변환
        String photoUrl = (employee.getEmployeePhoto() != null && !employee.getEmployeePhoto().isEmpty())
                ? serverUrl + employee.getEmployeePhoto()
                : serverUrl + defaultPhotoPath;
        return new EmployeeDetailInformationResponse(
                "해당 사원 정보를 성공적으로 가져왔습니다.", // 메시지 필드
                employee.getEmployeeCode(),
                employee.getEmployeeName(),
                employee.getBirthday(),
                employee.getPhoneNum(),
                employee.getDepartment(),
                employee.getEmployeeRank(),
                employee.getJoinDate(),
                employee.getGender(),
                employee.getAddress(),
                employee.getBank(),
                employee.getBankAccountNum(),
                employee.getEmail(),
                photoUrl,
                employee.getAuthority()
        );
    }


    @Autowired
    private EmailVerificationRepository verificationRepository;

    // 이메일 업데이트 메서드
    public boolean updateEmail(String employeeCode, String newEmail) {
        // 이메일 인증 여부 확인
        Optional<EmailVerification> optionalVerification = verificationRepository.findByEmailAndIsVerifiedTrue(newEmail);

        if (optionalVerification.isPresent()) {
            // 인증 완료된 경우에만 업데이트
            Optional<Employee> optionalEmployee = employeeRepository.findById(employeeCode);
            if (optionalEmployee.isPresent()) {
                Employee employee = optionalEmployee.get();
                employee.setEmail(newEmail);
                employeeRepository.save(employee);
                return true;
            }
        }
        return false;
    }


}
