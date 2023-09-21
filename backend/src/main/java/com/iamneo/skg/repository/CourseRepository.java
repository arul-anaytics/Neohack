package com.iamneo.skg.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Course;

public interface CourseRepository extends JpaRepository<Course, String> {

    Optional<Course> findByOrderId(String orderId);

    Optional<Course> findByCourseName(String courseName);

}
