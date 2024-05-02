package org.example.dacnpm.dto;

import java.util.List;

import org.example.dacnpm.model.Patient;

public class PatientDTO {
	private Long id;

	private String fullName;

	private String phoneNumber;

	private String sex;

	private String email;
	

	private Integer age;
	
	private List<BookingReturnDTO> bookins; 

	public String getFullName() {
		return fullName;
	}


	public void setFullName(String fullName) {
		this.fullName = fullName;
	}


	public String getPhoneNumber() {
		return phoneNumber;
	}


	public void setPhoneNumber(String phoneNumber) {
		this.phoneNumber = phoneNumber;
	}


	public String getSex() {
		return sex;
	}


	public void setSex(String sex) {
		this.sex = sex;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public Integer getAge() {
		return age;
	}


	public void setAge(Integer age) {
		this.age = age;
	}


	public Long getId() {
		return id;
	}


	public PatientDTO(Long id, String fullName, String phoneNumber, String sex, String email, Integer age) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.phoneNumber = phoneNumber;
		this.sex = sex;
		this.email = email;
		this.age = age;
	}
	
	
	
	public List<BookingReturnDTO> getBookins() {
		return bookins;
	}


	public void setBookins(List<BookingReturnDTO> bookins) {
		this.bookins = bookins;
	}


	public static PatientDTO convert(Patient patient) {
		return new PatientDTO(patient.getId(), patient.getFullName(), patient.getPhoneNumber(), patient.getSex(), patient.getEmail(), patient.getAge());
	}
	
	
}
