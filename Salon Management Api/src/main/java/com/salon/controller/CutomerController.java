package com.salon.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salon.entities.Appointment;
import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.entities.Slot;
import com.salon.exceptions.ApiException;
import com.salon.payloads.SlotRequestDto;
import com.salon.payloads.UserDto;
import com.salon.service.AppointmentService;
import com.salon.service.SalonService;
import com.salon.service.ServiceService;
import com.salon.service.SlotService;
import com.salon.service.UserService;

@RestController
@RequestMapping("/api/customer")
public class CutomerController {
	
	@Autowired
	UserService userService;
	
	@Autowired
	AppointmentService appointmentService;
	
	@Autowired
	SalonService salonService;
	
	@Autowired
	ServiceService serviceService;
	
	@Autowired
	SlotService slotService;
	
	private Integer getCustomerId(Principal principal) {
		UserDto user = this.userService.getByEmail(principal.getName());
        return user.getId(); 
    }
		
	
    
    @GetMapping("/profile")
    public UserDto getCustomerProfile(Principal principal) {
        Integer custId = this.getCustomerId(principal);
        return this.userService.getUserById(custId);
    }
	
    @GetMapping("/near-by-salon")
    public List<Salon> getNeatBySalon(){
    	
    	return this.salonService.getAllSalon();
    }
    
    @PostMapping("/book-appointment/{salonId}/{serviceId}")
    public Appointment bookAppointment(Principal principal, 
                                       @PathVariable Integer salonId, 
                                       @PathVariable Integer serviceId) {
        Integer customerId = this.getCustomerId(principal);
        return this.appointmentService.bookAppointment(customerId, salonId, serviceId);
    }
	
    @GetMapping("/my-appointments")
    public List<Appointment> gelAppointments(Principal principal){
        Integer customerId = this.getCustomerId(principal);
    	return this.appointmentService.getByUserId(customerId);
    }
    
    @PostMapping("/available-slots")
    public List<Slot> getAvailableSlots(@RequestBody SlotRequestDto slotRequest) {
        Salon salon = salonService.getSalonById(slotRequest.getSalonId());
                
        Service service = serviceService.getServiceById(slotRequest.getServiceId());
                

        return slotService.findAvailableSlots(salon, service, slotRequest.getStartDate(), slotRequest.getEndDate());
    }
}
