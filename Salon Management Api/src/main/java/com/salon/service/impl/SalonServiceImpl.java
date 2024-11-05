package com.salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salon.entities.Salon;
import com.salon.entities.User;
import com.salon.exceptions.ApiException;
import com.salon.exceptions.ResourceNotFoundException;
import com.salon.exceptions.UnauthorizedAccessException;
import com.salon.repositories.SalonRepo;
import com.salon.repositories.UserRepo;
import com.salon.service.SalonService;

@Service
public class SalonServiceImpl implements SalonService {

	@Autowired
	private SalonRepo salonRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	
	public void checkSalonOwnership(Integer salonId, Integer userId) {
        Salon salon = salonRepo.findById(salonId)
                .orElseThrow(() -> new ApiException("Salon not found") );

        if (!salon.getUser().getId().equals(userId)) {
            throw new UnauthorizedAccessException("You do not have permission to access this salon");
        }
    }

	@Override
	public Salon createSalon(Salon salon) {
		return salonRepo.save(salon);
	}

	@Override
	public Salon updateSalon(Salon salon, Integer salonId,Integer userId) {
		checkSalonOwnership(salonId, userId);
		Salon existingSalon = salonRepo.findById(salonId)
				.orElseThrow(() -> new ResourceNotFoundException("Salon", "Salon id", salonId));
		
		existingSalon.setDescription(salon.getDescription());
		existingSalon.setLocation(salon.getLocation());
		existingSalon.setName(salon.getName());
		existingSalon.setOperating_time(salon.getOperating_time());

		return salonRepo.save(existingSalon);
	}

	@Override
	public Salon getSalonById(Integer salonId) {
		return salonRepo.findById(salonId)
				.orElseThrow(() -> new ResourceNotFoundException("Salon", "Salon id", salonId));
	}

	@Override
	public List<Salon> getUserSalons(Integer userId) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		return salonRepo.findSalonByUser(user);
	}

	@Override
	public void deleteSalon(Integer salonId, Integer userId) {
		checkSalonOwnership(salonId, userId);
		Salon salon = salonRepo.findById(salonId)
				.orElseThrow(() -> new ResourceNotFoundException("Salon", "Salon id", salonId));
		salonRepo.delete(salon);
	}

	@Override
	public List<Salon> getAllSalon() {
		return salonRepo.findAll();
	}

	@Override
	public Salon createSalon(Integer userId, Salon salon) {
		User user = userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "User id", userId));
		
		salon.setUser(user);  
		return salonRepo.save(salon);
	}
}
