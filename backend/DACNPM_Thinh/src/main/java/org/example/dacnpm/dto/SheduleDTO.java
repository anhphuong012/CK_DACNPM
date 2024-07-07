package org.example.dacnpm.dto;

import java.sql.Date;

import org.example.dacnpm.model.Shedule;

public class SheduleDTO {
	private long id;
	private Date date;
	private String fromTime;
	private String toTime;
	private Long doctorId;
	private boolean status;

	public SheduleDTO() {

	}

	public SheduleDTO(long id, Date date, String fromTime, String toTime, boolean status,Long doctorId) {
		super();
		this.id = id;
		this.date = date;
		this.fromTime = fromTime;
		this.toTime = toTime;
		this.status = status;
		this.doctorId = doctorId;
	}

	public long getId() {
		return id;
	}

//	public void setId(long id) {
//		this.id = id;
//	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getFromTime() {
		return fromTime;
	}

	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}

	public String getToTime() {
		return toTime;
	}

	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	public boolean isStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	

	public Long getDoctorId() {
		return doctorId;
	}

	public void setDoctorId(Long doctorId) {
		this.doctorId = doctorId;
	}

	public static SheduleDTO convert(Shedule entity) {
		return new SheduleDTO(entity.getId(), entity.getDate(), entity.getFromTime(), entity.getToTime(),
				entity.isStatus(),entity.getDoctor().getId());
	}

}
