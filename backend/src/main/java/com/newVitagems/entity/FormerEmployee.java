package com.newVitagems.entity;

import com.newVitagems.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDate;

@Entity
@Table(name = "formerEmployee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FormerEmployee {

    @Id
    @Column(name = "employee_code", length = 20)
    private String employeeCode;

    @Column(name = "employee_name", nullable = false, length = 100)
    private String employeeName;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", nullable = false)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(name = "employee_rank", nullable = false)
    private EmployeeRank employeeRank;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "departure_date", nullable = false)
    private LocalDate departureDate;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Lob
    @Column(name = "employee_photo")
    private Blob employeePhoto;

    @Column(name = "phone_num", nullable = false, length = 20)
    private String phoneNum;

    @Column(name = "email", length = 100)
    private String email;

    @Column(name = "address", length = 255)
    private String address;

    @Column(name = "bank_account_num", length = 100)
    private String bankAccountNum;
}