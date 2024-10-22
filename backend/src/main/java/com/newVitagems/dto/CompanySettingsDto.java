package com.newVitagems.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CompanySettingsDto {
    private String companyName;
    private String checkInTime;
    private String checkOutTime;
    private double locationLatitude;
    private double locationLongitude;
    private int validTimeRangeInMinutes;
    private String employeeCode;
}
