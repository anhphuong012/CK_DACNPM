package org.example.dacnpm.dto;

public class RegisterDoctorAccount {
	private String username;
	private String password;

	private String fullName;
	private String avatar;
	private String email;
	private String degree;
	private String descreption;
	private Long department;
	private String placeOfwork;

	public RegisterDoctorAccount() {
	}

	public RegisterDoctorAccount(String username, String password, String fullName, String avatar, String email,
			String degree, String descreption, Long department, String placeOfwork) {
		super();
		this.username = username;
		this.password = password;
		this.fullName = fullName;
		this.avatar = avatar;
		this.email = email;
		this.degree = degree;
		this.descreption = descreption;
		this.department = department;
		this.placeOfwork = placeOfwork;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDegree() {
		return degree;
	}

	public void setDegree(String degree) {
		this.degree = degree;
	}

	public String getDescreption() {
		return descreption;
	}

	public void setDescreption(String descreption) {
		this.descreption = descreption;
	}

	public Long getDepartment() {
		return department;
	}

	public void setDepartment(Long department) {
		this.department = department;
	}

	public String getPlaceOfwork() {
		return placeOfwork;
	}

	public void setPlaceOfwork(String placeOfwork) {
		this.placeOfwork = placeOfwork;
	}

}
