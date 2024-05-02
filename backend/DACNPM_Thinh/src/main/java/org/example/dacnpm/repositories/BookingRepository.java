package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.Patient;
import org.springframework.data.repository.CrudRepository;

public interface BookingRepository extends CrudRepository<Booking, Long> {
	
	List<Booking> findByDoctor(Doctor doctor);
	List<Booking> findByPatient(Patient	 patient);
	

}
