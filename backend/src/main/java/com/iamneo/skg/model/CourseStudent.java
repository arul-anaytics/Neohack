package com.iamneo.skg.model;

import java.util.Date;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "course_students")
public class CourseStudent {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String csId;

	@Column(nullable = false)
	private String courseId;

	@Column(nullable = false)
	private String studentId;

	@Column(nullable = false)
	private String branchId;

	@Column(nullable = false)
	private String departmentId;

	@Column(nullable = false)
	private Long courseActivationStatus;

	@Column(nullable = false, columnDefinition = "BIGINT DEFAULT 1")
	private Long session_1;

	@Column(nullable = false, columnDefinition = "BIGINT DEFAULT 1")
	private Long session_2;

	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false, updatable = false)
	private Date createdAt;

	@LastModifiedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true)
	private Date updatedAt;

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = new Date();
	}
}
