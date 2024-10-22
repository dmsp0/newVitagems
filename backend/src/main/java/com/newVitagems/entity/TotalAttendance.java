package com.newVitagems.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "totalattendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TotalAttendance {

    @Id
    @Column(name = "employee_code", length = 20)
    private String employeeCode;

    @Column(name = "employee_name", nullable = false, length = 100)
    private String employeeName;

    @Column(name = "total_work_count", columnDefinition = "INT DEFAULT 0")
    private int totalWorkCount;

    @Column(name = "attendance_count", columnDefinition = "INT DEFAULT 0")
    private int attendanceCount;

    @Column(name = "businesstrip_count", columnDefinition = "INT DEFAULT 0")
    private int businessTripCount;

    @Column(name = "outside_work_count", columnDefinition = "INT DEFAULT 0")
    private int outsideWorkCount;

    @Column(name = "vacation", columnDefinition = "DOUBLE(2,1) DEFAULT 0.0")
    private double vacation;

    @Column(name = "monthly_leave", columnDefinition = "INT DEFAULT 0")
    private int monthlyLeave;

    @Column(name = "half_day_leave", columnDefinition = "INT DEFAULT 0")
    private int halfDayLeave;

    @Column(name = "lateness", columnDefinition = "INT DEFAULT 0")
    private int lateness;

    @Column(name = "early_leave", columnDefinition = "INT DEFAULT 0")
    private int earlyLeave;

    @Column(name = "absence", columnDefinition = "INT DEFAULT 0")
    private int absence;
}
