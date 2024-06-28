package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.model.Sick;
import org.springframework.data.repository.CrudRepository;

public interface SickRepository  extends CrudRepository<Sick, Long>{
	public Sick findByName(String name);
	List<Sick> findByNameContains(String name);
	List<Sick> findAll();
}
