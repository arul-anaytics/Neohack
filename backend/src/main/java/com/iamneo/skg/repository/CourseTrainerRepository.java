package com.iamneo.skg.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.CourseTrainer;

public interface CourseTrainerRepository extends JpaRepository<CourseTrainer, String> {

    List<CourseTrainer> findByCourseId(String id);

    Optional<CourseTrainer> findByTrainerId(String trainerId);

}
