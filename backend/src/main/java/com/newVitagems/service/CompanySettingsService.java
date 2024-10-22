package com.newVitagems.service;

import com.newVitagems.entity.CompanySettings;
import com.newVitagems.repository.CompanySettingsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CompanySettingsService {
    @Autowired
    private CompanySettingsRepository companySettingsRepository;

    // 회사 설정 정보를 조회하는 메서드
    @Transactional
    public CompanySettings getCompanySettings() {
        Optional<CompanySettings> settings = companySettingsRepository.findById("vitagems");
        return settings.orElse(null);  // 데이터가 없으면 null 반환
    }

    // 회사 설정 정보를 업데이트하는 메서드
    @Transactional
    public void updateCompanySettings(CompanySettings companySettings) {
        companySettingsRepository.save(companySettings);  // 기존 값이 있으면 업데이트, 없으면 추가
    }
}
