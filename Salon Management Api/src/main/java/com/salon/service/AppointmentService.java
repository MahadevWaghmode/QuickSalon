package com.salon.service;

import java.util.List;

import com.salon.entities.Appointment;

public interface AppointmentService {

	Appointment bookAppointment(Integer customerId, Integer salonId, Integer serviceId);

	List<Appointment> getByUserId(Integer customerId);

	

}
