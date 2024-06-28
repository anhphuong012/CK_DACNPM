package org.example.dacnpm.Service;

import java.util.List;

import org.example.dacnpm.dto.SickDTO;

public interface ISickService {
	List<SickDTO> findByNameContains(String name);

}
