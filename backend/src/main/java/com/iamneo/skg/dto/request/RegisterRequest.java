package com.iamneo.skg.dto.request;

import com.iamneo.skg.model.enumerated.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RegisterRequest {
	private String firstName;
	private String lastName;
	private Long portalStatus;
	private String registrationNumber;
	private String email;
	private String password;
	private Role role;
}
