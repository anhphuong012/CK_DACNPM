package org.example.dacnpm.database;

import org.example.dacnpm.model.Shedule;
import org.example.dacnpm.repositories.SheduleRepository;
//import org.slf4j.LoggerFactory;
//import org.slf4j.Logger;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.time.LocalTime;

@Configuration
public class Database {
//    private static final Logger logger =  LoggerFactory.getLogger(Database.class);


    @Bean
    CommandLineRunner initDatabase(SheduleRepository sheduleRepository) {
        return new CommandLineRunner() {
            @Override
            public void run(String... args) throws Exception {
//                Shedule shedule1 = new Shedule(79822, LocalDate.parse("2024-04-10"), LocalTime.parse("09:00:00"),LocalTime.parse("11:00:00"), true);
//                Shedule shedule2 = new Shedule(79822, LocalDate.parse("2024-04-10"), LocalTime.parse("14:00:00"), LocalTime.parse("17:00:00"), true);
//                System.out.println("Data :"+ sheduleRepository.save(shedule1));
//                System.out.printf("Data :"+ sheduleRepository.save(shedule2));
            }
        };
    }
}
