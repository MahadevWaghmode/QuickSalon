package com.salon.service;

import java.util.List;

import com.salon.entities.Service;

public interface ServiceService {

	Service createService(int salonId, Service service);

	Service updateService(Integer salonId, Integer serviceId, Service updateService);

	List<Service> getSalonServices(Integer salonId);

	void deleteService(Integer salonId, Integer serviceId);

	Service getServiceById(Integer serviceId);
}
