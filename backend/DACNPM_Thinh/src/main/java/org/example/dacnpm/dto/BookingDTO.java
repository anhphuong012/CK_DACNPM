package org.example.dacnpm.dto;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;




public class BookingDTO {


	

	private Long doctorId;
	

	private Long patientId;
	
	@JsonFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date date;
	
	
	
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




	
	
	
	

}
