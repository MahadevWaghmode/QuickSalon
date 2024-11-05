package com.salon.service;

import java.time.LocalDateTime;
import java.util.List;

import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.entities.Slot;

public interface SlotService {

	List<Slot> findAvailableSlots(Salon salon, Service service, LocalDateTime startDate, LocalDateTime endDate);

}
