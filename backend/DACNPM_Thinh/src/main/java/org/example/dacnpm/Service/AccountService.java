package org.example.dacnpm.Service;

import java.util.ArrayList;
import java.util.List;

import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.RegisterDoctorAccount;
import org.example.dacnpm.dto.RegisterUserAccount;
import org.example.dacnpm.model.Account;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.Patient;
import org.example.dacnpm.repositories.AccountRepository;
import org.example.dacnpm.repositories.DepartmentRepository;
import org.example.dacnpm.repositories.PatientRepository;
import org.example.dacnpm.util.PasswordEncryption;
import org.example.dacnpm.util.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class AccountService implements IAccountService {
	@Autowired
	private AccountRepository accountRepository;
	@Autowired
	private PatientRepository patientRepository;

	@Autowired
	private DepartmentRepository departmentRepository;

	@Autowired
	private ImageService imageService;

	@Value("${image.storage.path}")
	private String path;

	public AccountUserResponse register(RegisterUserAccount register) {

		if (accountRepository.findByUsername(register.getUsername()) != null) {
			return null;
		} else {
			Account account = new Account();
			account.setUsername(register.getUsername());
			account.setPassword(PasswordEncryption.hashPassword(register.getPassword()));
			account.setRole("user");
			account.setStatus(true);
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

	public List<AccountUserResponse> findAllUser() {
		List<Account> listAccUser = accountRepository.findByRole("user");
		List<AccountUserResponse> result = new ArrayList<>();

		for (Account account : listAccUser) {
			result.add(AccountUserResponse.convert(account));
		}
		return result;
	}

	public List<AccountDoctorResponse> findAllDoctor() {
		List<Account> listAccUser = accountRepository.findByRole("doctor");
		List<AccountDoctorResponse> result = new ArrayList<>();

		for (Account account : listAccUser) {
			result.add(AccountDoctorResponse.convert(account));
		}
		return result;
	}

	public Object login(String username, String password) {
		Account account = accountRepository.findByUsername(username.trim());

		System.out.println("Username:" + username);

		if (account == null) {

			return null;
		} else {
			if (account.isStatus()) {
				boolean check = PasswordEncryption.checkPassword(password, account.getPassword());
//				boolean check = true;
//				System.out.println(check);
				if (!check) {
					return null;
				} else {
					if (account.getRole().equals("user")) {
						return AccountUserResponse.convert(account);
					} else {
						return AccountDoctorResponse.convert(account);
					}
				}
			} else {
				return "block";
			}
		}

	}

	public boolean changeStatusAccount(Long id, String type) {
		Account account = accountRepository.findById(id).get();

		if (type.toLowerCase().equals("block")) {
			account.setStatus(false);
		} else {
			account.setStatus(true);
		}

		Account save = accountRepository.save(account);

		return save != null;
	}

	public AccountDoctorResponse registerDoctor(RegisterDoctorAccount doctor, MultipartFile file) {
		if (accountRepository.findByUsername(doctor.getUsername()) != null) {
			return null;
		} else {
			Account account = new Account();
			account.setUsername(doctor.getUsername());
			account.setPassword(PasswordEncryption.hashPassword(doctor.getPassword()));
			account.setRole("doctor");
			account.setStatus(true);
			// TODO Auto-generated method stub
			String avatarName = RandomString.generateRandomString(8);

			try {
				imageService.uploadFile(path, avatarName + ".jpg", file);

				Doctor doctorNew = new Doctor();
				doctorNew.setAvatar(avatarName + ".jpg");
				doctorNew.setDegree(doctor.getDegree());
				doctorNew.setDepartment(departmentRepository.findById(doctor.getDepartment()).get());
				doctorNew.setDescreption(doctor.getDescreption());
				doctorNew.setEmail(doctor.getEmail());
				doctorNew.setFullName(doctor.getFullName());
				doctorNew.setPlaceOfwork(doctor.getPlaceOfwork());

				account.setDoctor(doctorNew);
				account.setPatient(null);
				Account save = accountRepository.save(account);
				return AccountDoctorResponse.convert(save);
			} catch (Exception e) {
				return null;
			}
		}

	}

}
