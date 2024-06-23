package org.example.dacnpm.Service;

import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.RegisterUserAccount;
import org.example.dacnpm.model.Account;
import org.example.dacnpm.model.Patient;
import org.example.dacnpm.repositories.AccountRepository;
import org.example.dacnpm.repositories.PatientRepository;
import org.example.dacnpm.util.PasswordEncryption;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AccountService implements IAccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private PatientRepository patientRepository;

	public AccountUserResponse register(RegisterUserAccount register) {

		if (accountRepository.findByUsername(register.getUsername()) != null) {
			return null;
		} else {
			Account account = new Account();
			account.setUsername(register.getUsername());
			account.setPassword(PasswordEncryption.hashPassword(register.getPassword()));
			account.setRole("user");
			// TODO Auto-generated method stub

			Patient patient = new Patient();
			patient.setAge(register.getAge());
			patient.setEmail(register.getEmail());
			patient.setFullName(register.getFullName());
			patient.setPhoneNumber(register.getPhoneNumber());
			patient.setSex(register.getSex());

			account.setPatient(patient);
			account.setDoctor(null);

			Account save = accountRepository.save(account);
			return AccountUserResponse.convert(save);
		}
	}

	public Object login(String username, String password) {
		Account account = accountRepository.findByUsername(username.trim());
		
		System.out.println("Username:" + username);


		if (account == null) {
			System.out.println("==");
			return null;
		} else {
//			boolean check = PasswordEncryption.checkPassword( password,account.getPassword());
			boolean check = true;
			System.out.println(check);
			if (!check) {
				return null;
			} else {
				if (account.getRole().equals("user")) {
					return AccountUserResponse.convert(account);
				} else {
					return AccountDoctorResponse.convert(account);
				}
			}
		}

	}

}
