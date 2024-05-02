package org.example.dacnpm.repositories;

import org.example.dacnpm.model.Shedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface SheduleRepository extends JpaRepository<Shedule, Long> {
    List<Shedule> findByDoctorIdAndDateAndFromTimeGreaterThanEqualAndToTimeLessThanEqual(long doctorId, LocalDate date, LocalTime fromTime, LocalTime toTime);
}
