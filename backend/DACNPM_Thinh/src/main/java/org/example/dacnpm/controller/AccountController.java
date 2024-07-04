package org.example.dacnpm.controller;

import java.io.IOException;

import org.example.dacnpm.Service.IAccountService;
import org.example.dacnpm.dto.AccountDoctorResponse;
import org.example.dacnpm.dto.AccountUserResponse;
import org.example.dacnpm.dto.Login;
import org.example.dacnpm.dto.RegisterDoctorAccount;
import org.example.dacnpm.dto.RegisterUserAccount;
import org.example.dacnpm.model.ReposeOject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

@RestController
@RequestMapping("v1/account")
public class AccountController {
	@Autowired
	IAccountService accountService;

	@PostMapping
	public @ResponseBody ResponseEntity<ReposeOject> register(@RequestBody RegisterUserAccount register) {
		AccountUserResponse accountUserResponse = accountService.register(register);

		if (accountUserResponse == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ReposeOject("failed", " failed", null));
		} else {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(new ReposeOject("success", " Success", accountUserResponse));
		}

	}

	@PostMapping("/login")
	public @ResponseBody ResponseEntity<ReposeOject> login(@RequestBody Login login) {
		Object obj = accountService.login(login.getUsername(), login.getPassword());

		if (obj == null) {
			return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ReposeOject("failed", " failed", null));
		} else {
			if (obj.equals("block")) {
				return ResponseEntity.status(HttpStatus.NON_AUTHORITATIVE_INFORMATION)
						.body(new ReposeOject("block", " block", obj));

			} else {
				return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("success", " Success", obj));
			}

		}

	}

	@GetMapping("/users")
	public @ResponseBody ResponseEntity<ReposeOject> getAllAccountUser() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("success", " Success", accountService.findAllUser()));
	}

	@GetMapping("/doctors")
	public @ResponseBody ResponseEntity<ReposeOject> getAllAccountDoctor() {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("success", " Success", accountService.findAllDoctor()));
	}

	@PutMapping("/changeStatus/{id}")
	public @ResponseBody ResponseEntity<ReposeOject> changStatusAccount(@PathVariable Long id,@RequestParam String type) {
		return ResponseEntity.status(HttpStatus.OK)
				.body(new ReposeOject("success", " Success", accountService.changeStatusAccount(id,type)));
	}
	
	@PostMapping("/doctor")
	public @ResponseBody ResponseEntity<ReposeOject> registerDoctor(@RequestPart(value = "file") MultipartFile file, @RequestPart(value = "doctor") String doctor) throws IOException{
		AccountDoctorResponse result = accountService.registerDoctor(convertTo(doctor), file);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ReposeOject("success", " Success", result));
		
	}
	
	@DeleteMapping("/doctor/{id}")
	
	public @ResponseBody ResponseEntity<ReposeOject> deleteDoctor(@PathVariable Long id) throws IOException{
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(new ReposeOject("success", " Success", accountService.deleteDoctor(id)));
	}
	
	private RegisterDoctorAccount convertTo(String doctor) {
		RegisterDoctorAccount result = null;
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            result = objectMapper.readValue(doctor, RegisterDoctorAccount.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
        return result;
    }
	
	

}
