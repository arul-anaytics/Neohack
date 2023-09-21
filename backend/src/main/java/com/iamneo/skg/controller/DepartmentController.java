package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.DepartmentListResponse;
import com.iamneo.skg.dto.response.DepartmentResponse;
import com.iamneo.skg.service.DepartmentService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.DEPARTMENT_API_PATH)
@RequiredArgsConstructor
@Tag(name = "Department")
public class DepartmentController {

    private final DepartmentService departmentService;

    @GetMapping("/")
    public ResponseEntity<DepartmentListResponse> getAllDepartments() {
        List<DepartmentResponse> departmentList = departmentService.getAllDepartments();
        boolean isData = !departmentList.isEmpty();
        return ResponseEntity.ok(new DepartmentListResponse(isData, departmentList));
    }

}
