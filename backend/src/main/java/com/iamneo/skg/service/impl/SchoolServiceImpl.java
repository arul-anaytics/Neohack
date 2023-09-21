package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.SchoolResponse;
import com.iamneo.skg.repository.SchoolRepository;
import com.iamneo.skg.service.SchoolService;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class SchoolServiceImpl implements SchoolService {

    private final SchoolRepository schoolRepository;

    @Override
    public List<SchoolResponse> getAllSchools() {
        return schoolRepository.findAll().stream()
                .map(school -> new SchoolResponse(school.getId(), school.getSchoolName()))
                .collect(Collectors.toList());
    }
}
