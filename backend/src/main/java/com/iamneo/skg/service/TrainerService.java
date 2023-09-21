package com.iamneo.skg.service;

import java.util.List;

import com.iamneo.skg.dto.response.TrainerCalenderResponse;
import com.iamneo.skg.dto.response.TrainerResponse;

public interface TrainerService {
	List<TrainerResponse> getAllTrainers();

	TrainerCalenderResponse getTrainerCalender(String trainerId);
}
