package org.example.dacnpm.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity
public class Patient {
	@Id
	private Long id;
	@Column(name="full_name")
	private String fullName;
	@Column(name ="phone_number")
	private String phoneNumber;
	@Column(name ="sex")
	private String sex;
	@Column(name ="email")
	private String email;
	
	@Column(name = "age")
	private Integer age;
	
	@OneToMany(mappedBy = "patient")
	private List<Booking> bookings;
	
	public Patient() {
		
	}


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


	public List<Booking> getBookings() {
		return bookings;
	}


	public void setBookings(List<Booking> bookings) {
		this.bookings = bookings;
	}
	
	
	

}
