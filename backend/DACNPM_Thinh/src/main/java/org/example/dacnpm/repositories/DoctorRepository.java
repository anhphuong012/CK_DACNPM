package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.model.Department;
import org.example.dacnpm.model.Doctor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

public interface DoctorRepository  extends CrudRepository<Doctor, Long> {
	List<Doctor> findByDepartment(Department department);
	
	
	List<Doctor> findByFullNameContains(String name);
	
}
