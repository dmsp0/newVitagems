package com.newVitagems.controller;

import com.newVitagems.dto.EmployeeInfoDto;
import com.newVitagems.dto.TotalDefaultAttendanceDto;
import com.newVitagems.entity.Employee;
import com.newVitagems.enums.Authority;
import com.newVitagems.enums.Department;
import com.newVitagems.enums.EmployeeRank;
import com.newVitagems.repository.EmployeeRepository;
import com.newVitagems.request.EmployeeRegistrationRequest;
import com.newVitagems.response.EmployeeDetailInformationResponse;
import com.newVitagems.response.EmployeeRegistrationResponse;

import com.newVitagems.response.FindAllDefaultAttendanceResponse;
import com.newVitagems.response.FindAllEmployeeResponse;
import com.newVitagems.service.EmployeeService;

import com.newVitagems.service.TotalAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/employee/register")
    public ResponseEntity<EmployeeRegistrationResponse> registerEmployee(@RequestBody EmployeeRegistrationRequest request) {
        EmployeeRegistrationResponse response;
        try {
            String employeeCode = employeeService.registerEmployee(request);  // 사원 코드 반환
            response = new EmployeeRegistrationResponse("사원 등록 성공", employeeCode);
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            response = new EmployeeRegistrationResponse("사원 등록 실패: " + e.getMessage(), null);
            return ResponseEntity.badRequest().body(response); // 400 Bad Request
        } catch (Exception e) {
            response = new EmployeeRegistrationResponse("사원 등록 실패: " + e.getMessage(), null);
            return ResponseEntity.status(500).body(response); // 500 Internal Server Error
        }
    }

    // 모든 사원 정보를 반환하는 API
    @GetMapping("/employee/all")
    public ResponseEntity<FindAllEmployeeResponse> getAllEmployees() {
        List<EmployeeInfoDto> employees = employeeService.getAllEmployees();
        String message;
        // 부서 코드 변환
        employees.forEach(employee -> {
            switch (employee.getDepartment()) {
                case "DV":
                    employee.setDepartment("개발"); // DV -> 개발
                    break;
                case "MK":
                    employee.setDepartment("마케팅"); // MK -> 마케팅
                    break;
                case "MN":
                    employee.setDepartment("인사"); // MN -> 인사
                    break;
                default:
                    employee.setDepartment("알 수 없음"); // 기타 경우
                    break;
            }
        });
        // 데이터가 없을 경우 메시지와 함께 빈 리스트 반환
        if (employees.isEmpty()) {
            message = "사원정보가 없습니다.";
            return ResponseEntity.ok(new FindAllEmployeeResponse(message, List.of())); // 빈 리스트와 메시지 반환
        }

        message = "전체 사원 정보 조회 결과";
        return ResponseEntity.ok(new FindAllEmployeeResponse(message, employees)); // 메시지와 함께 직원 정보 리스트 반환
    }



    @Autowired
    private TotalAttendanceService totalAttendanceService;

    @GetMapping("/attendance/all")
    public ResponseEntity<FindAllDefaultAttendanceResponse> getAllDefaultAttendance() {
        List<TotalDefaultAttendanceDto> defaultAttendances = totalAttendanceService.getAlltotalDefaultAttendance();
        String message;

        if (defaultAttendances.isEmpty()) {
            message = "근태정보가 없습니다.";
            return ResponseEntity.ok(new FindAllDefaultAttendanceResponse(message, List.of()));
        }
        message = "전체 근태 정보 조회 결과";
        return ResponseEntity.ok(new FindAllDefaultAttendanceResponse(message, defaultAttendances));
    }


}
