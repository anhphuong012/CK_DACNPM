package org.example.dacnpm.Service;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.example.dacnpm.dto.AccountAdminResponse;
import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.AuthenResponse;
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

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSObject;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.KeyLengthException;
import com.nimbusds.jose.Payload;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

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

//	private final static String signerKey = "fEu/rrsgAbh+C9njm/UkISfYRFfGGC8jUvhYXe265ukwV/b7T1Fguw8yP+PJ1cb3";

	@Value("${jwt.sig}")
	private String signerKey;

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
					String token = generateToken(account);
					AuthenResponse result = new AuthenResponse();
					result.setToken(token);
					if (account.getRole().equals("user")) {
//						AccountUserResponse userAcc = AccountUserResponse.convert(account);
//						return userAcc;
						result.setUser(AccountUserResponse.convert(account));
						;
					} else if (account.getRole().equals("doctor")) {
//						return AccountDoctorResponse.convert(account);
						result.setUser(AccountDoctorResponse.convert(account));
						;
					} else if (account.getRole().equals("admin")) {
						result.setUser(AccountAdminResponse.convert(account));
					}
					return result;
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

	public boolean deleteDoctor(Long id) throws IOException {
		Account account = accountRepository.findById(id).get();

		if (account == null) {
			return false;
		} else {
			if (account.getRole().equals("doctor")) {
				Files.deleteIfExists(Paths.get(path + File.separator + account.getDoctor().getAvatar()));
				try {
					accountRepository.delete(account);
					return true;
				} catch (Exception e) {
					return false;
				}

			} else {
				return false;
			}
		}

	}

	public String generateToken(Account account) {

		JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
		JWTClaimsSet claimsSet = new JWTClaimsSet.Builder().subject(account.getUsername()).issuer("devteria.com")
				.issueTime(new Date()).expirationTime(new Date(Instant.now().plus(1, ChronoUnit.HOURS).toEpochMilli()))
				.claim("scope", account.getRole()).build();
		Payload payload = new Payload(claimsSet.toJSONObject());

		JWSObject jwsObject = new JWSObject(header, payload);

		try {
			jwsObject.sign(new MACSigner(signerKey.getBytes()));
			return jwsObject.serialize();
		} catch (KeyLengthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (JOSEException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public boolean introspect(String token) throws JOSEException, ParseException {

		JWSVerifier verifier = new MACVerifier(signerKey.getBytes());

		SignedJWT signedJWT = SignedJWT.parse(token);

		Date expityTime = signedJWT.getJWTClaimsSet().getExpirationTime();

		var verified = signedJWT.verify(verifier);

		return verified && expityTime.after(new Date());
	}

	public boolean checkPass(String userName, String password) {
		Account account = accountRepository.findByUsername(userName.trim());

		if (account == null)
			return false;
		else {
			return PasswordEncryption.checkPassword(password, account.getPassword());
		}
	}

	public boolean changePass(String userName, String newPass) {
		Account account = accountRepository.findByUsername(userName.trim());

		if (account == null)
			return false;
		else {
			account.setPassword(PasswordEncryption.hashPassword(newPass));
			Account save = accountRepository.save(account);

			return save != null;
		}
	}

}
