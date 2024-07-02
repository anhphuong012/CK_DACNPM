package org.example.dacnpm.dto;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;


@Getter
@Builder
@AllArgsConstructor
@Setter
public class BookingDTO {

	private Long doctorId;

	private Long patientId;
	
	@JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
	private Date date;
	
	private String time;
	
	private String status;
	
	private String doctorName;
	
}
