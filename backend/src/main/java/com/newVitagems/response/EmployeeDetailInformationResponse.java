package com.newVitagems.response;

import com.newVitagems.enums.Authority;
import com.newVitagems.enums.Department;
import com.newVitagems.enums.EmployeeRank;
import com.newVitagems.enums.Gender;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDetailInformationResponse {
    private String message;
    private String employeeCode;
    private String employeeName;
    private LocalDate birthday;
    private String phoneNum;
    private Department department;
    private EmployeeRank employeeRank;
    private LocalDate joinDate;
    private Gender gender;
    private String address;
    private String bank;
    private String bankAccountNum;
    private String email;
    private String employeePhoto;
    private Authority authority;
}
