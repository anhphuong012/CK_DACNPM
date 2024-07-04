package org.example.dacnpm.config;

import org.example.dacnpm.model.Account;
import org.example.dacnpm.repositories.AccountRepository;
import org.example.dacnpm.util.PasswordEncryption;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import lombok.extern.slf4j.Slf4j;

@Configuration
@Slf4j
public class ApplicationInitConfig {
	
	@Bean
	ApplicationRunner applicationRunner(AccountRepository accountRepository) {
		return arg -> {
			if(accountRepository.findByUsername("admin") == null) {
				Account account = new Account();
				account.setUsername("admin");
				account.setPassword(PasswordEncryption.hashPassword("admin"));
				account.setRole("admin");
				account.setDoctor(null);
				account.setPatient(null);
				account.setStatus(true);
				accountRepository.save(account);
				log.warn("create user admin with password admin");
			}
			
		};
	}

}
