package org.example.dacnpm.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "doctor")
public class Doctor {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator="native")
	private Long id;
	@Column(name ="full_name")
	private String fullName;
	@Column(name ="avatar")
	private String avatar;
	@Column(name ="email")
	private String email;
	@Column(name ="degree")
	private String degree;
	@Column(name ="descreption")
	private String descreption;
	
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name="department_id",nullable = false)
	private Department department;
	
	@Column(name ="place_ofwork")
	private String placeOfwork;
	
	@OneToMany(mappedBy = "doctor")
	private List<Booking> bookings;
	
	
	@OneToOne(mappedBy = "doctor")
	private Account account;
	
	
	public Doctor() {
		
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


	public Department getDepartment() {
		return department;
	}


	public void setDepartment(Department department) {
		this.department = department;
	}


	public String getPlaceOfwork() {
		return placeOfwork;
	}


	public void setPlaceOfwork(String placeOfwork) {
		this.placeOfwork = placeOfwork;
	}

//
	public Long getId() {
		return id;
	}


	
	
	
	
	
}
