package org.example.dacnpm.dto;

import org.example.dacnpm.model.Department;

import jakarta.persistence.Column;

public class DepartmentDTO {
	private Long id;
	private String name;
	
	public DepartmentDTO() {
		
	}
	
	
	public DepartmentDTO(Long id, String name) {
		super();
		this.id = id;
		this.name = name;
	}


	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	public static DepartmentDTO convert(Department entity) {
		return new DepartmentDTO(entity.getId(), entity.getName());
	}

}
