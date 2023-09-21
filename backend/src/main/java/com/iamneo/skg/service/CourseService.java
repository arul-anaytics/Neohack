package com.iamneo.skg.service;

import java.text.ParseException;

import com.iamneo.skg.dto.request.CourseCreationRequest;

public interface CourseService {

    boolean createCourse(CourseCreationRequest courseCreationRequest) throws ParseException;

}
