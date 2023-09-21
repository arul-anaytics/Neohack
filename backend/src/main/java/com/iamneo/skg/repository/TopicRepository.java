package com.iamneo.skg.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.Topic;

public interface TopicRepository extends JpaRepository<Topic, String> {

    List<Topic> findByCourseId(String id);

}
