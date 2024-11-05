package com.salon.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Salon;
import com.salon.entities.Service;

public interface ServiceRepo extends JpaRepository<Service, Integer> {

	List<Service> findServiceBySalon(Salon salon);
	
}
