package org.example.dacnpm.dto;

import org.example.dacnpm.model.Sick;

public class SickDTO {
	private Long id;
	private String name;
	
	
	public SickDTO() {
		super();
	}
	public SickDTO(Long id, String name) {
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
	
	public static SickDTO convert(Sick entity) {
		return new SickDTO(entity.getId(), entity.getName());
	}

}
