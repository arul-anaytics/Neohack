package com.iamneo.skg.service;

import java.util.List;

import com.iamneo.skg.dto.response.StudentCalenderResponse;
import com.iamneo.skg.dto.response.StudentResponse;

public interface StudentService {

	List<StudentResponse> getAllStudents();

	StudentCalenderResponse getStudentCalender(String studentId);

}
