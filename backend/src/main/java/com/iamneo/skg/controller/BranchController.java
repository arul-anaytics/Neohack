package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.BranchListResponse;
import com.iamneo.skg.dto.response.BranchResponse;
import com.iamneo.skg.service.BranchService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.BRANCH_API_PATH)
@RequiredArgsConstructor
@Tag(name = "Branch")
public class BranchController {

    private final BranchService branchService;

    @GetMapping("/")
    public ResponseEntity<BranchListResponse> getAllBranches() {
        List<BranchResponse> branchList = branchService.getAllBranches();
        boolean isData = !branchList.isEmpty();
        return ResponseEntity.ok(new BranchListResponse(isData, branchList));
    }
}
