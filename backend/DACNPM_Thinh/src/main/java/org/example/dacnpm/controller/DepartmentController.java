package org.example.dacnpm.controller;

import org.example.dacnpm.Service.DepartmentService;
import org.example.dacnpm.Service.ISickService;
import org.example.dacnpm.model.ReposeOject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/department")
public class DepartmentController {
	
	@Autowired
	private DepartmentService departmentService;
	
	@GetMapping
	public @ResponseBody ResponseEntity<ReposeOject> findAll() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("ok", "Successfull", departmentService.findAll()));

	}

}
