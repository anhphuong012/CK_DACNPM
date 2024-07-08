package org.example.dacnpm.Service;

import java.util.Date;
import java.util.List;

import org.example.dacnpm.dto.BookingDTO;
import org.example.dacnpm.dto.SheduleDTO;
import org.example.dacnpm.model.Booking;

public interface ISheduleService {
	
	SheduleDTO addShedule(SheduleDTO shedule);
	List<SheduleDTO> findByDateAndDoctor(Long id,List<String> date);
	boolean deleteShedule(Long id);
	
	List<SheduleDTO> findByDate(Date date);
	boolean checkBookingInOff(BookingDTO bookingDTO);

}
