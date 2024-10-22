package com.newVitagems.request;

import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeRegistrationRequest {
    private String employeeName;
    private String birthday;
    private String gender;
    private String phoneNum;
    private String department;
    private String employeeRank;
    private String authority;
    private String joinDate;
}
