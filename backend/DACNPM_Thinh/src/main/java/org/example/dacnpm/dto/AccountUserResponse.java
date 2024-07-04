package org.example.dacnpm.dto;

import org.example.dacnpm.model.Account;
import org.example.dacnpm.model.Patient;

public class AccountUserResponse  {
	
	private Long id;
	private String username;
	private String role;
	private boolean status;
	private PatientDTO patient;
	
	
	public AccountUserResponse() {
		
	}


	public AccountUserResponse(Long id, String username, String role, PatientDTO patient) {
		super();
		this.id = id;
		this.username = username;
		this.role = role;
		this.patient = patient;
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


	public PatientDTO getPatient() {
		return patient;
	}


	public void setPatient(PatientDTO patient) {
		this.patient = patient;
	}
	
	public boolean isStatus() {
		return status;
	}


	public void setStatus(boolean status) {
		this.status = status;
	}


	public static AccountUserResponse convert(Account account) {
		AccountUserResponse accountResult = new AccountUserResponse();
		
		accountResult.setId(account.getId());
		accountResult.setUsername(account.getUsername());
		accountResult.setRole(account.getRole());
		accountResult.setStatus(account.isStatus());
		
		Patient entity = account.getPatient();
		
		PatientDTO patine = new PatientDTO(entity.getId(), entity.getFullName(), entity.getPhoneNumber(), entity.getSex(), entity.getEmail(), entity.getAge());
		accountResult.setPatient(patine);
		
		return accountResult;
	}
	

}
