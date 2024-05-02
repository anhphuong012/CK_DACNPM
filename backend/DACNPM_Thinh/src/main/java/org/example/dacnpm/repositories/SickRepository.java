package org.example.dacnpm.repositories;

import org.example.dacnpm.model.Sick;
import org.springframework.data.repository.CrudRepository;

public interface SickRepository  extends CrudRepository<Sick, Long>{
	public Sick findByName(String name);
}
