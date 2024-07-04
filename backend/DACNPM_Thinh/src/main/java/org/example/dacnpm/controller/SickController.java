package org.example.dacnpm.controller;

import java.util.Optional;

import org.example.dacnpm.Service.ISickService;
import org.example.dacnpm.dto.DoctorDTO;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.ReposeOject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/sick")
public class SickController {
	@Autowired
	private ISickService iSickService;

	@GetMapping
	public @ResponseBody ResponseEntity<ReposeOject> findSickByName(@RequestParam String name) {
		

		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("ok", "Successfull", iSickService.findByNameContains(name)));

	}

}
