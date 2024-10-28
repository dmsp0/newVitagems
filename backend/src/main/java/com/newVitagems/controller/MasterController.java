package com.newVitagems.controller;

import com.newVitagems.dto.CompanySettingsDto;
import com.newVitagems.entity.CompanySettings;
import com.newVitagems.entity.Employee;
import com.newVitagems.repository.EmployeeRepository;
import com.newVitagems.service.CompanySettingsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalTime;

@RestController
@RequestMapping("/api/master")
public class MasterController {

    @Autowired
    private CompanySettingsService companySettingsService;

    @Autowired
    private EmployeeRepository employeeRepository;

    // 회사 설정 정보 조회 (GET 요청)
    @GetMapping("/company-settings")
    public ResponseEntity<CompanySettings> getCompanySettings() {
        CompanySettings settings = companySettingsService.getCompanySettings();
        if (settings != null) {
            return ResponseEntity.ok(settings); // 데이터가 있으면 반환
        } else {
            return ResponseEntity.notFound().build(); // 데이터가 없으면 404 응답
        }
    }

    // 회사 설정 정보 수정 (POST 또는 PUT 요청)
    @PostMapping("/company-settings")
    public ResponseEntity<String> updateCompanySettings(@RequestBody CompanySettingsDto companySettingsDto) {
        // DTO에서 employeeCode 추출
        String employeeCodeString = companySettingsDto.getEmployeeCode();
        Employee employee = employeeRepository.findById(employeeCodeString)
                .orElseThrow(() -> new RuntimeException("Employee not found with code: " + employeeCodeString));

        // DTO를 CompanySettings로 변환
        CompanySettings companySettings = new CompanySettings();
        companySettings.setCompanyName(companySettingsDto.getCompanyName());
        companySettings.setCheckInTime(LocalTime.parse(companySettingsDto.getCheckInTime())); // 문자열을 LocalTime으로 변환
        companySettings.setCheckOutTime(LocalTime.parse(companySettingsDto.getCheckOutTime()));
        companySettings.setLocationLatitude(companySettingsDto.getLocationLatitude());
        companySettings.setLocationLongitude(companySettingsDto.getLocationLongitude());
        companySettings.setValidTimeRangeInMinutes(companySettingsDto.getValidTimeRangeInMinutes());
        companySettings.setEmployeeCode(employee);  // Employee 객체 설정

        // CompanySettings 저장
        companySettingsService.updateCompanySettings(companySettings);

        return ResponseEntity.ok("Company settings updated successfully for employee code: " + employeeCodeString);
    }
}
