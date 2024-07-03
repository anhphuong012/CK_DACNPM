package org.example.dacnpm.dto;

import org.example.dacnpm.model.Account;
import org.example.dacnpm.model.Doctor;

public class AccountDoctorResponse {
	
	private Long id;
	private String username;
	private String role;
	private boolean status;
	private DoctorDTO doctor;
	
	public AccountDoctorResponse() {
		
	}

	public AccountDoctorResponse(Long id, String username, String role, DoctorDTO doctor) {
		super();
		this.id = id;
		this.username = username;
		this.role = role;
		this.doctor = doctor;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public DoctorDTO getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorDTO doctor) {
		this.doctor = doctor;
	}
	
	
	
	
	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}

	public static AccountDoctorResponse convert(Account account) {
		AccountDoctorResponse accountDoctorResponse = new AccountDoctorResponse();
		accountDoctorResponse.setId(account.getId());
		accountDoctorResponse.setUsername(account.getUsername());
		accountDoctorResponse.setRole(account.getRole());
		accountDoctorResponse.setStatus(account.isStatus());
		
		Doctor doctor = account.getDoctor();
//		DoctorDTO doctorDTO = new DoctorDTO(doctor.getId(), doctor.getFullName(), doctor.getAvatar(), doctor.getEmail(), doctor.getEmail(), doctor.getDescreption(), doctor.getDepartment().getName(), doctor.getPlaceOfwork());
		
		accountDoctorResponse.setDoctor(DoctorDTO.convert(doctor));
		return accountDoctorResponse;
		
	}
	
	

}
