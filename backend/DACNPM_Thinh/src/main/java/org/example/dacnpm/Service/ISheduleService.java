package org.example.dacnpm.Service;

import java.util.List;

import org.example.dacnpm.dto.SheduleDTO;

public interface ISheduleService {
	
	SheduleDTO addShedule(SheduleDTO shedule);
	List<SheduleDTO> findByDateAndDoctor(Long id,List<String> date);
	boolean deleteShedule(Long id);

}
