package com.iamneo.skg.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.SchoolBranchDepartmentUser;

public interface SchoolBranchDepartmentUserRepository extends JpaRepository<SchoolBranchDepartmentUser, String> {

    SchoolBranchDepartmentUser findByUserId(String id);

}
