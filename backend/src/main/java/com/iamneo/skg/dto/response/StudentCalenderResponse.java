package com.iamneo.skg.dto.response;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class StudentCalenderResponse {
    private Date startDate;
    private Date endDate;
    private String courseName;
    private List<String> topic;
    private String department;
    private String branch;
    private String section;
    private String semester;
    private List<String> trainers;
}
