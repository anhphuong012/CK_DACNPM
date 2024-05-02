package org.example.dacnpm.repositories;

import org.example.dacnpm.model.Patient;
import org.springframework.data.repository.CrudRepository;

public interface PatientRepository extends CrudRepository<Patient, Long> {

}
