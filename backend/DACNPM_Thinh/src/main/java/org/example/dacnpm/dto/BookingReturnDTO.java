package org.example.dacnpm.dto;

import java.sql.Date;

import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.Patient;

import com.fasterxml.jackson.annotation.JsonFormat;

public class BookingReturnDTO {
	private Long id;
	private PatientDTO patient;
	private DoctorDTO doctor;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
	private Date date;
	
	private String time;
	
	private Integer status;
	
	public BookingReturnDTO() {
		
	}
	

	




//	public BookingReturnDTO(Long id, PatientDTO patient, DoctorDTO doctor, Date date, Integer status) {
//		super();
//		this.id = id;
//		this.patient = patient;
//		this.doctor = doctor;
//		this.date = date;
//		this.status = status;
//	}


	





	public BookingReturnDTO(Long id, PatientDTO patient, DoctorDTO doctor, Date date, String time, Integer status) {
		super();
		this.id = id;
		this.patient = patient;
		this.doctor = doctor;
		this.date = date;
		this.time = time;
		this.status = status;
	}







	public PatientDTO getPatient() {
		return patient;
	}







	public void setPatient(PatientDTO patient) {
		this.patient = patient;
	}







	public DoctorDTO getDoctor() {
		return doctor;
	}

	public void setDoctor(DoctorDTO doctor) {
		this.doctor = doctor;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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
	public static BookingReturnDTO convertBookingReturnDTO(Booking booking) {
		return new BookingReturnDTO(booking.getId(),PatientDTO.convert(booking.getPatient()),DoctorDTO.convert(booking.getDoctor()),booking.getDate(),booking.getTime(),booking.getStatus());
	}




	
	

}
