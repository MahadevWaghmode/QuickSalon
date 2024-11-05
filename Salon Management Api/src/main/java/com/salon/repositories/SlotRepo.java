package com.salon.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.entities.Slot;

public interface SlotRepo extends JpaRepository<Slot, Integer> {

	List<Slot> findBySalonAndServiceAndStartDateTimeAfterAndEndDateTimeBeforeAndStatus(Salon salon, Service service,
			LocalDateTime start, LocalDateTime end, String status);
}
