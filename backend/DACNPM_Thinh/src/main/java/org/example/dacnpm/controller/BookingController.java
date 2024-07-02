package org.example.dacnpm.controller;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.example.dacnpm.Service.IBookingService;
import org.example.dacnpm.dto.BookingDTO;
import org.example.dacnpm.dto.BookingReturnDTO;
import org.example.dacnpm.dto.DoctorDTO;
import org.example.dacnpm.dto.PatientDTO;
import org.example.dacnpm.model.*;
import org.example.dacnpm.repositories.BookingRepository;
import org.example.dacnpm.repositories.DoctorRepository;
import org.example.dacnpm.repositories.PatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("v1/booking")
public class BookingController {
	@Autowired
	private BookingRepository bookingRepository;
	@Autowired
	private PatientRepository patientRepository;
	@Autowired
	private DoctorRepository doctorRepository;

	@Autowired
	private IBookingService bookingService;

	@PostMapping("/add")
	public @ResponseBody ResponseEntity<ReposeOject> insertBooking(@RequestBody BookingDTO bookingDTO) {
		Doctor doctor = doctorRepository.findById(bookingDTO.getDoctorId()).get();
		Patient patient = patientRepository.findById(bookingDTO.getPatientId()).get();

		System.out.println(bookingDTO.getTime());
		Booking bookingModel = bookingRepository.findByDateAndTimeAndDoctor(bookingDTO.getDate(), bookingDTO.getTime(),
				doctor);

		System.out.println(bookingDTO.getDate());
		SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");

		if (bookingModel == null || bookingModel.getStatus() != 1) {
			Booking booking = new Booking();
			booking.setDate(bookingDTO.getDate());
			booking.setDoctor(doctor);
			booking.setPatient(patient);
			booking.setTime(bookingDTO.getTime());
			booking.setStatus(1);
			Booking save = bookingRepository.save(booking);
			
			

			if (save != null) {
				String text = "Đặt lịch khám bệnh thành công \n" +
							"Kính gửi: "+booking.getPatient().getFullName() +
						"\nMã số: "+booking.getId() +
						"\nThời  gian: " + booking.getTime() +" ,Ngày " + formatter.format(booking.getDate())+
						"\nBác sĩ: " + booking.getDoctor().getFullName();

			
				SendEmail.sendMail(booking.getPatient().getEmail(), "Thông Báo Đặt Lịch Khám Bệnh", text);
				return ResponseEntity.status(HttpStatus.OK)
						.body(new ReposeOject("OK", " Successful", BookingReturnDTO.convertBookingReturnDTO(save)));
			} else {
				return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("failed", " Error", null));
			}

//			return ResponseEntity.status(HttpStatus.OK).body(
//	    			new ReposeOject("OK", " Successful", BookingReturnDTO.convertBookingReturnDTO(save))
//	    			);

		} else {
			return ResponseEntity.status(HttpStatus.EXPECTATION_FAILED).body(new ReposeOject("failed", " Error", null));
		}

	}

	@GetMapping("/doctor/{id}")
	public @ResponseBody ResponseEntity<ReposeOject> getBookingByDoctorId(@PathVariable("id") long doctorId,
			@RequestParam(value = "date", required = false) List<String> date) {
		Doctor doctor = doctorRepository.findById(doctorId).get();

		List<Booking> bookings = bookingRepository.findByDoctorAndStatus(doctor, 1);

		List<BookingReturnDTO> bookingResult = new ArrayList<>();

		if (date != null) {
			List<Booking> bookingOfDate = new ArrayList<>();

			Date dateOut;
			SimpleDateFormat formatter = new SimpleDateFormat("dd-MM-yyyy");
			for (Booking booking : bookings) {

				dateOut = booking.getDate();

//				if(formatter.format(dateOut).equals(date)) {
//					bookingOfDate.add(booking);
//				}
//				if(date.contains(formatter.format(dateOut))) {
//					bookingOfDate.add(booking);
//				}
				for (String temp : date) {
					System.out.println("Temp:" + temp);
					if (formatter.format(dateOut).equals(temp)) {
						bookingOfDate.add(booking);
						break;
					}

				}
			}

			for (Booking book : bookingOfDate) {
				bookingResult.add(BookingReturnDTO.convertBookingReturnDTO(book));
			}
		} else {
			for (Booking book : bookings) {
				bookingResult.add(BookingReturnDTO.convertBookingReturnDTO(book));
			}
		}

		DoctorDTO result = DoctorDTO.convert(doctor);
		result.setBookings(bookingResult);
		return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("success", " Success", result));

	}

	@GetMapping("/patient/{id}")
	public @ResponseBody ResponseEntity<ReposeOject> getBookingByPatientId(@PathVariable("id") long patientId) {
		Patient patient = patientRepository.findById(patientId).get();

//		List<Booking> bookings = bookingRepository.findByPatientOrderByIdDesc(patient);
		Date now = Date.valueOf(LocalDate.now());
		List<Booking> bookings = bookingRepository.findBookingAvailable(patientId, now);

		List<BookingReturnDTO> bookingResult = new ArrayList<>();

		for (Booking book : bookings) {

			bookingResult.add(BookingReturnDTO.convertBookingReturnDTO(book));

		}

		PatientDTO result = PatientDTO.convert(patient);
		result.setBookins(bookingResult);
		
		for (BookingReturnDTO bookingReturnDTO : bookingResult) {
			System.out.println(bookingReturnDTO.getId() +"-"+ bookingReturnDTO.getDate());
		}

		return ResponseEntity.status(HttpStatus.OK).body(new ReposeOject("success", " Success", result.getBookins()));

	}

	@PutMapping("/cancel/{id}")
	public ResponseEntity<ReposeOject> cancelBooking(@PathVariable("id") long id) {
		return ResponseEntity.status(HttpStatus.OK).body(bookingService.cancelBooking(id));
	}

	@GetMapping("/patient/done/{pId}")
	public ResponseEntity<ReposeOject> getBookingHaveGone(@PathVariable("pId") long id) {
		return ResponseEntity.status(HttpStatus.OK).body(bookingService.findBookingHaveGone(id));
	}

}
