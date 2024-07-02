package org.example.dacnpm.Service;

import java.util.ArrayList;
import java.util.List;

import org.example.dacnpm.dto.DepartmentDTO;
import org.example.dacnpm.model.Department;
import org.example.dacnpm.repositories.DepartmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepartmentService {
	@Autowired
	private DepartmentRepository departmentRepository;
	
	
	public List<DepartmentDTO> findAll(){
		List<Department> listEntity = departmentRepository.findAll();
		List<DepartmentDTO> result = new ArrayList<>();
		
		for (Department department : listEntity) {
			result.add(DepartmentDTO.convert(department));
		}
		
		return result;
	}

}
