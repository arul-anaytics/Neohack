package com.iamneo.skg.service;

import com.iamneo.skg.dto.request.AuthenticationRequest;
import com.iamneo.skg.dto.request.RegisterRequest;
import com.iamneo.skg.dto.response.AuthenticationResponse;

public interface UserService {

    	boolean userRegistration(RegisterRequest request);

	AuthenticationResponse userAuthentication(AuthenticationRequest request);
}
