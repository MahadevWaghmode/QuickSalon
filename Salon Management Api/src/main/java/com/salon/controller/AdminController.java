package com.salon.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.salon.entities.Employee;
import com.salon.entities.Salon;
import com.salon.entities.Service;
import com.salon.payloads.UserDto;
import com.salon.service.EmployeeService;
import com.salon.service.SalonService;
import com.salon.service.ServiceService;
import com.salon.service.UserService;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

	@Autowired
	private SalonService salonService;

	@Autowired
	private UserService userService;

	private Integer getAdminId(Principal principal) {
		UserDto user = this.userService.getByEmail(principal.getName());
		return user.getId();
	}

	@GetMapping("/profile")
	public UserDto getAdminProfile(Principal principal) {
		int adminId = this.getAdminId(principal);
		return this.userService.getUserById(adminId);
	}

	/* Salon Operations */

	// create new salon of user
	@PostMapping("/salon")
	public ResponseEntity<Salon> addSalon(@RequestBody Salon salon, Principal principal) {

		int userId = getAdminId(principal);

		Salon createdSalon = this.salonService.createSalon(userId, salon);

		return new ResponseEntity<Salon>(createdSalon, HttpStatus.CREATED);
	}
	
	@GetMapping("/salon/{salonId}")
	public ResponseEntity<Salon> getUserSalon(@PathVariable Integer salonId){
		Salon salon = this.salonService.getSalonById(salonId);
		return new ResponseEntity<Salon>(salon, HttpStatus.CREATED);
	}

	@GetMapping("/salon")
	public ResponseEntity<?> getAllUserSalons(Principal principal) {

		int userId = this.getAdminId(principal);

		return ResponseEntity.ok(this.salonService.getUserSalons(userId));
	}

	@PutMapping("/salon/{id}")
	public ResponseEntity<Salon> updateSalon(@PathVariable Integer id, @RequestBody Salon salon, Principal principal) {
		int userId = this.getAdminId(principal);
		Salon updatedSalon = this.salonService.updateSalon(salon, id, userId);
		return ResponseEntity.ok(updatedSalon);
	}

	// Delete salon with ownership verification
	@DeleteMapping("/salon/{id}")
	public ResponseEntity<String> deleteSalon(@PathVariable Integer id, Principal principal) {
		int userId = this.getAdminId(principal);
		this.salonService.deleteSalon(id, userId);
		return ResponseEntity.ok("Salon deleted successfully");
	}

	/* Salon Service Operations */

	@Autowired
	ServiceService serviceService;

	@PostMapping("/salon/{salonId}/service")
	public ResponseEntity<Service> addSalonService(@RequestBody Service service, @PathVariable int salonId) {

		Service createdService = this.serviceService.createService(salonId, service);

		return new ResponseEntity<Service>(createdService, HttpStatus.CREATED);
	}

	@GetMapping("/salon/{salonId}/service")
	public ResponseEntity<List<Service>> getSalonServices(@PathVariable Integer salonId) {

		return ResponseEntity.ok(this.serviceService.getSalonServices(salonId));

	}

	@PutMapping("/salon/{salonId}/service/{serviceId}")
	public ResponseEntity<Service> updateSalonService(@PathVariable Integer salonId,@PathVariable Integer serviceId,
			@RequestBody Service service) {

		Service updatedService = this.serviceService.updateService(salonId, serviceId, service);

		return ResponseEntity.ok(updatedService);

	}

	@DeleteMapping("/salon/{salonId}/service/{serviceId}")
	public String deleteSalonService(@PathVariable Integer salonId, @PathVariable Integer serviceId) {

		this.serviceService.deleteService(salonId, serviceId);

		return "deleted";
	}
		
	
	
	/* Salon Employee Operations */

	@Autowired
	EmployeeService employeeService;

	@PostMapping("/salon/{salonId}/employee")
	public ResponseEntity<Employee> addEmployeeService(@RequestBody Employee employee, @PathVariable int salonId) {

		Employee createdEmployee = this.employeeService.createEmployee(salonId, employee);

		return new ResponseEntity<Employee>(createdEmployee, HttpStatus.CREATED);
	}

	@GetMapping("/salon/{salonId}/employee")
	public ResponseEntity<List<Employee>> getEmployeeServices(@PathVariable Integer salonId) {

		return ResponseEntity.ok(this.employeeService.getSalonEmployees(salonId));

	}

	@PutMapping("/salon/{salonId}/employee/{empId}")
	public ResponseEntity<Employee> updateSalonEmployee(@PathVariable Integer salonId,@PathVariable Integer empId,
			@RequestBody Employee employee) {

		Employee updatedEmployee = this.employeeService.updateEmployee(salonId, empId, employee);

		return ResponseEntity.ok(updatedEmployee);

	}
	
	@DeleteMapping("/salon/{salonId}/employee/{empId}")
	public String deleteSalonEmployee(@PathVariable Integer salonId, @PathVariable Integer empId) {

		this.employeeService.deleteEmployee(salonId, empId);

		return "deleted";
	}

}
