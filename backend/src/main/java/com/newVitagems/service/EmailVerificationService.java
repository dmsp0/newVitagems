package com.newVitagems.service;

import com.newVitagems.entity.EmailVerification;
import com.newVitagems.repository.EmailVerificationRepository;
import com.newVitagems.repository.EmployeeRepository;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Random;

@Service
public class EmailVerificationService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EmailVerificationRepository verificationRepository;

    @Autowired
    private EmployeeRepository employeeRepository;

    private static final int VERIFICATION_CODE_EXPIRATION_MINUTES = 8; // 유효 시간

    // 인증 코드 발송 메서드
    @Transactional
    public int sendVerificationCode(String employeeCode, String email) throws MessagingException {
        // 인증 코드 생성
        String verificationCode = String.format("%06d", new Random().nextInt(999999));
        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(VERIFICATION_CODE_EXPIRATION_MINUTES);

        // 기존 인증 정보 삭제 (있다면)
        verificationRepository.deleteByEmployeeCode(employeeCode);

        // 인증 정보 저장
        EmailVerification verification = new EmailVerification();
        verification.setEmployeeCode(employeeCode);
        verification.setEmail(email);
        verification.setVerificationCode(verificationCode);
        verification.setCreatedAt(LocalDateTime.now());
        verification.setExpiresAt(expiresAt);
        verification.setVerified(false);
        verificationRepository.save(verification);

        // 이메일 발송
        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true);
        helper.setTo(email);
        helper.setSubject("[NEW_VITAGEMS] 이메일 인증 코드입니다.");
        // HTML 템플릿으로 이메일 내용 구성
        String htmlContent = """
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h2 style="color: #4F46E5; text-align: center;">NEW VITAGEMS 이메일 인증</h2>
            <p>아래의 <strong>인증 코드 6자리</strong>를 입력하여 이메일 인증을 완료해주세요.</p>
            
            <div style="background-color: #F3F4F6; padding: 20px; text-align: center; border-radius: 5px; margin: 20px 0;">
                <span style="font-size: 24px; font-weight: bold; color: #1D4ED8;">%s</span>
            </div>
            
            <p>⚠️ 이 코드는 <strong>%d분</strong>간 유효합니다.</p>
            <p>만료되기 전에 입력해 주세요.</p>
            
            <hr style="margin: 20px 0; border: none; border-top: 1px solid #e0e0e0;">
            <p style="font-size: 12px; color: #6B7280;">
                본 메일은 발신 전용입니다. 문의 사항이 있으시면 <a href="mailto:support@newvitagems.com" style="color: #3B82F6;">support@newvitagems.com</a>으로 연락해 주세요.
            </p>
        </div>
    """.formatted(verificationCode, VERIFICATION_CODE_EXPIRATION_MINUTES);

        // HTML 형식으로 메일 전송 설정
        helper.setText(htmlContent, true);
        mailSender.send(message);

        return VERIFICATION_CODE_EXPIRATION_MINUTES;
    }

    // 인증 코드 확인 메서드
    @Transactional
    public boolean verifyCodeAndUpdateEmail(String employeeCode, String verificationCode) {
        // 인증 정보 조회 및 검증
        Optional<EmailVerification> optionalVerification = verificationRepository.findByEmployeeCodeAndVerificationCodeAndIsVerifiedFalse(employeeCode, verificationCode);

        if (optionalVerification.isPresent()) {
            EmailVerification verification = optionalVerification.get();

            if (verification.getExpiresAt().isAfter(LocalDateTime.now())) {
                verification.setVerified(true); // 인증 완료 처리
                verificationRepository.save(verification);

                // Employee 엔티티의 이메일 업데이트
                employeeRepository.updateEmail(employeeCode, verification.getEmail());

                return true;
            }
        }
        return false;
    }
}
