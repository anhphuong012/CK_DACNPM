package org.example.dacnpm.repositories;

import java.sql.Date;
import java.util.List;

import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.Patient;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface BookingRepository extends CrudRepository<Booking, Long> {

	List<Booking> findByDoctorAndStatus(Doctor doctor,Integer status);

	List<Booking> findByPatient(Patient patient);

	List<Booking> findByPatientOrderByIdDesc(Patient patient);
	
	List<Booking> findByDateAndDoctor(Date date,Doctor doctor);

	@Query("select b from Booking b where b.date = ?1 and b.time =?2 and b.doctor = ?3")
	Booking findByDateAndTimeAndDoctor(Date date, String time, Doctor doctor);
	
	@Query("select b from Booking b where b.date = ?1 and b.time =?2 and b.doctor = ?3 and b.status = ?4")
	Booking findByDateAndTimeAndDoctorAndStatus(Date date, String time, Doctor doctor,Integer status);

	@Query("select b from Booking b where b.patient.id = :pId and (status = 0 or b.date < :dateCurrent) order by b.id desc")
	List<Booking> findBookingGone(@Param("pId") long pId, @Param("dateCurrent") Date dateCurrent);
	
	@Query("select b from Booking b where b.patient.id = :pId and status = 1 and b.date >= :dateCurrent order by b.id desc")
	List<Booking> findBookingAvailable(@Param("pId") long pId, @Param("dateCurrent") Date dateCurrent);
	
}
