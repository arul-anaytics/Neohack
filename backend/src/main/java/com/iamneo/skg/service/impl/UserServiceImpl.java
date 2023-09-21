package com.iamneo.skg.service.impl;

import java.util.Optional;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.iamneo.skg.dto.request.AuthenticationRequest;
import com.iamneo.skg.dto.request.RegisterRequest;
import com.iamneo.skg.dto.response.AuthenticationResponse;
import com.iamneo.skg.dto.response.UserResponse;
import com.iamneo.skg.model.User;
import com.iamneo.skg.model.enumerated.Role;
import com.iamneo.skg.repository.UserRepository;
import com.iamneo.skg.service.UserService;
import com.iamneo.skg.util.JwtUtil;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@Transactional
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	private final AuthenticationManager authenticationManager;
	private final JwtUtil jwtUtil;

	@Override
	public boolean userRegistration(RegisterRequest request) {
		Optional<User> isUserExists = userRepository.findByEmail(request.getEmail());
		if (!isUserExists.isPresent()) {
			var user = User.builder()
					.userName(request.getFirstName() + " " + request.getLastName())
					.firstName(request.getFirstName())
					.lastName(request.getLastName())
					.email(request.getEmail())
					.portalStatus(request.getPortalStatus())
					.registrationNumber(request.getRegistrationNumber())
					.password(passwordEncoder.encode(request.getPassword()))
					.semester("Sem 3")
					.role(Role.ADMIN)
					.build();
			userRepository.save(user);
			return true;
		} else {
			return false;
		}
	}

	@Override
	public AuthenticationResponse userAuthentication(AuthenticationRequest request) {
		authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
		var user = userRepository.findByEmail(request.getEmail()).orElseThrow();
		System.out.println(user);
		var userResponse = UserResponse.builder()
				.id(user.getId())
				.name(user.getFirstName() + " " + user.getLastName())
				.email(user.getEmail())
				.role(user.getRole())
				.build();
		var token = jwtUtil.generateToken(user);
		return AuthenticationResponse.builder()
				.token(token)
				.user(userResponse)
				.build();
	}
}
