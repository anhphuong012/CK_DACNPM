package org.example.dacnpm.controller;

import java.util.Optional;

import org.example.dacnpm.dto.BookingReturnDTO;
import org.example.dacnpm.dto.PatientDTO;
import org.example.dacnpm.dto.PatientInputDTO;
import org.example.dacnpm.model.Patient;
import org.example.dacnpm.model.ReposeOject;
import org.example.dacnpm.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/patients")
public class PatientController {
	@Autowired
	private PatientRepository patientRepository;

	@PutMapping("/patient/{id}")
	public @ResponseBody ResponseEntity<ReposeOject> updatePatient(@PathVariable("id") Long id,
			@RequestBody PatientInputDTO patient) {
		Patient patientModel = patientRepository.findById(id).get();

		patientModel.setAge(patient.getAge());
		patientModel.setFullName(patient.getFullName());
		patientModel.setEmail(patient.getEmail());
		patientModel.setSex(patient.getSex());
		patientModel.setPhoneNumber(patient.getPhoneNumber());

		PatientDTO response = PatientDTO.convert(patientRepository.save(patientModel));

		return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("OK", " Successful", response));

	}

	@GetMapping("/patient/{id}")
	public @ResponseBody ResponseEntity<ReposeOject> getPatient(@PathVariable("id") Long id) {
		Patient patientModel = patientRepository.findById(id).get();

		PatientDTO response = PatientDTO.convert(patientRepository.save(patientModel));

		return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("OK", " Successful", response));

	}

}
