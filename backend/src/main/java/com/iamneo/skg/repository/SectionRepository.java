package com.iamneo.skg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Section;

public interface SectionRepository extends JpaRepository<Section, String> {

    Section findByDepartmentId(String id);

}
