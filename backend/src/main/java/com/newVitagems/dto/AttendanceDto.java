package com.newVitagems.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AttendanceDto {
    private String employeeCode;
    private LocalDate date;
    private LocalTime startTimeForWork;
    private LocalTime endTimeForWork;
    private String status;
}
