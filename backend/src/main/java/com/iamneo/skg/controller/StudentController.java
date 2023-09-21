package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.StudentCalenderResponse;
import com.iamneo.skg.dto.response.StudentListResponse;
import com.iamneo.skg.dto.response.StudentResponse;
import com.iamneo.skg.service.StudentService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.STUDENT_API_PATH)
@RequiredArgsConstructor
@Tag(name = "Student")
public class StudentController {

	public final StudentService studentService;

	@GetMapping("/")
	public ResponseEntity<StudentListResponse> getAllStudents() {
		List<StudentResponse> studentList = studentService.getAllStudents();
		boolean isData = !studentList.isEmpty();
		return ResponseEntity.ok(new StudentListResponse(isData, studentList));
	}

	@GetMapping("/calender")
	public ResponseEntity<StudentCalenderResponse> getStudentCalender(@RequestParam String id) {
		return ResponseEntity.ok().body(studentService.getStudentCalender(id));
	}
}
