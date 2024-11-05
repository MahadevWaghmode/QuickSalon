package com.salon.service;

import java.util.List;

import com.salon.entities.Salon;

public interface SalonService {
	// all user operations
	List<Salon> getUserSalons(Integer userId);
	Salon createSalon(Integer userId, Salon salon);
	
	
	
	// all admin operations
	Salon createSalon(Salon salon);

	Salon updateSalon(Salon salon, Integer salonId, Integer userId);

	Salon getSalonById(Integer salonId);

	List<Salon> getAllSalon();

	void deleteSalon(Integer salonId, Integer userId);

}
