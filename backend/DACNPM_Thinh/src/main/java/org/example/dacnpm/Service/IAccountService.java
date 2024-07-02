package org.example.dacnpm.Service;

import java.util.List;

import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.RegisterDoctorAccount;
import org.example.dacnpm.dto.RegisterUserAccount;
import org.springframework.web.multipart.MultipartFile;

public interface IAccountService {
	AccountUserResponse register(RegisterUserAccount register);
	Object login(String username,String password);
	List<AccountUserResponse> findAllUser();
	List<AccountDoctorResponse> findAllDoctor();
	boolean changeStatusAccount(Long id,String type);
	AccountDoctorResponse registerDoctor(RegisterDoctorAccount doctor,MultipartFile file);
	
	

}
