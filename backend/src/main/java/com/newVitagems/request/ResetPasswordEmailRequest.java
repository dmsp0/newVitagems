package com.newVitagems.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ResetPasswordEmailRequest {
    private String employeeCode;
    private String email;
}
