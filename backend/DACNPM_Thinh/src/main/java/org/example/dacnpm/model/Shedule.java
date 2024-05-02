package org.example.dacnpm.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class Shedule {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;
    private long doctorId;
    private LocalDate date;
    private LocalTime fromTime;
    private LocalTime toTime;
    private boolean status;

    public Shedule() {
    }

    public Shedule( long doctorId, LocalDate date, LocalTime fromTime, LocalTime toTime, boolean status) {
        this.id = id;
        this.doctorId = doctorId;
        this.date = date;
        this.fromTime = fromTime;
        this.toTime = toTime;
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getDoctorId() {
        return doctorId;
    }

    public void setDoctorId(long doctorId) {
        this.doctorId = doctorId;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getFromTime() {
        return fromTime;
    }

    public void setFromTime(LocalTime fromTime) {
        this.fromTime = fromTime;
    }

    public LocalTime getToTime() {
        return toTime;
    }

    public void setToTime(LocalTime toTime) {
        this.toTime = toTime;
    }

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Shedule{" +
                "id=" + id +
                ", doctorId=" + doctorId +
                ", date=" + date +
                ", fromTime=" + fromTime +
                ", toTime=" + toTime +
                ", status=" + status +
                '}';
    }
}
