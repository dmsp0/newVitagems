package com.newVitagems.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "company_settings")
public class CompanySettings {
    @Id
    @Column(name = "company_name", length = 200)
    private String companyName;

    @Column(name = "check_in_time", nullable = false)
    private LocalTime checkInTime;

    @Column(name = "check_out_time", nullable = false)
    private LocalTime checkOutTime;

    @Column(name = "location_latitude", nullable = false)
    private double locationLatitude;

    @Column(name = "location_longitude", nullable = false)
    private double locationLongitude;

    @Column(name = "valid_time_range_in_minutes", nullable = false)
    private int validTimeRangeInMinutes;  // 유효 범위 시간 (분 단위)

    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;

    @ManyToOne
    @JoinColumn(name = "employee_code", referencedColumnName = "employee_code", nullable = false)
    private Employee employeeCode;  // 저장한 사원의 코드

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
