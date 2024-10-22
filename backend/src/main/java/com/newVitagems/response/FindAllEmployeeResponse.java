package com.newVitagems.response;

import com.newVitagems.dto.EmployeeInfoDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindAllEmployeeResponse {
    private String message;
    private List<EmployeeInfoDto> employees; // Employee 리스트를 포함
}
