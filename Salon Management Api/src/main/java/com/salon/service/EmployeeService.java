package com.salon.service;

import java.util.List;

import com.salon.entities.Employee;

public interface EmployeeService {
	
	Employee createEmployee(int salonId, Employee employee);

	Employee updateEmployee(Integer salonId, Integer empId, Employee updateEmployee);

	List<Employee> getSalonEmployees(Integer salonId);

	void deleteEmployee(Integer salonId, Integer empId);

}
