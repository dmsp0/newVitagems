package com.newVitagems.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "EmailVerification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 고유 ID

    @Column(name = "employee_code", nullable = false, length = 20)
    private String employeeCode;  // 사원 코드

    @Column(name = "email", nullable = false, length = 100)
    private String email; // 인증할 이메일

    @Column(name = "verification_code", nullable = false, length = 10)
    private String verificationCode; // 인증 코드

    @Column(name = "created_at", nullable = false)
    private LocalDateTime createdAt; // 생성 시간

    @Column(name = "expires_at", nullable = false)
    private LocalDateTime expiresAt; // 만료 시간

    @Column(name = "is_verified", nullable = false)
    private boolean isVerified; // 인증 완료 여부
}
