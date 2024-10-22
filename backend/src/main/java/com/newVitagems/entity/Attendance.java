package com.newVitagems.entity;

import com.newVitagems.entity.Employee;
import com.newVitagems.enums.Status;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "attendance")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @EmbeddedId
    private AttendanceId id;

    @Column(name = "start_time_for_work")
    private LocalTime startTimeForWork;

    @Column(name = "end_time_for_work")
    private LocalTime endTimeForWork;

    @Enumerated(EnumType.STRING)
    @Column(name = "status")
    private Status status;

    @ManyToOne
    @JoinColumn(name = "employee_code", insertable = false, updatable = false)
    private Employee employee;
}

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
class AttendanceId {
    @Column(name = "employee_code")
    private String employeeCode;

    @Column(name = "date")
    private LocalDate date;
}
