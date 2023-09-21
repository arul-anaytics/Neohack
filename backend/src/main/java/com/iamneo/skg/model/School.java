package com.iamneo.skg.model;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
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
@Table(name = "schools")
public class School {

	@Id
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	@Column(length = 250, nullable = false)
	private String schoolName;

	@Column(length = 50, nullable = false)
	private String schoolCode;

	@Column(nullable = false)
	private Long schoolStatus;

	@CreatedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = false, updatable = false)
	private Date createdAt;

	@LastModifiedDate
	@Temporal(TemporalType.TIMESTAMP)
	@Column(nullable = true)
	private Date updatedAt;

	@OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Branch> branches;

	@OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Department> departments;

	@OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Batch> batches;

	@OneToMany(mappedBy = "school", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
	private List<Degree> degrees;

	@PrePersist
	protected void onCreate() {
		createdAt = new Date();
	}

	@PreUpdate
	protected void onUpdate() {
		updatedAt = new Date();
	}
}
