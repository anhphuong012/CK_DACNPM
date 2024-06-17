package org.example.dacnpm.controller;

import org.example.dacnpm.Service.IAccountService;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.BookingDTO;
import org.example.dacnpm.dto.Login;
import org.example.dacnpm.dto.RegisterUserAccount;
import org.example.dacnpm.model.ReposeOject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/account")
public class AccountController {
	@Autowired
	IAccountService accountService;
	
	@PostMapping
	public  @ResponseBody ResponseEntity<ReposeOject> register(@RequestBody RegisterUserAccount register ){
		AccountUserResponse accountUserResponse = accountService.register(register);
		
		if(accountUserResponse == null) {
			return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(
	    			new ReposeOject("failed", " failed",null)
	    			);
		}else {
			return ResponseEntity.status(HttpStatus.CREATED).body(
	    			new ReposeOject("success", " Success",accountUserResponse)
	    			);
		}	
		
	}
	@PostMapping("/login")
	public  @ResponseBody ResponseEntity<ReposeOject> login(@RequestBody Login login ){
		Object obj = accountService.login(login.getUsername(), login.getPassword());
		
		if(obj == null) {
			return ResponseEntity.status(HttpStatus.FAILED_DEPENDENCY).body(
	    			new ReposeOject("failed", " failed",null));
		}else {
			return ResponseEntity.status(HttpStatus.OK).body(
	    			new ReposeOject("success", " Success",obj)
	    			);
		}
		
	}

}
