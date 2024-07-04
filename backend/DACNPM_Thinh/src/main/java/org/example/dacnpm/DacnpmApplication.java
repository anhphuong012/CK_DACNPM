package org.example.dacnpm;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;

//(exclude = SecurityAutoConfiguration.class)
@SpringBootApplication
public class DacnpmApplication {

	public static void main(String[] args) {
		SpringApplication.run(DacnpmApplication.class, args);
	}

}
