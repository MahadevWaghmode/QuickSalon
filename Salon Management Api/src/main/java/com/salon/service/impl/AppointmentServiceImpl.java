package com.salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.salon.entities.Appointment;
import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.entities.User;
import com.salon.exceptions.ApiException;
import com.salon.exceptions.UnauthorizedAccessException;
import com.salon.repositories.AppointmentRepo;
import com.salon.repositories.SalonRepo;
import com.salon.repositories.ServiceRepo;
import com.salon.repositories.UserRepo;
import com.salon.service.AppointmentService;

@org.springframework.stereotype.Service
public class AppointmentServiceImpl implements AppointmentService {

	@Autowired
	private AppointmentRepo appointmentRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private SalonRepo salonRepo;

	@Autowired
	private ServiceRepo serviceRepo;
	
	public void checkSalonOwnership(Integer salonId, Integer userId) {
        Salon salon = salonRepo.findById(salonId)
                .orElseThrow(() -> new ApiException("Salon not found") );

        if (!salon.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You do not have permission to access this salon");
        }
    }
	
	public void checkServiceOwnership(Integer salonId, Integer serviceId) {
        Service service = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new ApiException("Service not found"));
        
        if (!service.getSalon().getId().equals(salonId)) {
            throw new UnauthorizedAccessException("You do not have permission to access this service");
        }
    }


	@Override
	public Appointment bookAppointment(Integer customerId, Integer salonId, Integer serviceId) {
		User customer = userRepo.findById(customerId).orElseThrow(() -> new ApiException("User not found"));

		Salon salon = salonRepo.findById(salonId).orElseThrow(() -> new ApiException("Salon not found"));

		Service service = serviceRepo.findById(serviceId)
				.orElseThrow(() -> new ApiException("Service not found"));

		Appointment appointment = new Appointment();
		appointment.setUser(customer);
		appointment.setSalon(salon);
		appointment.setService(service);
		appointment.setStatus("Booked");
		appointment.setPaymentStatus("Paid");

		return appointmentRepo.save(appointment);
	}

	@Override
	public List<Appointment> getByUserId(Integer customerId) {
		
		return this.appointmentRepo.findByUserId(customerId);
	}

}
