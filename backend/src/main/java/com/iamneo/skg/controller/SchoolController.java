package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.SchoolListResponse;
import com.iamneo.skg.dto.response.SchoolResponse;
import com.iamneo.skg.service.SchoolService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.SCHOOL_API_PATH)
@RequiredArgsConstructor
@Tag(name = "School")
public class SchoolController {

    private final SchoolService schoolService;

    @GetMapping("/")
    public ResponseEntity<SchoolListResponse> getAllSchools() {
        List<SchoolResponse> schoolList = schoolService.getAllSchools();
        boolean isData = !schoolList.isEmpty();
        return ResponseEntity.ok(new SchoolListResponse(isData, schoolList));
    }
}
