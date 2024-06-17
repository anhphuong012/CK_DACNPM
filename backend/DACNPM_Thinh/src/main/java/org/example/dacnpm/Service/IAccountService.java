package org.example.dacnpm.Service;

import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.RegisterUserAccount;

public interface IAccountService {
	AccountUserResponse register(RegisterUserAccount register);
	Object login(String username,String password);
	

}
