package org.example.dacnpm.model;

import java.sql.Date;


import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
public class Booking {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO, generator="native")
	private Long id;
	
	@ManyToOne
	@JoinColumn(name = "doctor_id",nullable = false)
	private Doctor doctor;
	
	@ManyToOne
	@JoinColumn(name = "patient_id",nullable = false)
	private Patient patient;
	
	@Column(name = "date")
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
	private Date date;
	
	
	@Column(name = "time")
	private String time;
	
	@Column(name ="status")
	private Integer status;
	
	public Booking () {
		
	}


	public Doctor getDoctor() {
		return doctor;
	}


	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}


	public Patient getPatient() {
		return patient;
	}


	public void setPatient(Patient patient) {
		this.patient = patient;
	}


	public Date getDate() {
		return date;
	}


	public void setDate(Date date2) {
		this.date = date2;
	}


	public Long getId() {
		return id;
	}


	public Integer getStatus() {
		return status;
	}


	public void setStatus(Integer status) {
		this.status = status;
	}


	public String getTime() {
		return time;
	}


	public void setTime(String time) {
		this.time = time;
	}
	
	

	
	
}
