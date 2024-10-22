package com.newVitagems.repository;

import com.newVitagems.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

public interface EmployeeRepository extends JpaRepository<Employee, String> {
    // 사원 코드로 사원을 검색하는 메소드
    Optional<Employee> findExistByEmployeeCode(String employeeCode);
    // 전화번호로 직원이 존재하는지 확인하는 메서드
    boolean existsByPhoneNum(String phoneNum);
    // 사원 이름과 입사일로 조회 (트리거 실행 후 생성된 데이터를 조회하기 위해)
    Optional<Employee> findByEmployeeNameAndJoinDate(String employeeName, LocalDate joinDate);
    // 모든 사원 정보를 조회하는 메서드
    List<Employee> findAll();
    // 해당 사원의 상세 정보를 조회하는메서드
    Employee findDetailInfoByEmployeeCode(String employeeCode);
}