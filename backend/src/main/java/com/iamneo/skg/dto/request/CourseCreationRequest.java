package com.iamneo.skg.dto.request;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CourseCreationRequest {
    private String id;
    private String orderId;
    private String schoolId;
    private String branchId;
    private String departmentId;
    private String courseName;
    private String startDate;
    private String endDate;
    private List<String> trainerId;
    private List<String> studentId;
}
