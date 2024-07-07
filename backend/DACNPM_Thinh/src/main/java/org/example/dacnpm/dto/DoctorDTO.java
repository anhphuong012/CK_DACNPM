package org.example.dacnpm.dto;

import java.util.List;

import org.example.dacnpm.model.Doctor;
import org.springframework.beans.factory.annotation.Value;

public class DoctorDTO {

	private Long id;
	private String fullName;
	private String avatar;
	private String email;
	private String degree;
	private String descreption;
	private String department;
	private String placeOfwork;

	private List<BookingReturnDTO> bookings;

	
	private List<SheduleDTO> shedule;


	public DoctorDTO() {

	}

	public DoctorDTO(Long id, String fullName, String avatar, String email, String degree, String descreption,
			String department, String placeOfwork) {
		super();
		this.id = id;
		this.fullName = fullName;
		this.avatar = avatar;
		this.email = email;
		this.degree = degree;
		this.descreption = descreption;
		this.department = department;
		this.placeOfwork = placeOfwork;
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getPlaceOfwork() {
		return placeOfwork;
	}

	public void setPlaceOfwork(String placeOfwork) {
		this.placeOfwork = placeOfwork;
	}

	public Long getId() {
		return id;
	}

	public static DoctorDTO convert(Doctor doctor) {
		DoctorDTO doctorDTO = new DoctorDTO(doctor.getId(), doctor.getFullName(), doctor.getAvatar(), doctor.getEmail(),
				doctor.getDegree(), doctor.getDescreption(), doctor.getDepartment().getName(), doctor.getPlaceOfwork());
		String url =   "http://localhost:8081/api/file/" + doctorDTO.getAvatar();
		doctorDTO.setAvatar(url);
		return doctorDTO;
	}

	public List<BookingReturnDTO> getBookings() {
		return bookings;
	}

	public void setBookings(List<BookingReturnDTO> bookings) {
		this.bookings = bookings;
	}

	public List<SheduleDTO> getShedule() {
		return shedule;
	}

	public void setShedule(List<SheduleDTO> shedule) {
		this.shedule = shedule;
	}
	
	

}
