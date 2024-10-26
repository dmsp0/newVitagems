package com.newVitagems.controller;

import com.newVitagems.dto.EmployeeInfoDto;
import com.newVitagems.entity.Employee;
import com.newVitagems.enums.Authority;
import com.newVitagems.enums.Department;
import com.newVitagems.enums.EmployeeRank;
import com.newVitagems.repository.EmployeeRepository;
import com.newVitagems.request.EmployeeRegistrationRequest;
import com.newVitagems.response.EmployeeDetailInformationResponse;
import com.newVitagems.response.EmployeeRegistrationResponse;

import com.newVitagems.response.FindAllEmployeeResponse;
import com.newVitagems.service.EmployeeService;

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
@RequestMapping("/api/employee")
public class EmployeeController {

    @Autowired
    private EmployeeService employeeService;

    @Autowired
    private EmployeeRepository employeeRepository;

    @PostMapping("/register")
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
    @GetMapping("/all")
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

    @GetMapping("/{employeeCode}")
    public ResponseEntity<EmployeeDetailInformationResponse> getEmployeeDetails(@PathVariable String employeeCode) {
        EmployeeDetailInformationResponse response = employeeService.getEmployeeDetails(employeeCode);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/{employeeCode}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable String employeeCode,
            @RequestBody Map<String, Object> updates) {

        // 기존 사원 정보 조회
        Employee employee = employeeRepository.findById(employeeCode)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "사원을 찾을 수 없습니다."));

        // 전달된 필드에 따라 업데이트
        if (updates.containsKey("employeeName")) {
            employee.setEmployeeName((String) updates.get("employeeName"));
        }
        if (updates.containsKey("phoneNum")) {
            employee.setPhoneNum((String) updates.get("phoneNum"));
        }
        if (updates.containsKey("department")) {
            String departmentValue = (String) updates.get("department");
            switch (departmentValue) {
                case "개발":
                    employee.setDepartment(Department.DV);
                    break;
                case "마케팅":
                    employee.setDepartment(Department.MK);
                    break;
                case "인사":
                    employee.setDepartment(Department.MN);
                    break;
                default:
                    throw new IllegalArgumentException("유효하지 않은 부서 값입니다: " + departmentValue);
            }
        }

        if (updates.containsKey("employeeRank")) {
            String employeeRankValue = (String) updates.get("employeeRank");
            switch (employeeRankValue) {
                case "사원":
                    employee.setEmployeeRank(EmployeeRank.사원);
                    break;
                case "대리":
                    employee.setEmployeeRank(EmployeeRank.대리);
                    break;
                case "과장":
                    employee.setEmployeeRank(EmployeeRank.과장);
                    break;
                case "차장":
                    employee.setEmployeeRank(EmployeeRank.차장);
                    break;
                case "부장":
                    employee.setEmployeeRank(EmployeeRank.부장);
                    break;
                default:
                    throw new IllegalArgumentException("유효하지 않은 직급 값입니다: " + employeeRankValue);
            }
        }
        if (updates.containsKey("bank")) {
            employee.setBank((String) updates.get("bank"));
        }
        if (updates.containsKey("bankAccountNum")) {
            employee.setBankAccountNum((String) updates.get("bankAccountNum"));
        }
        if (updates.containsKey("email")) {
            employee.setEmail((String) updates.get("email"));
        }
        if (updates.containsKey("address")) {
            employee.setAddress((String) updates.get("address"));
        }
        if (updates.containsKey("authority")) {
            String authorityValue = (String) updates.get("authority");
            switch (authorityValue) {
                case "사원":
                    employee.setAuthority(Authority.user);
                    break;
                case "관리자":
                    employee.setAuthority(Authority.admin);
                    break;
                case "마스터":
                    employee.setAuthority(Authority.master);
                    break;
                default:
                    throw new IllegalArgumentException("유효하지 않은 권한 값입니다: " + authorityValue);
            }
        }

        // 변경된 내용 저장
        employeeRepository.save(employee);

        return ResponseEntity.ok("사원 정보가 성공적으로 업데이트되었습니다.");
    }


    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/{employeeCode}/upload-photo")
    public ResponseEntity<Map<String, String>> uploadPhoto(@PathVariable String employeeCode, @RequestParam("photo") MultipartFile file) {
        Map<String, String> response = new HashMap<>();
        try {
            // 프로필 사진 파일 이름 설정
            String filename = employeeCode + "_" + file.getOriginalFilename();
            Path filepath = Paths.get(uploadDir, filename); // uploadDir에서 'profiles/' 폴더를 중복으로 추가하지 않음

            // 지정된 경로에 파일 저장
            Files.createDirectories(filepath.getParent());
            file.transferTo(filepath);

            // DB에 사진 경로 저장
            String photoUrl = "/images/profiles/" + filename;
            employeeRepository.updatePhotoUrl(employeeCode, photoUrl);

            // 성공 응답 설정
            response.put("message", "프로필 사진이 성공적으로 업로드되었습니다.");
            response.put("photoUrl", photoUrl);

            return ResponseEntity.ok(response);
        } catch (IOException e) {
            // 오류 응답 설정
            response.put("message", "프로필 사진 업로드 중 오류가 발생했습니다.");
            return ResponseEntity.status(500).body(response);
        }
    }

}
