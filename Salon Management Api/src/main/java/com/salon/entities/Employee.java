package com.salon.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Employee {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotEmpty
	private String name;

	@NotEmpty
	private String role;

	@NotNull(message = "Date of joining cannot be null")
	@Column(name = "date_of_joining")
	private LocalDate dateOfJoining;

	@NotEmpty
	private String contactInfo;
	
	@NotNull(message = "Salary cannot be null")
	private Double salary;

	@JsonIgnore
	@ManyToOne
	private Salon salon;

}
