package org.example.dacnpm.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDate;
import java.time.LocalTime;

@Setter
@Getter
public class CaledarDTO {
    private Long doctorId;


    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern="dd-MM-yyyy")
    private Date date;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern="HH:mm")
    private String[] time;

    public CaledarDTO() {
    }

}
