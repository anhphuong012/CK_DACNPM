package org.example.dacnpm.Service;

import java.util.Optional;

import org.example.dacnpm.model.Booking;
import org.example.dacnpm.model.ReposeOject;
import org.example.dacnpm.repositories.BookingRepository;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class BookingServiceImpl implements IBookingService{

	private final BookingRepository bookingRepository;
	
	@Override
	@Transactional
	public ReposeOject cancelBooking(long id) {
		Optional<Booking> bookingOpt = bookingRepository.findById(id);
		if(bookingOpt.isPresent()) {
			Booking booking = bookingOpt.get();
			booking.setStatus(0);
			bookingRepository.save(booking);
			return new ReposeOject("200", "Success", "Cancel success");
		}
		return new ReposeOject("400", "Fail", "Can not find the booking by the id");
	}

}
