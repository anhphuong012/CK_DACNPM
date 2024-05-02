package org.example.dacnpm.controller;

import org.example.dacnpm.model.ReposeOject;
import org.example.dacnpm.model.Shedule;
import org.example.dacnpm.repositories.SheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping ("v1/shedule")
public class SheduleController {

    @Autowired
    private SheduleRepository sheduleRepository;

    @GetMapping("")
    List<Shedule> getAllShedulesInDoctor() {
        return sheduleRepository.findAll();
    }

    @GetMapping("/{id}")
    ResponseEntity<ReposeOject> findSheduleByIdIndoctor(@PathVariable long id) {
        Optional<Shedule> shedule = sheduleRepository.findById(id);
        if (shedule.isPresent()) {
            return ResponseEntity.status(HttpStatus.OK).body( new ReposeOject( "ok", "Query Shedule successfully", shedule));
        }else {
            return ResponseEntity.status(HttpStatus.OK).body( new ReposeOject( "ok", "Can not find shedule", ""));
        }
    }
/*
Add a doctor's work schedule – The work schedule is the time the doctor is free to be able to receive patients
 */
    @PostMapping("")
    ResponseEntity<ReposeOject> insertSheduleInDoctor(@RequestBody Shedule shedule) {
        List<Shedule> findAllShedules = sheduleRepository.findByDoctorIdAndDateAndFromTimeGreaterThanEqualAndToTimeLessThanEqual(shedule.getDoctorId(), shedule.getDate(), shedule.getFromTime(), shedule.getToTime());
        if (findAllShedules.size() > 0){
            return ResponseEntity.status(HttpStatus.NOT_IMPLEMENTED).body(
                    new ReposeOject( "False", "Can not insert shedule because shedule already exists", "")
            );
        }
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReposeOject("ok", "success", sheduleRepository.save(shedule))
        );
    }

    /*
    Update the time the groove can receive patients by the doctor
    - If the calendar already exists, update it again
    - If the calendar doesn't exist, it's added
     */
    @PutMapping("/{id}")
    ResponseEntity<ReposeOject> updateSheduleInDoctor(@RequestBody Shedule newShedule, @PathVariable long id) {
        Shedule updateShedule = sheduleRepository.findById(id)
                .map(shedule -> {
                    shedule.setDoctorId(newShedule.getDoctorId());
                    shedule.setDate(newShedule.getDate());
                    shedule.setFromTime(newShedule.getFromTime());
                    shedule.setToTime(newShedule.getToTime());
                    shedule.setStatus(newShedule.isStatus());
                    return sheduleRepository.save(shedule);
                }).orElseGet(() -> {
                    newShedule.setId(id);
                    return sheduleRepository.save(newShedule);
                });
        return ResponseEntity.status(HttpStatus.OK).body(
                new ReposeOject("ok", "success", updateShedule)
        );
    }

    /*
    Clear the groove time of the doctor who can receive the examination - The doctor may have an unscheduled job that coincides with a pre-selected appointment schedule
     */
    @DeleteMapping("/id")
    ResponseEntity<ReposeOject> deleteSheduleByIdInDoctor(@PathVariable long id) {
        boolean exists = sheduleRepository.existsById(id);
        if (exists) {
            sheduleRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReposeOject( "ok", "success", "")
            );
        }else {
            return ResponseEntity.status(HttpStatus.OK).body(
                    new ReposeOject( "ok", "Can not delete shedule", "")
            );
        }
    }
    

}
