package com.newVitagems.repository;

import com.newVitagems.entity.TotalAttendance;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TotalAttendanceRepository extends JpaRepository<TotalAttendance, Long> {
    // 모든 사원 근태 집계 정보를 조회하는 메서드
    List<TotalAttendance> findAll();
}
