package com.iamneo.skg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Department;

public interface DepartmentRepository extends JpaRepository<Department, String> {

}
