package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.DepartmentResponse;
import com.iamneo.skg.repository.DepartmentRepository;
import com.iamneo.skg.service.DepartmentService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class DepartmentServiceImpl implements DepartmentService {

    private final DepartmentRepository departmentRepository;

    @Override
    public List<DepartmentResponse> getAllDepartments() {
        return departmentRepository.findAll().stream()
                .map(department -> new DepartmentResponse(department.getId(), department.getDepartmentName()))
                .collect(Collectors.toList());
    }

}
