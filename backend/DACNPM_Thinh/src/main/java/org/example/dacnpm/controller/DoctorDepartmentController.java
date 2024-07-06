package org.example.dacnpm.controller;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;

import org.example.dacnpm.dto.DoctorDTO;
import org.example.dacnpm.model.Department;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.ReposeOject;
import org.example.dacnpm.model.Sick;
import org.example.dacnpm.repositories.DepartmentRepository;
import org.example.dacnpm.repositories.DoctorRepository;
import org.example.dacnpm.repositories.SickRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
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
@RequestMapping("v1/doctor")
public class DoctorDepartmentController {

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private SickRepository sickRepository;

	@GetMapping(path = "/search")
	public @ResponseBody ResponseEntity<ReposeOject> findDoctorBySick(@RequestParam String sick) {
		var context = SecurityContextHolder.getContext().getAuthentication();
		System.out.println("UserName:" + context.getName());
		System.out.println("Roles:" + context.getAuthorities().toString());
		if (!sick.equals("")) {
			Sick findSick = sickRepository.findByName(sick);

			if (findSick != null) {
				System.out.println(findSick.getDepartment().getName());

				Optional<Department> department = departmentRepository.findById(findSick.getDepartment().getId());
				if (department.isPresent()) {
					System.out.println("Department:" + department.get().getId());
					List<Doctor> doctors = doctorRepository.findByDepartment(department.get());
					List<DoctorDTO> result = new ArrayList<>();

					for (Doctor doctor : doctors) {
						System.out.println("Doctor:" + doctor.getFullName());
						result.add(DoctorDTO.convert(doctor));
					}
					return ResponseEntity.status(HttpStatus.OK)
							.body(new ReposeOject("ok", "Query Shedule successfully", result));
				} else {

					return ResponseEntity.status(HttpStatus.OK)
							.body(new ReposeOject("error", "Not Found", null));

				}
			} else {
				List<Doctor> doctors = doctorRepository.findByFullNameContains(sick);
				if (doctors.size() > 0) {
					
					List<DoctorDTO> result = new ArrayList<>();

					for (Doctor doctor : doctors) {
						System.out.println("Doctor:" + doctor.getFullName());
						result.add(DoctorDTO.convert(doctor));
					}
					return ResponseEntity.status(HttpStatus.OK)
							.body(new ReposeOject("ok", "Query Shedule successfully", result));
				} else {
					return ResponseEntity.status(HttpStatus.OK)
							.body(new ReposeOject("error", "Not Found", null));
				}
			}
		} else {
			List<DoctorDTO> doctor = new ArrayList<>();
			Iterator<Doctor> findDoctor = doctorRepository.findAll().iterator();

			while (findDoctor.hasNext()) {
				doctor.add(DoctorDTO.convert(findDoctor.next()));
			}

			return ResponseEntity.status(HttpStatus.OK)
					.body(new ReposeOject("ok", "Query Shedule successfully", doctor));
		}
	}

	@GetMapping
	public @ResponseBody ResponseEntity<ReposeOject> finDoctorById(@PathVariable Long id) {
		Optional<Doctor> doctor = doctorRepository.findById(id);

		if (doctor.isPresent()) {
			return ResponseEntity.status(HttpStatus.OK)
					.body(new ReposeOject("ok", "Query Shedule successfully", DoctorDTO.convert(doctor.get())));
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ReposeOject("failed", "Not found", null));
		}
	}
	
	@GetMapping("/limit")
	public @ResponseBody ResponseEntity<ReposeOject> finDoctorTop4(@RequestParam int size){
		List<Doctor> listEntity = doctorRepository.findAll(PageRequest.of(0,size ));
		List<DoctorDTO> result = new ArrayList<>();
		for (Doctor doctor : listEntity) {
			result.add(DoctorDTO.convert(doctor));
		}
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("ok", "Query Shedule successfully", result));
	}
}
