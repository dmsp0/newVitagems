package com.newVitagems.dto;

import com.newVitagems.enums.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class FormerEmployeeDto {

    private String employeeCode;
    private String employeeName;
    private LocalDate birthday;
    private String phoneNum;
    private Department department;
    private EmployeeRank employeeRank;
    private LocalDate joinDate;
    private Gender gender;
    private String address;
    private String bankAccountNum;
    private String email;
    private byte[] employeePhoto;
    private LocalDate departureDate;

    // 기본 생성자
    public FormerEmployeeDto() {
    }

    // 모든 필드를 포함한 생성자
    public FormerEmployeeDto(String employeeCode, String employeeName, LocalDate birthday, String phoneNum,
                             Department department, EmployeeRank employeeRank, LocalDate joinDate,
                             Gender gender, String address, String bankAccountNum, String email,
                             byte[] employeePhoto, LocalDate departureDate) {
        this.employeeCode = employeeCode;
        this.employeeName = employeeName;
        this.birthday = birthday;
        this.phoneNum = phoneNum;
        this.department = department;
        this.employeeRank = employeeRank;
        this.joinDate = joinDate;
        this.gender = gender;
        this.address = address;
        this.bankAccountNum = bankAccountNum;
        this.email = email;
        this.employeePhoto = employeePhoto;
        this.departureDate = departureDate;
    }
}
