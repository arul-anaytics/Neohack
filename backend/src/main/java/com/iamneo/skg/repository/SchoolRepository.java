package com.iamneo.skg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.School;

public interface SchoolRepository extends JpaRepository<School, String> {

}
