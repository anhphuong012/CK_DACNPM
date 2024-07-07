package org.example.dacnpm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Shedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private Date date;
    private String fromTime;
    private String toTime;
    
    @ManyToOne
	@JoinColumn(name = "doctor_id",nullable = false)
	private Doctor doctor;
    
    
    private boolean status;


    public Shedule() {
    	
    }
    
    
    
	public Shedule(long id, Date date, String fromTime, String toTime, Doctor doctor, boolean status) {
		super();
		this.id = id;
		this.date = date;
		this.fromTime = fromTime;
		this.toTime = toTime;
		this.doctor = doctor;
		this.status = status;
	}



	public long getId() {
		return id;
	}


	public void setId(long id) {
		this.id = id;
	}


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


	public Doctor getDoctor() {
		return doctor;
	}


	public void setDoctor(Doctor doctor) {
		this.doctor = doctor;
	}


	public boolean isStatus() {
		return status;
	}


	public void setStatus(boolean status) {
		this.status = status;
	}

   
    
   

}
