package org.example.dacnpm.repositories;

import org.example.dacnpm.model.Account;
import org.springframework.data.repository.CrudRepository;

public interface AccountRepository extends CrudRepository<Account, Long> {
	Account findByUsername(String username);
	

}
