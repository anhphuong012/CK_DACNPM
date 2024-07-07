package org.example.dacnpm.repositories;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import org.example.dacnpm.model.Doctor;
import org.example.dacnpm.model.Shedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SheduleRepository extends JpaRepository<Shedule, Long> {
//    Shedule findByDoctorIdAndDateAndFromTimeGreaterThanEqualAndToTimeLessThanEqual(long doctorId, LocalDate date, LocalTime fromTime, LocalTime toTime);
    
    List<Shedule> findByDoctor(Doctor doctor);
}
