package com.salon.service.impl;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.exceptions.ApiException;
import com.salon.exceptions.UnauthorizedAccessException;
import com.salon.repositories.ServiceRepo;
import com.salon.service.SalonService;
import com.salon.service.ServiceService;

@org.springframework.stereotype.Service
public class ServiceServiceImpl implements ServiceService {

    @Autowired
    ServiceRepo serviceRepo;

    @Autowired
    SalonService salonService;

    public void checkServiceOwnership(Integer salonId, Integer serviceId) {
        Service service = serviceRepo.findById(serviceId)
                .orElseThrow(() -> new ApiException("Service not found"));
        
        if (!service.getSalon().getId().equals(salonId)) {
            throw new UnauthorizedAccessException("You do not have permission to access this service");
        }
    }

    @Override
    public Service createService(int salonId, Service service) {
        Salon salon = this.salonService.getSalonById(salonId);
        service.setSalon(salon);
        return this.serviceRepo.save(service);
    }

    @Override
    public Service updateService(Integer salonId, Integer serviceId, Service updateService) {
        checkServiceOwnership(salonId, serviceId);
        
        Service service = this.serviceRepo.findById(serviceId)
                .orElseThrow(() -> new ApiException("Service Not Found"));
        
        service.setName(updateService.getName());
        service.setCategory(updateService.getCategory());
        service.setDescription(updateService.getDescription());
        service.setPrice(updateService.getPrice());
        service.setRequiredTime(updateService.getRequiredTime());

        return serviceRepo.save(service);
    }

    @Override
    public List<Service> getSalonServices(Integer salonId) {
    	
    	Salon salon = this.salonService.getSalonById(salonId);
    	
        return this.serviceRepo.findServiceBySalon(salon);
    }

    @Override
    public void deleteService(Integer salonId, Integer serviceId) {
        checkServiceOwnership(salonId, serviceId);
        
        Service service = this.serviceRepo.findById(serviceId)
                .orElseThrow(() -> new ApiException("Service Not Found"));
        
        this.serviceRepo.delete(service);
    }

	@Override
	public Service getServiceById(Integer serviceId) {
		
		Service service = this.serviceRepo.findById(serviceId)
                .orElseThrow(() -> new ApiException("Service Not Found"));
		return service;
	}

	
}
