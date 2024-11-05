package com.salon.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salon.entities.Service;
import com.salon.service.ServiceService;


@RestController
@CrossOrigin
@RequestMapping("/api/service")
public class ServiceController {
	
	@Autowired
	ServiceService serviceService;
	
//	@PostMapping
//	public ResponseEntity<Service> addService(@RequestBody Service service) {
//
//		
//		Service createdService = this.serviceService.createService(service);
//
//		return new ResponseEntity<Service>(createdService, HttpStatus.CREATED);
//	}
//	
//	@GetMapping
//	public ResponseEntity<List<Service>> getAllServices() {
//		
//		return ResponseEntity.ok(this.serviceService.getAllServices());
//		
//	}
//	
//	@PutMapping("/{id}")
//	public ResponseEntity<Service> updateService(@PathVariable Integer id , @RequestBody Service service) {
//		
//		
//		Service updatedService = this.serviceService.updateService(id,service);
//		
//		return ResponseEntity.ok(updatedService);
//		
//	}
//	
//	@DeleteMapping("/{id}")
//	public String deleteService(@PathVariable Integer id) {
//		
//		this.serviceService.deleteService(id);
//		
//		return "deleted";
//	}
//	
	

}
