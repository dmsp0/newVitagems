package com.newVitagems.response;

import com.newVitagems.enums.Authority;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginResponse {
    private String message;
    private String employeeName;
    private String authority;
    private String employeeCode;
}