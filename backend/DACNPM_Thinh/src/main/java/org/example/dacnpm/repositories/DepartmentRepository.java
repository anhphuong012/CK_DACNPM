package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.model.Department;
import org.springframework.data.repository.CrudRepository;

public interface DepartmentRepository extends CrudRepository<Department, Long> {
	List<Department> findAll();
	

}
