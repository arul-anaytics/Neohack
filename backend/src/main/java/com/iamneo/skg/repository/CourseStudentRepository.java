package com.iamneo.skg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.CourseStudent;

public interface CourseStudentRepository extends JpaRepository<CourseStudent, String> {

    Optional<CourseStudent> findByStudentId(String studentId);

}
