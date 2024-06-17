package org.example.dacnpm.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;


@Getter
public class BookingDTO {

	private Long doctorId;
	

	private Long patientId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
	private Date date;
	
	private String time;
	
	public BookingDTO() {
		
	}


    public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}


    public void setPatientId(Long patientIds) {
		this.patientId = patientIds;
	}


    public void setDate(Date date) {
		this.date = date;
	}


    public void setTime(String time) {
		this.time = time;
	}




	
	
	
	

}
