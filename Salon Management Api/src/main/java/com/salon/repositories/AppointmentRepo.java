package com.salon.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Appointment;

public interface AppointmentRepo extends JpaRepository<Appointment, Integer> {

	List<Appointment> findByUserId(Integer customerId);

}
