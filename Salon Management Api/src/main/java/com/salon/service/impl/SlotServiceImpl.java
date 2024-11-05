package com.salon.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.entities.Slot;
import com.salon.repositories.SlotRepo;
import com.salon.service.SlotService;

@org.springframework.stereotype.Service
public class SlotServiceImpl implements SlotService{
	
	@Autowired
	SlotRepo slotRepo;

	@Override
	public List<Slot> findAvailableSlots(Salon salon, Service service, LocalDateTime start, LocalDateTime end) {
        return slotRepo.findBySalonAndServiceAndStartDateTimeAfterAndEndDateTimeBeforeAndStatus(
                salon, service, start, end, "Available");
    }

}
