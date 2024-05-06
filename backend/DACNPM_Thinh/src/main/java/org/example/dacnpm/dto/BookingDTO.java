package org.example.dacnpm.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;




public class BookingDTO {


	

	private Long doctorId;
	

	private Long patientId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
	private Date date;
	
	private String time;
	
	public BookingDTO() {
		
	}



	public Long getDoctorId() {
		return doctorId;
	}



	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}



	public Long getPatientId() {
		return patientId;
	}



	public void setPatientId(Long patientIds) {
		this.patientId = patientIds;
	}



	public Date getDate() {
		return date;
	}



	public void setDate(Date date) {
		this.date = date;
	}



	public String getTime() {
		return time;
	}



	public void setTime(String time) {
		this.time = time;
	}




	
	
	
	

}
