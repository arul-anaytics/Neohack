package com.iamneo.skg.controller;

import java.text.ParseException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.request.CourseCreationRequest;
import com.iamneo.skg.dto.response.CourseCreationResponse;
import com.iamneo.skg.service.CourseService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.COURSE_API_PATH)
@RequiredArgsConstructor
@Tag(name = "Course")
public class CourseController {

    private final CourseService courseService;

    @PostMapping("/create")
    public ResponseEntity<CourseCreationResponse> createCourse(@RequestBody CourseCreationRequest courseCreationRequest)
            throws ParseException {
        boolean isCourseCreated = courseService.createCourse(courseCreationRequest);
        return isCourseCreated
                ? ResponseEntity.ok().body(new CourseCreationResponse(isCourseCreated, "Course created successfully"))
                : ResponseEntity.badRequest()
                        .body(new CourseCreationResponse(isCourseCreated, "Course already exists"));
    }
}
