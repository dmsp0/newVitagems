package com.newVitagems.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalDefaultAttendanceDto {

        private String employeeName;
        private String employeeCode;
        private int totalWorkCount;
        private double vacation;
        private int lateness;
        private int earlyLeave;
        private int absence;
}
