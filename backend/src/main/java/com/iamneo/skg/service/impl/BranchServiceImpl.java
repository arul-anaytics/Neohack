package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.BranchResponse;
import com.iamneo.skg.repository.BranchRepository;
import com.iamneo.skg.service.BranchService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;

    @Override
    public List<BranchResponse> getAllBranches() {
        return branchRepository.findAll().stream()
                .map(branch -> new BranchResponse(branch.getId(), branch.getBranchName()))
                .collect(Collectors.toList());
    }

}
