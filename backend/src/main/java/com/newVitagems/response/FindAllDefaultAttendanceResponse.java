package com.newVitagems.response;

import com.newVitagems.dto.TotalDefaultAttendanceDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class FindAllDefaultAttendanceResponse {
    private String message;
    private List<TotalDefaultAttendanceDto> DefaultAttendance;
}
