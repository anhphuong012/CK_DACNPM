package org.example.dacnpm.Service;

import java.sql.Date;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.example.dacnpm.dto.BookingDTO;
import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.ReposeOject;
import org.example.dacnpm.repositories.BookingRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BookingServiceImpl implements IBookingService {

	private final BookingRepository bookingRepository;

	@Override
	@Transactional
	public ReposeOject cancelBooking(long id) {
		Optional<Booking> bookingOpt = bookingRepository.findById(id);
		if (bookingOpt.isPresent()) {
			Booking booking = bookingOpt.get();
			booking.setStatus(0);
			bookingRepository.save(booking);
			return new ReposeOject("200", "Success", "Cancel success");
		}
		return new ReposeOject("400", "Fail", "Can not find the booking by the id");
	}

	@Override
	public ReposeOject findBookingHaveGone(long pId) {
		Date now = Date.valueOf(LocalDate.now());
		List<Booking> bookings = bookingRepository.findBookingGone(pId, now);
		List<BookingDTO> result = bookings.stream()
				.map(item -> BookingDTO.builder().doctorId(item.getDoctor().getId())
						.patientId(item.getPatient().getId()).date(item.getDate()).time(item.getTime())
						.doctorName(item.getDoctor().getFullName()).status(convertStatus(item.getStatus())).build())
				.toList();
		return new ReposeOject("200", "Success", result);
	}

	private String convertStatus(int iStatus) {
		if (iStatus == 0) {
			return "Đã hủy";
		} else {
			return "Đã khám";
		}
	}

}
