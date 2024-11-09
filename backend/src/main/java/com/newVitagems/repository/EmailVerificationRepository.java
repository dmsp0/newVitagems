package com.newVitagems.repository;

import com.newVitagems.entity.EmailVerification;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface EmailVerificationRepository extends JpaRepository<EmailVerification, Long> {
    Optional<EmailVerification> findByEmployeeCodeAndVerificationCodeAndIsVerifiedFalse(String employeeCode, String verificationCode);
    Optional<EmailVerification> findByEmailAndIsVerifiedTrue(String email);
    void deleteByEmployeeCode(String employeeCode);
}
