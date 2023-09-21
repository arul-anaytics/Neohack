package com.iamneo.skg.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DepartmentListResponse {
    private boolean status;
    private List<DepartmentResponse> departmentList;
}
