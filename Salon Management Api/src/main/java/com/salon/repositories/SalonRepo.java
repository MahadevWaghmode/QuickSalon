package com.salon.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Salon;
import com.salon.entities.User;

public interface SalonRepo extends JpaRepository<Salon, Integer> {

	List<Salon> findSalonByUser(User user);

}
