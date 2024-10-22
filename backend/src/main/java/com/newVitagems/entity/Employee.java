package com.newVitagems.entity;

import com.newVitagems.enums.*;
import jakarta.persistence.*;
import lombok.*;

import java.sql.Blob;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "Employee")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

    @Id
    @Column(name = "employee_code", length = 20)
    private String employeeCode;  // 기본키 (트리거로 생성)

    @Column(name = "employee_name", nullable = false, length = 100)
    private String employeeName;

    @Column(name = "birthday", nullable = false)
    private LocalDate birthday;

    @Column(name = "phone_num", nullable = false, length = 20)
    private String phoneNum;

    @Enumerated(EnumType.STRING)
    @Column(name = "department", nullable = false)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(name = "employee_rank", nullable = false)
    private EmployeeRank employeeRank;

    @Column(name = "join_date", nullable = false)
    private LocalDate joinDate;

    @Column(name = "employee_password", length = 100)  // 필드 이름 수정
    private String employeePassword;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", nullable = false)
    private Gender gender;

    @Column(name = "address", length = 255, nullable = true)
    private String address;

    @Column(name = "bank", length = 100, nullable = true)
    private String bank;

    @Column(name = "bank_account_num", length = 100, nullable = true)
    private String bankAccountNum;

    @Column(name = "email", length = 100, nullable = true)
    private String email;

    @Column(name = "employee_photo", length = 255, nullable = true)
    private String employeePhoto;

    @Enumerated(EnumType.STRING)
    @Column(name = "authority", nullable = false)
    private Authority authority;



}
