package com.iamneo.skg.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.response.TrainerCalenderResponse;
import com.iamneo.skg.dto.response.TrainerResponse;
import com.iamneo.skg.model.Branch;
import com.iamneo.skg.model.Course;
import com.iamneo.skg.model.CourseTrainer;
import com.iamneo.skg.model.Department;
import com.iamneo.skg.model.SchoolBranchDepartmentUser;
import com.iamneo.skg.model.Section;
import com.iamneo.skg.model.Topic;
import com.iamneo.skg.model.User;
import com.iamneo.skg.model.enumerated.Role;
import com.iamneo.skg.repository.BranchRepository;
import com.iamneo.skg.repository.CourseRepository;
import com.iamneo.skg.repository.CourseTrainerRepository;
import com.iamneo.skg.repository.DepartmentRepository;
import com.iamneo.skg.repository.SchoolBranchDepartmentUserRepository;
import com.iamneo.skg.repository.SectionRepository;
import com.iamneo.skg.repository.TopicRepository;
import com.iamneo.skg.repository.UserRepository;
import com.iamneo.skg.service.TrainerService;

import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class TrainerServiceImpl implements TrainerService {

	private final UserRepository userRepository;
	private final CourseTrainerRepository courseTrainerRepository;
	private final CourseRepository courseRepository;
	private final TopicRepository topicRepository;
	private final SchoolBranchDepartmentUserRepository schoolBranchDepartmentUserRepository;
	private final BranchRepository branchRepository;
	private final DepartmentRepository departmentRepository;
	private final SectionRepository sectionRepository;

	@Override
	public List<TrainerResponse> getAllTrainers() {
		return userRepository
				.findAllByRole(Role.TRAINER)
				.stream()
				.map(user -> new TrainerResponse(user.getId(), user.getFirstName() + " " + user.getLastName(),
						user.getEmail()))
				.collect(Collectors.toList());
	}

	@Override
	public TrainerCalenderResponse getTrainerCalender(String trainerId) {
		Optional<CourseTrainer> optionalCourseTrainer = courseTrainerRepository
				.findByTrainerId(trainerId);

		if (optionalCourseTrainer.isPresent()) {
			CourseTrainer courseTrainer = optionalCourseTrainer.get();

			Course course = courseRepository.findById(courseTrainer.getCourseId())
					.orElseThrow(() -> new EntityNotFoundException("Course not found"));

			User student = userRepository.findById(courseTrainer.getTrainerId())
					.orElseThrow(() -> new EntityNotFoundException("Student not found"));

			List<Topic> topics = topicRepository.findByCourseId(course.getId());
			List<String> topicNames = topics.stream()
					.map(Topic::getTopicName)
					.collect(Collectors.toList());

			SchoolBranchDepartmentUser schoolBranchDepartmentUser = schoolBranchDepartmentUserRepository
					.findByUserId(student.getId());

			Branch branch = branchRepository.findById(schoolBranchDepartmentUser.getBranchId())
					.orElseThrow(() -> new EntityNotFoundException("Branch not found"));

			Department department = departmentRepository.findById(schoolBranchDepartmentUser.getDepartmentId())
					.orElseThrow(() -> new EntityNotFoundException("Department not found"));

			Section section = sectionRepository.findByDepartmentId(department.getId());

			return TrainerCalenderResponse.builder()
					.courseName(course.getCourseName())
					.startDate(course.getStartDate())
					.endDate(course.getEndDate())
					.branch(branch.getBranchName())
					.department(department.getDepartmentName())
					.section(section != null ? section.getSectionName() : null)
					.topic(topicNames)
					.build();
		} else {
			throw new EntityNotFoundException("CourseTrainer not found");
		}
	}
}
