package com.salon.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.salon.entities.Employee;
import com.salon.entities.Salon;
import com.salon.exceptions.ApiException;
import com.salon.exceptions.UnauthorizedAccessException;
import com.salon.repositories.EmployeeRepo;
import com.salon.service.EmployeeService;
import com.salon.service.SalonService;

@Service
public class EmployeeServiceImpl implements EmployeeService {

	@Autowired
	EmployeeRepo employeeRepo;

	@Autowired
	SalonService salonService;

	public void checkEmployeeOwnership(Integer salonId, Integer empId) {
		Employee Employee = employeeRepo.findById(empId).orElseThrow(() -> new ApiException("Employee not found"));

		if (!Employee.getSalon().getId().equals(salonId)) {
			throw new UnauthorizedAccessException("You do not have permission to access this Employee");
		}
	}

	@Override
	public Employee createEmployee(int salonId, Employee employee) {
		Salon salon = this.salonService.getSalonById(salonId);
		employee.setSalon(salon);
		return this.employeeRepo.save(employee);
	}

	@Override
	public Employee updateEmployee(Integer salonId, Integer empId, Employee updateEmployee) {
		checkEmployeeOwnership(salonId, empId);

		Employee employee = this.employeeRepo.findById(empId).orElseThrow(() -> new ApiException("Service Not Found"));

		employee.setName(updateEmployee.getName());
		employee.setRole(updateEmployee.getRole());
		employee.setContactInfo(updateEmployee.getContactInfo());
		employee.setSalary(updateEmployee.getSalary());

		return this.employeeRepo.save(employee);
	}

	@Override
	public List<Employee> getSalonEmployees(Integer salonId) {
		Salon salon = this.salonService.getSalonById(salonId);

		return this.employeeRepo.findEmployeeBySalon(salon);
	}

	@Override
	public void deleteEmployee(Integer salonId, Integer empId) {
		checkEmployeeOwnership(salonId, empId);

		Employee employee = this.employeeRepo.findById(empId).orElseThrow(() -> new ApiException("Service Not Found"));

		this.employeeRepo.delete(employee);
	}

}
