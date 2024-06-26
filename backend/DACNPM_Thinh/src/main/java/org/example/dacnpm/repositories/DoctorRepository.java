package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.model.Department;
import org.example.dacnpm.model.Doctor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DoctorRepository  extends CrudRepository<Doctor, Long> {
	List<Doctor> findByDepartment(Department department);
	
	
	List<Doctor> findByFullNameContains(String name);
	List<Doctor> findAll(Pageable pageable);
	
}
