package org.example.dacnpm.util;

import java.time.LocalTime;
import java.time.format.DateTimeFormatter;

public class TimeRange {
	private LocalTime startTime;
	private LocalTime endTime;

	public TimeRange(String startTime, String endTime) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		this.startTime = LocalTime.parse(startTime, formatter);
		this.endTime = LocalTime.parse(endTime, formatter);
	}

	public boolean isWithinRange(String timeToCheck) {
		DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
		LocalTime time = LocalTime.parse(timeToCheck, formatter);
		return !time.isBefore(startTime) && !time.isAfter(endTime);
	}
	
	public static void main(String[] args) {
		TimeRange time = new TimeRange("07:15", "07:30");
		
		System.out.println("7:15".length());
	}

}
