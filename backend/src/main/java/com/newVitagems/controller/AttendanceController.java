package com.newVitagems.controller;

import com.newVitagems.dto.TotalDefaultAttendanceDto;
import com.newVitagems.response.FindAllDefaultAttendanceResponse;
import com.newVitagems.service.TotalAttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/attendance")
public class AttendanceController {

    @Autowired
    private TotalAttendanceService totalAttendanceService;

    @GetMapping("/all")
    public ResponseEntity<FindAllDefaultAttendanceResponse> getAllDefaultAttendance() {
        List<TotalDefaultAttendanceDto> defaultAttendances = totalAttendanceService.getAlltotalDefaultAttendance();
        String message;

        if (defaultAttendances.isEmpty()) {
            message = "근태정보가 없습니다.";
            return ResponseEntity.ok(new FindAllDefaultAttendanceResponse(message, List.of()));
        }
        message = "전체 근태 정보 조회 결과";
        return ResponseEntity.ok(new FindAllDefaultAttendanceResponse(message, defaultAttendances));
    }
}
