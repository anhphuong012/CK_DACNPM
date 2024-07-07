package org.example.dacnpm.Service;

import java.awt.print.Book;
import java.util.ArrayList;
import java.util.List;

import org.example.dacnpm.dto.SheduleDTO;
import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.Shedule;
import org.example.dacnpm.repositories.BookingRepository;
import org.example.dacnpm.repositories.DoctorRepository;
import org.example.dacnpm.repositories.SheduleRepository;
import org.example.dacnpm.util.TimeRange;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SheduleServiceImp implements ISheduleService {

	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private SheduleRepository sheduleRepository;

	@Autowired
	private BookingRepository bookingRepository;

	@Autowired
	BookingServiceImpl bookingServiceImpl;

	@Override
	public SheduleDTO addShedule(SheduleDTO shedule) {

		Doctor doctor = doctorRepository.findById(shedule.getDoctorId()).get();
		Shedule entity = new Shedule();
		entity.setDate(shedule.getDate());
		entity.setDoctor(doctor);
		entity.setFromTime(shedule.getFromTime());
		entity.setToTime(shedule.getToTime());
		entity.setStatus(shedule.isStatus());

		Shedule save = sheduleRepository.save(entity);

		if (save != null) {
			List<Booking> listBook = bookingRepository.findByDateAndDoctor(shedule.getDate(),doctor);
			String startTime = shedule.getFromTime().length() == 5 ? shedule.getFromTime()
					: "0" + shedule.getFromTime();
			String endTime = shedule.getToTime().length() == 5 ? shedule.getToTime() : "0" + shedule.getToTime();

			TimeRange timeRange = new TimeRange(startTime, endTime);
			String dateCheck;
			if (listBook != null) {
				for (Booking booking : listBook) {
					dateCheck = booking.getTime().length() == 5 ? booking.getTime() : "0" + booking.getTime();
					if (timeRange.isWithinRange(dateCheck)) {
						bookingServiceImpl.cancelBooking(booking.getId());
					}
				}
			}
		}

		return SheduleDTO.convert(save);
	}

	@Override
	public boolean deleteShedule(Long id) {
		Shedule shedule = sheduleRepository.findById(id).get();
		sheduleRepository.delete(shedule);
		return shedule != null;
	}

	@Override
	public List<SheduleDTO> findByDateAndDoctor(Long id, List<String> date) {
		Doctor doctor = doctorRepository.findById(id).get();
		List<Shedule> listShedule = sheduleRepository.findByDoctor(doctor);
		

		if (listShedule == null) {
			return null;
		} else {
			List<SheduleDTO> result = new ArrayList<>();
			for (Shedule entity : listShedule) {
				System.out.println("Entity:" + entity.getDate().toString());
				for (String d : date) {
					if (entity.getDate().toString().equals(d)) {
						result.add(SheduleDTO.convert(entity));
					}
				}
			}
			return result;

		}

	}

}
