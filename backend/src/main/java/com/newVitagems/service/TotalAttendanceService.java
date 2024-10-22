package com.newVitagems.service;

import com.newVitagems.dto.TotalDefaultAttendanceDto;
import com.newVitagems.entity.TotalAttendance;
import com.newVitagems.repository.TotalAttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TotalAttendanceService {

    @Autowired
    private TotalAttendanceRepository totalAttendanceRepository;

    public List<TotalDefaultAttendanceDto> getAlltotalDefaultAttendance () {
        List<TotalAttendance> totalDefaultAttendances = totalAttendanceRepository.findAll();
        return totalDefaultAttendances.stream()
                .map(totalDefaultAttendance -> new TotalDefaultAttendanceDto(
                        totalDefaultAttendance.getEmployeeName(),
                        totalDefaultAttendance.getEmployeeCode(),
                        totalDefaultAttendance.getTotalWorkCount(),
                        totalDefaultAttendance.getVacation(),
                        totalDefaultAttendance.getLateness(),
                        totalDefaultAttendance.getEarlyLeave(),
                        totalDefaultAttendance.getAbsence()
                ))
                .collect(Collectors.toUnmodifiableList());
    }


}
