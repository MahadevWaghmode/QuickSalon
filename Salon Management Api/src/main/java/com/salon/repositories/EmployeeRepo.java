package com.salon.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.salon.entities.Employee;
import com.salon.entities.Salon;

public interface EmployeeRepo extends JpaRepository<Employee, Integer>{
	
	List<Employee> findEmployeeBySalon(Salon salon);

}
