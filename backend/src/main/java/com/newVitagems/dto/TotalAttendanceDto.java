package com.newVitagems.dto;

import lombok.*;

@Data
@NoArgsConstructor
public class TotalAttendanceDto {
    private String employeeCode;
    private String employeeName;
    private int totalWorkCount;
    private int attendanceCount;
    private int businessTripCount;
    private int outsideWorkCount;
    private double vacation;
    private int monthlyLeave;
    private int halfDayLeave;
    private int lateness;
    private int earlyLeave;
    private int absence;
}







