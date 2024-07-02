package org.example.dacnpm.Service;

import java.util.ArrayList;
import java.util.List;

import org.example.dacnpm.dto.SickDTO;
import org.example.dacnpm.model.Sick;
import org.example.dacnpm.repositories.SickRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SickService implements ISickService {
	
	@Autowired
	private SickRepository sickRepository;

	@Override
	public List<SickDTO> findByNameContains(String name) {
		List<Sick> listSick;
		List<SickDTO> result = new ArrayList<>();
		
		if(name.equals("")) {
//			listSick = sickRepository.findAll();
			return null;
		}else {
			listSick = sickRepository.findByNameContains(name);
		}
		
		for (Sick sick : listSick) {
			result.add(SickDTO.convert(sick));
		}
		
		return result;
	}
	
	


}
