package com.iamneo.skg.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iamneo.skg.dto.response.TrainerCalenderResponse;
import com.iamneo.skg.dto.response.TrainerListResponse;
import com.iamneo.skg.dto.response.TrainerResponse;
import com.iamneo.skg.service.TrainerService;
import com.iamneo.skg.util.MyConstant;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping(MyConstant.TRAINER_API_PATH)
@RequiredArgsConstructor
@Tag(name = "Trainer")
public class TrainerController {

	public final TrainerService trainerService;

	@GetMapping("/")
	public ResponseEntity<TrainerListResponse> getAllTrainers() {
		List<TrainerResponse> trainerList = trainerService.getAllTrainers();
		boolean isData = !trainerList.isEmpty();
		return ResponseEntity.ok(new TrainerListResponse(isData, trainerList));
	}

	@GetMapping("/calender")
	public ResponseEntity<TrainerCalenderResponse> getTrainerCalender(@RequestParam String id) {
		return ResponseEntity.ok().body(trainerService.getTrainerCalender(id));
	}
}
