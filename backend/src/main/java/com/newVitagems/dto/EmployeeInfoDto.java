package com.newVitagems.dto;

import com.newVitagems.enums.EmployeeRank;
import lombok.*;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeInfoDto {
    private String department;
    private String employeeName;
    private EmployeeRank employeeRank;
    private String phoneNum;
    private LocalDate birthday;
    private LocalDate joinDate;
    private String employeeCode;
}
