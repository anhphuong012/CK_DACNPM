package org.example.dacnpm.repositories;

import java.util.List;

import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.model.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
	Account findByUsername(String username);
	List<Account> findByRole(String role);

	

}
