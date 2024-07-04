package org.example.dacnpm.dto;

import org.example.dacnpm.model.Account;

public class AccountAdminResponse {
	private String username;
	private String role;
	private boolean status;
	
	public AccountAdminResponse() {
		
	}
	
	public AccountAdminResponse(String username, String role, boolean status) {
		super();
		this.username = username;
		this.role = role;
		this.status = status;
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
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	
	public static AccountAdminResponse convert(Account entiry) {
		return new AccountAdminResponse(entiry.getUsername(), entiry.getRole(), entiry.isStatus());
	}
	

}
